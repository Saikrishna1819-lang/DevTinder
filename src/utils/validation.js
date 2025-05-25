const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req?.body;

    if (!firstName || firstName.trim().length === 0) {
        throw new Error("First name is required");
    }

    if (!lastName || lastName.trim().length === 0) {
        throw new Error("Last name is required");
    }

    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Enter a valid email ID");
    }

    if (!password || !validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
};


const validateEditProfileData=(req)=>{
    const allowedFields=["age","skills","about","firstName","lastName"];
    const isEditAllowed=Object.keys(req.body).every(field=>allowedFields.includes(field)); 
    return isEditAllowed;
     

}

module.exports = { validateSignUpData ,validateEditProfileData};
