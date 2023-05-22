import { useFetch } from 'fetcher'
import { PageLayout } from '../../layout/page-layout/page-layout'
import { Calendar as RsSuiteCal } from 'ui'

export const Calendar: React.FC = () => {
  return (
    <PageLayout>
      <RsSuiteCal />
    </PageLayout>
  )
}
