const express=require("express");
const  app=express();
const { adminAuth } = require("./middlewares/adminAuth");


app.use("/admin",adminAuth);
app.get("/admin/getAllData",(req,res)=>{
   res.send("All Data is added");
     
})
app.get("/admin/deleteAllData",(req,res)=>{
    res.send("All the deta deleted");
})



app.get("/getUserData",(req,res)=>{
  
throw new Error("user not dound");
    res.send("User Data is sent");
   
    


})


app.use("/",(err,req,res,next)=>{
    if(err)
    {
        res.status(505).send("Error is comming");
    }
   
   
})










app.listen(3000);
