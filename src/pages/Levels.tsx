import { difficulties, levels } from '../data/levels'
import LevelCard from '../components/LevelCard'
import type { CustomLevel } from '../types'

type Props = { customLevels: CustomLevel[]; onSelect: (id: number) => void; onCreate: () => void }

export default function Levels({ customLevels, onSelect, onCreate }: Props) {
  return (
    <div className="page">
      <header className="page-head">
        <h1>Üç seviye, her seviyede üç bölüm.</h1>
        <p className="lead">Seviye yükseldikçe daha fazla şey hatırlayacaksın. Her seviyede üç farklı bölüm seni bekliyor; istediğin sırayla oynayabilirsin.</p>
      </header>
      {difficulties.map(difficulty => {
        const group = levels.filter(level => level.difficulty === difficulty)
        return (
          <section className="level-group" key={difficulty} aria-labelledby={`group-${difficulty}`}>
            <h2 className="level-group-title" id={`group-${difficulty}`}>
              {difficulty} seviye <span>{group[0].itemCount} öğe, {group.length} bölüm</span>
            </h2>
            <div className="levels-list">
              {group.map(level => <LevelCard key={level.id} level={level} onSelect={onSelect} />)}
            </div>
          </section>
        )
      })}

      <section className="level-group" aria-labelledby="group-custom">
        <h2 className="level-group-title" id="group-custom">Kendi bölümlerin <span>{customLevels.length} bölüm</span></h2>
        <div className="levels-list">
          {customLevels.map(level => (
            <article className="level-row" key={level.id}>
              <span className="level-num" aria-hidden="true">{level.items[0]?.emoji}</span>
              <div className="level-body">
                <h2>{level.name}</h2>
                <p>{level.items.map(item => item.emoji).join(' ')}</p>
                <p className="level-meta">Kendi bölümün, {level.items.length} öğe</p>
              </div>
              <button className="button-primary" onClick={() => onSelect(level.id)}>Bölüme başla</button>
            </article>
          ))}
          <div className="custom-cta">
            <p>{customLevels.length === 0 ? 'Kendi nesnelerinle ve yerlerinle bir bölüm hazırlayabilirsin.' : 'Yeni bir bölüm eklemek ya da mevcut olanları düzenlemek için:'}</p>
            <button className="button-link" onClick={onCreate}>Kendi bölümünü oluştur</button>
          </div>
        </div>
      </section>

      <p className="levels-hint">Bu demo sürümünde dokuz bölüm de açık.</p>
    </div>
  )
}
