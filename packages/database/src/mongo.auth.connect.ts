import { MongoClient } from 'mongodb'
import { MONGO_URI } from './db'

declare global {
  var _mongoClientPromise: any | undefined
}

const uri = MONGO_URI

let client: any, clientPromise: any

if (!process.env.MONGO_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise as any) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}
export default clientPromise
