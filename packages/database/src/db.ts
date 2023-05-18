import { connection, connect } from 'mongoose'
export const MONGO_URI = process.env.MONGO_URI || ''
export const MONGO_URI_NJORD = process.env.MONGO_URI_NJORD || ''

export async function MongoDb() {
  if (connection) await connection.close()
  await connect(MONGO_URI, {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  })

  console.log('🚀 Base MIDGARD connectée')
}

export async function NjordDb() {
  if (connection) await connection.close()
  await connect(MONGO_URI_NJORD, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  console.log('🚀 Base NJORD connectée')
}
