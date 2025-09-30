import dotenv from 'dotenv';
dotenv.config();  

import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from './config/DB.js';
import jokeRoutes from "./routes/jokeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { initBot } from './bot/bot.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL || "http://localhost:5173" }));

app.use(express.json());

// Connect to MongoDB
await connectDB();

// Routes
app.use('/api/jokes', jokeRoutes);
app.use('/api/user', userRoutes);

// Serve frontend
// app.use(express.static(path.join(__dirname, "../client/dist")));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

// Init Telegram bot
// initBot();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); 
});
