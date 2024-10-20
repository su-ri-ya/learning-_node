const express=require("express")
const authRouter=express.Router()
const bcrypt= require("bcrypt")
const {validateSignup}=require("../utils/validate")
const User = require("../model/user"); 


authRouter.post("/signup", async (req, res) => {
    

    try {
        validateSignup(req)
        const {firstName,lastName,emailId,password}=req.body
        const passwordHashed=await bcrypt.hash(password,10)
        const newUser = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHashed
        });
        await newUser.save();
        res.status(201).send("User added successfully");
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
});

authRouter.post("/login",async(req,res)=>{

    try {
        const {emailId,password}=req.body;
        const user =await User.findOne({emailId:emailId})
        if (!user) {
            throw new Error("invalid crentials");
        }
        
        const ispasswordValid= await user.validatepassword(password)
        if(ispasswordValid){
            const token=await user.getjwt()
            res.cookie("token",token)
            res.send("login sucessfully")
                
        }else{
            throw new Error("invalid crentials");
        }
        
        
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
    
})

authRouter.post("/logout",async(req,res)=>{
    try {
        res.cookie("token",null,{expires:new Date(Date.now())})
        res.send("logout sucussfully")
        
    } catch (error) {
        res.send(error)
        
    }
    

})

module.exports=authRouter