import { Brain, Eye, MapPin, Repeat2 } from 'lucide-react'
import type { Page } from '../types'

type Props = { onNavigate: (page: Page) => void }

const exampleStops = [
  {
    place: 'Giriş kapısı, ayakkabılık',
    item: 'Yumurta',
    photo: '/images/yumurta-ayakkabilik.jpg',
    photoAlt: 'Kapının yanındaki ayakkabılık baştan aşağı kırık yumurtalarla kaplı; sarılar raflardan aşağı akıyor',
    scene: 'Eve giriyorsun. Kapının yanındaki ayakkabılığın her rafında kırık yumurtalar var. Sarılar ayakkabıların üstünden süzülüyor, paspasın üstünde koca bir gölet oluşmuş.',
  },
  {
    place: 'Salon, sehpa',
    item: 'Süt',
    photo: '/images/sut-sisesi-salon.jpg',
    photoAlt: 'Salondaki sehpanın üstünde duran devasa bir süt şişesi',
    scene: 'Salona geçiyorsun. Sehpanın üstünde koltuklardan bile büyük bir süt şişesi duruyor. Üzerinde “Pure Milk” yazıyor ve ağzına kadar dolu.',
  },
  {
    place: 'Çalışma masası, bilgisayar',
    item: 'Sucuk',
    photo: '/images/sucuk-klavye.jpg',
    photoAlt: 'Dizüstü bilgisayarın klavyesindeki bütün tuşlar sucuk dilimi; dokunmatik yüzey de üst üste sucuklarla kaplı',
    scene: 'Bilgisayarını açıyorsun ama klavyedeki bütün tuşlar sucuk dilimi. Yazdıkça parmakların yağlanıyor, dokunmatik yüzeyin yerinde ise üst üste dizilmiş sucuklar var.',
  },
]

export default function Learn({ onNavigate }: Props) {
  return (
    <div className="page learn-page">
      <header className="page-head">
        <h1>Zihninde bir yer aç.</h1>
        <p className="lead">Hafıza sarayı, hatırlamak istediğin bilgileri iyi bildiğin bir mekânın belirli noktalarına yerleştirme yöntemidir. O yerde zihninden yürürken, bıraktığın bilgileri de sırayla bulursun.</p>
      </header>

      <p className="aside-note">Hayalinde tanıdık bir mekân seç: evin, okulun ya da her köşesini bildiğin başka bir yer. Gerçek bir yer olması bile şart değil.</p>

      <section className="lesson-section">
        <h2>Bir alışveriş listesini saraya yerleştirelim</h2>
        <p className="section-lead">Almamız gereken üç şey var: yumurta, süt ve sucuk. Evin içinde sabit bir rota çiziyoruz ve her duraktaki şeyi olabildiğince abartıyoruz.</p>
        <ol className="example-route">
          {exampleStops.map((stop, index) => (
            <li className="stop" key={stop.item}>
              <img className="stop-photo" src={stop.photo} alt={stop.photoAlt} loading="lazy" />
              <div className="stop-copy">
                <p className="stop-place"><span className="stop-number">{index + 1}</span> <MapPin size={16} aria-hidden="true" /> {stop.place}</p>
                <h3>{stop.item}</h3>
                <p>{stop.scene}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="recall-callout">
          <Brain size={24} aria-hidden="true" />
          <div>
            <strong>Şimdi listeyi hatırlamayı dene.</strong>
            <p>Gözlerini kapat ve evin girişinden başla. Ayakkabılıkta ne vardı? Salonda sehpanın üstünde ne duruyordu? Bilgisayarı açtığında tuşlar neye dönüşmüştü?</p>
          </div>
        </div>
      </section>

      <section className="lesson-section">
        <h2>Hafıza sarayı nasıl kurulur?</h2>
        <ol className="lesson-steps">
          <li><MapPin size={24} aria-hidden="true" /><div><h3>Bir rota belirle</h3><p>Giriş kapısından başla ve odaları hep aynı sırayla dolaş.</p></div></li>
          <li><Eye size={24} aria-hidden="true" /><div><h3>Canlı görüntüler oluştur</h3><p>Bilgiyi komik, şaşırtıcı, büyük ya da dağınık bir görüntüye çevir.</p></div></li>
          <li><Repeat2 size={24} aria-hidden="true" /><div><h3>Zihninde yeniden gez</h3><p>Rotayı baştan sona yürü ve her durakta bıraktığın görüntüyü hatırla.</p></div></li>
        </ol>
      </section>

      <section className="lesson-section">
        <h2>Ekranda hafıza sarayı</h2>
        <p className="section-lead">Bu tekniği dizilerde görmüş olabilirsin. İki tanıdık karakter, yöntemi hatırlamak için iyi birer örnek.</p>
        <div className="detective-grid">
          <article className="detective-card">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Sherlock_serie.jpg" alt="Sherlock Holmes ve John Watson" loading="lazy" />
            <div className="detective-copy">
              <p className="detective-show">Sherlock</p>
              <h3>Sherlock Holmes</h3>
              <p>BBC’nin <em>Sherlock</em> dizisinde Sherlock, zihnindeki mekânlara dönerek ipuçlarını ve bilgileri hatırlar. Dizi bu tekniği “mind palace” olarak adlandırır.</p>
              <a href="https://www.smithsonianmag.com/arts-culture/secrets-sherlocks-mind-palace-180949567/" target="_blank" rel="noreferrer">Hafıza sarayı hakkında oku</a>
            </div>
          </article>
          <article className="detective-card">
            <img src="https://sire-media-star.techops.disn.io/fox_nl/serie-main/638181.640x640.jpg" alt="The Mentalist dizisinde Patrick Jane" loading="lazy" />
            <div className="detective-copy">
              <p className="detective-show">The Mentalist</p>
              <h3>Patrick Jane</h3>
              <p>Patrick Jane de dizide hafıza sarayı tekniğiyle ilişkilendirilir. Karakterin zihinsel mekânlar ve anılar arasındaki bağı kullanışı akademik bir çalışmada da incelenmiştir.</p>
              <a href="https://journals.unibuc.ro/index.php/ubr/en/article/view/2699" target="_blank" rel="noreferrer">Akademik çalışmayı incele</a>
            </div>
          </article>
        </div>
        <p className="image-credit">Görseller: Sherlock, Wikimedia Commons (CC0). Patrick Jane, STAR Channel tanıtım görseli; yeniden kullanım koşulları ayrıca kontrol edilmelidir. Görseller çevrim içi bağlantıdan yüklenir.</p>
      </section>

      <p className="tip-box"><strong>Unutma:</strong> Görüntü ne kadar canlı ve sıra dışıysa, onu hatırlamak o kadar kolay olur. Sıradan bir yumurta yerine ayakkabılıktan sarısı akan yüzlerce yumurta hayal et.</p>
      <button className="button-primary" onClick={() => onNavigate('levels')}>İlk bölüme geç</button>
    </div>
  )
}
