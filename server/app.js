import dotenv from 'dotenv/config';
// dotenv.config();


import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { swaggerUi, swaggerDocument } from './swagger/swagger.js';
import passport from "./config/passport.js";
// import "./config/passport.js";

import { connectDB } from './config/DB.js';
import jokeRoutes from './routes/jokeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { initBot } from './bot/bot.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


// Initialize passport
app.use(passport.initialize());

// CORS
// app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL && "http://localhost:5173" }));
// For local development, you might want to allow all origins. Adjust in production.
app.use(cors({ credentials: true, origin: true }));
app.use(cors({ 
    credentials: true,
    origin: [
        "http://localhost:5173",
        "https://joke-generator-nlfs.onrender.com",
        "https://kv6dzwfj-5173.euw.devtunnels.ms",
        "https://web.telegram.org",
        process.env.FRONTEND_URL || "http://localhost:5173"] }));

app.use(express.json());

// Connect to MongoDB
await connectDB();

// Routes
app.use('/api/jokes', jokeRoutes);
app.use('/api/user', userRoutes);

app.get("/protected",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({ message: "You are authorized", user: req.user });
    }
);

// Swagger setup
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve frontend
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get((req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Init Telegram bot
initBot();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
