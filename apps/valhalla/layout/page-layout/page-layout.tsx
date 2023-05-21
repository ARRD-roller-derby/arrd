import styles from './page-layout.module.css'
import { GridBox } from 'ui/grid-box/grid-box'
import Link from 'next/link'
import { MyAvatar } from '../../entities/me/avatar'
import { MeProvider } from '../../entities/me/me'
import { MyWallet } from '../../entities/me/wallet'
import { useEffect, useState } from 'react'
import { useIsMobile } from '../../hooks/is-mobile'
import { Hamburger } from '../../../../packages/ui/icons/hamburger/hamburger'
import { Col, MenuLink, MenuShortcut, ValhallaLink } from 'ui'
import { useRouter } from 'next/router'

interface PageLayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<PageLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const { pathname } = useRouter()

  return (
    <div className={styles.layout} data-open={open}>
      {isMobile && (
        <div className={styles.menu}>
          <Col fullHeight={isMobile} middle={isMobile}>
            <Col>
              {ValhallaLink.map((link) => (
                <div
                  key={link.href}
                  onClick={() => setOpen(false)}
                  className={styles.link}
                  data-current={
                    link.href === '/'
                      ? pathname === link.href
                      : !!pathname.includes(link.href)
                  }
                >
                  <Link href={link.href}>
                    <MenuLink label={link.label} icon={link.icon} />
                  </Link>
                </div>
              ))}
            </Col>
          </Col>

          <div onClick={() => setOpen(false)} className={styles.hamburger}>
            <Hamburger close={true} />
          </div>
        </div>
      )}
      <div
        className={styles.container}
        data-open={open}
        onClick={() => {
          if (open) {
            setOpen(false)
          }
        }}
      >
        {isMobile ? (
          <div className={styles.menuBar}>
            <div className={styles.menuBarIcon}>
              <Hamburger onClick={() => setOpen(true)} />
            </div>

            {ValhallaLink.map((link) => (
              <div className={styles.menuBarIcon} key={link.label}>
                <Link href={link.href}>
                  <MenuShortcut icon={link.icon} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.menuDesktop}>
            <Col>
              {ValhallaLink.map((link) => (
                <div
                  className={styles.link}
                  key={link.href}
                  data-current={
                    link.href === '/'
                      ? pathname === link.href
                      : !!pathname.includes(link.href)
                  }
                >
                  <Link href={link.href}>
                    <MenuLink label={link.label} icon={link.icon} />
                  </Link>
                </div>
              ))}
            </Col>
          </div>
        )}
        <div className={styles.header}>
          <div className={styles.title}>
            <div className={styles.logo}>
              <Link href="/">
                <img src="/static/images/valhalla.svg" alt="Valhalla" />
              </Link>
            </div>
            <Link href="/">Valhalla</Link>
          </div>
          <div className={styles.title}>
            <MyWallet />
            <MyAvatar />
          </div>
        </div>
        <div className={styles.main}>
          <GridBox>{children}</GridBox>
        </div>
      </div>
    </div>
  )
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => (
  <MeProvider>
    <Layout>{children}</Layout>
  </MeProvider>
)
