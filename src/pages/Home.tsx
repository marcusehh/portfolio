import { useAppContext } from '../AppContext'
import { POSTS } from '../data/blog'

export default function Home() {
  const { goto } = useAppContext()
  const latest = POSTS[0]

  return (
    <>
      <p>Use the sidebar to view different things within the website.</p>
      <h4>Recent Activity:</h4>
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
