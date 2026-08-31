export interface Book {
  title: string
  author: string
  coverId?: number
  coverImage?: string
}

export const BOOKS: Book[] = [
  { title: 'Grow the Pie', author: 'Alex Edmans',coverImage: '/images/grow_the_pie.jpg' },
  { title: "Worldly Philosophers", author: 'Robert Heilbroner', coverImage: '/images/worldly_philosophers.jpg' },
  { title: "Artificial Intelligence - 10 Things You Should Know", author: 'Time Rocktschel', coverImage: '/images/artificial_intelligence_10_things.jpg' },
  { title: "Chip War", author: 'Chris Miller' },
  { title: 'Obliquity', author: 'John Kay', coverImage: '/images/obliquity.jpg' },
  { title: "Can't Hurt Me", author: 'David Goggins', coverId: 8305903 },
  { title: "Never Finished", author: 'David Goggins' },
  { title: 'May Contain Lies', author: 'Alex Edmans', coverImage: '/images/may_contain_lies.png' },
  { title: "Turing's Cathedral", author: 'George Dyson',coverImage: '/images/turings_cathedral.jpg'},
  { title: "Doughnut Economics", author: 'Kate Raworth' },
  { title: "The Tiger That Isn't", author: 'Michael Blastland', coverId: 9989978 },
  { title: "Inside The Black Box", author: 'Rishi K Narang',coverImage: '/images/inside_the_black_box.jpg'},
]
