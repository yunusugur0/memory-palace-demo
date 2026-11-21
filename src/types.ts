export type Page = 'home' | 'learn' | 'levels' | 'exercise' | 'results' | 'create'

export type Difficulty = 'Kolay' | 'Orta' | 'Zor'

export type Level = {
  id: number
  section: number
  name: string
  subtitle: string
  description: string
  itemCount: number
  difficulty: Difficulty
  color: string
  unlocked: boolean
}

export type ExerciseItem = {
  id: number
  word: string
  emoji: string
  location: string
}

export type CustomLevel = {
  id: number
  name: string
  items: ExerciseItem[]
}

export type Playable = {
  id: number
  name: string
  description: string
  meta: string
  items: ExerciseItem[]
}
