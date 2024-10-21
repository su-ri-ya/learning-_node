const express=require("express")
const userRouter=express.Router()
const {userAuth}=require("../middlewares/user")
const ConnectionRequest=require("../model/connectionRequest")
const User=require("../model/user")
const USER_SAFE_DATA="firstName lastName photoUrl aboutMe age skills gender"
userRouter.get("/user/requests/received",userAuth,async (req,res) => {
    try {
        const loggedInUser=req.user
        const connectionRequest= await ConnectionRequest.find({toUserId:loggedInUser._id,status:"interested"})
        .populate("fromUserId",USER_SAFE_DATA)
        res.status(200).json({message:"data fetched",connectionRequest})

        
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
    
})
userRouter.get("/user/connections",userAuth,async (req,res) => {
    try {
        const loggedInUser=req.user
        const connections=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}

            ]
            
        }).populate("fromUserId",USER_SAFE_DATA)
        .populate("fromUserId",USER_SAFE_DATA)
        const data=connections.map((row)=> {
            if(fromUserId.tostring()===loggedInUser._id.tostring()){
                return row.toUserId
            }
            return row.fromUserId
        })
        res.status(200).json({message:" connection data fetched",data})

        
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
})
userRouter.get("/user/feed",userAuth,async (req,res) => {
    try {

        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10
        limit=limit>50?50:limit

        const skip=(page-1)*limit


        const loggedInUser = req.user;
        // user should see card except
        //1.his own card,his connections,ignored request,already sent the connection request

        //find all connection req(sent+received)
        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId")

        const hideUsersFromFeed= new Set();
        connectionRequest.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        })

        const users =await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        res.json({
            message:"feed",
            data:users
        })

        
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
})


module.exports=userRouter