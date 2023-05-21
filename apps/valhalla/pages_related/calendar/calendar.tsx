import { PageLayout } from '../../layout/page-layout/page-layout'
import { CalView, CalendarProvider } from 'ui'

export const Calendar: React.FC = () => {
  return (
    <PageLayout>
      <CalendarProvider events={[]}>
        <CalView />
      </CalendarProvider>
    </PageLayout>
  )
}
