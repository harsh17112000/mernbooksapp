const jwt = require("jsonwebtoken");
const USERS = require("../models/UserSchema");


const Authnetication = async(req,res,next)=>{
    try {
        const token = req.cookies.books;
      
        const verifyuser = jwt.verify(token,process.env.SECRET_KEY);
        
    
        const rootUser = await USERS.findOne({ _id:verifyuser._id,"tokens.token":token });
    
        if(!rootUser){ throw new Error("user not found") }
        console.log(rootUser._id);
    
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send("Unauthorized:No token provided");
        console.log(error);
    }
};

module.exports = Authnetication;