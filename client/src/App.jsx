import { Component, lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { HashRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
const AnimatedBackground = lazy(() => import('./three/AnimatedBackground'))
const GameCard3D = lazy(() => import('./three/GameCard3D'))
import { findGame, genres, library, platformGroups } from './data/catalog'

const COLLECTION_KEY = 'game-library-public-demo-collection-v1'

const coverImages = {
  'zelda-totk': 'signal-skybound.jpg',
  'elden-ring': 'signal-liminal-gold.jpg',
  'god-of-war-ragnarok': 'signal-nine-realms.jpg',
  'cyberpunk-2077': 'signal-night-signal.jpg',
  hades: 'signal-underworld.jpg',
  'red-dead-redemption-2': 'signal-frontier.jpg',
  'witcher-3': 'signal-wild-hunt.jpg',
  'hollow-knight': 'signal-deep-hollow.jpg',
  'stardew-valley': 'signal-new-season.jpg',
  'baldurs-gate-3': 'signal-party-formed.jpg',
  minecraft: 'signal-block-field.jpg',
  'dark-souls-3': 'signal-fading-ember.jpg',
}

const coverImageSrc = (game) => `${import.meta.env.BASE_URL}images/${coverImages[game.id]}`

const Icon = ({ name, size = 18 }) => {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    shelf: <><path d="M4 5h16v14H4z"/><path d="M4 10h16M8 5v5m8-5v5"/></>,
    star: <path d="m12 3 2.75 5.57 6.15.89-4.45 4.34 1.05 6.13L12 17.04 6.5 19.93l1.05-6.13L3.1 9.46l6.15-.89L12 3Z"/>,
    search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    check: <path d="m5 12 4.3 4.2L19 6.8"/>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    spark: <path d="m12 2 1.5 7.2L20 12l-6.5 2.8L12 22l-1.5-7.2L4 12l6.5-2.8L12 2Z"/>,
    reset: <><path d="M20 11a8 8 0 1 0 1.1 4"/><path d="M20 4v7h-7"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
  }
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const Cover = ({ game, variant = 'card' }) => (
  <div
    className={`game-cover game-cover--${variant}`}
    style={{ '--accent': game.accent, '--accent-2': game.accent2 }}
    aria-label={`${game.title} original concept catalog cover`}
  >
    <img className="game-cover__image" src={coverImageSrc(game)} alt="" loading={variant === 'detail' ? 'eager' : 'lazy'} />
    <span className="cover-glow" />
    <span className="cover-grid" />
    <span className="cover-orb cover-orb--one" />
    <span className="cover-orb cover-orb--two" />
    <span className="cover-index">{game.index}</span>
    <span className="cover-signal">{game.signal}</span>
    <span className="cover-title">{game.title}</span>
    <span className="cover-year">{game.releaseYear}</span>
  </div>
)

const Rating = ({ value }) => (
  <span className="rating"><Icon name="star" size={14} />{value.toFixed(1)}<small>/10</small></span>
)

function useCollection() {
  const [collection, setCollection] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(COLLECTION_KEY) || '[]')
      return Array.isArray(saved) ? saved.filter((id) => findGame(id)) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    window.localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection))
  }, [collection])

  const toggle = (id) => {
    setCollection((current) => current.includes(id) ? current.filter((gameId) => gameId !== id) : [...current, id])
  }

  const reset = () => setCollection([])
  return { collection, toggle, reset }
}

class AmbientBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

class RouteBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return <section className="route-error page-shell"><p className="eyebrow">Route recovery</p><h1>Signal interrupted.</h1><p>The catalog view could not load. Return to the public index and try again.</p><Link className="action-button" to="/">Return to index <Icon name="arrow" /></Link><pre>{this.state.error.message}</pre></section>
    }
    return this.props.children
  }
}

class ThreeBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return <div className="three-placeholder" aria-label="3D stage unavailable" />
    return this.props.children
  }
}

