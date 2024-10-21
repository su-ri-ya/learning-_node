const express=require("express")
const requestRouter=express.Router()
const {userAuth}=require("../middlewares/user")
const ConnectionRequest=require("../model/connectionRequest")
const User=require("../model/user")
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try {
        const fromUserId=req.user._id
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
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
            
        })
        if(existingConnectionReques){
            return res.status(400).json({message:"connection reqest already  Exists"})
        }

        
        const connectionRequest=  new ConnectionRequest({
            fromUserId,
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

requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res) => {
    try {
        const loggesInUser=req.user
        const {status,requestId}=req.params
        //validate the status
        const allowedStatus=["accepted","rejected"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"status not allowed"})
        }
        //request id should be valid
        //status shoulb be interested
        //loggedin user=touserid
        const connectionRequest=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggesInUser._id,
            status:"interested"
        })
        if (!connectionRequest) {
            return res.status(400).json({message:"connection request not found"})
        }
        connectionRequest.status=status;
        const data=await connectionRequest.save();

        res.json({message:"connection request "+ status,data})

    }catch (error) {
        res.status(400).send("Error : " + error.message);
    }
})
module.exports=requestRouter