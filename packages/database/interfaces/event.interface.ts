import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import { IAddress } from './address.interface'
import { ISponsor } from './sponsor.interface'

export const eventTypesKeys = [
  'entraînement',
  'match',
  'AG',
  'scrimmage',
  'en ligne',
  'autre',
  'bootcamp',
] as const

export const presenceTypesKeys = [
  'patins',
  'SO',
  'NSO',
  'coach',
  'support',
  'bench',
  'line-up',
] as const

export interface IEvent {
  _id: ObjectId
  title?: string
  text: string
  start: Date
  end: Date
  visibility: 'league' | 'public'
  cancel: boolean
  recurrenceId?: string
  type: (typeof eventTypesKeys)[number]
  address?: IAddress
  attendees: IAttendeesEvent[]
  createdAt: Date
  updatedAt: Date
  versus?: [string, string]
  sponsor?: ISponsor
}

export interface IAttendeesEvent {
  userId: string
  type: (typeof presenceTypesKeys)[number]
  guestsNum: number
  updatedAt: Date
  isPresent: boolean
}

export interface IEventModel
  extends mongoose.Model<IEvent & mongoose.Document> {}
