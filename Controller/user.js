const asyncHandler = require("express-async-handler");
const UserModel = require("../Model/user");
const bcrypt = require("bcrypt");
const generateTokenAndSetCookies=require('../Utils/generatetokenAndsetcookies')
const  cloudinary=require("cloudinary").v2





const signup = asyncHandler(async (req, res) => {
    const {img}=req.body
  try {
       const result=await cloudinary.uploader.upload(img,{
        folder:"Profilepic"
       })
    //    console.log(result)
       

    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      const salt = bcrypt.genSaltSync(10);
      const hashpassword = bcrypt.hashSync(req.body.password, salt);
      const newuser=await UserModel.create({
        ...req.body,
       password: hashpassword,
       profilepic:result.secure_url,
      })
      const {name,Username,email,profilepic,followers,following,biography}=newuser
      const token=generateTokenAndSetCookies(newuser._id,res)
      res.json({success:true,name,Username,email,profilepic,followers,following,biography})
    }
    else{
        throw new Error("user already exist with this email try with another one")
    }
  } 
  catch (err) {
    throw new Error(err);
  }
});

const signin=asyncHandler(async(req,res)=>{
    try{
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
          throw new Error("No user found with this email please signup");
        }
      
        //comparing the hashed password
        const ispasswordsame = await bcrypt.compare(req.body.password, user.password);
      
        if (!ispasswordsame) {
          throw new Error("Password is not matchinng please try again");
        }

        if(user.isFrozen){
            user.isFrozen=false
            await user.save()
        }
        const token=generateTokenAndSetCookies(user._id,res)
        res.json({success:true,_id: user._id,
			name: user.name,
			email: user.email,
			username: user.Username,
			bio: user.biography,
			profilePic: user.profilepic,
              token})

    }
    catch(err){
        throw new Error(err)
    }
})
const userlogout=asyncHandler(async(req,res)=>{
    try{
        res.cookie("jwttoken","",{maxAge:1})
        res.status(200).json({success:true,message:"logged out successfully"})

    }
    catch(err){
        throw new Error(err)
    }
})

const followuser=asyncHandler(async(req,res)=>{
    try{
        const {id}=req.params;
        const usertomodify=await UserModel.findById(id)
        const currentuser=await UserModel.findById(req.user._id)
      

        if(id===req.user._id){
            throw new Error("you are not going to follow or unfollow yourself")
        }
        const isfollowing=currentuser.following.includes(id)
        if(isfollowing){
            await UserModel.findByIdAndUpdate(id,{$pull:{followers:req.user._id}})
            await UserModel.findByIdAndUpdate(req.user._id,{$pull:{following:id}})
            res.json({message:"User unfollowed successfully"})

        }
        else{
            await UserModel.findByIdAndUpdate(id,{$push:{followers:req.user._id}})
            await UserModel.findByIdAndUpdate(req.user._id,{$push:{following:id}})
            res.json({message:"User followed successfully"})
           

        }

    }
    catch(err){
        throw new Error(err)
    }
})


const updateuser=asyncHandler(async(req,res)=>{
    // console.log(req.params.id)
    const {image}=req.body
    const {bio}=req.body
    console.log(bio)
    const userId=req.user._id
    try{
        let uploadedResponse="";
        const user=await UserModel.findOne({_id:req.params.id})
        // console.log(user)
        if(!user){
            throw new Error("you are not a user to update")
        }

        if(req.params.id!==userId.toString()){
            throw new Error("you con't update others profile")
        }
        if(req.body.password){
            const salt = bcrypt.genSaltSync(10);
            const hashpassword = bcrypt.hashSync(req.body.password, salt);
            await UserModel.findByIdAndUpdate(req.params.id,{$set:{password:hashpassword}})
           return  res.json({message:"password updated successfully"})
        }
        if(image){
            if(user.image){
                await cloudinary.uploader.destroy(user.profilepic.split("/").pop().split(".")[0])
            }
             uploadedResponse=await cloudinary.uploader.upload(image)
            //  console.log(uploadedResponse)
            // profilepic=uploadedResponse.secure_url;

        } 


        const updateduser=await UserModel.findByIdAndUpdate(req.params.id,{...req.body,biography:bio, profilepic:uploadedResponse.secure_url},{new:true})
        
        res.json({success:true,message:"user updated successfully",updateduser})

    }
    catch(err){
        throw new Error(err)
    }
})



const getprofile=asyncHandler(async(req,res)=>{
    const {Username}=req.params
    
    try{
        const getuser=await UserModel.findOne({Username}).select("-password").select("-updatedAt")
        if(!getuser){
            throw new Error("you are not a user please create a account")
        }
        res.json({success:true,message:"got a user", getuser})

        
    }
    catch(err){
        throw new Error(err)
    }

})

//get all users
const getallusers=asyncHandler (async(req,res)=>{
    try{
        const allusers=await UserModel.find().select("-password")
        if(!allusers){
            throw new Error("there are no users still now")
        }
        res.json({success:true,allusers})

    }
    catch(err){
        throw new Error(err)
    }
})


//freez

const freeze=asyncHandler(async(req,res)=>{
    try{
        const user=await UserModel.findById(req.user._id)
        if(!user){
            throw new Error("there is no user to freeze")
        }
        user.isFrozen=true
        await user.save()
        res.json(user)

    }
    catch(err){
        throw new Error(err)
    }
})

//suggested users
const usersuggestions=asyncHandler(async(req,res)=>{
    try{
        const user=req.user

        const followingusers=await UserModel.find({_id:{$in:user.following}})

        let suser=[]
        followingusers.map((follow)=>{
            follow.followers.map((inner)=>{

                suser.push(inner)
            })
        })
        const suggestionusers=await UserModel.find({_id:{$in:suser}})

        //if user are more use slice 
    
        res.json(suggestionusers)

    }
    catch(err){
        throw new Error(err)
    }
})

module.exports = {
  signup,
  signin,
  userlogout,
  followuser,
  updateuser,
  getprofile,
  getallusers,
  freeze,
  usersuggestions
};
