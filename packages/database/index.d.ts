import { IAccountModel } from './interfaces/account.interface'
import { IUserModel } from './interfaces/user.interface'
import { IEventModel } from './interfaces/event.interface'

declare module '.' {
  export const Account: IAccountModel
  export const User: IUserModel
  export const Event: IEventModel
  export const eventTypes: string[]
}
