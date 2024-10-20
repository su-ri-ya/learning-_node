const validator=require("validator")
const { default: isEmail } = require("validator/lib/isEmail")
const validateSignup=(req)=>{
    const {firstName,lastName,emailId,password}=req.body
    if(!firstName||!lastName){
        throw new Error("name is not valid")
    }
    else if(!isEmail(emailId)){
        throw new Error("email is not valid")

    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not valid,please enter the strong password")
    }
}

const validateEditprofileData=(req)=>{
    const allowedEditData=[
        "firstName",
        "lastName",
        "emailId",
        "age",
        "photoUrl",
        "skills",
        "about",
        "gender"
    ]
    
    const isEditallowed =Object.keys(req.body).every((field)=>allowedEditData.includes(field))
    return isEditallowed 
}
module.exports={validateSignup,validateEditprofileData}