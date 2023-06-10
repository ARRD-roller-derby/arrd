import styles from './calendar.module.css'
import { PageLayout } from '../../layout/page-layout/page-layout'
import { Calendar as RsSuiteCal } from 'ui'
import { EventCreateForm } from '../../components/event/event-create-form/event-create-form'

export const Calendar: React.FC = () => {
  return (
    <PageLayout>
      <div className={styles.container}>
        <EventCreateForm />
        <RsSuiteCal />
      </div>
    </PageLayout>
  )
}
