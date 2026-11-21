import type { CustomLevel, Difficulty, ExerciseItem, Level, Playable } from '../types'

export const difficulties: Difficulty[] = ['Kolay', 'Orta', 'Zor']

export const levels: Level[] = [
  // Kolay: 5 öğe
  { id: 1, section: 1, name: 'İlk Adımlar', subtitle: 'Hafıza sarayınla tanış', description: 'Beş tanıdık nesneyi evinin farklı noktalarına yerleştir.', itemCount: 5, difficulty: 'Kolay', color: 'gold', unlocked: true },
  { id: 2, section: 2, name: 'Mutfak Turu', subtitle: 'Sofrayı zihninde kur', description: 'Kahvaltı sofrasındaki beş şeyi mutfakta kısa bir rotaya bırak.', itemCount: 5, difficulty: 'Kolay', color: 'gold', unlocked: true },
  { id: 3, section: 3, name: 'Çıkmadan Önce', subtitle: 'Çantanı hazırla', description: 'Evden çıkarken yanına alacağın beş şeyi sırayla yerleştir.', itemCount: 5, difficulty: 'Kolay', color: 'gold', unlocked: true },

  // Orta: 10 öğe
  { id: 4, section: 1, name: 'Sarayın Koridorları', subtitle: 'Rotanı genişlet', description: 'İki oda arasında ilerle ve on kelimeyi doğru sırayla hatırla.', itemCount: 10, difficulty: 'Orta', color: 'teal', unlocked: true },
  { id: 5, section: 2, name: 'Usta Atölyesi', subtitle: 'Aletleri sırayla yerleştir', description: 'On alet ve gereci evin köşelerine, sırayı bozmadan yerleştir.', itemCount: 10, difficulty: 'Orta', color: 'teal', unlocked: true },
  { id: 6, section: 3, name: 'Vahşi Rota', subtitle: 'Hayvanlarla yürü', description: 'On hayvanı odalar arasında dolaştır ve sırayla hatırla.', itemCount: 10, difficulty: 'Orta', color: 'teal', unlocked: true },

  // Zor: 15 öğe
  { id: 7, section: 1, name: 'Ustalık Sınavı', subtitle: 'Zihninin sınırlarını keşfet', description: 'Nesneleri, sayıları ve soyut kavramları bir arada hatırla.', itemCount: 15, difficulty: 'Zor', color: 'violet', unlocked: true },
  { id: 8, section: 2, name: 'Tarih Yolculuğu', subtitle: 'Yılları ve kavramları birleştir', description: 'Önemli yılları ve soyut kavramları aynı rotada hatırla.', itemCount: 15, difficulty: 'Zor', color: 'violet', unlocked: true },
  { id: 9, section: 3, name: 'Bilim ve Düşünce', subtitle: 'Sayılar ve fikirler', description: 'Bilimden sayıları, kavramları ve yöntemleri tek bir sarayda topla.', itemCount: 15, difficulty: 'Zor', color: 'violet', unlocked: true },
]

const mediumRoute = ['Giriş kapısı', 'Ayakkabılık', 'Salon', 'Pencere', 'Mutfak', 'Koridor', 'Merdiven', 'Çalışma odası', 'Kitaplık', 'Balkon']
const hardRoute = [...mediumRoute, 'Bahçe', 'Teras', 'Banyo', 'Garaj', 'Çatı katı']

const build = (route: string[], entries: [string, string][]): ExerciseItem[] =>
  entries.map(([word, emoji], index) => ({ id: index + 1, word, emoji, location: route[index] }))

