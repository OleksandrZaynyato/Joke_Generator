const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});
app.use(express.json());

mongoose.connect('mongodb+srv://admin:creator12341234@cluster0.4gzdple.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ MongoDB connected to test database'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.get('/api/jokes', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const jokes = await db.collection('Jokes').find().toArray();
    
    console.log('📊 Знайдено жартів в test.Jokes:', jokes.length);

    // Форматуємо дані
    const formattedJokes = jokes.map(joke => ({
      id: joke._id.toString(),
      title: joke.setup || "Без назви",
      content: joke.punchline || "Без змісту", 
      category: "General",
      likes: joke.likes || 0,
      accepted: joke.accepted || false,
      submittedBy: joke.submittedBy || "Невідомо",
      createdAt: joke.createdAt || new Date()
    }));

    res.header('X-Total-Count', jokes.length.toString());
    res.json(formattedJokes);
    
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
});