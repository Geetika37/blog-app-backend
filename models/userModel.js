const mongoose=require("mongoose")

const userSchema=new mongoose.Schema(
    {
            name:String,
            age:String,
            mobileNum:String,
            address:String,
            pinCode:String,
            emailID:String,
            password:String
    }
)

module.exports=mongoose.model("user",userSchema)