export const exercises: Record<number, ExerciseItem[]> = {
  // Kolay 1: İlk Adımlar
  1: build(['Giriş kapısı', 'Ayakkabılık', 'Salon', 'Duvar', 'Yatak odası'], [
    ['Elma', '🍎'], ['Anahtar', '🗝️'], ['Bisiklet', '🚲'], ['Saat', '🕰️'], ['Şemsiye', '☂️'],
  ]),
  // Kolay 2: Mutfak Turu
  2: build(['Mutfak kapısı', 'Buzdolabı', 'Tezgâh', 'Ocak', 'Yemek masası'], [
    ['Çay', '🫖'], ['Simit', '🥯'], ['Peynir', '🧀'], ['Zeytin', '🫒'], ['Bal', '🍯'],
  ]),
  // Kolay 3: Çıkmadan Önce
  3: build(['Portmanto', 'Koridor aynası', 'Sandalye', 'Çalışma masası', 'Komodin'], [
    ['Defter', '📓'], ['Kalem', '✏️'], ['Gözlük', '👓'], ['Telefon', '📱'], ['Cüzdan', '👛'],
  ]),

  // Orta 1: Sarayın Koridorları
  4: build(mediumRoute, [
    ['Kitap', '📚'], ['Muz', '🍌'], ['Gitar', '🎸'], ['Pusula', '🧭'], ['Kamera', '📷'],
    ['Balık', '🐠'], ['Taç', '👑'], ['Uçurtma', '🪁'], ['Mum', '🕯️'], ['Dürbün', '🔭'],
  ]),
  // Orta 2: Usta Atölyesi
  5: build(mediumRoute, [
    ['Çekiç', '🔨'], ['Testere', '🪚'], ['Cetvel', '📏'], ['Makas', '✂️'], ['Fırça', '🖌️'],
    ['Vida', '🔩'], ['Mıknatıs', '🧲'], ['İp', '🪢'], ['Kova', '🪣'], ['Ampul', '💡'],
  ]),
  // Orta 3: Vahşi Rota
  6: build(mediumRoute, [
    ['Fil', '🐘'], ['Zürafa', '🦒'], ['Penguen', '🐧'], ['Kaplumbağa', '🐢'], ['Papağan', '🦜'],
    ['Maymun', '🐒'], ['Timsah', '🐊'], ['Kurbağa', '🐸'], ['Kartal', '🦅'], ['Yunus', '🐬'],
  ]),

  // Zor 1: Ustalık Sınavı
  7: build(hardRoute, [
    ['Adalet', '⚖️'], ['Gezegen', '🪐'], ['42', '🔢'], ['Pusula', '🧭'], ['Cesaret', '🦁'],
    ['1903', '📅'], ['Zaman', '⏳'], ['Mikroskop', '🔬'], ['Özgürlük', '🕊️'], ['27', '🔢'],
    ['Enerji', '⚡'], ['Köprü', '🌉'], ['Merak', '🔍'], ['Deniz', '🌊'], ['Denge', '☯️'],
  ]),
  // Zor 2: Tarih Yolculuğu
  8: build(hardRoute, [
    ['1071', '⚔️'], ['Medeniyet', '🏛️'], ['1299', '🌙'], ['Direniş', '🛡️'], ['1453', '🏰'],
    ['Miras', '📜'], ['1881', '👶'], ['Barış', '🤝'], ['1923', '🎉'], ['Keşif', '🗺️'],
    ['1969', '🚀'], ['Hoşgörü', '🫂'], ['Bilgelik', '🦉'], ['Umut', '🌱'], ['Emek', '⚒️'],
  ]),
  // Zor 3: Bilim ve Düşünce
  9: build(hardRoute, [
    ['Atom', '⚛️'], ['Yerçekimi', '🍎'], ['100', '🌡️'], ['Hücre', '🧫'], ['Evrim', '🦎'],
    ['206', '🦴'], ['Işık', '💫'], ['Teori', '📐'], ['7', '🌈'], ['Deney', '🧪'],
    ['Gözlem', '👁️'], ['Hipotez', '❓'], ['12', '🗓️'], ['Mantık', '🧩'], ['Hayal', '🎨'],
  ]),
}

export function getPlayable(levelId: number, customLevels: CustomLevel[]): Playable {
  const custom = customLevels.find(item => item.id === levelId)
  if (custom) {
    return { id: custom.id, name: custom.name, description: 'Kendi hazırladığın bölüm. Nesneleri ve yerleri sen seçtin.', meta: 'Kendi bölümün', items: custom.items }
  }
  const level = levels.find(item => item.id === levelId) ?? levels[0]
  return { id: level.id, name: level.name, description: level.description, meta: `${level.difficulty} seviye, bölüm ${level.section}`, items: exercises[level.id] }
}
