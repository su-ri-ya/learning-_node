const mongoose = require('mongoose');
const ConnectionRequestSchema=mongoose.Schema({
        formUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
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
    if(connectionRequest.formUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot sent request to yourself");
    }
    next()
    
})
ConnectionRequestSchema.index({formUserId:1,toUserId:1})

const ConnectionRequestModel= new mongoose.model("ConnectionRequest",ConnectionRequestSchema)
module.exports=ConnectionRequestModel