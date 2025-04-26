import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name Required"],
    },
    email: {
        type: String,
        required: [true, "email Required"],
    },
    phone: {
        type: String,
        required: [true, "Phone Number Required"],
    },
    aboutMe: {
        type: String,
        required: [true, "About Me Required"],
    },
    password: {
        type: String,
        required: [true, "Password Is Required"],
        minLength: [8, "Password must contain at least 8 characters"],
        select: false,
    },
    avatar:{
        public_id:{
            type: String,
            required: true,

        },
        url:{
            type: String,
            required: true,

        },
    },
    resume:{
        public_id:{
            type: String,
            required: true,

        },
        url:{
            type: String,
            required: true,

        },
    },
    portfolioURL:{
        type: String,
        required: [true, "Portfolio  URL Is Required"],
    },
    githubURL: String,
    instagramURL: String,
    telegramURL: String,
    facebookURL: String,
    linkedInURL: String,
    twitterURL: String,
    resetPasswordToken: String,
    resetPasswordExprie: Date,

});
//for hash password
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);

});
//for compare Password with hashed Password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};



userSchema.methods.generateJsonWebToken = function () {
    // Ensure JWT_SECRET is passed correctly here
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN, // make sure this is also correctly set
    });
};

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken=crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");    // Hash and set to resetPasswordToken field


    this.resetPasswordExprie = Date.now() +15 * 60 * 1000;//for 10 min
    return resetToken;
}


export const User = mongoose.model("user", userSchema)
