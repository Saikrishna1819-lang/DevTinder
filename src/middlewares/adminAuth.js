const adminAuth=(req,res,next)=>{

     const token="abc";
    const isAdminAuthorized=token==="abc";
    if(isAdminAuthorized)
    {
        
        next();
    }
    else
    {
        res.status(404).send("admin is not authorized");

    }
}

module.exports={adminAuth};