const express=require("express");
const connectDB=require("./config/database")
const  app=express();
const User=require("./models/user");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
app.use(express.json());


app.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req?.body;
        const user=await User.findOne({emailId:emailId});
        if(!user)
        {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid)
        {
            throw new Error("Invalid Credentials");
        }
        else
        {
            res.send("User Login Sucessfully");
        }


    }catch(err)
    {
        res.status(409).send("ERROR:"+err.message);
    }

})

app.post("/signup",async(req,res)=>{

   try{
        
        validateSignUpData(req);
        const existingUser=await User.findOne({emailId:req.body.emailId});
        if(existingUser){
            res.status(409).send("email already exist");
        }
        const {password,firstName,lastName,emailId}=req?.body;
        const passwordHash=await bcrypt.hash(password,10);
      
         const user=new User({firstName,lastName,password:passwordHash,emailId});

        await user.save();
    res.send("User createdpost Sucessfully");
    } catch(err){
        res.status(404).send(err.message);
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
    const {id, ...updatedData}=req.body;
    try{

        const applowedFeilds=["password","lastName","age"];
        const isUpdateAllowed=Object.keys(req.body).every(k=> applowedFeilds.includes(k));
        if(!isUpdateAllowed)
        {
            throw new Error("Update not allowed");
        }
        await User.findByIdAndUpdate(userId,updatedData,{
             runValidators:true,
        });
       
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

