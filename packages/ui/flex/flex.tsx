import { FC, ReactNode } from 'react'
import styles from './flex.module.css'

interface FlexProps {
  children: ReactNode
  center?: boolean
  reverse?: boolean
  wrap?: boolean
  spaceBetween?: boolean
  smallGap?: boolean
  alignItemCenter?: boolean
}
export const Flex: FC<FlexProps> = (props) => (
  <div
    className={`${styles.flex} ${Object.keys(props)
      .filter((className) => props[className as keyof FlexProps])
      .map((className) => styles[className])
      .join(' ')}`}
  >
    {props.children}
  </div>
)
