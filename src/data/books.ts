export interface Book {
  title: string
  author: string
  coverId?: number
}

export const BOOKS: Book[] = [
  { title: 'Grow the Pie', author: 'Alex Edmans' },
  { title: "Worldly Philosophers", author: 'Robert Heilbroner' },
  { title: "Artificial Intelligence - 10 Things You Should Know", author: 'Time Rocktschel' },
  { title: "Chip War", author: 'Chris Miller' },
  { title: 'Obliquity', author: 'John Kay' },
  { title: "Can't Hurt Me", author: 'David Goggins', coverId: 8305903 },
  { title: "Never Finished", author: 'David Goggins' },
  { title: 'May Contain Lies', author: 'Alex Edmans' },
  { title: "Turing's Cathedral", author: 'George Dyson' },
  { title: "Doughnut Economics", author: 'Kate Raworth' },
  { title: "The Tiger That Isn't", author: 'Michael Blastland', coverId: 9989978 },
]
