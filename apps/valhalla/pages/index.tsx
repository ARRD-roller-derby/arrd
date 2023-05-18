import { Button } from 'ui'
import { useSession, signIn } from 'next-auth/react'
import { Message } from 'message'
import { MongoDb } from 'database/src'

export default function Web() {
  const { data: session } = useSession()
  console.log('SESSION', session)
  return (
    <div>
      <h1>Web</h1>
      <button onClick={() => signIn()}>Sign in</button>
      <Message />
      <Button />
    </div>
  )
}

//TODO faire comme pour Njord pour importer la connexion, passer en cookie l'id et les
//TODO créer un middleware qui ne soit pas du edge
export async function getServerSideProps() {
  await MongoDb()

  return {
    props: {
      name: 'Web',
    },
  }
}
