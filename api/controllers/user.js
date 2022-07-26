import User from "../models/User.js";

export const updateUser=async(req,res,next)=>{
    try {    
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
}
export const deleteUser=async(req,res,next)=>{
    try {
        const user=await User.findByIdAndDelete(req.params.id);    
        res.status(200).json({msg:"Deleted succesfully"});
        
    } catch (error) {
        next(error);
    }
}
export const getUser=async(req,res,next)=>{
    try {    
        const user=await User.findById(req.params.id);
            res.status(200).json(user)
        } catch (error) {
            next(error);
        }
}
export const getAllUser=async(req,res,next)=>{
    try {    
        const users=await User.find();
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
}