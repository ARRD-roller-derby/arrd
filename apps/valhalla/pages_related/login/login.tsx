import { signIn } from 'next-auth/react'
import { Flex } from '../../../../packages/ui/flex/flex'
import styles from './login.module.css'
import { DiscordButton } from '../../../../packages/ui/buttons/discord-button/discord-button'
import Image from 'next/image'

export const Login: React.FC = () => {
  const handleSignIn = () => {
    signIn('discord')
  }
  return (
    <div className={styles.container}>
      <Image
        src="/static/images/valhalla.svg"
        alt="logo arrd"
        width={75}
        height={75}
        className={styles.logo}
      />
      <h1>Valhalla</h1>
      <Flex>
        <DiscordButton onClick={handleSignIn} />
      </Flex>
    </div>
  )
}
