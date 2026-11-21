import { useRef, useState } from 'react'
import { Plus, X } from 'lucide-react'
import EmojiPicker from '../components/EmojiPicker'
import type { CustomLevel } from '../types'

const MIN_ITEMS = 3
const MAX_ITEMS = 15
const DEFAULT_EMOJI = '✨'

type Row = { key: number; word: string; emoji: string; location: string }

type Props = {
  customLevels: CustomLevel[]
  onSave: (level: CustomLevel) => void
  onDelete: (id: number) => void
  onTest: (id: number) => void
}

export default function Create({ customLevels, onSave, onDelete, onTest }: Props) {
  const nextKey = useRef(0)
  const blankRow = (): Row => ({ key: nextKey.current++, word: '', emoji: DEFAULT_EMOJI, location: '' })
  const blankRows = () => Array.from({ length: MIN_ITEMS }, blankRow)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [rows, setRows] = useState<Row[]>(blankRows)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [confirmId, setConfirmId] = useState<number | null>(null)

  const updateRow = (key: number, patch: Partial<Row>) => {
    setRows(current => current.map(row => row.key === key ? { ...row, ...patch } : row))
    setError('')
    setStatus('')
  }

  const addRow = () => setRows(current => current.length < MAX_ITEMS ? [...current, blankRow()] : current)
  const removeRow = (key: number) => setRows(current => current.length > MIN_ITEMS ? current.filter(row => row.key !== key) : current)

  const reset = () => {
    setEditingId(null)
    setName('')
    setRows(blankRows())
    setError('')
  }

  const startEdit = (level: CustomLevel) => {
    setEditingId(level.id)
    setName(level.name)
    const loaded = level.items.map(item => ({ key: nextKey.current++, word: item.word, emoji: item.emoji, location: item.location }))
    while (loaded.length < MIN_ITEMS) loaded.push(blankRow())
    setRows(loaded)
    setError('')
    setStatus('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const build = (): CustomLevel | null => {
    const filled: Row[] = []
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index]
      const hasWord = row.word.trim() !== ''
      const hasLocation = row.location.trim() !== ''
      if (hasWord !== hasLocation) {
        setError(`${index + 1}. satırda nesne ve yer birlikte doldurulmalı.`)
        return null
      }
      if (hasWord) filled.push(row)
    }
    if (filled.length < MIN_ITEMS) {
      setError(`En az ${MIN_ITEMS} nesne ve yer girmelisin.`)
      return null
    }
    const words = filled.map(row => row.word.trim().toLocaleLowerCase('tr'))
    if (new Set(words).size !== words.length) {
      setError('Aynı nesneyi iki kez girmişsin. Her nesne farklı olmalı.')
      return null
    }
    return {
      id: editingId ?? Date.now(),
      name: name.trim() || 'Benim bölümüm',
      items: filled.map((row, index) => ({ id: index + 1, word: row.word.trim(), emoji: row.emoji, location: row.location.trim() })),
    }
  }

  const save = (thenTest: boolean) => {
    const level = build()
    if (!level) return
    onSave(level)
    if (thenTest) {
      onTest(level.id)
      return
    }
    reset()
    setStatus(`“${level.name}” kaydedildi.`)
  }

  return (
    <div className="page narrow-page create-page">
      <header className="page-head">
        <h1>Kendi bölümünü yap.</h1>
        <p className="lead">Hatırlamak istediğin nesneleri ve onları bırakacağın yerleri yaz, her nesneye bir emoji seç. Sonra bölümünü test et.</p>
      </header>

      <section className="editor" aria-labelledby="editor-title">
        <h2 id="editor-title">{editingId === null ? 'Yeni bölüm' : 'Bölümü düzenle'}</h2>
        <label className="field">
          <span>Bölümün adı</span>
          <input value={name} maxLength={40} placeholder="Örneğin: Market listem" onChange={event => { setName(event.target.value); setStatus('') }} />
        </label>

        <div className="editor-head" aria-hidden="true">
          <span>#</span><span>Emoji</span><span>Nesne</span><span>Yer</span><span />
        </div>
        <ol className="editor-rows">
          {rows.map((row, index) => (
            <li className="editor-row" key={row.key}>
              <span className="recall-index">{index + 1}</span>
              <EmojiPicker value={row.emoji} label={`${index + 1}. nesne`} onChange={emoji => updateRow(row.key, { emoji })} />
              <input aria-label={`${index + 1}. nesne`} value={row.word} maxLength={30} placeholder="Nesne (örn. Süt)" onChange={event => updateRow(row.key, { word: event.target.value })} />
              <input aria-label={`${index + 1}. yer`} value={row.location} maxLength={30} placeholder="Yer (örn. Salon)" onChange={event => updateRow(row.key, { location: event.target.value })} />
              <button type="button" className="icon-button" aria-label={`${index + 1}. satırı sil`} disabled={rows.length <= MIN_ITEMS} onClick={() => removeRow(row.key)}><X size={18} aria-hidden="true" /></button>
            </li>
          ))}
        </ol>

        <button type="button" className="button-link add-row" disabled={rows.length >= MAX_ITEMS} onClick={addRow}>
          <Plus size={16} aria-hidden="true" /> Satır ekle ({rows.length} / {MAX_ITEMS})
        </button>

        {error && <p className="form-error" role="alert">{error}</p>}
        {status && <p className="form-status" role="status">{status}</p>}

        <div className="recall-actions">
          {editingId !== null && <button type="button" className="button-link" onClick={reset}>Vazgeç</button>}
          <button type="button" className="button-link" onClick={() => save(false)}>Kaydet</button>
          <button type="button" className="button-primary" onClick={() => save(true)}>Kaydet ve test et</button>
        </div>
      </section>

      <section className="saved-levels" aria-labelledby="saved-title">
        <h2 id="saved-title">Kayıtlı bölümlerin</h2>
        {customLevels.length === 0 ? (
          <p className="levels-hint">Henüz kendi bölümün yok. Yukarıdan ilkini oluşturabilirsin.</p>
        ) : (
          <ul className="saved-list">
            {customLevels.map(level => (
              <li className="saved-row" key={level.id}>
                <div>
                  <strong>{level.name}</strong>
                  <p>{level.items.length} öğe: {level.items.map(item => item.emoji).join(' ')}</p>
                </div>
                <div className="saved-actions">
                  {confirmId === level.id ? (
                    <>
                      <span>Silinsin mi?</span>
                      <button type="button" className="button-link" onClick={() => { onDelete(level.id); setConfirmId(null); if (editingId === level.id) reset() }}>Evet, sil</button>
                      <button type="button" className="button-link" onClick={() => setConfirmId(null)}>Vazgeç</button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="button-primary small" onClick={() => onTest(level.id)}>Test et</button>
                      <button type="button" className="button-link" onClick={() => startEdit(level)}>Düzenle</button>
                      <button type="button" className="button-link" onClick={() => setConfirmId(level.id)}>Sil</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
