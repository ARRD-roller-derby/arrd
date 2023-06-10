export interface ISponsor {
  _id: string
  name: string
  description: string
  logo: string
  link: string
  users: {
    name: string
    id: string
  }[]
  updatedAt: Date
}
