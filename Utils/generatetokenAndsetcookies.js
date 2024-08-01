const jwt=require('jsonwebtoken')
const generateTokenAndSetCookies=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWTSECRET,
       { expiresIn:'10d'},
    )
    res.cookie("jwttoken",token,{
        httpOnly:true,
        maxAge:10*24*60*60*1000,
        sameSite:"strict",
    })
    return token

}
module.exports=generateTokenAndSetCookies