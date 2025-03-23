import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./lib/db.js";

// Configuring the environment variables
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000


// Listening to the server...
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})