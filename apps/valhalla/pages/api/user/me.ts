process.env['TZ'] = 'Europe/Paris'
import { MongoDb } from 'database/src'
import { User } from 'database'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function me(
  req: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session?.user)
    return response.status(401).json({
      message: "Vous n'êtes pas connecté",
    })
  await MongoDb()
  const user = await User.findById(session.user.id)

  if (!user)
    return response.status(404).json({
      message: 'Utilisateur introuvable',
    })
  return response.status(200).json(user.toObject())
}
