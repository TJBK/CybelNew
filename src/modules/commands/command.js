export default class Command {
  constructor (client, options) {
    this.client = client
    this.info = {
      name: options.name || null,
      description: options.description || 'Command doesn\'t have description',
      usage: options.usage || '<command>',
      category: options.category || 'none'
    }
    this.aliases = []
    this.conf = {
      nsfw: options.nsfw || false,
      enabled: options.enabled || false,
      permission: options.permission || 'SEND_MESSAGES',
      cooldown: options.cooldown || 2000,
      delete: options.delete || false
    }
    this.cooldown = new Set()
  }

  run (message, args) {
    throw new SyntaxError('This needs to be overwritten by the command.')
  }

  addCooldown (user) {
    this.cooldown.add(user)
    setTimeout(() => {
      this.cooldown.delete(user)
    }, this.conf.cooldown)
  }

  setMessage (message) {
    this.msg = message
  }

  async editMessage (message) {
    try {
      this.msg.edit(message)
    } catch (err) {
      this.client.log.error(err)
    }
  }

  async sendMessage (message) {
    try {
      let data = await this.msg.channel.send(message)
      if (this.conf.delete) return this.deleteMsg(data)
    } catch (err) {
      this.client.log.error(err)
    }
  }

  deleteMessage (output) {
    try {
      output.delete(60000)
      this.msg.delete(60000)
    } catch (err) {
      this.client.log.error(err)
    }
  }
}
