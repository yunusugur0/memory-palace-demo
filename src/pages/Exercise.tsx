import { useState } from 'react'
import { Check, MapPin } from 'lucide-react'
import type { ExerciseItem, Playable } from '../types'

type Props = { playable: Playable; backLabel: string; onFinish: (score: number, total: number) => void; onExit: () => void }

type Phase = 'intro' | 'memorize' | 'recall'

const normalize = (value: string | undefined) => (value ?? '').trim().toLocaleLowerCase('tr')

export default function Exercise({ playable, backLabel, onFinish, onExit }: Props) {
  const items = playable.items
  const [phase, setPhase] = useState<Phase>('intro')
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showHint, setShowHint] = useState(false)
  const [checked, setChecked] = useState(false)

  const isCorrect = (item: ExerciseItem) => normalize(answers[item.id]) === normalize(item.word)
  const score = items.filter(isCorrect).length

  const updateAnswer = (item: ExerciseItem, value: string) => {
    setAnswers(current => ({ ...current, [item.id]: value }))
    setChecked(false)
  }

  if (phase === 'intro') {
    return (
      <div className="page narrow-page">
        <button className="back-link" onClick={onExit}>{backLabel}</button>
        <p className="meta-line">{playable.meta}</p>
        <h1>{playable.name}</h1>
        <p className="lead">{playable.description}</p>
        <div className="instruction-box">
          <h2>Bölüm nasıl işliyor?</h2>
          <p>Birazdan karşına {items.length} görsel ve kelime çıkacak. Her birini evindeki belirli bir noktaya yerleştirdiğini hayal et. Görseller kaybolduğunda kelimeleri hatırlamaya çalış.</p>
          <p className="instruction-meta">{items.length} öğe. Yaklaşık {Math.max(2, Math.ceil(items.length / 3))} dakika.</p>
          <button className="button-primary" onClick={() => setPhase('memorize')}>Hazırım, başlayalım</button>
        </div>
      </div>
    )
  }

  if (phase === 'memorize') {
    return (
      <div className="page">
        <button className="back-link" onClick={onExit}>← Çıkış</button>
        <p className="meta-line">Adım 1 / 2: Görselleştir</p>
        <h1>Her nesneye bir yer bul.</h1>
        <p className="lead">Nesneleri sırayla incele. Her birini belirtilen noktada çok canlı bir şekilde hayal et.</p>
        <div className="memory-grid">
          {items.map(item => (
            <article className="memory-tile" key={item.id}>
              <div className="memory-emoji" aria-hidden="true">{item.emoji}</div>
              <strong>{item.word}</strong>
              <span><MapPin size={14} aria-hidden="true" /> {item.location}</span>
            </article>
          ))}
        </div>
        <p className="exercise-tip">Her görüntüyü birkaç saniye zihninde canlandır. Abartılı ve hareketli olması hatırlamana yardımcı olur.</p>
        <button className="button-primary" onClick={() => setPhase('recall')}>Görselleri gizle ve hatırla</button>
      </div>
    )
  }

  return (
    <div className="page narrow-page">
      <button className="back-link" onClick={onExit}>← Çıkış</button>
      <p className="meta-line">Adım 2 / 2: Hatırla</p>
      <h1>Sarayında neler vardı?</h1>
      <p className="lead">Görseller artık yok. Hatırladığın kelimeleri doğru yerlerin karşısına yaz.</p>
      <div className="recall-list">
        {items.map((item, index) => (
          <label className="recall-row" key={item.id}>
            <span className="recall-index">{index + 1}</span>
            <span className="recall-location">{item.location}</span>
            <input value={answers[item.id] ?? ''} onChange={event => updateAnswer(item, event.target.value)} placeholder="Hatırladığın kelime" disabled={checked} />
            {checked && <span className={`answer-mark ${isCorrect(item) ? 'correct' : 'wrong'}`}>{isCorrect(item) ? <><Check size={18} aria-hidden="true" /> Doğru</> : <>Doğrusu: {item.word}</>}</span>}
          </label>
        ))}
      </div>
      {showHint && <p className="hint-panel">İpucu: Rotanı giriş kapısından başlayarak zihninde yeniden gez. Her odada bıraktığın görüntüyü ara.</p>}
      <div className="recall-actions">
        <button className="button-link" onClick={() => setShowHint(value => !value)}>{showHint ? 'İpucunu gizle' : 'Bir ipucu ver'}</button>
        {!checked
          ? <button className="button-primary" onClick={() => setChecked(true)}>Cevapları kontrol et</button>
          : <button className="button-primary" onClick={() => onFinish(score, items.length)}>Sonuçları gör</button>}
      </div>
      {checked && <p className="inline-score">{items.length} kelimeden <strong>{score}</strong> tanesini doğru hatırladın.</p>}
    </div>
  )
}
