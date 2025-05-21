const express=require("express");
const  app=express();

app.use("/home",(req,res,next)=>{
  
  
       next();
   
},(req,res)=>{
    res.send("2nd response");
})









app.listen(3000);
