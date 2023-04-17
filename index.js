const express= require("express");
require("dotenv").config();
const port = process.env.PORT;
const {connection} = require("./config/db")
const userRouter = require("./routes/userRoute")
const {authentication} = require("./middlewares/authenticate");
const { blogRouter } = require("./routes/blogRoute");

const app = express();

app.get("/",(req,res)=>{
    console.log("home")
})

app.use(express.json())
app.use("/users",userRouter)
app.use(authentication)
app.use("/blogs",blogRouter)





app.listen(port,async()=>{
try {
    await connection
    console.log("connected to the DataBase")
} catch (error) {
    console.log(error);
    console.log("couldn't connect to the database")
}
console.log(`Server is running at Port ${port}`)
})