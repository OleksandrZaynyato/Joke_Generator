import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import {connectDB} from './config/DB.js';
import jokeRoutes from "./routes/jokeRoutes.js";
import { initBot } from './bot/bot.js';
import mongoose from "mongoose";



const app = express();

app.use(cors());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    next();
});

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
await connectDB();

app.use('/api/jokes', jokeRoutes);

initBot();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
