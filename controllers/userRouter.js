const express=require("express")
const userModel=require("../models/userModel")
const router=express.Router()

router.post("/sign_up",async(req,res)=>{
    let data=req.body
    let user=new userModel(data)
    let result=await user.save()

    res.send({
        status:"success"
    })
})

module.exports=router