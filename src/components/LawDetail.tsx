import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { LawMeta } from '../types'
import { laws, biases } from '../data/laws'
import styles from './LawDetail.module.css'

/**
 * 1つの法則ページの「型」。全法則がこの4点セットで構成される:
 *  ①一言定義 ②解説 ③インタラクティブ・デモ＋気づき ④実践Tips
 */
export default function LawDetail({ law }: { law: LawMeta }) {
  // 前後ナビは「同じセット内」で完結させる（無料20 / 有料パックを混ぜない）
  const set = law.tier === 'pro' ? biases : laws
  const index = set.findIndex((l) => l.id === law.id)
  const prev = index > 0 ? set[index - 1] : null
  const next = index < set.length - 1 ? set[index + 1] : null
  const Demo = law.Demo

  return (
    <article
      className={`container ${styles.article}`}
      style={{ '--card-accent': law.accent } as CSSProperties}
    >
      <header className={styles.head}>
        <span className={styles.no}>LAW {law.no}</span>
        <h1 className={styles.title}>{law.titleJa}</h1>
        <p className={styles.titleEn}>{law.titleEn}</p>
      </header>

      {/* ①一言定義 */}
      <p className={styles.tagline}>{law.tagline}</p>

      {/* ②解説 */}
      <section className={styles.section} aria-label="解説">
        {law.description.map((para, i) => (
          <p key={i} className={styles.para}>
            {para}
          </p>
        ))}
      </section>

      {/* ③インタラクティブ・デモ */}
      <section className={styles.section} aria-label="インタラクティブ・デモ">
        <h2 className={styles.h2}>
          <span className={styles.h2icon} aria-hidden="true">
            ▶
          </span>
          さわって体感する
        </h2>
        <div className={styles.demoFrame}>
          <Demo />
        </div>
        <aside className={styles.takeaway}>
          <span className={styles.takeawayLabel}>この体験から分かること</span>
          <p className={styles.takeawayText}>{law.takeaway}</p>
        </aside>
      </section>

      {/* ④実践Tips */}
      <section className={styles.section} aria-label="実践のヒント">
        <h2 className={styles.h2}>だから、設計ではこうする</h2>
        <ul className={styles.tips}>
          {law.tips.map((tip) => (
            <li key={tip.slice(0, 12)} className={styles.tip}>
              <span className={styles.tipMark} aria-hidden="true">
                ✓
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 法則間の行き来（前/次のみ・note記事下風の上下2段）。先頭/末尾は不可方向をグレー無効化。 */}
      <nav className={styles.pager} aria-label="ほかの法則へ">
        {prev ? (
          <Link to={`/laws/${prev.slug}`} className={styles.pagerLink}>
            <span className={styles.pagerArrow} aria-hidden="true">‹</span>
            <span className={styles.pagerBody}>
              <span className={styles.pagerDir}>前の法則</span>
              <span className={styles.pagerName}>{prev.titleJa}</span>
            </span>
          </Link>
        ) : (
          <span className={`${styles.pagerLink} ${styles.pagerDisabled}`} aria-hidden="true">
            <span className={styles.pagerArrow}>‹</span>
            <span className={styles.pagerBody}>
              <span className={styles.pagerDir}>前の法則</span>
              <span className={styles.pagerName}>これが最初です</span>
            </span>
          </span>
        )}

        {next ? (
          <Link to={`/laws/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span className={styles.pagerBody}>
              <span className={styles.pagerDir}>次の法則</span>
              <span className={styles.pagerName}>{next.titleJa}</span>
            </span>
            <span className={styles.pagerArrow} aria-hidden="true">›</span>
          </Link>
        ) : (
          <span
            className={`${styles.pagerLink} ${styles.pagerNext} ${styles.pagerDisabled}`}
            aria-hidden="true"
          >
            <span className={styles.pagerBody}>
              <span className={styles.pagerDir}>次の法則</span>
              <span className={styles.pagerName}>これで最後です</span>
            </span>
            <span className={styles.pagerArrow}>›</span>
          </span>
        )}
      </nav>
    </article>
  )
}
