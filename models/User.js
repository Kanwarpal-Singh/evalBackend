const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["User","Moderator"],
        default:"User"
    }
})
const UserModel = mongoose.model("users",userSchema)
module.exports = UserModel