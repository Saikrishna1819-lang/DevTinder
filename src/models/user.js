const mongoose=require("mongoose");
const validator=require("validator");
const userSchema=new mongoose.Schema(
    {
    firstName:{
        type:String,
        required:[true,"First name is required"],
        trim:true,
        minlength:[3,"First name should contains atleast 3 characters long"],
    },
    lastName:{
        type:String,
        trim:true,
    },
    emailId:{
        type:String,
        unique:[true,"email is already exist"],
        trim:true,
        lowercase:true,
        required:[true,"Email is required"],
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Email is not valid"+value);
            }
        }
       


    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be at least 6 characters long"],

    },
    age:{
        type:Number,
        validate(value){
            if(value<18||value>60)
            {
                throw new Error("age is not valid")
            }
        }
        
    },
    gender:{
        type:String,
        enum:["Male","Female","Others"],

    },

},{timestamps:true})

module.exports=mongoose.model("User",userSchema)