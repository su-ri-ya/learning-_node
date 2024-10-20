const jwt=require("jsonwebtoken")
const User = require("../model/user");
const userAuth=async(req,res,next)=>{
    try {
    const {token}=req.cookies
    if(!token){
        throw new Error("token is not valid");
    }
    const decordedMessage=await jwt.verify(token,"suriya27")
    const {_id}=decordedMessage
    const user=await User.findById(_id)
    if (!user) {
        throw new Error("user not found");
    }
    req.user=user
    next()
    }  catch (error) {
        res.status(400).send("Error : " + error.message);
    }
    

}
module.exports={userAuth}