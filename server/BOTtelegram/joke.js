const express = require('express');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = 3000;

app.use(express.json());

const jokeSchema = new mongoose.Schema({
  text: String,
  approved: Boolean,
  submittedBy: String,
  createdAt: { type: Date, default: Date.now }
});

const Joke = mongoose.model('Joke', jokeSchema);

mongoose.connect('mongodb+srv://admin:creator12341234@cluster0.4gzdple.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

const token_bot = '8265300559:AAHBDmJUGNYNF7wz6vKgFRwldZtKSBnrYEM';
const admin_id = '1795893529';

const bot = new TelegramBot(token_bot, { polling: true });
console.log('Bot started');

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Бот запущений! Готовий до прийому жартів!');
});


app.post('/api/jokes', async (req, res) => {
  try {
    const { text, submittedBy } = req.body;

    if (!text) return res.status(400).json({ error: 'text required' });

    const newJoke = new Joke({ text, approved: false, submittedBy });
    const savedJoke = await newJoke.save();

    await bot.sendMessage(admin_id, 
      `New joke:\n${text}\n\nFrom: ${submittedBy}`,
       {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'ACCEPT', callback_data: `accept_${savedJoke._id}` },
            { text: 'REJECT', callback_data: `reject_${savedJoke._id}` }
          ]
        ]
      }
    });

    res.json({ success: true, message: 'Joke sent for moderation' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

bot.on('callback_query', async (callbackQuery) => {
  const data = callbackQuery.data;
  const messageId = callbackQuery.message.message_id;
  const chatId = callbackQuery.message.chat.id;

  if (data.startsWith('accept_')) {
    const jokeId = data.split('_')[1];
    await Joke.findByIdAndUpdate(jokeId, { approved: true });
    await bot.editMessageText('Joke ACCEPTED', { chat_id: chatId, message_id: messageId });
    bot.answerCallbackQuery(callbackQuery.id, { text: 'Accepted' });
  }

  if (data.startsWith('reject_')) {
    const jokeId = data.split('_')[1];
    await Joke.findByIdAndDelete(jokeId);
    await bot.editMessageText('Joke REJECTED', { chat_id: chatId, message_id: messageId });
    bot.answerCallbackQuery(callbackQuery.id, { text: 'Rejected' });
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Joke Generator</h1>
    <form id="jokeForm">
      <textarea name="text" placeholder="Enter joke" required style="width:300px;height:100px;"></textarea><br>
      <input type="text" name="submittedBy" placeholder="Your name"><br>
      <button type="submit">Send Joke</button>
    </form>
    <script>
      document.getElementById('jokeForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await fetch('/api/jokes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: formData.get('text'),
            submittedBy: formData.get('submittedBy')
          })
        });
        const result = await response.json();
        // alert(result.message);
        e.target.reset();
      });
    </script>
  `);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});