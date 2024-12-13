import TelegramBot from 'node-telegram-bot-api';

// replace the value below with the Telegram token you receive from @BotFather
const token = '8180507441:AAGR3GKel7fus30OPlj2UQ_viJuxnKFASWA';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// bot.setMyCommands([
//     {
//         command: '/info',
//         description: 'Расскажи обо мне',
//     },
//     {
//         command: '/start',
//         description: 'Начать',
//     }
// ])

bot.on('message', msg => {


    try {

        console.log('msg', msg)


    const chatId = msg.chat.id
    const text = msg.text

    if (text.toLowerCase() === 'ты пидор') {
        return bot.sendMessage(chatId, 'Сам ты пидор, понял?!')
    }

    if (text === '/start') {
        return bot.sendMessage(chatId, 'Привет Надежда! Это самая первая версия бота от твоего мужа!!!')
    }

    if (text === '/info') {
        return bot.sendMessage(chatId, `Тебя зовут ${msg.chat.first_name} ${msg.chat.last_name}`);
    }

    return bot.sendMessage(chatId, 'Я тебя не понял))))')

    } catch (e) {
        console.log(e)
    }


})

