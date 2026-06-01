import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { biases, biasPack } from '../data/laws'
import styles from './CompletionPage.module.css'

const FREE = 20
const REMAIN = biases.length // 残りの有料法則数
const TOTAL = FREE + REMAIN
const PCT = Math.round((FREE / TOTAL) * 100)

/**
 * 無料20法則の「修了ページ」。法則20の「次」から到達する。
 * このページ自体が、学んだ心理法則の実例になっている（自己言及）:
 *  ピーク・エンド（気持ちよく締める）/ 目標勾配・ツァイガルニク（進捗バーと残り）/
 *  フレーミング（前向きな言い方）/ 保有効果（積み上げた達成）。
 * 種明かしで明かすことで、誘導ではなく“最後の学び”にする。
 */
export default function CompletionPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <main className={`container ${styles.page}`}>
      {/* 祝福（ピーク） */}
      <section className={styles.hero}>
        <div className={styles.burst} role="img" aria-label="お祝い">
          🎉
        </div>
        <h1 className={styles.title}>修了おめでとうございます！</h1>
        <p className={styles.sub}>
          UXの基本「{FREE}の法則」、ぜんぶ制覇しました。
          <br />
          本当におつかれさまでした。
        </p>
      </section>

      {/* 進捗（目標勾配・ツァイガルニク） */}
      <section className={styles.progress} aria-label="コース進捗">
        <div className={styles.progressHead}>
          <span>全法則コンプリートまで</span>
          <span className={styles.progressNum}>
            {FREE} / {TOTAL}
          </span>
        </div>
        <div className={styles.track}>
          <span className={styles.fill} style={{ width: `${PCT}%` }} />
        </div>
        <p className={styles.progressNote}>
          あと<strong>{REMAIN}法則</strong>でコンプリートです。
        </p>
      </section>

      {/* PRO 紹介 */}
      <section className={styles.pro}>
        <span className={styles.proBadge}>PRO</span>
        <h2 className={styles.proTitle}>{biasPack.label}</h2>
        <p className={styles.proMeta}>
          全{REMAIN}法則 ・ {biasPack.price}
        </p>
        <p className={styles.proBlurb}>{biasPack.blurb}</p>
        <ul className={styles.chips}>
          {biases.map((b) => (
            <li key={b.id} className={styles.chip}>
              {b.titleJa}
            </li>
          ))}
        </ul>
        <Link to={`/laws/${biases[0].slug}`} className={styles.cta}>
          認知バイアスへ進む →
        </Link>
        <Link to="/" className={styles.back}>
          トップへ戻る
        </Link>
      </section>

      {/* 種明かし（自己言及） */}
      <section className={styles.reveal} aria-label="種明かし">
        <h2 className={styles.revealTitle}>種明かし 🎭</h2>
        <p className={styles.revealLead}>
          このページ、ちょっと“その気”になりませんでしたか？
          じつは、いま学んだ法則をいくつも使っています。
        </p>
        <ul className={styles.tricks}>
          <li>
            <strong>ピーク・エンドの法則</strong>：最後を「おめでとう🎉」で気持ちよく締めました。
            終わりが良いと、体験全体の印象も上がります。
          </li>
          <li>
            <strong>目標勾配効果</strong>：「あと{REMAIN}でコンプリート」の進捗バー。
            ゴールが見えると、最後のひと押しが効きます。
          </li>
          <li>
            <strong>ツァイガルニク効果</strong>：埋まっていない{REMAIN}法則、なんだか気になりませんか？
          </li>
          <li>
            <strong>フレーミング</strong>：「残り{REMAIN}」ではなく「あと{REMAIN}でコンプリート」。
            同じ事実でも、前向きな言い方を選びました。
          </li>
          <li>
            <strong>保有効果</strong>：ここまで積み上げた“あなたの達成”。手放したくないですよね。
          </li>
        </ul>
        <p className={styles.revealEnd}>
          気づけたなら、もう“使われる側”ではありません。
          <br />
          次は、あなたが<strong>使う側</strong>です。
        </p>
      </section>
    </main>
  )
}
