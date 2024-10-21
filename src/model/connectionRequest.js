const mongoose = require('mongoose');
const ConnectionRequestSchema=mongoose.Schema({
        fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        required:true,
        enum:{
           values: ["accepted","rejected","ignored","interested"],
           message:`{VALUE} is incorrect stsaus type`
        }
    }},{timestamps:true})

ConnectionRequestSchema.pre("save",function (next) {
    const connectionRequest=this
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot sent request to yourself");
    }
    next()
    
})
ConnectionRequestSchema.index({fromUserId:1,toUserId:1})

const ConnectionRequestModel= new mongoose.model("ConnectionRequest",ConnectionRequestSchema)
module.exports=ConnectionRequestModel