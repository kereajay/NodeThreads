const express=require('express')
const {signup,signin,userlogout,followuser,updateuser,getprofile,getallusers,freeze,usersuggestions} =require('../Controller/user')
const {userauth}=require('../Middleware/userauth')

const UserModel=require('../Model/user')
const userRouter=express.Router()
userRouter.post('/signup',signup)
userRouter.post('/signin',signin)
userRouter.post('/logout',userlogout)
userRouter.post('/follow/:id',userauth,followuser)
userRouter.put('/update/:id',userauth,updateuser)
userRouter.get('/getuser/:Username',userauth,getprofile)
userRouter.get('/getallusers',userauth,getallusers)
userRouter.put('/freeze',userauth,freeze)
userRouter.get('/usersuggestions',userauth,usersuggestions)

module.exports=userRouter 