const express=require("express");
const connectDB=require("./config/database")
const  app=express();
const User=require("./models/user");
const {userAuth}=require("./middlewares/auth")
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser")
const jwt =require("jsonwebtoken");




app.use(cookieParser());
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
            const token=jwt.sign({_id:user._id},"Sai@181911",{expiresIn:"1d"});
            res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
            res.send("User Login Sucessfully");
        }


    }catch(err)
    {
        res.status(409).send("ERROR:"+err.message);
    }

})

app.get("/profile",userAuth,async(req,res)=>{
   try{
    const user=req.user;
    res.send(user);


   
    
   } catch(err){
    res.status(505).send("ERROR:"+err.message);
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

app.post("/sendConnectionRequest",userAuth, async(req,res)=>{
    const user=req.user;
    console.log("Sending connection Request");
    res.send(user.firstName+" sent a connection request");

})




connectDB().then(()=>{

    console.log("Database is connected sucessfully")
    app.listen(3000,()=>{
    console.log("srever is listeninig to the port 3000");
});
}).catch((err)=>{
    console.log("connection failure");
})

