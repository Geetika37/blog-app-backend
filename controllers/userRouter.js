const express=require("express")
const userModel=require("../models/userModel")
const router=express.Router()

//import bcrypt
const bcrypt=require("bcryptjs")

// create functon to encrypt -> while encrpting give salt value 10
hashPasswordGenerator=async(pass)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

router.post("/sign_up",async(req,res)=>{
    
    let {data}={"data":req.body}
    let password=data.password
    //functon
    hashPasswordGenerator(password).then(
        (hashedPassword)=>{
            console.log(hashedPassword)
            data.password=hashedPassword
            console.log(data)
                let user=new userModel(data)
                let result= user.save()

                res.send({
                    status:"success"
                })
        }
    )
    
})

module.exports=router