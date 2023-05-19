import styles from './page-layout.module.css'
import { GridBox } from '../../../../packages/ui/grid-box/grid-box'
import Link from 'next/link'

interface PageLayoutProps {
  children: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Link href="/">Valhalla</Link>
        </div>
      </div>
      <GridBox>{children}</GridBox>
    </div>
  )
}
