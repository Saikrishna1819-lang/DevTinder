const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth=async(req,res,next)=>{

   try{


     const {token}=req.cookies;
    if(!token)
    {
        return res.status(401).send("Please Login");
    }
    const decodeObj=await jwt.verify(token,"Sai@181911");
    const {_id}=decodeObj;
    const user=await User.findById(_id);
    if(!user)
    {
        throw new Error("User not Found");
    }
    req.user=user;
    next();

   } catch(err){
    console.log("saijsv;lhvfl")

    res.status(400).send("ERROR:");
   }


}
module.exports={userAuth};