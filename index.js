import TelegramBot from 'node-telegram-bot-api';

// replace the value below with the Telegram token you receive from @BotFather
const main_token = '8180507441:AAGR3GKel7fus30OPlj2UQ_viJuxnKFASWA';

// const main_token = '8109563932:AAF2UdGE3-0FR8O2USCaTQwML3aEinWZkIY'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(main_token, { polling: true });

const DEFAULT_CATEGORY = {
    home: 'Квартира',
    health: 'Здоровье',
    food: 'Еда',
}

const currentChat = {};

const getBaseChatInfo = () => {
    return {
        categories: [],
    }
}

bot.setMyCommands([
    {
        command: '/info',
        description: 'Расскажи обо мне',
    },
    {
        command: '/set',
        description: 'Внести трату',
    },
    {
        command: '/start',
        description: 'Начать',
    }
])

const getCategories = (chatId) => {
    const inline_keyboard = [];

    if (Object.keys(DEFAULT_CATEGORY).length === currentChat[chatId].length) {
        return null
    }

        Object.keys(DEFAULT_CATEGORY).forEach(callback_data => {
            const text = DEFAULT_CATEGORY[callback_data];

            if (!currentChat[chatId].categories.includes(callback_data)) {
                inline_keyboard.push([{
                    text,
                    callback_data
                }]);
            }
        })


    return {
        reply_markup: JSON.stringify({ inline_keyboard })
    }
}


bot.on('message', async msg => {
    try {
        const chatId = msg.chat.id
        const text = msg.text

        // return bot.sendMessage(chatId, 'Я тебя не понял))))')

        console.log(currentChat)

        if (!currentChat[chatId]) currentChat[chatId] = getBaseChatInfo()
        if (text === '/start') {
            await bot.sendMessage(chatId, 'Привет, это бот который помогает тебе вести свои финансовые расходы. Для начала работы тебе необходимо настроить свои категории.')

            const categories = getCategories(chatId);

            if (categories) {
                return await bot.sendMessage(chatId, 'Выбери из предложенных', getCategories(chatId))
            } else {
                return await bot.sendMessage(chatId, 'Категорий больше нет')
            }

        };
        if (text === '/info') return bot.sendMessage(chatId, `Тебя зовут ${msg.chat.first_name} ${msg.chat.last_name}`);
        if (text === '/set') return bot.sendMessage(chatId, 'Введи сумму:')

    } catch (e) {
        console.log(e)
    }
})


bot.on('callback_query', msg => {

    const chatId = msg.message.chat.id
    const key = msg.data
    if (!currentChat[chatId]) return bot.sendMessage(chatId, 'Произошла ошибка');
    currentChat[chatId].categories.push(key);
    return bot.sendMessage(chatId, `Ты выбрал "${DEFAULT_CATEGORY[key]}". Еще?`, getCategories(chatId))
})