const Header = ({ collectionCount }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" to="/" aria-label="Game Library home">
          <span className="wordmark-mark"><Icon name="spark" size={17} /></span>
          <span>GAME <em>LIBRARY</em></span>
        </Link>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <span /> <span />
        </button>
        <nav className={menuOpen ? 'main-nav main-nav--open' : 'main-nav'} aria-label="Primary navigation">
          <NavLink to="/" end>Index</NavLink>
          <NavLink to="/catalog">Catalog</NavLink>
          <NavLink to="/collection" className="nav-collection">Collection <b>{collectionCount}</b></NavLink>
          <NavLink to="/about">Case Notes</NavLink>
        </nav>
        <div className="header-status"><span />Public demo</div>
      </div>
    </header>
  )
}

const DetailDialog = ({ game, saved, onClose, onToggle }) => {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!game) return null
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="detail-dialog" role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className="dialog-close" onClick={onClose} aria-label="Close game detail"><Icon name="close" /></button>
        <Cover game={game} variant="detail" />
        <div className="detail-copy">
          <p className="eyebrow">Signal {game.index} · {game.genre}</p>
          <h2 id="detail-title">{game.title}</h2>
          <p className="detail-description">{game.description}</p>
          <dl className="detail-specs">
            <div><dt>Studio</dt><dd>{game.developer}</dd></div>
            <div><dt>Released</dt><dd>{game.releaseYear}</dd></div>
            <div><dt>Platforms</dt><dd>{game.platform}</dd></div>
            <div><dt>Library rating</dt><dd><Rating value={game.rating} /></dd></div>
          </dl>
          <button type="button" className={saved ? 'action-button action-button--saved' : 'action-button'} onClick={() => onToggle(game.id)}>
            <Icon name={saved ? 'check' : 'plus'} />{saved ? 'On your shelf' : 'Add to my shelf'}
          </button>
        </div>
      </section>
    </div>
  )
}

const GameTile = ({ game, saved, onOpen, onToggle }) => (
  <article className="game-tile">
    <button type="button" className="game-tile__cover" onClick={() => onOpen(game)} aria-label={`Open ${game.title} details`}><Cover game={game} /></button>
    <div className="game-tile__body">
      <div className="game-tile__topline"><span>{game.genre}</span><Rating value={game.rating} /></div>
      <h3>{game.title}</h3>
      <p>{game.developer} <i>·</i> {game.releaseYear}</p>
      <div className="game-tile__actions">
        <button type="button" className="quiet-button" onClick={() => onOpen(game)}>Inspect <Icon name="arrow" size={15} /></button>
        <button type="button" className={saved ? 'save-button save-button--saved' : 'save-button'} onClick={() => onToggle(game.id)} aria-label={saved ? `Remove ${game.title} from collection` : `Add ${game.title} to collection`}>
          <Icon name={saved ? 'check' : 'plus'} size={16} />
        </button>
      </div>
    </div>
  </article>
)

const visualSignals = [
  { id: 'skybound', gameId: 'zelda-totk', index: '01', label: 'Skybound', image: 'signal-skybound.jpg' },
  { id: 'underworld', gameId: 'hades', index: '05', label: 'Underworld', image: 'signal-underworld.jpg' },
  { id: 'deep-hollow', gameId: 'hollow-knight', index: '08', label: 'Deep hollow', image: 'signal-deep-hollow.jpg' },
  { id: 'nine-realms', gameId: 'god-of-war-ragnarok', index: '03', label: 'Nine realms', image: 'signal-nine-realms.jpg' },
]

