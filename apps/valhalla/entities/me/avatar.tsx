import { useMe } from './me'
import { ImgBubble } from 'ui'
import { useSession } from 'next-auth/react'

export const MyAvatar: React.FC = () => {
  const { data: session } = useSession()
  const { me } = useMe()

  if (!session?.user)
    return <ImgBubble alt="avatar" src="static/images/profile.webp" />
  return <ImgBubble alt={session.user.nickname} src={session.user.image} />
}
