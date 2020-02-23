import { Collection } from 'discord.js'
import { join } from 'path'
import { readdirSync, statSync } from 'fs'

export default class EventStore extends Collection {
  constructor (client) {
    super()
    this.client = client
    this.storeEvnets(this.loadFiles(join(process.cwd(), './src/events')))
  }

  loadFiles (dir) {
    return readdirSync(dir).reduce((files, file) => {
      const name = join(dir, file)
      const isDirectory = statSync(name).isDirectory()
      return isDirectory ? [...files, ...this.loadFiles(name)] : [...files, name]
    }, [])
  }

  storeEvnets (files) {
    try {
      files.forEach(file => {
        const Event = require(file).default
        const instance = new Event(this.client)
        this.set(instance.name, instance)
      })
    } catch (err) {
      this.client.log.error(err)
    }
  }
}
