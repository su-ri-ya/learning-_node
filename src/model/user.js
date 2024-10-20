const validator=require("validator")
const mongoose =require("mongoose")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const UserSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not correct email id")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("not  strong enough...")
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw  new Error("gender not valid")
            }
        }
    },
    about:{
        type:String,
        default:"this is default about"
    },
    skills:{
        type:[String]
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("not correct Url")
            }
        }
    }
    
},{timestamps:true})


UserSchema.methods.getjwt=async function () {
    const user=this
    const token=await jwt.sign({_id:user._id},"suriya27",{expiresIn:"5d"})
    return token

}
UserSchema.methods.validatepassword=async function (passwordSendBYUser) {
    const user=this
    const passwordHashed=user.password
    const ispasswordvalid=await bcrypt.compare(passwordSendBYUser,passwordHashed)

    return ispasswordvalid 

}
module.exports=mongoose.model("User",UserSchema)