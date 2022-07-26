import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
export const authRegister=async(req,res,next)=>{
    try {
        const salt=bcrypt.genSaltSync(10);
        const hashPassword=bcrypt.hashSync(req.body.password,salt);
        const newUser=await User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword
        })
        await newUser.save();
        res.status(200).json("User has been created!")
    } catch (error) {
        next(error);
    }
}
export const authLogin=async(req,res,next)=>{
    try {
        const user = await User.findOne({username:req.body.username});
        if(!user){
            return next(createError(404,"User not found"));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect){
            return next(createError(400,"Wrong password or username"));
        }
        const token=jwt.sign({_id:user._id,isAdmin:user.isAdmin},process.env.JWT)

        const {password,...tempUser} = user._doc;
        res.cookie("acces_token",token,{
            httpOnly:true
        })
        .status(200)
        .json({...tempUser})
    } catch (error) {
        next(error);
    }
}