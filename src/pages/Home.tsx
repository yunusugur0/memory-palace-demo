import type { Page } from '../types'

type Props = { onNavigate: (page: Page) => void }

export default function Home({ onNavigate }: Props) {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <h1>Hayal et.<br />Yerleştir.<br />Hatırla.</h1>
          <p className="lead">Hafıza sarayı, hatırlamak istediğin şeyleri iyi bildiğin bir mekânın köşelerine yerleştirme yöntemidir. Önce yöntemi tanıyacak, sonra dokuz bölümle deneyeceksin.</p>
          <div className="actions">
            <button className="button-primary" onClick={() => onNavigate('learn')}>Yöntemi öğren</button>
            <button className="button-link" onClick={() => onNavigate('levels')}>Doğrudan bölümlere geç</button>
          </div>
        </div>
        <figure className="hero-figure">
          <img src="/images/sut-sisesi-salon.jpg" alt="Salondaki sehpanın üstünde duran devasa bir süt şişesi" />
          <figcaption>Salonun ortasında dev bir süt şişesi. Böyle bir görüntüyü unutmak zor.</figcaption>
        </figure>
      </section>

      <section className="home-notes">
        <div>
          <h2>Hafıza sarayı nedir?</h2>
          <p>Bilgileri, evin gibi tanıdık bir yerin belirli noktalarına bırakırsın. Hatırlamak istediğinde o yerde zihninden yürürsün ve bıraktıklarını sırayla bulursun.</p>
          <button className="button-link" onClick={() => onNavigate('learn')}>Örneklerle gör</button>
        </div>
        <div>
          <h2>Üç seviye, dokuz bölüm</h2>
          <p>Kolay seviyede beş nesneyle başlarsın, orta seviyede on kelimeye çıkarsın, zor seviyede sayıları ve soyut kavramları da saraya yerleştirirsin. Her seviyede üç farklı bölüm var.</p>
          <button className="button-link" onClick={() => onNavigate('levels')}>Bölümleri gör</button>
        </div>
      </section>
    </div>
  )
}
