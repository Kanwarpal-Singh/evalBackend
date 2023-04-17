const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const UserModel = require("../models/User")
const blacklist = require("../blacklist")

const userRouter = express.Router()

userRouter.get("/",(req,res)=>{
    console.log("users...")
})

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,role} = req.body;
    try {
        const exuser = await UserModel.find({email});
        if(exuser.length>0){
            res.send({"msg":"User already exists"})
        }else{
            bcrypt.hash(pass,5,async(err,hashed_pass)=>{
                if(err){
                    console.log(error)
                    res.send({"err":err.message})
                }else{
                    const user = new UserModel({name,email,pass:hashed_pass,role})
                    await user.save()
                    console.log(`Welcome Mr. ${name}`)
                    res.send(`Welcome Mr. ${name}`)
                }
            })
        }
    } catch (error) {
        res.send(error.message)
        console.log(error.message)
        console.log("something went wrong")
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({usreId:user._id},process.env.secret,{expiresIn:60})
                    const refreshtoken = jwt.sign({usreId:user._id},process.env.secret,{expiresIn:180})
                    res.send({"msg":"successfully signed in",token,refreshtoken})
                    console.log(token)
                }else{
                    res.send({"error":"please check you password"})
                }
            })
            
        }else{
            console.log("User not found")
            res.send({"error":"user not found,please signup"})
        }
    } catch (error) {
        res.send(error.message)
        console.log(error.message)
        console.log("something went wrong")
    }
})

userRouter.get("/logout",(req,res)=>{
    const token  = req.headers.authorization;
    console.log(token)
    blacklist.push(token)
    console.log(blacklist)
    res.send("Logout Successfull")
})

module.exports = userRouter