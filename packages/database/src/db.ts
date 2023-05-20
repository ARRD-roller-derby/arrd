import mongoose from 'mongoose'

const uri = () => {
  if (process.env.NODE_ENV === 'test') {
    return ''
  }
  if (process.env.NODE_ENV === 'development') {
    return process.env.MONGO_URI_DEV || ''
  }
  return process.env.MONGO_URI || ''
}

const connectMongo = async () => mongoose.connect(uri())

declare global {
  var MongoDb: any | undefined
  var mongo: any | undefined
}

export const MongoDb = global.mongo || connectMongo
export const MONGO_URI = uri()

if (process.env.NODE_ENV !== 'production') MongoDb.mongo = connectMongo
