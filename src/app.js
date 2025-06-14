require("dotenv").config();
const express=require("express");

        
const connectDB=require("./config/database")
const  app=express();
const http=require("http");
const cookieParser=require("cookie-parser")
const cors=require("cors");
app.use(cors({
    origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(cookieParser());
app.use(express.json());
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter = require("./routes/user");
const chatRouter=require("./routes/chat")
const initializeSocket = require("./utils/socket");
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter)
app.use("/",chatRouter);

app.get("/", (req, res) => {
  res.send("Backend is up and running 🚀");

});

const server=http.createServer(app);
initializeSocket(server);
connectDB().then(()=>{

    const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});

}).catch((err)=>{
    console.log("connection failure");
})

