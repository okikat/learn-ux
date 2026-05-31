import { useState } from 'react'
import styles from './SocialProofDemo.module.css'

type Choice = 'plain' | 'proof'

export default function SocialProofDemo() {
  const [vote, setVote] = useState<Choice | null>(null)
  const [tally, setTally] = useState({ plain: 0, proof: 0 })

  const cast = (c: Choice) => {
    if (vote !== null) return
    setVote(c)
    setTally((t) => ({ ...t, [c]: t[c] + 1 }))
  }

  const total = tally.plain + tally.proof
  const pct = (n: number) => (total === 0 ? 0 : Math.round((n / total) * 100))

  return (
    <div className={styles.demo}>
      <p className={styles.q}>同じ商品・同じ値段。買うならどっち？</p>

      <div className={styles.cards}>
        <button
          type="button"
          className={`${styles.card} ${vote === 'plain' ? styles.picked : ''}`}
          onClick={() => cast('plain')}
          disabled={vote !== null}
        >
          <span className={styles.thumb} aria-hidden="true" />
          <span className={styles.name}>モバイルバッテリー</span>
          <span className={styles.price}>¥2,980</span>
        </button>

        <button
          type="button"
          className={`${styles.card} ${vote === 'proof' ? styles.picked : ''}`}
          onClick={() => cast('proof')}
          disabled={vote !== null}
        >
          <span className={styles.badge}>人気No.1</span>
          <span className={styles.thumb} aria-hidden="true" />
          <span className={styles.name}>モバイルバッテリー</span>
          <span className={styles.stars}>★4.8（1,240件）</span>
          <span className={styles.price}>¥2,980</span>
        </button>
      </div>

      {vote !== null && (
        <div className={styles.reveal} aria-live="polite">
          <p>
            中身が同じでも、<strong>★評価・件数・「人気No.1」</strong>が付いた方を選びたくなります。
          </p>
          <div className={styles.tally}>
            <Bar label="評価なし" value={tally.plain} pct={pct(tally.plain)} />
            <Bar label="社会的証明あり" value={tally.proof} pct={pct(tally.proof)} hi />
          </div>
          <p className={styles.small}>
            迷うとき、人は「多くの人の選択」を手がかりにする——これが社会的証明。ただし“やらせ”は厳禁。
          </p>
          <button type="button" className={styles.again} onClick={() => setVote(null)}>
            もう一度
          </button>
        </div>
      )}
    </div>
  )
}

function Bar({ label, value, pct, hi }: { label: string; value: number; pct: number; hi?: boolean }) {
  return (
    <div className={styles.barRow}>
      <span className={styles.barLabel}>{label}</span>
      <span className={styles.track}>
        <span className={`${styles.fill} ${hi ? styles.fillHi : ''}`} style={{ width: `${pct}%` }} />
      </span>
      <span className={styles.barVal}>
        {value}票（{pct}%）
      </span>
    </div>
  )
}
