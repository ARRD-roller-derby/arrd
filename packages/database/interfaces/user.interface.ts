export interface IUser {
  _id: string
  discordId: string
  wallet: number
  name: string
  derbyName: string
  numRoster: number
  mst: boolean
  msp: boolean
  dailyContestAvgTime: number
  dailyContestAvgAccuracy: number
  roles: string[]
}
