import mongoose from "mongoose";
import { Database_Name } from "../constant.js";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(`${process.env.MONGO_URL}/${Database_Name}`);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.log(`Error in DB connection: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;