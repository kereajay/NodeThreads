const express=require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')
const {erroprHandler,notfound}=require('./Middleware/Error')
const userRouter=require('./Routes/user')
const postRouter=require('./Routes/post')
const messageRouter=require('./Routes/message')
const {v2 : cloudinary}=require("cloudinary")

dotenv.config();
const app=express()
mongoose.connect(process.env.DATABASEURI).then(()=>console.log("data base connectes successfully")).catch((err)=>console.log(err))

cloudinary.config({
    cloud_name:process.env.CLOUDINARYCLOUDNAME,
    api_key:process.env.CLOUDINARYAPIKEY,
    api_secret:process.env.CLOUDINARYAPISECRET
})

app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use('/api/v1/user',userRouter)
app.use('/api/v1/post',postRouter)
app.use('/api/v1/message',messageRouter)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})





app.use(notfound)
app.use(erroprHandler)
app.listen(1818,console.log("server is on port 1818"))
