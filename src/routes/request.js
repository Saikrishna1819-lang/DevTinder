
const {userAuth}=require("../middlewares/auth")
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");

const express=require("express");
const requestRouter=express.Router();

requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res)=>{
    try{

        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignored","intrested"];
        if(!allowedStatus.includes(status))
        {
            return res.status(400)
            .json({message:"INvalid status type"+status});
        }

        const toUser=await User.findById(toUserId);
        if(!toUser)
        {
            return res.status(400).json({message:"User not found"})
        }
        if(fromUserId==toUserId)
        {
            return res.status(400).json({message:"you cannot send connection request to yourself"})
        }
      

        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {
                    fromUserId:toUserId,
                    toUserId:fromUserId,
                 
                }
            ]
        })
        
        if(existingConnectionRequest)
        {
            return res.status(400)
            .send( { message:"Connection Request already exist"})
        }
       

        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status,

        })

        const data=await connectionRequest.save();
        res.json({
            message:req.user.firstName+" is"+status+ "in"+toUser.firstName,
            data,
        })

    }catch(err){
        res.status(400).send("ERROR:"+err.message);

    }
   

})

module.exports=requestRouter;