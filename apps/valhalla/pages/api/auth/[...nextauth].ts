import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_TOKEN,
  DISCORD_GUILD_ID,
} from '../../../utils/constants'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from 'database/src/mongo.auth.connect'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import { Account } from 'database'
import { MongoDb } from 'database/src'
import { ObjectId } from 'mongodb'

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session(session: any) {
      const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)

      await MongoDb()
      const userId = new ObjectId(session.user.id)
      const user = await Account.findOne({
        userId,
      })

      if (!user) return session

      const guildRoles: any = await rest.get(
        Routes.guildRoles(DISCORD_GUILD_ID)
      )
      const member: any = await rest.get(
        Routes.guildMember(DISCORD_GUILD_ID, user.providerAccountId)
      )
      const roles = guildRoles
        .filter((role: { id: string }) => member.roles.includes(role.id))
        .map((role: any) => ({
          id: role.id,
          name: role.name,
          color: role.color,
        }))
      session.user = {
        ...session.user,
        roles,
        nickname: member.nick,
      }
      return session
    },
  },
}
export default NextAuth(authOptions)
