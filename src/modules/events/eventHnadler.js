import EventStore from './eventStore'

export default class EventHanlder {
  constructor (client) {
    this.client = client
    this.EventStore = new EventStore(this.client)
  }

  initialise () {
    this.EventStore.forEach(event => {
      this.client.on(event.name, event.run.bind(event))
    })
  }
}
