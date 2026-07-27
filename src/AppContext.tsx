import { createContext, useContext } from 'react'

export type PageId = 'home' | 'about' | 'posts' | 'projects'

interface AppContextValue {
  openPost: number | null
  setOpenPost: (index: number | null) => void
  goto: (page: PageId, opts?: { openPost?: number }) => void
  performanceMode: boolean
}

export const AppContext = createContext<AppContextValue>({
  openPost: null,
  setOpenPost: () => {},
  goto: () => {},
  performanceMode: false,
})

export const useAppContext = () => useContext(AppContext)
