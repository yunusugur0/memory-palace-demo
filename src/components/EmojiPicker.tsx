import { useEffect, useRef, useState } from 'react'

const groups: { label: string; emojis: string[] }[] = [
  { label: 'Yiyecek', emojis: ['🍎', '🍌', '🍇', '🍓', '🍉', '🍑', '🍋', '🥕', '🌽', '🍞', '🧀', '🥚', '🍕', '🍔', '🍟', '🍫', '🍪', '🍩', '☕', '🥛', '🍯', '🥐', '🍅', '🥑'] },
  { label: 'Hayvan', emojis: ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐸', '🐵', '🐔', '🐧', '🦉', '🦋', '🐢', '🐠', '🐬', '🐘', '🦒', '🦁', '🐍'] },
  { label: 'Eşya', emojis: ['🔑', '📚', '✏️', '📱', '💡', '⌚', '🎸', '📷', '🎧', '🔨', '✂️', '🧲', '🔭', '🔬', '🕯️', '🧭', '⚽', '🎲', '🎁', '💼', '☂️', '👓', '👑', '🛏️'] },
  { label: 'Doğa ve yer', emojis: ['🌳', '🌸', '🌻', '🌈', '☀️', '🌙', '⭐', '⛰️', '🌊', '🔥', '❄️', '⚡', '🏠', '🏰', '🚲', '🚗', '✈️', '🚀', '⛵', '🌍'] },
  { label: 'Sembol', emojis: ['✨', '❤️', '💎', '🔔', '🎯', '✅', '❓', '💬', '🧩', '🔢', '⚖️', '⏳', '🕊️', '💪', '🧠', '🎵', '🏆', '📅', '🎉', '🌱'] },
]

type Props = { value: string; onChange: (emoji: string) => void; label: string }

export default function EmojiPicker({ value, onChange, label }: Props) {
  const [open, setOpen] = useState(false)
  const [group, setGroup] = useState(0)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (event: MouseEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="emoji-picker" ref={root}>
      <button type="button" className="emoji-trigger" aria-label={`${label}: emoji seç, şu an ${value}`} aria-expanded={open} onClick={() => setOpen(current => !current)}>
        <span aria-hidden="true">{value}</span>
      </button>
      {open && (
        <div className="emoji-panel" role="dialog" aria-label="Emoji seç">
          <div className="emoji-tabs">
            {groups.map((item, index) => (
              <button type="button" key={item.label} aria-pressed={group === index} onClick={() => setGroup(index)}>{item.label}</button>
            ))}
          </div>
          <div className="emoji-grid">
            {groups[group].emojis.map(emoji => (
              <button type="button" key={emoji} className={emoji === value ? 'selected' : ''} aria-label={`Emoji ${emoji}`} onClick={() => { onChange(emoji); setOpen(false) }}>
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
