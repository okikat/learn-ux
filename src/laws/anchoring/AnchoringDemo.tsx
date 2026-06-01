import { useState } from 'react'
import styles from './AnchoringDemo.module.css'

export default function AnchoringDemo() {
  const [vote, setVote] = useState<null | 'A' | 'B'>(null)

  return (
    <div className={styles.demo}>
      <p className={styles.q}>
        まったく同じイヤホンです。
        <br />
        「お得！」と感じるのはどっち？
      </p>

      <div className={styles.cards}>
        <button
          type="button"
          className={`${styles.card} ${vote === 'A' ? styles.picked : ''}`}
          onClick={() => vote === null && setVote('A')}
          disabled={vote !== null}
        >
          <span className={styles.name}>ワイヤレスイヤホン</span>
          {/* B側の取り消し線価格と価格の高さをそろえる（比較しやすく） */}
          <span className={`${styles.was} ${styles.wasHidden}`} aria-hidden="true">
            ¥9,800
          </span>
          <span className={styles.price}>¥4,980</span>
        </button>
        <button
          type="button"
          className={`${styles.card} ${vote === 'B' ? styles.picked : ''}`}
          onClick={() => vote === null && setVote('B')}
          disabled={vote !== null}
        >
          <span className={styles.name}>ワイヤレスイヤホン</span>
          <span className={styles.was}>¥9,800</span>
          <span className={styles.price}>¥4,980</span>
        </button>
      </div>

      {vote !== null && (
        <div className={styles.reveal} aria-live="polite">
          <p>
            値段は<strong>どちらも ¥4,980</strong>。でも「¥9,800 → ¥4,980」の方がお得に感じませんか？
          </p>
          <p className={styles.small}>
            先に見た高い数字（アンカー）が基準になり、同じ価格でも安く感じます——これがアンカリング。
          </p>
          <button type="button" className={styles.again} onClick={() => setVote(null)}>
            もう一度
          </button>
        </div>
      )}
    </div>
  )
}
