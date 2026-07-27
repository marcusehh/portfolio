import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const CIRCLE_MS = 400

export default function GlobalCursor({ circleEnabled = true }: { circleEnabled?: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [circleState, setCircleState] = useState<'hidden' | 'in' | 'out'>('hidden')
  const [animKey, setAnimKey] = useState(0)
  const exitTimer = useRef<number | null>(null)

  useEffect(() => {
    if (!circleEnabled) setCircleState('hidden')
  }, [circleEnabled])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      cursor.style.opacity = '1'
    }
    const leave = () => { cursor.style.opacity = '0' }
    const enter = () => { cursor.style.opacity = '1' }

    const onOver = (e: MouseEvent) => {
      if (!circleEnabled) return
      if ((e.target as HTMLElement).closest('button, a')) {
        if (exitTimer.current !== null) {
          clearTimeout(exitTimer.current)
          exitTimer.current = null
        }
        setCircleState('in')
        setAnimKey((k) => k + 1)
      }
    }

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a')) {
        setCircleState('out')
        exitTimer.current = window.setTimeout(() => {
          setCircleState('hidden')
          exitTimer.current = null
        }, CIRCLE_MS)
      }
    }

    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      if (exitTimer.current !== null) clearTimeout(exitTimer.current)
    }
  }, [circleEnabled])

  return createPortal(
    <div ref={cursorRef} className="global-cursor" aria-hidden="true">
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="10" x2="18" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {circleState !== 'hidden' && (
          <circle
            key={animKey}
            cx="18" cy="18" r="15"
            stroke="currentColor" strokeWidth="1.5"
            strokeDasharray="94.25"
            strokeDashoffset="94.25"
            strokeLinecap="round"
            className={`global-cursor__circle${circleState === 'out' ? ' global-cursor__circle--out' : ''}`}
            style={{ transformOrigin: '18px 18px', transform: 'rotate(-90deg)' }}
          />
        )}
      </svg>
    </div>,
    document.body
  )
}
