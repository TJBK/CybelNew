import Command from '../../../modules/commands/command'

export default class Ping extends Command {
  constructor (client) {
    super(client, {
      name: `ping`,
      description: `Check the latancy`,
      category: `util`,
      enabled: true,
      delete: false
    })
  }

  async run (msg, args) {
    super.sendMessage({ embed: {
      fields: [{
        name: 'Bot Latency',
        value: `:timer: ${new Date().getTime() - msg.createdTimestamp}ms`,
        inline: true
      },
      {
        name: 'API Latency',
        value: `:sparkling_heart: ${Math.round(this.client.ping)}ms`,
        inline: true
      }
      ],
      timestamp: new Date()
    } })
  }
}
