import { Client } from 'discord.js'
import Logger from './modules/logger/logger'
import Database from './modules/database/database'
import EventHandler from './modules/events/eventHnadler'
import CommandHandler from './modules/commands/commandHandler'
import Cache from './modules/cache/cache'

export default class Bot extends Client {
  constructor () {
    super()
    this.log = new Logger(this)
    this.eventHandler = new EventHandler(this)
    this.commandHandler = new CommandHandler(this)
    this.database = new Database(this)
    this.userCache = new Cache(this)
  }

  async initialise () {
    await this.database.connect()
    await this.eventHandler.initialise()
    await this.database.initialise()
    await this.userCache.initialise(this.database.db(process.env.DB_NAME).collection('user'))
    try {
      const loginToken = await this.login(process.env.TOKEN)
      this.log.info(`Logged into the Discord API with ${loginToken}`)
    } catch (err) {
      this.log.error(err)
    }
  }
}
