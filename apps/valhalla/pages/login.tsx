import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { getSession } from 'next-auth/react'

const Login = dynamic(
  () => import('../pages_related/login/login').then((comp) => comp.Login),
  {
    ssr: false,
  }
)
export default function LoginPage() {
  return <Login />
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getSession({ req })
  return session
    ? {
        redirect: { destination: '/' },
      }
    : { props: {} }
}
