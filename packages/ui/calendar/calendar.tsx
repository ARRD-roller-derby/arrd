import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import dayjs from 'dayjs'

// INTERFACES ---------------------------------------------------------------
interface CalendarProviderProps {
  children: ReactNode
  events: IEvent[]
}

interface IEvent {
  id: string
  title: string
  start: string
  end: string
  allDay: boolean
  description: string
}

interface ICalendarContext {
  currentPage: ICurrentPage
  setCurrentPage: Dispatch<SetStateAction<ICurrentPage>>
  between: string[]
  setBetween: Dispatch<SetStateAction<string[]>>
  events: IEvent[]
  calendar: CalDayInterface[]
  setCalendar: Dispatch<SetStateAction<CalDayInterface[]>>
}

interface CalendarProps {
  setBetween: (between: string[]) => void
  events: IEvent[]
}

interface ICurrentPage {
  year: number
  month: number
}

export interface CalDayInterface {
  date: any
  month: number
  day: number
  events: IEvent[]
}

// CONTEXT ------------------------------------------------------------------

export const CalendarContext = createContext<ICalendarContext | null>(null)

// PROVIDER -----------------------------------------------------------------

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
  events,
}) => {
  const currentPageState = useState({
    year: dayjs().year(),
    month: dayjs().month(),
  })
  const betweenState = useState<string[]>([])
  const [cal, setCal] = useState<CalDayInterface[]>([])

  return (
    <CalendarContext.Provider
      value={{
        currentPage: currentPageState[0],
        setCurrentPage: currentPageState[1],
        between: betweenState[0],
        setBetween: betweenState[1],
        events,
        calendar: cal,
        setCalendar: setCal,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

// HOOKS --------------------------------------------------------------------
export function useCalendar() {
  const context = useContext(CalendarContext)
  if (!context)
    throw new Error('useCalendar fonctionne avec son contexte CalendarContext')

  const {
    currentPage,
    setCurrentPage,
    setBetween,
    events,
    calendar,
    setCalendar,
  } = context

  function createCalendar() {
    //for breaking change year
    if (currentPage.year === 0) {
      setCurrentPage({
        ...currentPage,
        year: dayjs().year(),
      })
    }

    const thisMonth = dayjs()
        .set('year', currentPage.year)
        .month(currentPage.month ?? dayjs(dayjs().format('MM'))),
      firstDay = dayjs(thisMonth).startOf('month'),
      lastDay = dayjs(thisMonth).endOf('month'),
      firstCalDay = firstDay.subtract(firstDay.day() - 1, 'day'),
      lastCalDay = lastDay.add(
        lastDay.day() === 0 ? 0 : 7 - lastDay.day(),
        'day'
      ),
      numOfDay = lastCalDay.diff(firstCalDay, 'day'),
      generateCal = []

    setBetween([firstCalDay.toISOString(), lastCalDay.toISOString()])

    for (let i = 0; i < numOfDay + 1; i++) {
      const day = firstCalDay.add(i, 'day')
      generateCal.push({
        date: day,
        month: day.month(),
        day: day.day(),
        events: [],
      })
    }

    //sometimes, one day add
    setCalendar(generateCal.slice(0, 35))
  }

  function nextMonth() {
    const next = currentPage.month + 1
    if (next >= 12) {
      setCurrentPage({
        year: currentPage.year + 1,
        month: 0,
      })
    } else {
      setCurrentPage({
        ...currentPage,
        month: next,
      })
    }
  }

  function previousMonth() {
    const previous = currentPage.month - 1
    if (previous < 0) {
      setCurrentPage({
        year: currentPage.year - 1,
        month: 11,
      })
    } else {
      setCurrentPage({
        ...currentPage,
        month: previous,
      })
    }
  }
  useEffect(() => {
    createCalendar()
  }, [currentPage])

  useEffect(() => {
    if (events) {
      setCalendar((prev) =>
        prev.map((day) => ({
          ...day,
          events: events.filter(
            (event) =>
              dayjs(event.start).format('DD-MM-YY') ===
              day.date.format('DD-MM-YY')
          ),
        }))
      )
    }
  }, [events])
  return {
    calendar,
    nextMonth,
    previousMonth,
    currentPage,
  }
}
