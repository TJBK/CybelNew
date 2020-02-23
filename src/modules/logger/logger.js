export default class Logger {
  constructor (client) {
    this.client = client
    this.colours = {
      reset: '\x1b[0m',
      bright: '\x1b[1m',
      dim: '\x1b[2m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m'
    }
  }

  debug (text) {
    return console.log(`[${this.getCurrentTime()}] [DEBUG] ${text}`)
  }

  info (text) {
    return console.log(`[${this.getCurrentTime()}] ${this.colours.blue}[INFO]${this.colours.reset} ${text}`)
  }

  warn (text) {
    return console.log(`[${this.getCurrentTime()}] ${this.colours.yellow}[WARN]${this.colours.reset} ${text}`)
  }

  error (text) {
    return console.log(`[${this.getCurrentTime()}] ${this.colours.red}[ERROR]${this.colours.reset} ${text}`)
  }

  getCurrentTime () {
    const date = new Date()
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }
}
