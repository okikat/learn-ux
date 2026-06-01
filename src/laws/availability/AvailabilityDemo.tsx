import { useState } from 'react'
import styles from './AvailabilityDemo.module.css'

export default function AvailabilityDemo() {
  const [vote, setVote] = useState<null | 'shark' | 'vending'>(null)

  return (
    <div className={styles.demo}>
      <p className={styles.q}>年間で、人の命を奪う数が多いと思うのはどっち？</p>

      <div className={styles.cards}>
        <button
          type="button"
          className={`${styles.card} ${vote === 'shark' ? styles.picked : ''}`}
          onClick={() => vote === null && setVote('shark')}
          disabled={vote !== null}
        >
          <span className={styles.emoji} aria-hidden="true">🦈</span>
          <span className={styles.label}>サメに襲われる</span>
        </button>
        <button
          type="button"
          className={`${styles.card} ${vote === 'vending' ? styles.picked : ''}`}
          onClick={() => vote === null && setVote('vending')}
          disabled={vote !== null}
        >
          <span className={styles.emoji} aria-hidden="true">🦟</span>
          <span className={styles.label}>蚊が運ぶ病気</span>
        </button>
      </div>

      {vote !== null && (
        <div className={styles.reveal} aria-live="polite">
          <p>
            実は<strong>蚊</strong>が桁違いに多く、世界で年間数十万人とも（マラリア等の病気を媒介）。サメは年に数人ほどです。サメは“怖くて目立つ”から、多そうに感じただけ。
          </p>
          <p className={styles.small}>
            人は「思い出しやすい・印象が強い出来事」を“よく起きる”と錯覚する——可用性ヒューリスティック。
            ニュースで目立つ出来事ほど過大評価しがちです。
          </p>
          <button type="button" className={styles.again} onClick={() => setVote(null)}>
            もう一度
          </button>
        </div>
      )}
    </div>
  )
}
