import express from "express";
import cors from "cors"
import dotenv from "dotenv"

// Configuring the environment variables
dotenv.config();

// Instantiating express
const app = express();

// Middlewares
app.use(cors())

const PORT = process.env.PORT || 5000


// Listening to the server...
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})