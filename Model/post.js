const mongoose = require("mongoose");
const postschema = new mongoose.Schema(
  {
    postedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    text:{
        type:String,
        maxLength:500,
        required: true,
        
      
    },
    img:{
       type:String,

    },
    likes:{
       type:[mongoose.Schema.Types.ObjectId],
       ref:"UserModel",
       default:[]

    },
    replies:[{
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
           

        },
        text:{
            type:String,
            required: true,
           
        },
        userProfilepic:{
            type:String
        },
        Username:{
            type:String
        }

    }],
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("postcollections", postschema);
module.exports = PostModel;
