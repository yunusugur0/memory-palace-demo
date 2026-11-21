import type { Level } from '../types'

type Props = { level: Level; onSelect: (id: number) => void }

export default function LevelCard({ level, onSelect }: Props) {
  return (
    <article className="level-row">
      <span className="level-num" aria-hidden="true">{level.section}</span>
      <div className="level-body">
        <h2>{level.name}</h2>
        <p>{level.description}</p>
        <p className="level-meta">Bölüm {level.section}, {level.itemCount} öğe</p>
      </div>
      <button className="button-primary" disabled={!level.unlocked} onClick={() => onSelect(level.id)}>
        {level.unlocked ? 'Bölüme başla' : 'Kilitli'}
      </button>
    </article>
  )
}
