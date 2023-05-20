import styles from './page-layout.module.css'
import { GridBox } from '../../../../packages/ui/grid-box/grid-box'
import Link from 'next/link'
import { MyAvatar } from '../../entities/me/avatar'
import { MeProvider } from '../../entities/me/me'

interface PageLayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Link href="/">Valhalla</Link>
        </div>
        <div className={styles.title}>
          <MyAvatar />
        </div>
      </div>
      <GridBox>{children}</GridBox>
    </div>
  )
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => (
  <MeProvider>
    <Layout>{children}</Layout>
  </MeProvider>
)
