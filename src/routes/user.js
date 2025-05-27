const express=require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter=express.Router();
const ConnectionRequest=require("../models/connectionRequest")
const USER_SAFE_DATA="firstName lastName about age skills ";
const User=require("../models/user");

userRouter.get("/user/received",userAuth,async(req,res)=>{
    try{
       

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

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{

        const loggedInUser=req.user;
        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        const skip=(page-1)*limit;
        limit=limit>50? 50:limit;
        const connectionRequests= await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        const hideUserFromFeed=new Set();
        connectionRequests.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })
        

        const users=await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUserFromFeed)}},
                {_id:{$nin:loggedInUser._id}}
            ]
            
            
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        
        res.json({users})


    }catch(err)
    {
        res.status(500).send("ERROR:"+err.message);

    }
})
module.exports=userRouter;