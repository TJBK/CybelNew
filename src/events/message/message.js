import Event from '../../modules/events/event'

export default class MessageEvent extends Event {
  constructor (client) {
    super(client, 'message')
  }

  async run (message) {
    this.client.commandHandler.handle(message)
  }
}
