import jwt from "jsonwebtoken"
import { createError } from "./error"

export const verifyToken = (req,res,next) => {
    const token = req.cookies.acces_token;
    if(!token){
        return next(401,"You are not authenticated!")
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err)return next(createError(403,"Token is not valid!"));
        req.user = user;
        next();
    })
}