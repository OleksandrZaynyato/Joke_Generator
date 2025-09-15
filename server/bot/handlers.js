import hendleCallback from "./callback/index.js";
import botStart from "./commands/start.js";


function registerHandlers(bot) {
 
    bot.onText(/\/start/, (msg) => botStart(bot, msg));


    bot.on('callback_query', (callbackQuery) => {
        hendleCallback(bot, callbackQuery);
    });
}

export default registerHandlers 