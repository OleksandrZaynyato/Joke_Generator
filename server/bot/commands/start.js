function botStart(bot, msg) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Бот запущений! Готовий до прийому жартів!');
};


export default botStart


