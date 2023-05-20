import { useMe } from './me'
import { ImgBubble } from '../../../../packages/ui/img-bubble/img-bubble'
import { useSession } from 'next-auth/react'

export const MyAvatar: React.FC = () => {
  const { data: session } = useSession()
  const { me } = useMe()

  console.log(me)

  if (!session?.user)
    return <ImgBubble alt="avatar" src="static/images/profile.webp" />
  return <ImgBubble alt={session.user.nickname} src={session.user.image} />
}
