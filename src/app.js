const express=require("express");
const  app=express();
app.use("/home",function(req,res){
res.send("sai krishna from the server  ");
})
app.listen(3000);
