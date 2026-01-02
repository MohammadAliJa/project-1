import mongoose, {Schema } from "mongoose";

const userSchema = new  Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim:  true, // it removes spaces from the username 
            minLength: 3,
            maxLength: 30
        },
        password:{
            type: String,
            required: true,
            minLength: 6,
            maxLength: 1024, // hashed password length       
        },
        email:{
            type: String,
             required: true,
            unique: true,
            lowercase: true,
            trim:  true,
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema);