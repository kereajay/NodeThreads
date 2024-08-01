const jwt=require("jsonwebtoken")
const UserModel=require('../Model/user')
const userauth=async(req,res,next)=>{
    try{
        // const token=req.headers.authorization.split(" ")[1]
        const token=req.cookies.jwttoken
        // console.log(token)
        if(!token){
            throw new Error("there is no token unauthorized")
        }

        //  const decoded = jwt.verify(token, process.env.JWTSECRET);

		// const user = await UserModel.findById(decoded.userId).select("-password");

        jwt.verify(token,process.env.JWTSECRET)
        const tokendata=jwt.decode(token)


        const currenttimeinseconds = Math.floor(new Date().getTime() / 1000);
        if (currenttimeinseconds > tokendata.exp) {
         throw new Error("token is expired")
        }

        // console.log(tokendata)
        const user=await UserModel.findById(tokendata?.userId)
        if(!user){
            throw new Error("you are not a user to follow")
        }
        req.user=user

        next()

    }
    catch(err){
        throw new Error(err)
    }
    
}
module.exports={userauth}