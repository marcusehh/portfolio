import { useAppContext } from '../AppContext'
import { POSTS } from '../data/blog'

export default function Home() {
  const { goto } = useAppContext()
  const latest = POSTS[0]

  return (
    <>
        <p>This website is a hub for articles I have written (my blog) and projects I am working on.</p>
        <p>Use the sidebar to view different things within the website.</p>
      <h4>Recent Article:</h4>
      {latest && (
        <button
          type="button"
          className="home__recent"
          onClick={() => goto('blog', { openPost: 0 })}
        >
          <span className="home__recent-title">{latest.title}</span>
          <span className="home__recent-date">{latest.date}</span>
        </button>
      )}
    </>
  )
}
