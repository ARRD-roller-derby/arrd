import NextAuth from 'next-auth'
import { IRole } from './role.interface'

declare module 'next-auth' {
  // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image: string
      emailVerified: string
      roles: IRole[]
      nickname: string
      wallet: number
    }
  }
}
