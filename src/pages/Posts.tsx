import { useState, useEffect } from 'react'
import { useAppContext } from '../AppContext'
import { POSTS } from '../data/posts'

const TYPE_MS = 15
const ERASE_MS = 5

function parseMarkdown(raw: string): string {
  return `<p>${raw
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^---$/gm, '<hr />')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br />')}</p>`
}

function MarkdownPost({ url }: { url: string }) {
  const [html, setHtml] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText)
        return r.text()
      })
      .then((text) => setHtml(parseMarkdown(text)))
      .catch(() => setError(true))
  }, [url])

  if (error) return <p>Failed to load post.</p>
  if (html === null) return <p>Loading…</p>
  return <div className="post__markdown" dangerouslySetInnerHTML={{ __html: html }} />
}

export default function Posts() {
  const { openPost, setOpenPost, performanceMode } = useAppContext()
  const [hovered, setHovered] = useState<number | null>(null)
  const [displayed, setDisplayed] = useState<number | null>(null)
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (performanceMode) return
    const desc = displayed !== null ? POSTS[displayed].desc : undefined
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

  if (openPost !== null) {
    const post = POSTS[openPost]
    return (
      <>
        <div className="post__nav">
          <button type="button" className="tag" onClick={() => setOpenPost(null)}>
            ← Back
          </button>
        </div>
        <MarkdownPost url={post.markdown} />
      </>
    )
  }

  return (
    <>
      <h2 className="page__subtitle">My blog.</h2>
      <ul className="post-list">
        {POSTS.map((post, i) => (
          <li
            key={post.title}
            className="post-item"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="post-item__content">
              <span className="post-item__title">{post.title}</span>
              {(performanceMode || (hovered === i && charCount > 0)) && post.desc && (
                <div className="post-item__desc">{performanceMode ? post.desc : post.desc.slice(0, charCount)}</div>
              )}
            </div>
            <div className="post-item__meta">
              <span className="post-item__date">{post.date}</span>
              <button
                type="button"
                className="tag"
                onClick={() => setOpenPost(i)}
              >
                Read
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
