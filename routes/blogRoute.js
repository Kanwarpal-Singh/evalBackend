const express = require("express");
const {blogModel} = require("../models/blogModel")
const {authentication} = require("../middlewares/authenticate")

const blogRouter = express.Router();

blogRouter.get("/",async(req,res)=>{
    const allblogs = await blogModel.find();
    res.send(allblogs)
    console.log(allblogs)
})

blogRouter.post("/create",authentication,async(req,res)=>{
    const payload = req.body;
    const blog = new blogModel(payload);
    await blog.save();
    console.log({"msg":`blog:- ${blog.title} has been created`});
    res.send({"msg":`blog:- ${blog.title} has been created`});

})

blogRouter.patch("/update/:id",async(req,res)=>{
    const payload = req.body
    const id = req.params.id;
    const blog = await blogModel.find({"_id":id});
    console.log(blog)
    const userID = req.body.user;
    console.log(blog.user);
    console.log(userID)
    try {
        if(blog.user!==userID){
            res.send({"msg":"You are not Authorized to update this blog"})
        }else{
            await blogModel.findByIdAndUpdate({"_id":id},payload);
            res.send({"msg":"blog has been updated"})
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went wrong"})
    }
})
blogRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    const blog = await blogModel.find({"_id":id});
    console.log(blog)
    const userID = req.body.user;
    console.log(blog.user);
    console.log(userID)
    try {
        if(blog.user!==userID){
            res.send({"msg":"You are not Authorized to delete this blog"})
        }else{
            await blogModel.findByIdAndDelete({"_id":id});
            res.send({"msg":"blog has been deleted"})
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went wrong"})
    }
})
blogRouter.get("/",(req,res)=>{
    res.send("all note");
    console.log("all notes");
})
module.exports = {blogRouter}