import { MongoClient } from 'mongodb'
import colEnt from './colEnt'

export default class Database extends MongoClient {
  constructor(client) {
    super(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true })
    this.client = client
    this.client.log.info('Database connected')
  }

  async initialise() {
    const collections = await this.db().collections()
    colEnt.forEach(async (col, key) => {
      if (!col.name.includes(collections.map(c => c.s.name))) return
      try {
        this.db().createCollection(col.name, col.schema)
        this.client.log.info(`Created collection ${col.name}`)
      } catch (err) {
        this.client.log.error(`The was an error creating collection ${col.name} ${err}`)
      }
    })
  }
}
