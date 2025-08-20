import mongoose from "mongoose"
// import { setupMongoChangeStream } from "../typesense/liveSync.js"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`)
        //setupMongoChangeStream();
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;