const express=require("express")
const messageRouter=express.Router()
const {userauth}=require('../Middleware/userauth')
const {createmessage,getmessage,getconversation,deletemessage}=require('../Controller/message')

messageRouter.post('/create',userauth,createmessage)
messageRouter.get('/get/:id',userauth,getmessage)
messageRouter.get('/getconversation',userauth,getconversation)
messageRouter.delete('/delete/:id',userauth,deletemessage)
module.exports=messageRouter