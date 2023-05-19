import { useSession } from 'next-auth/react'
import { PageLayout } from '../../layout/page-layout/page-layout'
import { Message } from 'message'
import { Button } from 'ui'
import { useFetch } from 'fetcher'

export const Index: React.FC = () => {
  const { data: session } = useSession()
  const { data } = useFetch({
    url: 'hello',
  })
  console.log('SESSION', session?.user.nickname, data)

  return (
    <PageLayout>
      <h1>Index</h1>
      <Message />
      <Button />
    </PageLayout>
  )
}
