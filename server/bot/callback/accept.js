import { Joke } from "../../models/Joke.js";
import mongoose from "mongoose";

export default async function acceptCallback(bot, callbackQuery) {
  try {
    const message = callbackQuery.message;
    if (!message) return bot.answerCallbackQuery(callbackQuery.id, { text: "No message found" });

    // Дістаємо ID з callbackdata і перетворюємо в ObjectId
    const jokeIdStr = callbackQuery.data.split("")[1];
    if (!mongoose.Types.ObjectId.isValid(jokeIdStr)) {
      return bot.answerCallbackQuery(callbackQuery.id, { text: "Invalid joke ID" });
    }
    const jokeId = mongoose.Types.ObjectId(jokeIdStr);

    const chatId = message.chat.id;
    const messageId = message.message_id;

    // Оновлюємо документ
    await Joke.findByIdAndUpdate(jokeId, { approved: true });

    // Редагуємо повідомлення в боті
    await bot.editMessageText("Joke ✅ ACCEPTED", {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: { inline_keyboard: [] } // прибираємо кнопки
    });

    bot.answerCallbackQuery(callbackQuery.id, { text: "Accepted" });
  } catch (err) {
    console.error("Accept callback error:", err);
    bot.answerCallbackQuery(callbackQuery.id, { text: "Error occurred ❌" });
  }
}