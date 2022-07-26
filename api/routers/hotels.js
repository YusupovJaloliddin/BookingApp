import express from "express";
import Hotel from "../models/Hotel.js";
const router=express.Router();

//CREATE
router.post("/",async(req,res)=>{
    
    const newHotel=new Hotel(req.body);
    
    try {
        const savedHotel=await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(error);
    }
})
//GET ALL
router.get("/",async(req,res)=>{
    try {    
    const hotels=await Hotel.find();
        res.status(200).json(hotels)
    } catch (error) {
        res.status(500).json(error);
    }
})
//UPDATE 
router.put("/:id",async(req,res)=>{
    try {    
    const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{
        $set:req.body
    });
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error);
    }
})
//DELETE
router.delete("/:id",async(req,res)=>{
    try {
        const hotel=await Hotel.findByIdAndDelete(req.params.id);
        if(hotel){
            res.status(200).json({msg:"Deleted succesfully"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
})
//GET 



export default router;