const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')

const {TelegramToken,chatId} = require('./config')

let bot = null
let lastMessageTime = Date.now()-180*1000

const createBot = async () => {
    try {
        bot = new TelegramBot(TelegramToken, {
            polling: false,
            filepath: false
        })

        bot.on('text', (data) => {console.log(data)})

    } catch (e) {
        console.log(e)
    }
}

const sendOnTelegram = async (path) => {
    const stream = fs.readFileSync(path)
    const flag = (Date.now() - lastMessageTime) < 180*1000
    await bot.sendPhoto(chatId,stream,{disable_notification:flag})
    fs.rmSync(path,{
        force: true
    })
    lastMessageTime = Date.now()
}

module.exports = {sendOnTelegram, createBot} 