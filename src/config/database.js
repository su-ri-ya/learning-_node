const mongoose =require("mongoose")

const connectDB=async()=>{
    mongoose.connect("mongodb+srv://suriya6374570440:YPUqZjbLaiX3Llsd@node.9d0bz.mongodb.net/devTinder")
}

module.exports=connectDB