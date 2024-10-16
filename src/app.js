const express = require("express")
const app = express()
const connectDB =require("./config/database")
const user = require("./model/user")

app.post("/signup",async(req,res)=>{
    const Userobj={
        firstName:"suriya",
        lastName:"riya",
        emailId:"suriyabidb6@gmail.com",
        password:"1234567",
    }
    const User =new user(Userobj)
    try {
        await User.save()
    res.send("user add sucussfully")
        
    } catch (error) {
        res.status(400).send("error occurred")
        
    }
    

})


connectDB().then(()=>{
    console.log("db connnected sucussfully");
    app.listen(6464,()=>{
        console.log("server is running");
        
    })
}).catch((err)=>{
    console.log("db not connected");
})

