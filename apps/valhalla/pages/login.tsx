import { Button } from 'ui'
import { Message } from 'message'
import { signIn } from 'next-auth/react'

export default function Login() {
  return (
    <div>
      <h1>Web</h1>
      <button onClick={() => signIn()}>Sign in</button>
      <Message />
      <Button />
    </div>
  )
}
