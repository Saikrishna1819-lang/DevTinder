const mongoose=require("mongoose");
const validator=require("validator");
const jwt =require("jsonwebtoken");
const bcrypt=require("bcrypt");
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
    photourl:{
        type:String,
        default:"https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid&w=740"

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
    about:{
        type:String,
    },
    skills:{
        type:Array,
    }

},{timestamps:true})

userSchema.methods.getJWT=async function(){
    const user=this;

    const token=await jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    return token;

}
userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}


module.exports=mongoose.model("User",userSchema)