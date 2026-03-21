import mongoose from "mongoose";

const connectDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected successfully");
        
    } catch (error) {
        console.log("Connection failed",error);
         process.exit(1)
    }
}

export default connectDB