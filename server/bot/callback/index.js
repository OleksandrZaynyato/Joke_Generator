function hendleCallback(bot, callbackQuery) {
  
    const data = callbackQuery.data;

    if(data.startsWith('accept')) {
       return acceptCallback(bot, callbackQuery);
    }
    if(data.startsWith('reject')) {
        return rejectCallback(bot, callbackQuery);
    }
    bot.answerCallbackQuery(callbackQuery.id, { text: 'unknown action' });
    

}


export default hendleCallback