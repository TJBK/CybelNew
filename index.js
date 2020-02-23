import Bot from './src/bot'
import dotenv from 'dotenv'
dotenv.config()

const bot = new Bot()

bot.initialise()
