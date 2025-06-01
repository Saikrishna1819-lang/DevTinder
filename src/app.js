require("dotenv").config();
const express=require("express");

const connectDB=require("./config/database")
const  app=express();
const cookieParser=require("cookie-parser")
const cors=require("cors");
app.use(cors({
    origin: "https://devtinder-web-p9wx.onrender.com",
  credentials: true
}))
app.use(cookieParser());
app.use(express.json());
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter = require("./routes/user");
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter)
app.get("/", (req, res) => {
  res.send("Backend is up and running 🚀");
});
connectDB().then(()=>{

    const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});

}).catch((err)=>{
    console.log("connection failure");
})

