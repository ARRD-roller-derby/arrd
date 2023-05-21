import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

const Calendar = dynamic(
  () =>
    import('../pages_related/calendar/calendar').then((comp) => comp.Calendar),
  {
    ssr: false,
  }
)

export default function CalendarPage() {
  return <Calendar />
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { session } }
}
