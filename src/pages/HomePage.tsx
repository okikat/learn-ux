import { laws } from '../data/laws'
import LawCard from '../components/LawCard'
import styles from './HomePage.module.css'

export default function HomePage() {
  const readyCount = laws.filter((l) => l.ready).length

  return (
    <div className="container">
      <section className={styles.hero}>
        <p className={styles.kicker}>INTERACTIVE · 10 LAWS OF UX</p>
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
        <p className={styles.progress} aria-live="polite">
          デモ実装済み {readyCount} / {laws.length} 法則
        </p>
      </section>

      <nav aria-label="UXの法則一覧">
        <ul className={styles.grid}>
          {laws.map((law) => (
            <li key={law.id} className={styles.cell}>
              <LawCard law={law} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
