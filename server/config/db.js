import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error("MONGODB_URI is not set in .env");
        process.exit(1);
    }

    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"))
        await mongoose.connect(uri)
    } catch (error) {
        console.error("Failed to connect to MongoDB: ", error.message);
        process.exit(1);
    }
}

export default connectDB;