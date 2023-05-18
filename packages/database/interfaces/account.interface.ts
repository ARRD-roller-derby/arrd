import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

export interface IAccount {
  provider: string
  type: string
  providerAccountId: string
  access_token: string
  expires_at: Date
  refresh_token: string
  token_type: string
  userId: ObjectId
  expires: Date
}

export interface IAccountModel
  extends mongoose.Model<IAccount & mongoose.Document> {}
