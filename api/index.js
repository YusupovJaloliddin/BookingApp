import express from "express" ;
import dotenv from "dotenv" ;
import mongoose from "mongoose"

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
    console.log("MongoDB disconnected")
});
mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected");
})

app.use(express.json());

const PORT=process.env.PORT || 8800;

app.listen(PORT,()=>{
    connect();
    console.log(`Server is running on port: ${PORT}`)
})
