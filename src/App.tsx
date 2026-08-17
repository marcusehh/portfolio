import { useState, useRef, useEffect, useCallback } from 'react'
import { AppContext, type PageId } from './AppContext'
import { CONTACT_LINKS } from './data/contact'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Projects from './pages/Projects'

const PAGES: PageId[] = ['home', 'about', 'blog', 'projects']

const PAGE_COMPONENTS: Record<PageId, React.ComponentType> = {
  home: Home,
  about: About,
  blog: Blog,
  projects: Projects,
}

const RETURN_MS = 500
const CYCLE_MS = 600
const FLY_MS = 500
const EASE = 'cubic-bezier(.4,0,.2,1)'

type AnimState = 'idle' | 'returning' | 'cycling' | 'flying'
type FlyBtn = { label: string; position: 'docked' | 'header' } | null

const TYPE_MS = 15
const ERASE_MS = 5

function ContactMenu() {
  const [expanded, setExpanded] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const total = CONTACT_LINKS.reduce((n, l) => n + l.label.length, 0)

  useEffect(() => {
    if (expanded) {
      if (charCount < total) {
        const t = window.setTimeout(() => setCharCount((c) => c + 1), TYPE_MS)
        return () => clearTimeout(t)
      }
    } else {
      if (charCount > 0) {
        const t = window.setTimeout(() => setCharCount((c) => c - 1), ERASE_MS)
        return () => clearTimeout(t)
      }
    }
  }, [expanded, charCount, total])

  const items: React.ReactNode[] = []
  let offset = 0
  for (const link of CONTACT_LINKS) {
    const len = link.label.length
    if (charCount > offset) {
      const visible = Math.min(charCount - offset, len)
      const text = link.label.slice(0, visible)
      items.push(
        <div key={link.label} className="contact-menu__item">
          {charCount === total ? (
            <a className="tag" href={link.url} target="_blank" rel="noreferrer">
              {text}
            </a>
          ) : (
            <span className="contact-menu__typing">{text}</span>
          )}
        </div>
      )
    }
    offset += len
  }

  return (
    <div
      className="contact-menu"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <a className="tag contact-menu__main" href="mailto:marcusejhawkins@gmail.com">
        Contact
      </a>
      {charCount > 0 && <div className="contact-menu__dropdown">{items}</div>}
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <ContactMenu />
      <div className="footer__col footer__copy">
        <span>© {new Date().getFullYear()} Marcus EJ Hawkins</span>
      </div>
    </footer>
  )
}

function ContentPage({ id }: { id: PageId }) {
  const Component = PAGE_COMPONENTS[id]
  return (
    <div className="content-page">
      <div className="content">
        <div className="page">
          <Component />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [pages, setPages] = useState<PageId[]>([...PAGES])
  const [activePage, setActivePage] = useState<PageId>('home')
  const [prevPage, setPrevPage] = useState<PageId | null>(null)
  const [cycleOffset, setCycleOffset] = useState(0)
  const [animState, setAnimState] = useState<AnimState>('idle')
  const [flyBtn, setFlyBtn] = useState<FlyBtn>({ label: 'home', position: 'header' })
  const [openPost, setOpenPost] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }, [])

  const navigate = useCallback(
    (target: PageId) => {
      if (animState !== 'idle' || target === activePage) return
      const idx = pages.indexOf(target)
      if (idx === 0) return

      setFlyBtn({ label: activePage, position: 'docked' })
      setAnimState('returning')

      after(RETURN_MS, () => {
        setFlyBtn(null)
        setCycleOffset(idx)
        setPrevPage(target)
        setAnimState('cycling')

        after(CYCLE_MS, () => {
          setPages((p) => [...p.slice(idx), ...p.slice(0, idx)])
          setCycleOffset(0)
          setActivePage(target)
          setPrevPage(null)
          setFlyBtn({ label: target, position: 'docked' })
          setAnimState('flying')
          requestAnimationFrame(() =>
            requestAnimationFrame(() =>
              setFlyBtn({ label: target, position: 'header' })
            )
          )
          after(FLY_MS, () => setAnimState('idle'))
        })
      })
    },
    [animState, activePage, pages, after]
  )

  const goto = useCallback(
    (page: PageId, opts?: { openPost?: number }) => {
      if (opts?.openPost !== undefined) setOpenPost(opts.openPost)
      navigate(page)
    },
    [navigate]
  )

  const isCycling = animState === 'cycling'
  const trackTransform = isCycling ? 'translateY(-100%)' : 'translateY(0)'
  const trackTransition = isCycling ? `transform ${CYCLE_MS}ms ${EASE}` : 'none'

  const flyTransform = flyBtn
    ? flyBtn.position === 'header'
      ? 'translateX(calc(50vw - var(--sidebar-width) / 2))'
      : 'translateX(max(0px, calc((100vw - var(--app-max-width)) / 2)))'
    : undefined

  return (
    <AppContext.Provider value={{ openPost, setOpenPost, goto }}>
<div className="app">
        <aside className="sidebar">
          <div
            className="sidebar__buttons"
            style={{
              transform: `translateY(-${cycleOffset * 25}vh)`,
              transition: trackTransition,
            }}
          >
            {[...pages, ...pages].map((page, i) => {
              const hidden = i === 0 && flyBtn !== null
              return (
                <button
                  key={`${page}-${i}`}
                  className={`sidebar__button${page === activePage ? ' sidebar__button--active' : ''}`}
                  style={{ top: `${i * 25}vh`, visibility: hidden ? 'hidden' : 'visible' }}
                  onClick={() => navigate(page)}
                >
                  {page}
                </button>
              )
            })}
          </div>
        </aside>

        <main className="main">
          <header className="header">
<div className={`header__nav${mobileOpen ? ' header__nav--open' : ''}`}>
              <button
                type="button"
                className="header__burger"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Menu"
                aria-expanded={mobileOpen}
              >
                ☰
              </button>
              <nav className="header__menu">
                {PAGES.map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`header__menu-item${page === activePage ? ' header__menu-item--active' : ''}`}
                    onClick={() => {
                      setMobileOpen(false)
                      navigate(page)
                    }}
                  >
                    {page}
                  </button>
                ))}
              </nav>
            </div>
          </header>

          <div className="content-viewport">
            <div
              className="content-track"
              style={{ transform: trackTransform, transition: trackTransition }}
            >
              <ContentPage id={activePage} />
              {prevPage && <ContentPage id={prevPage} />}
            </div>
          </div>

          <Footer />
        </main>

{flyBtn && (
          <div
            className="fly-button"
            aria-hidden="true"
            style={{
              transform: flyTransform,
              transition: `transform ${RETURN_MS}ms ${EASE}`,
            }}
          >
            {flyBtn.label}
          </div>
        )}
      </div>
    </AppContext.Provider>
  )
}
