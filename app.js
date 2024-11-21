import dotenv from 'dotenv';

dotenv.config();

import express from 'express';

import connectDB from "./DB/connect.js"

import require_routes from "./routes/routes.js"

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hi, I am live");
});

app.use("/api/products", require_routes)

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
           console.log(`${PORT} Yes i am Connected`); 
        })
    } catch (error) {
        console.log(error);
        
    }
} 
start();