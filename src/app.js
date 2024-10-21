const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieparser=require("cookie-parser")
app.use(express.json());
app.use(cookieparser())

const authRouter=require("./Routes/auth")
const profileRouter=require("./Routes/profile")
const requestRouter=require("./Routes/request")
const userRouter=require("./Routes/user")


app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)


connectDB().then(() => {
    console.log("DB connected successfully");
    app.listen(6464, () => {
        console.log("Server is running on port 6464");
    });
}).catch((err) => {
    console.log("DB connection failed: " + err.message);
});
