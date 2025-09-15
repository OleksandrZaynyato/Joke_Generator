const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

mongoose.connect('mongodb+srv://admin:creator12341234@cluster0.4gzdple.mongodb.net/Jokes?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Отримати всі жарти з MongoDB колекції Jokes
app.get('/api/jokes', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    
    // Отримуємо реальні дані з колекції Jokes
    const jokes = await db.collection('Jokes').find().toArray();
    console.log('📊 Знайдено жартів в базі даних:', jokes.length);
    
    // Форматуємо дані для React Admin
    const formattedJokes = jokes.map((joke) => ({
      id: joke._id.toString(), // Використовуємо реальний ObjectId
      title: joke.setup || "Жарт без назви",
      content: joke.punchline || "Текст жарту відсутній",
      category: joke.category || "Загальні",
      likes: joke.likes || 0,
      createdAt: joke.createdAt || new Date()
    }));
    
    res.json(formattedJokes);
  } catch (error) {
    console.error('❌ Помилка отримання жартів з MongoDB:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
});