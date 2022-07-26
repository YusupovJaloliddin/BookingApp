import express from "express" ;
import dotenv from "dotenv" ;
import mongoose from "mongoose"
import authRoute from "./routers/auth.js"
import usersRoute from "./routers/users.js"
import roomsRoute from "./routers/rooms.js"
import hotelsRoute from "./routers/hotels.js"

const app=express();
dotenv.config();

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connect to MongoDB")
    }catch(err){
        throw err;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected")});


//middlewares

app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/rooms",roomsRoute)
app.use("/api/hotels",hotelsRoute)

const PORT=process.env.PORT || 8800;

app.listen(PORT,()=>{
    connect();
    console.log(`Server is running on port: ${PORT}`)
})
