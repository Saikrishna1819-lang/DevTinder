const express=require("express");
const connectDB=require("./config/database")
const  app=express();
const User=require("./models/user");
app.use(express.json());

app.post("/signup",async(req,res)=>{
    const user=new User(req.body)
    try{
        await user.save();
    res.send("User createdpost Sucessfully");
    } catch(err){
        res.status(404).send("Error in Saving User data");
    }
})







connectDB().then(()=>{

    console.log("Database is connected sucessfully")
    app.listen(3000,()=>{
    console.log("srever is listeninig to the port 3000");
});
}).catch((err)=>{
    console.log("connection failure");
})

