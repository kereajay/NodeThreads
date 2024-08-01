const asyncHandler = require("express-async-handler");
const PostModel=require('../Model/post');
const UserModel = require("../Model/user");
const MessageModel=require('../Model/message')
const ConversitionModel=require('../Model/Conversition');
const { text } = require("express");
   

const createmessage=asyncHandler(async(req,res)=>{
    const {recepientId,message}=req.body
    try{
        const senderId=req.user._id
        let conversation=await ConversitionModel.findOne({participants:{$all:[senderId,recepientId]}})
        if(!conversation){
            conversation=new ConversitionModel({
                participants:[senderId,recepientId],
                lastmessage:{
                    text:message,
                    sender:senderId
                }
            })
            await conversation.save();
        }

        const  newMessage=new MessageModel({
            conversationId:conversation._id,
            text:message,
            sender:senderId
        })
        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastmessage:{
                    text:message,
                    sender:senderId
                }
            })
        ])


            res.json({success:true,newMessage})

    }
    catch(err){
        throw new Error(err)
    }
})

const getmessage=asyncHandler(async(req,res)=>{
    const otherId=req.params.id
    const userId=req.user._id
    // console.log(otherId,userId)
    try{
        const conversation=await ConversitionModel.findOne({
            participants:{$all:[otherId,userId]}
        })
        console.log(conversation._id)
        if(!conversation){
            throw new Error(`there is no conversation found between ${otherId} and ${userId}`)
        }

        const Message=await MessageModel.find({conversationId:conversation._id})
        res.json({success:true,Message})

    }
    catch(err){
        throw new Error(err) 
    }

})

//get conversation with respect to the user
const getconversation=asyncHandler(async(req,res)=>{
   const userId=req.user._id;

    try{
        const conversation=await ConversitionModel.find({participants:userId}).populate({
            path:"participants",
            select:"Username profilepic"
        })
        if(!conversation){
            throw new Error(`there is no conversation with respect to this user id ${userId}
                `)
        }
        res.json({success:true,conversation})

    }
    catch(err){
        throw new Error(err)
    }
})

//delete message by it's id
const deletemessage=asyncHandler(async(req,res)=>{
    const currentuserId=req.user._id.toString()
    const messageId=req.params.id
    console.log(currentuserId,messageId)
    try{
        const message=await MessageModel.findById(messageId)
         if(currentuserId!==message.sender.toString()){
            throw new Error("you are not user to delete this replay")
         }
        const deletedmessage=await MessageModel.findByIdAndDelete(messageId)
        res.json(deletedmessage)

    }
    catch(err){
        throw new Error(err)
    }
})

module.exports={
    createmessage,
    getmessage,
    getconversation,
    deletemessage
}

