import { CONTACT_LINKS } from '../data/contact'

export default function About() {
  return (
    <section className="page__section about__intro">
      <div className="about__text">
        <h2>Marcus EJ Hawkins</h2>
        <p>
          I am an incoming undergraduate at <b>University College London (UCL)</b>{' '}
          and I will be studying <b>BSc Social Sciences with Data Science</b>.
        </p>
        <p>
          I am interested in markets and tech and I enjoy game-development,
          programming and running.
        </p>
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
