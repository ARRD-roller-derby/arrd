import { Button } from 'ui'
import { useSession, signIn } from 'next-auth/react'
import { Message } from 'message'

export default function Web() {
  const { data: session } = useSession()
  console.log('SESSION', session)
  return (
    <div>
      <h1>Ceci est juste une page de Test</h1>
      <button onClick={() => signIn()}>Sign in</button>
      <Message />
      <Button />
    </div>
  )
}
