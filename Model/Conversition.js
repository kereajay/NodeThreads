const mongoose=require("mongoose")
const UserModel=require('./user')
const conversitionschema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }],
    lastmessage:{
        text:String,
        sender:{type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
        seen:{
            type:Boolean,
            default:false
        }
      
    },
 

},
{
    timestamps:true
})
const ConversitionModel=mongoose.model("conversations",conversitionschema)
module.exports=ConversitionModel