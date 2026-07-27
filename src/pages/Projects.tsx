import { useState, useEffect } from 'react'
import { PROJECTS } from '../data/projects'
import { useAppContext } from '../AppContext'

const TYPE_MS = 15
const ERASE_MS = 5

export default function Projects() {
  const { performanceMode } = useAppContext()
  const [hovered, setHovered] = useState<number | null>(null)
  const [displayed, setDisplayed] = useState<number | null>(null)
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (performanceMode) return
    const desc = displayed !== null ? PROJECTS[displayed].desc : undefined
    if (displayed === hovered) {
      if (desc && charCount < desc.length) {
        const t = window.setTimeout(() => setCharCount((c) => c + 1), TYPE_MS)
        return () => clearTimeout(t)
      }
    } else {
      if (charCount > 0) {
        const t = window.setTimeout(() => setCharCount((c) => c - 1), ERASE_MS)
        return () => clearTimeout(t)
      }
      setDisplayed(hovered)
    }
  }, [hovered, displayed, charCount, performanceMode])

  return (
    <>
      <h2 className="page__subtitle">More professional projects.</h2>
      <ul className="post-list">
        {PROJECTS.map((project, i) => (
          <li
            key={project.title}
            className="post-item"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="post-item__image"
              />
            )}
            <div className="post-item__content">
              <span className="post-item__title">{project.title}</span>
              {(performanceMode || (hovered === i && charCount > 0)) && project.desc && (
                <div className="post-item__desc">{performanceMode ? project.desc : project.desc.slice(0, charCount)}</div>
              )}
            </div>
            <div className="post-item__meta">
              <span className="post-item__date">{project.date}</span>
              <a
                className="tag"
                href={project.url}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
