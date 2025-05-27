const express=require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter=express.Router();
const ConnectionRequest=require("../models/connectionRequest")
const USER_SAFE_DATA="firstName lastName about age skills ";

userRouter.get("/user/received",userAuth,async(req,res)=>{
    try{
        console.log("sai krishna")

        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"intrested",
        }).populate("fromUserId",USER_SAFE_DATA)
        res.json({
            message:"Data fetched successfully",
            data:connectionRequests,
        })

    }catch(err){
        res.status(404).send("ERROR:"+err.message);
    }

})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{

        const loggedInUser=req.user;
    const connectionRequests=await ConnectionRequest.find({
        $or:[
            {fromUserId:loggedInUser._id,status:"accepted"},
            {toUserId:loggedInUser._id,status:"accepted"},
        ]
   
    }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
     console.log(connectionRequests);
    const data=connectionRequests.map((row)=>{
        if(row.fromUserId._id.toString()===loggedInUser._id.toString())
        {
            return row.toUserId;
        }
        return row.fromUserId;
    });
    res.json({data});

    }catch(err){
        res.status(404).send("ERROR:"+err.message);
    }

})
module.exports=userRouter;