const mongoose=require("mongoose")
const messageschema=new mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"conversations"
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    text:{
        type:String
    },
    seen:{
        type:Boolean,
        default:false
    },
    img:{
        type:String,
        default:"",
    }

},
{
    timestamps:true
})
const MessageModel=mongoose.model("messages",messageschema)
module.exports=MessageModel