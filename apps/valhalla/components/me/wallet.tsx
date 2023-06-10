import { useSession } from 'next-auth/react'
import { Wallet } from 'ui'

export const MyWallet: React.FC = () => {
  const { data: session } = useSession()
  return <Wallet num={session?.user.wallet} />
}
