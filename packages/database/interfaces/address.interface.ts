import { ObjectId } from 'mongodb'

export const addressType = ['personnel', 'stade', 'autre'] as const

export interface IAddress {
  _id: ObjectId
  ownerId: string
  lat: number
  lon: number
  city: string
  zipCode: string
  address?: string
  street: string
  label: string
  type: (typeof addressType)[number]
  updatedAt: Date
}
