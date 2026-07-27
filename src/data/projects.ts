export interface Project {
  title: string
  date: string
  url: string
  desc: string
  image?: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Assessing an AI Market Bubble',
    date: '2025-12',
    url: '/posts_projects/Assessing_An_AI_Market_Bubble.pdf',
    desc: 'Report on a potential AI Market Bubble.',
    image: '/posts_projects/projects_pictures/Assessing_An_AI_Market_Bubble.png',
  },
  {
    title: 'Auto-DCF',
    date: '2026-04',
    url: 'https://github.com/marcusehh/Auto-DCF',
    desc: 'Program that auto-calculates WACC & DCF Valuation using numpy, yfinance, pandas, pygame and matplotlib.',
    image: '/posts_projects/projects_pictures/Auto-DCF.png',
  },
  {
    title: 'Dynamic Pitch-Deck',
    date: '2026-05',
    url: 'https://github.com/marcusehh/Dynamic_Pitch-Deck',
    desc: 'A more advanced version of the "Auto-DCF program".',
    image: '/posts_projects/projects_pictures/Dynamic_Pitch-Deck.png',
  },
  {
    title: 'Kingstone Investments Website',
    date: '2026-03',
    url: 'https://kingstoneinvestments.co.uk/',
    desc: 'The website I have built for the investment fund I co-founded.',
    image: '/posts_projects/projects_pictures/KIBanner.png',
  },
]

PROJECTS.sort((a, b) => b.date.localeCompare(a.date))
