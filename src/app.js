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


app.delete("/user",async(req,res)=>{
    const userId=req.body.id;
   try{
     await User.findByIdAndDelete(userId);
    res.send("user Deleted");
   }catch(err){
    res.status(404).send("Error in deletion");
   }
})

app.patch("/user",async(req,res)=>{
    const userId=req.body.id;
    const data=req.body;
    try{
        await User.findByIdAndUpdate({_id:userId},data);
    res.send("data updated sucessfully");
    } catch(err){
        res.status(404).send("User Data is not updated");
    }

})
app.get("/feed",async(req,res)=>{
   try{
     const users=await User.find({});
     res.send(users);
   } catch(err){
      res.status(404).send("Something went Wrong");
   }
    
})
app.get("/user",async(req,res)=>{
    const email=req.body.emailId;
    console.log(email);
   try{
    const user =await User.find({emailId:email})
    
    
      res.send(user);
    
  
   }catch(err){
      res.status(404).send("Something Went wrong");
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

