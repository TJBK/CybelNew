import Command from '../../../modules/commands/command'

export default class Ping extends Command {
  constructor (client) {
    super(client, {
      name: `report`,
      description: `Send in a report`,
      category: `util`,
      enabled: true,
      delete: false
    })
  }
  run (msg, args) {
    
  }
}
