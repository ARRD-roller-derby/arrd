import { IAccountModel } from './interfaces/account.interface'
import { IUserModel } from './interfaces/user.interface'

declare module '.' {
  export const Account: IAccountModel
  export const User: IUserModel
}
