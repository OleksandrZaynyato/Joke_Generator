import TelegramBot from 'node-telegram-bot-api';
import Joke from '../../../models/Joke.js';




const admin_id = process.env.ADMINID;

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Бот запущений! Готовий до прийому жартів!');
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




