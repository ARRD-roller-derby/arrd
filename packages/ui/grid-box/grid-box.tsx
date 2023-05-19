import { FC, ReactNode } from 'react'
import styles from './grid-box.module.css'

interface GridBoxProps {
  children: ReactNode
}

export const GridBox: FC<GridBoxProps> = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.box}>{children}</div>
  </div>
)
