import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react'
import styles from './toast.module.css'
// INTERFACES ---------------------------------------------------------------
interface ToastProviderProps {
  children: ReactNode
}

type IMessage = ReactNode | string | null

type ToastType = 'info' | 'success' | 'error' | 'warning' | 'invisible'

// CONTEXT ------------------------------------------------------------------
const ToastContext = createContext({
  error: (_message: ReactNode | string) => {},
  info: (_message: ReactNode | string) => {},
  warning: (_message: ReactNode | string) => {},
})

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const toastTime = 5000
  const [toast, setToast] = useState<{
    message: IMessage
    type: ToastType
  }>({ message: null, type: 'invisible' })

  const timerIdRef = useRef<any | null>(null)
  const startRef = useRef<number>(0)
  const toastRef = useRef<{ message: IMessage; type: ToastType }>({
    message: null,
    type: 'invisible',
  })

  useEffect(() => {
    const onFocus = () => {
      if (toastRef.current.message !== null) {
        const elapsed = Date.now() - startRef.current
        const remaining = Math.max(toastTime - elapsed, 0)
        timerIdRef.current = setTimeout(() => {
          setToast({ message: null, type: 'invisible' })
        }, remaining + 1000)
      }
    }

    const onBlur = () => {
      if (timerIdRef.current !== null) {
        clearTimeout(timerIdRef.current)
      }
    }

    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  const addToast = (message: IMessage, type: ToastType = 'info') => {
    startRef.current = Date.now()
    setToast({ message, type })
    toastRef.current = { message, type }
    if (timerIdRef.current !== null) {
      clearTimeout(timerIdRef.current)
    }
    timerIdRef.current = setTimeout(() => {
      setToast({ message: null, type: 'invisible' })
      toastRef.current = { message: null, type: 'invisible' }
    }, toastTime)
  }

  const clearToast = () => {
    if (timerIdRef.current !== null) {
      clearTimeout(timerIdRef.current)
    }
    setToast({ message: null, type: 'invisible' })
    toastRef.current = { message: null, type: 'invisible' }
  }

  return (
    <ToastContext.Provider
      value={{
        error: (message: IMessage) => addToast(message, 'error'),
        info: (message: IMessage) => addToast(message, 'info'),
        warning: (message: IMessage) => addToast(message, 'warning'),
      }}
    >
      {children}
      <div
        onClick={clearToast}
        className={styles.toast}
        data-visible={toast.type !== 'invisible'}
        data-type={toast.type}
      >
        {toast.message}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined)
    throw new Error('useToast fonctionne avec son contexte ToastProvider')
  return context
}
