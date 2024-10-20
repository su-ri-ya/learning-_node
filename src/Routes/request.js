const express=require("express")
const requestRouter=express.Router()
const {userAuth}=require("../middlewares/user")
const ConnectionRequest=require("../model/connectionRequest")
const User=require("../model/user")
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try {
        const formUserId=req.user._id
        const toUserId=req.params.toUserId
        const status=req.params.status

        const allowedStatus=["interested","ignored"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"invalid status type:"+ status}) 
        }

        const toUser=await User.findById(toUserId)
        if(!toUser){
            return res.status(400).json({message:"User not Exists"})

        }

        const existingConnectionReques=await ConnectionRequest.findOne({
            $or:[
                {formUserId,toUserId},
                {formUserId:toUserId,toUserId:formUserId}
            ]
            
        })
        if(existingConnectionReques){
            return res.status(400).json({message:"connection reqest already  Exists"})
        }

        
        const connectionRequest=  new ConnectionRequest({
            formUserId,
            toUserId,
            status
        })
        const data=await connectionRequest.save()
        res.json({
            message:req.user.firstName +" is " + status+" in "+ toUser.firstName,
            data,
        })
        
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
})

module.exports=requestRouter