import type { GetServerSidePropsContext } from 'next'
import { getProviders } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'
import dynamic from 'next/dynamic'

const Login = dynamic(
  () => import('../pages_related/login/login').then((comp) => comp.Login),
  {
    ssr: false,
  }
)
export default function LoginPage() {
  return <Login />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (session) {
    return { redirect: { destination: '/' } }
  }
  const providers = await getProviders()

  return {
    props: { providers: providers ?? [] },
  }
}
