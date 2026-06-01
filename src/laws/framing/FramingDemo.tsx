import { useState } from 'react'
import styles from './FramingDemo.module.css'

export default function FramingDemo() {
  const [vote, setVote] = useState<null | 'A' | 'B'>(null)

  return (
    <div className={styles.demo}>
      <p className={styles.q}>
        同じヨーグルトです。
        <br />
        買いたくなるのはどっち？
      </p>

      <div className={styles.cards}>
        <button
          type="button"
          className={`${styles.card} ${vote === 'A' ? styles.picked : ''}`}
          onClick={() => vote === null && setVote('A')}
          disabled={vote !== null}
        >
          <span className={styles.emoji} aria-hidden="true">🥛</span>
          <span className={styles.label}>脂肪 80%カット</span>
        </button>
        <button
          type="button"
          className={`${styles.card} ${vote === 'B' ? styles.picked : ''}`}
          onClick={() => vote === null && setVote('B')}
          disabled={vote !== null}
        >
          <span className={styles.emoji} aria-hidden="true">🥛</span>
          <span className={styles.label}>脂肪 20%ふくむ</span>
        </button>
      </div>

      {vote !== null && (
        <div className={styles.reveal} aria-live="polite">
          <p>
            「80%カット」も「20%ふくむ」も<strong>中身はまったく同じ</strong>。
            それでも“カット”の方が選ばれます。
          </p>
          <p className={styles.small}>
            同じ事実でも、前向きな言い方の方が好まれる——これがフレーミング効果。「残り10%」より「90%完了」。
          </p>
          <button type="button" className={styles.again} onClick={() => setVote(null)}>
            もう一度
          </button>
        </div>
      )}
    </div>
  )
}