const WorldSignals = ({ onOpen }) => (
  <section className="world-signals page-shell">
    <div className="world-signals__heading reveal">
      <div>
        <p className="eyebrow">Visual signals · Original concept scenes</p>
        <h2>Four atmospheres,<br /><em>ready to enter.</em></h2>
      </div>
      <p>Original visual interpretations make the public demo feel more like a living catalogue. Open a scene to inspect its connected record.</p>
    </div>
    <div className="world-atlas reveal reveal--delay">
      {visualSignals.map((signal) => {
        const game = findGame(signal.gameId)
        return <button key={signal.id} type="button" className="world-signal" onClick={() => onOpen(game)} aria-label={`Open ${game.title} details from the ${signal.label} concept scene`}>
          <img src={`${import.meta.env.BASE_URL}images/${signal.image}`} alt={`Original concept scene: ${signal.label}`} loading="lazy" />
          <span className="world-signal__wash" />
          <span className="world-signal__meta"><i>{signal.index} · Original concept</i><strong>{signal.label}</strong><small>Open record <Icon name="arrow" size={14} /></small></span>
        </button>
      })}
    </div>
  </section>
)

const Home = ({ collection, onOpen, onToggle }) => {
  const featured = library.filter((game) => game.featured)
  const [activeId, setActiveId] = useState(featured[1].id)
  const active = findGame(activeId) || featured[0]

  return (
    <>
      <section className="hero-section page-shell">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span className="pulse-dot" /> Live catalog · 12 original records</p>
          <h1>Keep play<br /><em>in orbit.</em></h1>
          <p className="hero-summary">A spatial index for collecting the games that stay with you. Browse a curated catalog, make a local shelf, and inspect every signal in depth.</p>
          <div className="hero-actions">
            <Link className="action-button" to="/catalog">Browse the catalog <Icon name="arrow" /></Link>
            <Link className="text-link" to="/collection">Open my shelf <span>{collection.length}</span></Link>
          </div>
          <div className="hero-stats">
            <div><strong>12</strong><span>catalogued worlds</span></div>
            <div><strong>07</strong><span>genres in orbit</span></div>
            <div><strong>{collection.length.toString().padStart(2, '0')}</strong><span>on your shelf</span></div>
          </div>
        </div>
        <div className="hero-object reveal reveal--delay">
          <div className="object-orbit object-orbit--one" />
          <div className="object-orbit object-orbit--two" />
          <div className="object-caption"><span>Featured signal</span><b>{active.index}</b></div>
          <ThreeBoundary><Suspense fallback={<div className="three-placeholder" aria-label="Loading 3D featured game" />}><GameCard3D title={active.title} rating={active.rating} accent={active.accent} /></Suspense></ThreeBoundary>
          <p className="object-label">{active.title} <span>{active.rating.toFixed(1)}</span></p>
        </div>
      </section>

      <WorldSignals onOpen={onOpen} />

      <section className="selection-section page-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">01 · Featured signals</p>
          <h2>Five worlds,<br />one <em>moving</em> index.</h2>
          <p>Each signal keeps the source catalog data while gaining a distinct spatial accent. Select one to place it on the 3D stage.</p>
        </div>
        <div className="feature-list reveal reveal--delay">
          {featured.map((game) => (
            <button key={game.id} type="button" className={active.id === game.id ? 'feature-row feature-row--active' : 'feature-row'} onClick={() => setActiveId(game.id)}>
              <span>{game.index}</span><strong>{game.title}</strong><i>{game.genre}</i><Rating value={game.rating} />
            </button>
          ))}
        </div>
      </section>

      <section className="depth-section page-shell">
        <div className="depth-panel reveal">
          <p className="eyebrow">02 · Your persistent shelf</p>
          <h2>Save what<br />you want to <em>return to.</em></h2>
          <p>Every title you save is kept in this browser. The public demo remains functional with no account, server, or setup requirement.</p>
          <Link to="/collection" className="text-link">View collection <Icon name="arrow" size={16} /></Link>
        </div>
        <div className="signal-grid reveal reveal--delay">
          {library.slice(5, 9).map((game) => <button key={game.id} type="button" onClick={() => onOpen(game)} className="signal-tile" style={{ '--signal': game.accent }}><img className="signal-tile__image" src={coverImageSrc(game)} alt="" loading="lazy" /><span>{game.index}</span><b>{game.title}</b></button>)}
        </div>
      </section>

      <section className="catalog-callout page-shell reveal">
        <div><p className="eyebrow">03 · Browse without friction</p><h2>Find a game by<br /><em>feeling, field, or format.</em></h2></div>
        <Link className="action-button" to="/catalog">Enter catalog <Icon name="arrow" /></Link>
      </section>
    </>
  )
}

