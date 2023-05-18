import * as mongoose from 'mongoose'
import { MONGO_URI } from '../db'

const connectMongo = async () =>
  await mongoose.connect(MONGO_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })

declare global {
  var MongoDb: any | undefined
  var mongo: any | undefined
}

export const MongoDb = global.mongo || connectMongo

if (process.env.NODE_ENV !== 'production') MongoDb.mongo = connectMongo
