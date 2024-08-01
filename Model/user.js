const mongoose = require('mongoose')
const userschema=new mongoose.Schema({
   name:{
    type:String,
    required:true
   } ,
   Username:{
    type:String,
    required:true,
    unique:true
   } ,
   email:{
    type:String,
    required:true,
    unique:true
   } ,
   password:{
    type:String,
    minLength:6,
    
   },
   profilepic:{
    type:String,
    default:"",
   },
   followers:{
    type:[String],
    default:[],

   },
   following:{
    type:[String],
    default:[],

   },
   biography:{
    type:[String],
    default:[],

   },
   isFrozen:{
    type:Boolean,
    default:false
   }
   
},{
    timestamps:true
})

const UserModel=mongoose.model("users",userschema);
module.exports=UserModel