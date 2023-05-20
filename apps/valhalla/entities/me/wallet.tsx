import { useMe } from './me'
import { Wallet } from 'ui'

export const MyWallet: React.FC = () => {
  const { me } = useMe()
  return <Wallet num={me?.wallet} />
}
