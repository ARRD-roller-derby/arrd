import { ReactNode, useContext } from 'react'
import { createContext } from 'react'
import { IEvent } from 'database/interfaces/event.interface'
import { create } from 'zustand'
import { ObjectId } from 'mongodb'

// ROUTES -------------------------------------------------------------------

export enum EventRoutes {
  event = 'user/event',
}

// INTERFACES ---------------------------------------------------------------
interface IEventStore {
  events: IEvent[]
  setEvents: (events: IEvent[]) => void
}

interface EventProviderProps {
  children: ReactNode
  event: IEvent
}

// STORE ---------------------------------------------------------------

export const useEvents = create<IEventStore>((set) => ({
  events: [],
  setEvents: (events: IEvent[]) => set({ events }),
}))

// CONTEXT ------------------------------------------------------------------

const EventContext = createContext<IEvent>({
  _id: new ObjectId(''),
  title: '',
  text: '',
  start: new Date(),
  end: new Date(),
  visibility: 'league',
  cancel: false,
  recurrenceId: '',
  type: 'match',
  attendees: [],
  createdAt: new Date(),
  updatedAt: new Date(),
})

// PROVIDER -----------------------------------------------------------------

export const EventProvider: React.FC<EventProviderProps> = ({
  children,
  event,
}) => {
  return <EventContext.Provider value={event}>{children}</EventContext.Provider>
}

// HOOKS -------------------------------------------------------------------
export const useEvent = () => {
  return useContext(EventContext)
}
