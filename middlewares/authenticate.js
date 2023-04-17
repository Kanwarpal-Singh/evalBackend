const jwt = require("jsonwebtoken");
const {blacklist} = require("../blacklist")

const authentication = (req,res,next)=>{
    const token = req.headers.authorization;
    
    if(token){
        if(blacklist.includes(token)){
            return("Unathorized! please login again")
        }else{
            jwt.verify(token,"masai",(err,decoded)=>{
                if(decoded){
                    req.body.author = decoded.userId;
                    next()
                }else{
                    res.send("Please Login First1!")
                }
            })
        }
        
    }else{
        res.send("Please login First!")
    }
}
module.exports = {authentication}