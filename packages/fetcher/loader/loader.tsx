import styles from './loader.module.css'
import { ReactNode, useState, createContext } from 'react'

// INTERFACES ---------------------------------------------------------------
interface LoaderProps {
  children: ReactNode
}

// CONTEXT ------------------------------------------------------------------
export const LoaderContext = createContext<[boolean, (value: boolean) => void]>(
  [false, (_value: boolean) => {}]
)

// PROVIDER -----------------------------------------------------------------
export const MiniLoaderProvider: React.FC<LoaderProps> = ({ children }) => {
  const ctx = useState<boolean>(false)

  return (
    <LoaderContext.Provider value={ctx}>
      {ctx[0] && <Loader />}
      {children}
    </LoaderContext.Provider>
  )
}

// VIEW -----------------------------------------------------------------
export const Loader = () => (
  <div className={styles.container}>
    <div className={styles['lds-ring']}>
      {Array.from(Array(3).keys()).map((num) => (
        <div key={num} />
      ))}
    </div>
  </div>
)
