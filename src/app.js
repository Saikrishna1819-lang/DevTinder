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










app.listen(3000);
