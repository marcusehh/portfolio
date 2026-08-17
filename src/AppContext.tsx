import { createContext, useContext } from 'react'

export type PageId = 'home' | 'about' | 'blog' | 'projects'

interface AppContextValue {
  openPost: number | null
  setOpenPost: (index: number | null) => void
  goto: (page: PageId, opts?: { openPost?: number }) => void
}

export const AppContext = createContext<AppContextValue>({
  openPost: null,
  setOpenPost: () => {},
  goto: () => {},
})

export const useAppContext = () => useContext(AppContext)
