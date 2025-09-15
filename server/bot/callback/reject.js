import Joke from "../../models/Joke.js";
import mongoose from "mongoose";

export default async function rejectCallback(bot, callbackQuery) {
  try {
    const message = callbackQuery.message;
    if (!message) return bot.answerCallbackQuery(callbackQuery.id, { text: "No message found" });

    // Дістаємо ID з callbackdata і перетворюємо в ObjectId
    const jokeIdStr = callbackQuery.data.split("_")[1];
    if (!mongoose.Types.ObjectId.isValid(jokeIdStr)) {
      return bot.answerCallbackQuery(callbackQuery.id, { text: "Invalid joke ID" });
    }
    const jokeId = new mongoose.Types.ObjectId(jokeIdStr);

    const chatId = message.chat.id;
    const messageId = message.message_id;

    // Видаляємо документ з бази
    await Joke.findByIdAndDelete(jokeId);

    // Редагуємо повідомлення в боті
    await bot.editMessageText("Joke ❌ REJECTED", {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: { inline_keyboard: [] } // прибираємо кнопки
    });

    bot.answerCallbackQuery(callbackQuery.id, { text: "Rejected" });
  } catch (err) {
    console.error("Reject callback error:", err);
    bot.answerCallbackQuery(callbackQuery.id, { text: "Error occurred ❌" });
  }
}