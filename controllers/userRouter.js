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


router.post("/sign_in",async(req,res)=>{
        let input=req.body
        let emailID=req.body.emailID

        let data=await userModel.findOne({"emailID":emailID})

        
        if(!data)
        {
            return res.json(
                {
                    status:"invalid email"
                }
            )
        }
        
        console.log(data)

        let dbPassword=data.password
        let inputPassword=req.body.password

        console.log(dbPassword)
        console.log(inputPassword)

        const match=await bcrypt.compare(inputPassword,dbPassword)
        {
            if(!match)
            {
                return res.json({
                    status:"invalid password"
                })
            }
        }


        res.json({
            status:"success"
        }
        )

    
    
})

router.get("/view_all",async(req,res)=>{
    let data=await userModel.find()
    res.json(data)
})

module.exports=router