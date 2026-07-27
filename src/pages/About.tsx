import { useState, useEffect } from 'react'
import { CONTACT_LINKS } from '../data/contact'
import { BOOKS, type Book } from '../data/books'
import { useAppContext } from '../AppContext'

function BookCard({ book }: { book: Book }) {
  const [cover, setCover] = useState<string | null>(null)

  useEffect(() => {
    const query = encodeURIComponent(`${book.title} ${book.author}`)
    fetch(`https://openlibrary.org/search.json?q=${query}&limit=1&fields=cover_i`)
      .then((r) => r.json())
      .then((data) => {
        const id = data?.docs?.[0]?.cover_i
        if (id) setCover(`https://covers.openlibrary.org/b/id/${id}-L.jpg`)
      })
      .catch(() => {})
  }, [book.title, book.author])

  return (
    <div className="book-card">
      <div className="book-card__cover-wrap">
        {cover
          ? <img className="book-card__cover" src={cover} alt={book.title} />
          : <div className="book-card__cover book-card__cover--placeholder" />}
      </div>
      <span className="book-card__title">{book.title}</span>
      <span className="book-card__author">{book.author}</span>
    </div>
  )
}

const TYPE_MS = 15
const ERASE_MS = 5
const READING_DESC = 'Books I like.'

function useTypewriter(active: boolean, text: string, skip: boolean) {
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (skip) return
    if (active) {
      if (charCount < text.length) {
        const t = window.setTimeout(() => setCharCount((c) => c + 1), TYPE_MS)
        return () => clearTimeout(t)
      }
    } else {
      if (charCount > 0) {
        const t = window.setTimeout(() => setCharCount((c) => c - 1), ERASE_MS)
        return () => clearTimeout(t)
      }
    }
  }, [active, charCount, text, skip])

  if (skip) return active ? text : ''
  return text.slice(0, charCount)
}

export default function About() {
  const { performanceMode } = useAppContext()
  const [open, setOpen] = useState(false)
  const [hoveredReading, setHoveredReading] = useState(false)

  const readingDesc = useTypewriter(hoveredReading, READING_DESC, performanceMode)

  if (open) {
    return (
      <>
        <div className="post__nav">
          <button type="button" className="tag" onClick={() => setOpen(false)}>
            ← Back
          </button>
        </div>
        <div className="book-grid">
          {BOOKS.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </>
    )
  }

  return (
    <section className="page__section about__intro">
      <div className="about__text">
        <h2>Marcus EJ Hawkins</h2>
        <p>
          I am an incoming undergraduate at <b>University College London (UCL)</b>{' '}
          and I will be studying <b>BSc Social Sciences & Data Science</b>.
        </p>
        <p>
          I am interested in markets and tech and I enjoy game-development,
          programming and running.
        </p>

        <ul className="post-list about__reading-list">
          <li
            className="post-item"
            onMouseEnter={() => setHoveredReading(true)}
            onMouseLeave={() => setHoveredReading(false)}
          >
            <div className="post-item__content">
              <span className="post-item__title">Reading List</span>
              {(performanceMode || readingDesc) && (
                <div className="post-item__desc">{performanceMode ? READING_DESC : readingDesc}</div>
              )}
            </div>
            <div className="post-item__meta">
              <button type="button" className="tag" onClick={() => setOpen(true)}>
                View
              </button>
            </div>
          </li>
        </ul>

        <div className="about__links">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.url}
              className="tag"
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
