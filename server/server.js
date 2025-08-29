import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./lib/db.js";
import serverless from "serverless-http";

// Configuring the environment variables
dotenv.config();

connectDB();

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => { console.log(`Server is running at ${PORT}`); })

export const handler = serverless(app);