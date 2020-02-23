import { Collection } from 'discord.js'

export default class Cache extends Collection {
  constructor (client) {
    super()
    this.client = client
    this.collection = null
  }

  async add (entity) {
    if (!this.has(entity.id)) {
      let doc = await this.collection.insertOne(entity)
      this.client.log.info(`[Database] inserted ${doc}`)
      this.set(entity.id, entity)
    }
  }

  async update (entity) {
    console.log("gpomg")
    new Promise((resolve, reject) => {
      if (!this.has(entity.id)) {
        this.client.log.warn(`[Cache] The cache didn't contain an entity with the id ${entity.id}! Inserting ...`)
        this.add(entity)
        reject(false)
      }
      console.log("adsfs")
      Object.keys(entity).reduce((diff, key) => {
        console.log(entity)
        if (entity[key] === this.get(entity.id)[key]) return undefined
        this.client.log.info(`[Info] diffs ${diff}`)
        this.client.log.info(`[Info] keys ${entity[key]}`)
        console.log(key)
        console.log({ id: entity.id }, { $set: { [key]: entity[key] } }, { upsert: true })
        this.collection.updateOne({ id: entity.id }, { $set: { [key]: entity[key] } }, { upsert: true })
        this.set(entity.id, entity[key])
        resolve(true)
      })
    })
  }

  async initialise (collection) {
    this.collection = collection
    await this.collection.find({}).forEach(ent => {
      this.set(ent.id, ent)
    })
  }
}
