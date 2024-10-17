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

connectDB().then(() => {
    console.log("DB connected successfully");
    app.listen(6464, () => {
        console.log("Server is running on port 6464");
    });
}).catch((err) => {
    console.log("DB connection failed: " + err.message);
});
