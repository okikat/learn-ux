import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { LawMeta } from '../types'
import styles from './LawCard.module.css'

/** トップページの一覧カード1枚。 */
export default function LawCard({ law }: { law: LawMeta }) {
  return (
    <Link
      to={`/laws/${law.slug}`}
      className={styles.card}
      style={{ '--card-accent': law.accent } as CSSProperties}
    >
      <div className={styles.top}>
        <span className={styles.no}>{law.no}</span>
        {law.tier === 'pro' && <span className={styles.pro}>PRO</span>}
        {!law.ready && <span className={styles.soon}>準備中</span>}
      </div>
      <h3 className={styles.titleJa}>{law.titleJa}</h3>
      <p className={styles.titleEn}>{law.titleEn}</p>
      <p className={styles.tagline}>{law.tagline}</p>
      <span className={styles.cta} aria-hidden="true">
        さわってみる →
      </span>
    </Link>
  )
}
