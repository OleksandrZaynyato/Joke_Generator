import TelegramBot from "node-telegram-bot-api";
import registerHandlers  from "./handlers.js";

let bot;

export function initBot() {
  bot = new TelegramBot(process.env.TOKENBOT, { polling: true });

  registerHandlers(bot);

  bot.on('message', msg =>{


  
  })
  console.log("Telegram bot started ✅");
  return bot;
}

export function getBot() {
  return bot;
}
export default initBot ;