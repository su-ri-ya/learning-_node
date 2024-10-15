const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send("hello")
})
app.get("/sec",(req,res)=>{
    res.send("sec message")
})
app.listen(6464,()=>{
    console.log("server is running");
    
})