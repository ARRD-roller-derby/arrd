import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { Index } from '../pages_related/index'

export default function IndexPage() {
  return <Index />
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { session } }
}
