import { useState, useEffect } from 'react'
import { PROJECTS } from '../data/projects'
const TYPE_MS = 7

type Filter = 'report' | 'program'

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('report')
  const [hovered, setHovered] = useState<number | null>(null)
  const [displayed, setDisplayed] = useState<number | null>(null)
  const [charCount, setCharCount] = useState(0)

  const filtered = PROJECTS.filter((p) => p.kind === filter)

  useEffect(() => {
    if (displayed !== hovered) {
      setCharCount(0)
      setDisplayed(hovered)
      return
    }
    const desc = displayed !== null ? filtered[displayed]?.desc : undefined
    if (desc && charCount < desc.length) {
      const t = window.setTimeout(() => setCharCount((c) => c + 1), TYPE_MS)
      return () => clearTimeout(t)
    }
  }, [hovered, displayed, charCount])

  return (
    <>
      <h2 className="page__subtitle">More professional projects.</h2>
      <div className="project-filter">
        {(['report', 'program'] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            className={`project-filter__btn${filter === f ? ' project-filter__btn--active' : ''}`}
            onClick={() => { setFilter(f); setHovered(null); setDisplayed(null); setCharCount(0) }}
          >
            {f === 'report' ? 'Reports' : 'Programs'}
          </button>
        ))}
      </div>
      <ul className="post-list">
        {filtered.map((project, i) => (
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
              {displayed === i && project.desc && charCount > 0 && (
                <div className="post-item__desc">{project.desc.slice(0, charCount)}</div>
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
