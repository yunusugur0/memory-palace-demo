type Props = { name: string; score: number; total: number; otherLabel: string; onRetry: () => void; onLevels: () => void }

export default function Results({ name, score, total, otherLabel, onRetry, onLevels }: Props) {
  const percentage = Math.round((score / total) * 100)
  const message = percentage === 100 ? 'Kusursuz bir hatırlama.' : percentage >= 60 ? 'Güzel gidiyorsun.' : 'Her deneme hafızanı güçlendirir.'
  return (
    <div className="page narrow-page results-page">
      <h1>{message}</h1>
      <p className="lead">{name} bölümünü tamamladın.</p>
      <div className="result-score">
        <strong>{score}<span> / {total}</span></strong>
        <p>doğru hatırlama, %{percentage}</p>
        <div className="score-track" role="img" aria-label={`Başarı oranı yüzde ${percentage}`}><div style={{ width: `${percentage}%` }} /></div>
      </div>
      <p className="tip-box">Hafıza sarayını düzenli aralıklarla zihninde yeniden gezmeyi unutma. Tekrar ettikçe rota daha da netleşir.</p>
      <div className="actions centered">
        <button className="button-primary" onClick={onRetry}>Yeniden dene</button>
        <button className="button-link" onClick={onLevels}>{otherLabel}</button>
      </div>
    </div>
  )
}
