import { Collection } from 'discord.js'
import { join } from 'path'
import { readdirSync, statSync } from 'fs'

export default class CommandStore extends Collection {
  constructor (client) {
    super()
    this.client = client
    this.storeCommands(this.loadFiles(join(process.cwd(), './src/commands')))
  }

  loadFiles (dir) {
    return readdirSync(dir).reduce((files, file) => {
      const name = join(dir, file)
      const isDirectory = statSync(name).isDirectory()
      return isDirectory ? [...files, ...this.loadFiles(name)] : [...files, name]
    }, [])
  }

  storeCommands (files) {
    try {
      files.forEach(file => {
        const Event = require(file).default
        const instance = new Event(this.client)
        this.set(instance.info.name, instance)
        instance.aliases.forEach(alias => {
          this.set(alias, instance)
        })
      })
    } catch (err) {
      this.client.log.error(err)
    }
  }
}
