export interface Post {
  title: string
  date: string
  desc: string
  kind: 'markdown'
  markdown: string
}

export const POSTS: Post[] = [
  {
    title: 'Did Marx prove capitalism must end and did he intend to?',
    date: '2025-10',
    desc: 'An elementary essay on Karl Marx.',
    kind: 'markdown',
    markdown: '/posts_projects/marx_essay.md',
  },
  {
    title: 'An enquiry into the fall of ownership of Gamings PCs.',
    date: '2026-05',
    desc: 'An article that answers how AI has affected and will affect the ownership of Gamings PCs.',
    kind: 'markdown',
    markdown: '/posts_projects/fall_of_pcs.md',
  },
  {
    title: 'Are we ready for the implementation of AI?',
    date: '2026-07',
    desc: 'An opinion-piece arguing that AI may be overhyped and overvalued in the short term despite its long-term potential.',
    kind: 'markdown',
    markdown: '/posts_projects/Are_we_ready_for_the_implementation_of_AI.md',
  },
  {
    title: 'Is sovereign AI possible?',
    date: '2026-06',
    desc: 'An article that answers what sovereign AI is and whether it is truly possible? (Updated August 2026)',
    kind: 'markdown',
    markdown: '/posts_projects/Sov_AI.md',
  },
  {
      title: 'Nvidia, the lender of last resort.',
      date: '2026-08',
      desc: 'An article primarily written by Oliver Kemp on GPU backed lending. (I wrote the final paragraph)',
      kind: 'markdown',
      markdown: '/posts_projects/nvidia_the_lender.md',
    },
  {
    title: 'The Semiconductor Switch of Hands',
    date: '2026-08',
    desc: 'An article that discusses markets becoming concentrated with retail investing.',
    kind: 'markdown',
    markdown: '/posts_projects/Semi_Switch.md',
  },
]

const _original = [...POSTS]
POSTS.sort((a, b) => {
  const dateDiff = b.date.localeCompare(a.date)
  if (dateDiff !== 0) return dateDiff
  return _original.indexOf(b) - _original.indexOf(a)
})
