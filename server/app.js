import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/DB.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();



app.get('/jokes', (req, res) => {
  res.send('all jokes');
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});