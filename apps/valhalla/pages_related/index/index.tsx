import { PageLayout } from '../../layout/page-layout/page-layout'
import { Message } from 'message'
import { Button } from 'ui'

export const Index: React.FC = () => {
  return (
    <PageLayout>
      <h1>Index</h1>
      <Message />
      <Button />
    </PageLayout>
  )
}
