const express=require("express")
const profileRouter=express.Router()
const {userAuth}=require("../middlewares/user")
const {validateEditprofileData}=require("../utils/validate")

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try {
        const user=req.user
        res.send(user)
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try {
        if(!validateEditprofileData(req)){
            throw new Error("invalid edit request");
        }
        const loggesInUser=req.user
        console.log(loggesInUser);
        
        Object.keys(req.body).forEach((key)=>(loggesInUser[key]=req.body[key]))
        console.log(loggesInUser);
        await loggesInUser.save()
        res.json({
            message:`${loggesInUser.firstName} profile update succussfully`,
            data:loggesInUser
        })

        } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
})

module.exports=profileRouter