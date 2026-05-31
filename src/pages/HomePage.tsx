import { laws, categories } from '../data/laws'
import LawCard from '../components/LawCard'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <div className="container">
      <section className={styles.hero}>
        <p className={styles.kicker}>INTERACTIVE · 20 LAWS OF UX</p>
        <h1 className={styles.title}>
          UXの法則を、読むのではなく
          <br />
          <em>触って</em>体感する。
        </h1>
        <p className={styles.lead}>
          各法則に、小さな実験を1つずつ。ボタンを押し、数字を覚え、入力し——
          あなた自身の操作で「なるほど」が一瞬で腑に落ちます。
          このアプリ自身も、ここで学ぶ法則に従って作っています。
        </p>
        <p className={styles.freeBadge}>
          <span className={styles.freeMark}>FREE</span>
          20の法則、ぜんぶ無料で公開中。
        </p>
      </section>

      {categories.map((cat) => {
        const items = laws.filter((l) => l.category === cat.id)
        if (items.length === 0) return null
        return (
          <section key={cat.id} className={styles.section} aria-label={cat.label}>
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
    </div>
  )
}
