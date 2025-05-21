const express=require("express");
const  app=express();

app.use("/",(req,res)=>{
    res.send("/ route is working")
})
app.post("/home",(req,res)=>{
    res.send("data sucessfully added to the database");
})

app.get("/home",(req,res)=>{

    res.send("Data received sucessfully");
})









app.listen(3000);
