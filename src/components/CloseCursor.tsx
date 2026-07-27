import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const ANIM_MS = 500

export default function CloseCursor({ onClose, children }: {
  onClose: () => void
  children: (close: () => void) => React.ReactNode
}) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [exiting, setExiting] = useState(false)
  const closingRef = useRef(false)

  const triggerClose = () => {
    if (closingRef.current) return
    closingRef.current = true
    setExiting(true)
    setTimeout(onClose, ANIM_MS)
  }

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    document.body.classList.add('close-cursor-active')

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      cursor.style.opacity = '1'
    }
    const leave = () => { cursor.style.opacity = '0' }
    const enter = () => { cursor.style.opacity = '1' }

    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    return () => {
      document.body.classList.remove('close-cursor-active')
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, input')) return
      triggerClose()
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      {createPortal(
        <div ref={cursorRef} className="close-cursor" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="16" cy="16" r="15"
              stroke="currentColor" strokeWidth="1.5"
              strokeDasharray="94.25"
              strokeDashoffset="94.25"
              strokeLinecap="round"
              className={`close-cursor__circle${exiting ? ' close-cursor__circle--exit' : ''}`}
              style={{ transformOrigin: '16px 16px' }}
            />
            <g
              className={`close-cursor__x${exiting ? ' close-cursor__x--exit' : ''}`}
              style={{ transformOrigin: '16px 16px' }}
            >
              <line x1="5.39" y1="5.39" x2="26.61" y2="26.61" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="26.61" y1="5.39" x2="5.39" y2="26.61" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>,
        document.body
      )}
      {children(triggerClose)}
    </>
  )
}
