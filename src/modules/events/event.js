export default class event {
  constructor (client, name) {
    this.client = client
    this.name = name
  }

  run () {
    throw new SyntaxError('This needs to be overwritten by the events.')
  }
}
