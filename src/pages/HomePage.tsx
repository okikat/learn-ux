import { Link } from 'react-router-dom'
import { laws, categories, biases, biasPack } from '../data/laws'
import LawCard from '../components/LawCard'
import styles from './HomePage.module.css'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function HomePage() {
  return (
    <div className="container">
      <section className={styles.hero}>
        <p className={styles.kicker}>INTERACTIVE · LAWS OF UX</p>
        <h1 className={styles.title}>
          <em>さわって</em>学ぶUX
        </h1>
        <p className={styles.lead}>
          各法則に、小さな実験を1つずつ。ボタンを押し、数字を覚え、入力し——
          <br />
          あなた自身の操作で「UXの法則」が一瞬で身につきます。
        </p>
        <p className={styles.freeBadge}>
          <span className={styles.freeMark}>FREE</span>
          20の法則、無料で公開中。
        </p>
        <Link to="/intro" className={styles.introLink}>
          📖 はじめての方へ
        </Link>
      </section>

      {/* カテゴリへジャンプ（長い一覧を素早く回遊できるように） */}
      <nav className={styles.catNav} aria-label="カテゴリへ移動">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={styles.catChip}
            onClick={() => scrollToId(cat.id)}
          >
            {cat.label}
          </button>
        ))}
        <button
          type="button"
          className={`${styles.catChip} ${styles.catChipPro}`}
          onClick={() => scrollToId('pro')}
        >
          認知バイアス（PRO）
        </button>
      </nav>

      {categories.map((cat) => {
        const items = laws.filter((l) => l.category === cat.id)
        if (items.length === 0) return null
        return (
          <section key={cat.id} id={cat.id} className={styles.section} aria-label={cat.label}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>{cat.label}</h2>
              <p className={styles.sectionBlurb}>{cat.blurb}</p>
            </div>
            <ul className={styles.grid}>
              {items.map((law) => (
                <li key={law.id} className={styles.cell}>
                  <LawCard law={law} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      {/* 有料パック（認知バイアス）。無料20とハッキリ分けて表示する。 */}
      <section id="pro" className={styles.proSection} aria-label={biasPack.label}>
        <div className={styles.proHead}>
          <span className={styles.proTag}>PRO ・ {biasPack.price}</span>
          <h2 className={styles.sectionTitle}>{biasPack.label}</h2>
          <p className={styles.sectionBlurb}>{biasPack.blurb}</p>
          <p className={styles.proNote}>
            無料の20法則で物足りない人へ。判断のクセを突く実践編です。
          </p>
        </div>
        <ul className={styles.grid}>
          {biases.map((law) => (
            <li key={law.id} className={styles.cell}>
              <LawCard law={law} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
