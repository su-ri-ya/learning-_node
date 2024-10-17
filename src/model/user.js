const validator=require("validator")
const mongoose =require("mongoose")

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

module.exports=mongoose.model("User",UserSchema)