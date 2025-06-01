const mongoose=require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://krishnasai69219:QfvZnGpW3jht9a45@namastenode.ufpxgel.mongodb.net/devTinder")

}


module.exports=connectDB