const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const userRoute=require("./controllers/userRouter")
const postRoute=require("./controllers/postRouter")

const app=express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://geetika37:geethu3377@cluster0.s1qugri.mongodb.net/userDb?retryWrites=true&w=majority",
{useNewUrlParser:true}
)

app.use("/api/user",userRoute)
app.use("/api/post",postRoute)
app.listen(3001,console.log("server runnng"))