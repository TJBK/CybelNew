import Event from '../../modules/events/event'

export default class MessageEvent extends Event {
  constructor (client) {
    super(client, 'ready')
  }

  async run () {
    this.client.log.info(`${this.client.user.username} has started`)
    this.client.generateInvite(8).then(link => console.log(link))
  }
}
