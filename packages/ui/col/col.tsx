import { FC, ReactNode } from 'react'
import styles from './col.module.css'

interface ColProps {
  children: ReactNode
  center?: boolean
  reverse?: boolean
  smallGap?: boolean
  left?: boolean
  right?: boolean
  padding?: boolean
  ref?: any
  spaceBetween?: boolean
  fullHeight?: boolean
  middle?: boolean
}

export const Col: FC<ColProps> = (props) => (
  <div
    ref={props?.ref}
    className={`${styles.col} ${Object.keys(props)
      .filter((className) => props[className as keyof ColProps])
      .map((className) => styles[className])
      .join(' ')}`}
  >
    {props.children}
  </div>
)
