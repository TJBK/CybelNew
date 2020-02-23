import CommandStore from './commandStore'

export default class CommandHandler {
  constructor(client) {
    this.client = client
    this.commandStore = new CommandStore(this.client)
    this.argsPattern = /(?:['"]|`{3}|`{1})((?:[^'"`\\]|\\.)*)(?:['"]|`{3}|`{1})|(?!")([^\s]+)(?!")/g; // NOTE: Thanks you ACSD_
  }

  async handle(message) {
    if (message.author.bot) return
    // const args = message.content.split(/\s+/g)
    const args = [...message.content.matchAll(this.argsPattern)].map(v => v[1] || v[2])
    const trigger = args.shift().slice('!'.length)
    const command = this.commandStore.get(trigger)
    if (!this.client.userCache.has(message.author.id)) {
      await this.client.userCache.add({
        id: message.author.id,
        commandsRun: 0
      })
    }
    if (!this.commandStore.has(trigger)) return
    if (command.cooldown.has(message.author.id)) return message.delete()
    if (!message.member.hasPermission(command.conf.permission)) return
    if (!command.conf.enabled) return
    if (command.conf.cooldown > 0) command.addCooldown(message.author.id)
    try {
      console.log(this.client.userCache.get(message.author.id))
      let getRun = parseInt(this.client.userCache.get(message.author.id).commandsRun)
      console.log(getRun)
      // if (getRun === `NaN`) getRun = 0
      // this.client.log.info(commandRun)
      let upGetRun = parseInt(getRun + 1)
      console.log(upGetRun)
      await this.client.userCache.update({ id: message.author.id, commandsRun: upGetRun })
      await command.setMessage(message)
      await command.run(message, args)
    } catch (err) {
      this.client.log.error(err)
    }
  }
}
