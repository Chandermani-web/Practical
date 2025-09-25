import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants.js";

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(`${process.env.MONGO_URL}/${DATABASE_NAME}`);
        console.log(`Database connected successfully !! Host: ${conn.connection.host}`);
    }catch(err){
        console.error("Error connecting to database", err);
        throw err;
    }
}

export default connectDb;