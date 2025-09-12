import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import {connectDB} from './config/DB.js';
import jokeRoutes from "./routes/jokeRoutes.js";

const app = express();

app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();

app.use('/api/jokes', jokeRoutes);

// const jokeRouter = express.Router();
// JokeRoutes(jokeRouter, JokeController);
// app.use('/jokes', jokeRouter);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});