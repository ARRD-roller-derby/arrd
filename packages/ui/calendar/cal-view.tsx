import dayjs from 'dayjs'
import styles from './cal-view.module.css'
import { CalDayInterface, useCalendar } from './calendar'

interface CalViewProps {
  isMobile?: boolean
}

export const CalView: React.FC<CalViewProps> = ({ isMobile }) => {
  const { nextMonth, previousMonth, currentPage, calendar } = useCalendar()
  //Remettre isMobile

  //TODO les views des jours, détacher la logique hors Calendrier
  // Le bouton de creation et la modale viennent de l'app
  return (
    <div className={styles.container} data-ismobile={isMobile}>
      <h1 className={styles.title}>Remettre le mois avec currentPage</h1>
      <div className={styles.calendar} data-ismobile={isMobile}>
        {[
          'lundi',
          'mardi',
          'mercredi',
          'jeudi',
          'vendredi',
          'samedi',
          'dimanche',
        ].map((day) => (
          <div className={styles.header} key={day}>
            {isMobile ? day.slice(0, 3) + '.' : day}
          </div>
        ))}
        {calendar.map((day: CalDayInterface) => (
          <p key={day.date}>{dayjs(day.date).format('DD')}</p>
        ))}
      </div>

      <div className={styles.buttons}>
        <button onClick={() => previousMonth()}>précedent</button>
        Bouton +<button onClick={() => nextMonth()}>suivant</button>
      </div>
    </div>
  )
}
