import { getSession } from 'next-auth/react'
import { Button } from 'ui'
import { useSession, signIn } from 'next-auth/react'
import { Message } from 'message'
import { GetServerSidePropsContext } from 'next'

export default function Web() {
  const { data: session } = useSession()
  console.log('SESSION', session?.user.nickname)
  return (
    <div>
      <h1>Ceci est juste une page de Test</h1>
      <button onClick={() => signIn()}>Sign in</button>
      <Message />
      <Button />
    </div>
  )
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { session } }
}
