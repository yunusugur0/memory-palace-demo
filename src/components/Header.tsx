import type { Page } from '../types'
import Brand from './Brand'

type Props = { page: Page; onNavigate: (page: Page) => void }

const links: { page: Page; label: string }[] = [
  { page: 'home', label: 'Ana sayfa' },
  { page: 'learn', label: 'Nasıl çalışır?' },
  { page: 'levels', label: 'Bölümler' },
  { page: 'create', label: 'Kendi bölümün' },
]

export default function Header({ page, onNavigate }: Props) {
  const current: Page = page === 'exercise' || page === 'results' ? 'levels' : page
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand onClick={() => onNavigate('home')} />
        <nav aria-label="Ana menü">
          {links.map(link => (
            <button
              key={link.page}
              className="nav-link"
              aria-current={current === link.page ? 'page' : undefined}
              onClick={() => onNavigate(link.page)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
