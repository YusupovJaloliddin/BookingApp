import express from "express";
import dotenv from "dotenv";

const router=express.Router();
dotenv.config();

router.get("/",(req,res)=>{
    res.send("Hello ,this is auth ")
})


export default router;