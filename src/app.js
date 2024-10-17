const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./model/user");  // Assuming User is a Mongoose model

app.use(express.json());

app.post("/signup", async (req, res) => {
    const newUser = new User(req.body);

    try {
        await newUser.save();
        res.status(201).send("User added successfully");
    } catch (error) {
        res.status(400).send("Error adding the user: " + error.message);
    }
});

app.get("/user",async(req,res)=>{
    const useremailId=req.body.emailId;
    try {
        const users =await User.find({emailId:useremailId})
        if (users.length>0) {
            res.send(users)
        }
        else{
            res.send("user not found")
        }
        
    } catch (error) {
        res.status(400).send("somtheing went wrong " + error.message);
        
    }
    
})

app.get("/feed",async(req,res)=>{
    try {
        const alluser=await User.find({})
        res.send(alluser)
    } catch (error) {
        res.status(400).send("somtheing went wrong " + error.message)
        
    }

})
app.delete("/user",async(req,res)=>{
    const id=req.body.id
    try {
        await User.findByIdAndDelete(id)
        res.send("user deleted sucussfully")
    } catch (error) {
        res.status(400).send("somtheing went wrong " + error.message)
        
    }

})

app.patch("/user/:id",async(req,res)=>{
    const id=req.params?.id
    const data=req.body
   
    try {
        const allowdedupate=["age","gender","skills","about"]
        const isupdateAllowed=Object.keys(data).every(k=>
            allowdedupate.includes(k)
        )
        if(!isupdateAllowed){
            throw new Error("update not allowed")
        }
        if(data.skills.length>50){
            throw new Error("too much skills")
        }
        await User.findByIdAndUpdate({_id:id},data,{runValidator:true})
        res.send("updated sucuessfully")
        
    }catch (error) {
        res.status(400).send("somtheing went wrong " + error.message)
        
    }

})


  

connectDB().then(() => {
    console.log("DB connected successfully");
    app.listen(6464, () => {
        console.log("Server is running on port 6464");
    });
}).catch((err) => {
    console.log("DB connection failed: " + err.message);
});
