import { useState, useEffect } from 'react'
import { BOOKS, type Book } from '../data/books'

const ABOUT_LINKS = [
  {
    label: 'Email',
    url: 'mailto:marcusejhawkins@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    url: 'https://github.com/marcusehh',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/marcusejhawkins',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

function BookCard({ book }: { book: Book }) {
  const [cover, setCover] = useState<string | null>(null)

  useEffect(() => {
    if (book.coverId) {
      setCover(`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`)
      return
    }
    const query = encodeURIComponent(`${book.title} ${book.author}`)
    fetch(`https://openlibrary.org/search.json?q=${query}&limit=1&fields=cover_i`)
      .then((r) => r.json())
      .then((data) => {
        const id = data?.docs?.[0]?.cover_i
        if (id) setCover(`https://covers.openlibrary.org/b/id/${id}-L.jpg`)
      })
      .catch(() => {})
  }, [book.title, book.author, book.coverId])

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

const TYPE_MS = 7
const ERASE_MS = 2
const READING_DESC = 'Books I like.'

function useTypewriter(active: boolean, text: string) {
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
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
  }, [active, charCount, text])

  return text.slice(0, charCount)
}

export default function About() {
  const [open, setOpen] = useState(false)
  const [hoveredReading, setHoveredReading] = useState(false)

  const readingDesc = useTypewriter(hoveredReading, READING_DESC)

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

  const linkNodes = ABOUT_LINKS.map((link) => (
    <a
      key={link.url}
      className="about__icon-link"
      href={link.url}
      target="_blank"
      rel="noreferrer"
      aria-label={link.label}
    >
      {link.icon}
    </a>
  ))

  return (
    <section className="page__section about__intro">
      {/* Desktop: portrait left of text block */}
      <img className="about__portrait about__portrait--desktop" src="/images/headshot.jpg" alt="Marcus EJ Hawkins" />
      <div className="about__text">
        {/* Desktop: h2 + icon links in a row */}
        <div className="about__header about__header--desktop">
          <h2>Marcus EJ Hawkins</h2>
          <div className="about__links">{linkNodes}</div>
        </div>
        <div className="about__card-row">
          <div className="about__mobile-row">
            <img className="about__portrait about__portrait--mobile" src="/images/headshot.jpg" alt="Marcus EJ Hawkins" />
            <div className="about__links about__links--mobile">{linkNodes}</div>
          </div>
          <div className="about__body">
            <h2 className="about__name--mobile">Marcus EJ Hawkins</h2>
            <p>
              I am a first-year undergraduate at <b>University College London (UCL)</b>{' '} studying <b>BSc Social Sciences & Data Science</b>.
            </p>
            <ul className="post-list about__reading-list">
          <li
            className="post-item"
            onMouseEnter={() => setHoveredReading(true)}
            onMouseLeave={() => setHoveredReading(false)}
          >
            <div className="post-item__content">
              <span className="post-item__title">Reading List</span>
              {readingDesc && (
                <div className="post-item__desc">{readingDesc}</div>
              )}
            </div>
            <div className="post-item__meta">
              <button type="button" className="tag" onClick={() => setOpen(true)}>
                View
              </button>
            </div>
          </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
