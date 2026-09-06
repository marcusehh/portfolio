import { createContext, useContext } from 'react'

export type PageId = 'home' | 'about' | 'blog' | 'projects'

interface AppContextValue {
  openPost: number | null
  setOpenPost: (index: number | null) => void
  scrollTo: string | null
  goto: (page: PageId, opts?: { openPost?: number; scrollTo?: string }) => void
}

export const AppContext = createContext<AppContextValue>({
  openPost: null,
  setOpenPost: () => {},
  scrollTo: null,
  goto: () => {},
})

export const useAppContext = () => useContext(AppContext)
