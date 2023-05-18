import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import NProgress from 'nprogress'
import { Router } from 'next/router'
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ showSpinner: false })

interface AppProps {
  Component: any
  pageProps: {
    session: Session
    [key: string]: any
  }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
