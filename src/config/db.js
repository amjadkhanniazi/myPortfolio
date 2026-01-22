import mongoose from 'mongoose';
import dotenv, { config } from 'dotenv';

dotenv/config();

async function connectDB() {
    const client = mongoose.connect(process.env.MONGO_URL);
    try{
        await client;
    }
    catch(error){
        console.error("Database connection failed:", error);
    }
}

export default connectDB;