const Catalog = ({ collection, onOpen, onToggle }) => {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All genres')
  const [platform, setPlatform] = useState('All platforms')
  const [sort, setSort] = useState('featured')

  const results = useMemo(() => {
    const query = search.trim().toLowerCase()
    const matched = library.filter((game) => {
      const searchMatch = !query || [game.title, game.genre, game.developer, game.platform].some((value) => value.toLowerCase().includes(query))
      const genreMatch = genre === 'All genres' || game.genre === genre
      const platformMatch = platform === 'All platforms' || game.platform.includes(platform)
      return searchMatch && genreMatch && platformMatch
    })
    return [...matched].sort((a, b) => sort === 'rating' ? b.rating - a.rating : sort === 'newest' ? b.releaseYear - a.releaseYear : sort === 'title' ? a.title.localeCompare(b.title) : Number(b.featured) - Number(a.featured) || b.rating - a.rating)
  }, [search, genre, platform, sort])

  return (
    <section className="catalog-page page-shell">
      <div className="page-intro reveal"><p className="eyebrow">Library index · 12 signals</p><h1>Find the next<br /><em>world to keep.</em></h1><p>Search the original game library by title, genre, studio, or platform. Every control updates the live index immediately.</p></div>
      <div className="catalog-controls reveal reveal--delay">
        <label className="search-field"><Icon name="search" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, genre, studio, platform" /></label>
        <div className="select-row">
          <label><span>Genre</span><select value={genre} onChange={(event) => setGenre(event.target.value)}>{genres.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Platform</span><select value={platform} onChange={(event) => setPlatform(event.target.value)}>{platformGroups.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured first</option><option value="rating">Highest rating</option><option value="newest">Newest release</option><option value="title">Title A–Z</option></select></label>
        </div>
      </div>
      <div className="catalog-result-bar"><span>{results.length.toString().padStart(2, '0')} results in signal range</span><span>{collection.length.toString().padStart(2, '0')} saved locally</span></div>
      {results.length ? <div className="catalog-grid">{results.map((game) => <GameTile key={game.id} game={game} saved={collection.includes(game.id)} onOpen={onOpen} onToggle={onToggle} />)}</div> : <div className="empty-state"><Icon name="search" size={32}/><h2>No signal found.</h2><p>Try a different word, platform, or filter combination.</p><button type="button" className="quiet-button" onClick={() => { setSearch(''); setGenre('All genres'); setPlatform('All platforms') }}>Clear filters <Icon name="reset" /></button></div>}
    </section>
  )
}

const Collection = ({ collection, onOpen, onToggle, onReset }) => {
  const games = collection.map(findGame).filter(Boolean)
  const average = games.length ? (games.reduce((sum, game) => sum + game.rating, 0) / games.length).toFixed(1) : '—'
  const genresInShelf = new Set(games.map((game) => game.genre)).size
  return (
    <section className="collection-page page-shell">
      <div className="page-intro reveal"><p className="eyebrow">Local collection · Browser-persistent</p><h1>Your shelf<br /><em>stays nearby.</em></h1><p>This is a public, no-login demonstration. Titles are saved to this browser only and remain after a refresh.</p></div>
      <div className="shelf-metrics reveal reveal--delay"><div><span>Saved signals</span><strong>{games.length.toString().padStart(2, '0')}</strong></div><div><span>Average rating</span><strong>{average}</strong></div><div><span>Genres held</span><strong>{genresInShelf.toString().padStart(2, '0')}</strong></div><button type="button" onClick={onReset} disabled={!games.length}><Icon name="reset" />Reset demo shelf</button></div>
      {games.length ? <div className="catalog-grid collection-grid">{games.map((game) => <GameTile key={game.id} game={game} saved onOpen={onOpen} onToggle={onToggle} />)}</div> : <div className="empty-state shelf-empty"><Icon name="shelf" size={38}/><h2>Your shelf is waiting.</h2><p>Open the catalog and add a signal that you want to keep close.</p><Link className="action-button" to="/catalog">Explore catalog <Icon name="arrow" /></Link></div>}
    </section>
  )
}

const About = () => (
  <section className="about-page page-shell">
    <div className="page-intro reveal"><p className="eyebrow">Case notes · Public edition</p><h1>Original system,<br /><em>open access.</em></h1><p>This public edition retains the visual and interaction foundation of the original MERN Game Library Management System while making its core experience available without a local server.</p></div>
    <div className="note-grid reveal reveal--delay">
      <article><span>01</span><h2>Original foundation</h2><p>React, Vite, Express, MongoDB, JWT authentication, catalog CRUD, collection flows, React Three Fiber, animated points, and 3D game cards remain part of the repository.</p></article>
      <article><span>02</span><h2>Public demo layer</h2><p>The deployed version replaces only the local runtime dependency with a fixed rendering of the original seed catalog and browser-persistent collection state.</p></article>
      <article><span>03</span><h2>Interaction principle</h2><p>Particle motion, spatial geometry, catalog filters, hover depth, 3D featured cards, and detail overlays are designed to clarify collection behavior rather than compete with it.</p></article>
    </div>
    <div className="architecture-note reveal"><Icon name="info" size={22}/><p><b>Deployment note.</b> GitHub Pages hosts the self-contained portfolio demo. The original server and database implementation remain preserved for local full-stack development.</p></div>
  </section>
)

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

const AppShell = () => {
  const { collection, toggle, reset } = useCollection()
  const [detailGame, setDetailGame] = useState(null)
  const [notice, setNotice] = useState('')

  const handleToggle = (id) => {
    const game = findGame(id)
    const wasSaved = collection.includes(id)
    toggle(id)
    setNotice(wasSaved ? `${game.title} removed from your shelf` : `${game.title} saved to your shelf`)
    window.setTimeout(() => setNotice(''), 2600)
  }

  const handleReset = () => {
    reset()
    setNotice('Your local demo shelf has been reset')
  }

  return <div className="app-shell">
    <AmbientBoundary><Suspense fallback={null}><AnimatedBackground /></Suspense></AmbientBoundary>
    <ScrollToTop />
    <Header collectionCount={collection.length} />
    <main>
      <RouteBoundary>
        <Routes>
          <Route path="/" element={<Home collection={collection} onOpen={setDetailGame} onToggle={handleToggle} />} />
          <Route path="/catalog" element={<Catalog collection={collection} onOpen={setDetailGame} onToggle={handleToggle} />} />
          <Route path="/collection" element={<Collection collection={collection} onOpen={setDetailGame} onToggle={handleToggle} onReset={handleReset} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home collection={collection} onOpen={setDetailGame} onToggle={handleToggle} />} />
        </Routes>
      </RouteBoundary>
    </main>
    <footer className="site-footer"><div><span className="wordmark-mark"><Icon name="spark" size={14}/></span> Game Library <i>·</i> Interactive catalog study</div><div>Original game data retained · Public demo edition</div></footer>
    {detailGame && <DetailDialog game={detailGame} saved={collection.includes(detailGame.id)} onClose={() => setDetailGame(null)} onToggle={handleToggle} />}
    <div className={notice ? 'toast-notice toast-notice--open' : 'toast-notice'} aria-live="polite"><Icon name="check" size={16}/>{notice}</div>
  </div>
}

export default function App() {
  return <HashRouter><AppShell /></HashRouter>
}
