import { ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { TEntity } from '../../types/entity.type'
import { IUser } from 'database/interfaces/user.interface'
import { useFetch } from 'fetcher'
import { useSession } from 'next-auth/react'

// INTERFACES ---------------------------------------------------------------
interface MeProviderProps {
  children: ReactNode
}

// CONTEXT ------------------------------------------------------------------

export const MeContext = createContext<TEntity<IUser | null>>([null, () => {}])

// PROVIDER -----------------------------------------------------------------

export const MeProvider: React.FC<MeProviderProps> = ({ children }) => {
  const value = useState<IUser | null>(null)

  return <MeContext.Provider value={value}>{children}</MeContext.Provider>
}

// ROUTES -------------------------------------------------------------------

export enum MeRoutes {
  me = 'user/me',
}

// HOOKS --------------------------------------------------------------------
export function useMe() {
  const { data: session } = useSession()
  const context = useContext(MeContext)
  const [me, setUser] = context
  const { get } = useFetch<IUser>({
    url: MeRoutes.me,
    callback: setUser,
    lazy: true,
  })

  useEffect(() => {
    if (session?.user) get()
  }, [session])

  if (context === undefined)
    throw new Error('useMe fonctionne avec son contexte MeContext')

  return {
    me,
    getMe: get,
  }
}
