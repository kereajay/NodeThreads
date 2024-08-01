const asyncHandler = require("express-async-handler");
const PostModel=require('../Model/post');
const UserModel = require("../Model/user");
const  cloudinary=require("cloudinary").v2

//create post
const createpost=asyncHandler(async(req,res)=>{
    const {postedby,text,image}=req.body
    try{
        if(!postedby){
            throw new Error("you are not user to create a post")

        }
        if(!text){
            throw new Error("there is no text content in your post it is required")

        }
    const user=await UserModel.findById(postedby)
    // console.log(user._id,req.user._id)
    if(user._id.toString()!==req.user._id.toString()){
        throw new Error("you are not abel to create post to another user")

    }
    let cloudimage="";

    if(image){
        const result=await cloudinary.uploader.upload(image,{
            folder:"posts"
        })
        console.log(result)
        cloudimage=result.secure_url;

    }
    const newpost=await PostModel.create({...req.body,img:cloudimage}
     
    )
    res.json({success:true,message:"post created suyccessfully",newpost,cloudimage})

    }
    catch(err){
        throw new Error(err)
    }
})

//get a post
const getapost=asyncHandler(async(req,res)=>{
    try{
        const gotpost=await PostModel.findById(req.params.id)
        if(!getapost){
            throw new Error("post not found by provided id")

        }
        res.json({success:true,message:"got a post with respect to  provided id",gotpost})

    }
    catch(err){
        throw new Error(err)
    }
})

const deletepost=asyncHandler(async(req,res)=>{
    try{
        const post=await PostModel.findById(req.params.id)
        if(!post){
            throw new Error("unabel to delete there is no post with respect to the provided id")
        }
        if(post.postedby.toString()!==req.user._id.toString()){
            throw new Error("not abel to delete the post because you are not post creater")
        }
        const deletedpost=await PostModel.findByIdAndDelete(req.params.id)
        res.json({success:true,message:"post deleted successfully",deletedpost})

    }
    catch(err){
        throw new Error(err)
    }
})


//liking post
const likingpost=asyncHandler(async(req,res)=>{
    try{
        const {id:postid}=req.params
        const userId=req.user._id;
        const post=await PostModel.findById(postid)
        if(!post){
            throw new Error("post not found")
        }
        const userlikedpost=post.likes.includes(userId)
        if(userlikedpost){
            await PostModel.updateOne({_id:postid},{$pull:{likes:userId}})
            res.json({message:"post unliked succesfully"})


        }
        else{
            post.likes.push(userId)
            await post.save()
            res.json({message:"post liked succesfully"})

        }

    }
    catch(err){
        throw new Error(err)
    }
})

//replay to post
const replaytopost=asyncHandler(async(req,res)=>{
    try{
        const {text}=req.body
        const postid=req.params.id
        const userId=req.user._id;
        const userProfilepic=req.user.profilepic
        const Username=req.user.Username
        if(!text){
           throw new Error("text filed required it should not be empty") 
        }
        const post=await PostModel.findById(postid)
        if(!post){
            throw new Error("post not found")
        }
        // console.log(userId,Username)
        const replay={userId,text,userProfilepic,Username}
         post.replies.push(replay)
        await post.save()
        res.json({success:true,message:"replies added successfully"}) 

    }
    catch(err){
        throw new Error(err)
    }
})


//delete replay

const deletereplay=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    const postid= req.params.postid
    const {replayid}=req.body
    try{
        
       const post=await PostModel.findById(postid)
       if(!post){
        throw new Error("there is no post with respect to the provided id")
       }
      const updated=post.replies.filter((replay)=>{
        console.log(userId,replay.userId)
       //comparing wheather the login user and post deleting user are same or not 
        return(replay.userId.toString()!=userId.toString()  &&replay._id!=replayid)

              
        

      })
  
      post.replies=updated
      await post.save()
      res.json({success:true,post})

    }
    catch(err){
        throw new Error(err)
    }
})


//feedpost

const feedpost=asyncHandler(async(req,res)=>{
    try{
        const userId=req.user._id;
       const user= await UserModel.findById(userId)
       if(!user){
        throw new Error("user not found")

       }
       const following=user.followers
    //    console.log(following,user)
       const feedpost=await PostModel.find({postedby:{$in:following}}).sort({createdAt: -1})
       res.json(feedpost)


    }
    catch(err){
        throw new Error(err)
    }
})
module.exports={
    createpost,
    getapost,
    deletepost,
    likingpost,
    replaytopost,
    feedpost,
    deletereplay
}