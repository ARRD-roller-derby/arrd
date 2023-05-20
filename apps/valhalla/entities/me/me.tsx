import { ReactNode, useContext, useState } from 'react'
import { createContext } from 'react'
import { TEntity } from '../../types/entity.type'
import { IUser } from '../../../../packages/database/interfaces/user.interface'
import { useFetch } from 'fetcher'

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
  const context = useContext(MeContext)
  const [me, setUser] = context
  const { get } = useFetch<IUser>({
    url: MeRoutes.me,
    callback: setUser,
  })

  if (context === undefined)
    throw new Error('useMe fonctionne avec son contexte MeContext')

  return {
    me,
    getMe: get,
  }
}
