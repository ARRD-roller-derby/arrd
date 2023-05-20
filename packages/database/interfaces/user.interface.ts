import mongoose from 'mongoose'
export interface IUser {
  _id: string
  providerAccountId: string
  wallet: number
  name: string
  derbyName: string
  numRoster: number
  mst: boolean
  msp: boolean
  dailyContestAvgTime: number
  dailyContestAvgAccuracy: number
}

export interface IUserModel extends mongoose.Model<IUser & mongoose.Document> {}
