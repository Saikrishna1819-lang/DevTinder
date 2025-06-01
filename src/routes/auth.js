const User=require("../models/user");
const {validateSignUpData}=require("../utils/validation");

const bcrypt=require("bcrypt");

const express=require("express");
const authRouter=express.Router();

authRouter.post("/signup",async(req,res)=>{

   try{
        
        validateSignUpData(req);
        const existingUser=await User.findOne({emailId:req.body.emailId});
        if(existingUser){
           return  res.status(409).send("email already exist");
        }
        const {password,firstName,lastName,emailId}=req?.body;
        const passwordHash=await bcrypt.hash(password,10);
      
         const user=new User({firstName,lastName,password:passwordHash,emailId});

        const savedData=await user.save();
        const token=await savedData.getJWT();
            res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  expires: new Date(Date.now() + 8 * 3600000)
});
        
        
    
    res.json({message:"User createdpost Sucessfully",
        data:savedData
    });
    } catch(err){
        res.status(404).send(err.message);
    }
    
    
    
})
authRouter.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req?.body;
        const user=await User.findOne({emailId:emailId});
        if(!user)
        {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid=await user.validatePassword(password)
        if(!isPasswordValid)
        {
            throw new Error("Invalid Credentials");
        }
        else
        {
            const token=await user.getJWT();
          res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  expires: new Date(Date.now() + 8 * 3600000)
});
            res.send(user);
        }


    }catch(err)
    {
        
        res.status(401).json({ message: err.message })
    }

})
authRouter.post("/logout",async(req,res)=>{

  

        res.cookie("token", null, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  expires: new Date(Date.now())
});
    res.send("Logout Successfull");
})

module.exports=authRouter;