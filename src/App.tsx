import { useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Levels from './pages/Levels'
import Exercise from './pages/Exercise'
import Results from './pages/Results'
import Create from './pages/Create'
import { getPlayable } from './data/levels'
import type { CustomLevel, Page } from './types'

type SavedProgress = { completed: number[]; bestScores: Record<number, number> }

const initialProgress: SavedProgress = { completed: [], bestScores: {} }
const CUSTOM_KEY = 'memory-palace-custom-levels'

const loadCustomLevels = (): CustomLevel[] => {
  try {
    const saved = localStorage.getItem(CUSTOM_KEY)
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed as CustomLevel[] : []
  } catch {
    return []
  }
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [levelId, setLevelId] = useState(1)
  const [returnPage, setReturnPage] = useState<Page>('levels')
  const [customLevels, setCustomLevels] = useState<CustomLevel[]>(loadCustomLevels)
  const [lastScore, setLastScore] = useState({ score: 0, total: 5 })
  const [progress, setProgress] = useState<SavedProgress>(() => {
    try {
      const saved = localStorage.getItem('memory-palace-progress-v2')
      return saved ? JSON.parse(saved) as SavedProgress : initialProgress
    } catch {
      return initialProgress
    }
  })

  useEffect(() => {
    localStorage.setItem('memory-palace-progress-v2', JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(customLevels))
    } catch {
      // Depolama dolu ya da kapalıysa bölümler yalnızca oturum boyunca kalır.
    }
  }, [customLevels])

  const navigate = (next: Page) => {
    setPage(next)
    window.scrollTo({ top: 0 })
  }

  const startLevel = (id: number, from: Page) => {
    setLevelId(id)
    setReturnPage(from)
    navigate('exercise')
  }

  const saveCustomLevel = (level: CustomLevel) => {
    setCustomLevels(current => current.some(item => item.id === level.id)
      ? current.map(item => item.id === level.id ? level : item)
      : [...current, level])
  }

  const deleteCustomLevel = (id: number) => setCustomLevels(current => current.filter(item => item.id !== id))

  const playable = getPlayable(levelId, customLevels)
  const fromCreate = returnPage === 'create'

  const finishExercise = (score: number, total: number) => {
    setLastScore({ score, total })
    setProgress(current => ({
      completed: current.completed.includes(levelId) ? current.completed : [...current.completed, levelId],
      bestScores: { ...current.bestScores, [levelId]: Math.max(current.bestScores[levelId] ?? 0, score) },
    }))
    navigate('results')
  }

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} />
      <main className="main-area">
        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'learn' && <Learn onNavigate={navigate} />}
        {page === 'levels' && <Levels customLevels={customLevels} onSelect={id => startLevel(id, 'levels')} onCreate={() => navigate('create')} />}
        {page === 'create' && <Create customLevels={customLevels} onSave={saveCustomLevel} onDelete={deleteCustomLevel} onTest={id => startLevel(id, 'create')} />}
        {page === 'exercise' && <Exercise key={levelId} playable={playable} backLabel={fromCreate ? '← Bölüm oluşturmaya dön' : '← Bölümlere dön'} onFinish={finishExercise} onExit={() => navigate(returnPage)} />}
        {page === 'results' && <Results name={playable.name} score={lastScore.score} total={lastScore.total} otherLabel={fromCreate ? 'Bölümlerime dön' : 'Diğer bölümler'} onRetry={() => navigate('exercise')} onLevels={() => navigate(returnPage)} />}
      </main>
      <footer className="site-footer">Demo sürümü. Tamamladığın bölümler yalnızca bu tarayıcıda saklanır.</footer>
    </div>
  )
}
