const {userAuth}=require("../middlewares/auth")
const {validateEditProfileData}=require("../utils/validation")





const express=require("express");
const profileRouter=express.Router();

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
   try{
    const user=req.user;
    res.send(user);


   
    
   } catch(err){
    res.status(505).send("ERROR:"+err.message);
   }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
    
      if(!validateEditProfileData(req))
      {
        throw new Error("data is not valid for update ")

      }
     
      const loggedInUser=req.user;
       console.log(loggedInUser);
      Object.keys(req.body).forEach((key)=> (loggedInUser[key]=req.body[key]));
       await loggedInUser.save()
      console.log(loggedInUser);
      res.send(loggedInUser.firstName+"Update Sucessfully")


  }catch(err)
  {
    res.status(400).send("ERROR:"+err.message);
  }
    
})

module.exports=profileRouter;