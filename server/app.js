import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import {connectDB} from './config/DB.js';
import jokeRoutes from "./routes/jokeRoutes.js";
import { initBot } from './bot/bot.js';



const app = express();

app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();

app.use('/api/jokes', jokeRoutes);

initBot();



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
