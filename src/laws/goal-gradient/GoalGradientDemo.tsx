import { useState } from 'react'
import styles from './GoalGradientDemo.module.css'

/** A: 0/8（まっさら）  B: 2/10（最初から2個押してある＝残りは同じ8個） */
function Card({ filled, total, label }: { filled: number; total: number; label: string }) {
  return (
    <div className={styles.card}>
      <span className={styles.cardLabel}>{label}</span>
      <div className={styles.stamps}>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`${styles.stamp} ${i < filled ? styles.on : ''}`}>
            {i < filled ? '★' : ''}
          </span>
        ))}
      </div>
      <span className={styles.remain}>あと {total - filled} 個</span>
    </div>
  )
}

export default function GoalGradientDemo() {
  const [vote, setVote] = useState<null | 'A' | 'B'>(null)

  return (
    <div className={styles.demo}>
      <p className={styles.q}>
        どちらのスタンプカードを「最後まで集めたい」と感じますか？<br />
        <span className={styles.qsub}>（どちらも、ゴールまで残り8個で同じ）</span>
      </p>

      <div className={styles.cards}>
        <button
          type="button"
          className={`${styles.choice} ${vote === 'A' ? styles.picked : ''}`}
          onClick={() => vote === null && setVote('A')}
          disabled={vote !== null}
        >
          <Card filled={0} total={8} label="カードA（0 / 8）" />
        </button>
        <button
          type="button"
          className={`${styles.choice} ${vote === 'B' ? styles.picked : ''}`}
          onClick={() => vote === null && setVote('B')}
          disabled={vote !== null}
        >
          <Card filled={2} total={10} label="カードB（2 / 10）" />
        </button>
      </div>

      {vote !== null && (
        <div className={styles.reveal} aria-live="polite">
          <p>
            多くの人は<strong>B</strong>を選びます。残りは同じ8個なのに、Bは「もう始まっている＝ゴールに近い」と感じるから。
          </p>
          <p className={styles.small}>
            ゴールに近いほどやる気が増す（目標勾配効果）。最初からスタンプを少し押しておく“見せかけの一歩”だけで、完走率は上がります。
          </p>
          <button type="button" className={styles.again} onClick={() => setVote(null)}>
            もう一度
          </button>
        </div>
      )}
    </div>
  )
}
