const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
    "title" : String,
    "body" : String,
    "author": String
})
const blogModel = mongoose.model("blogs", blogSchema);

module.exports = {blogModel}