import { useState } from 'react'
import styles from './HaloDemo.module.css'

export default function HaloDemo() {
  const [vote, setVote] = useState<null | 'plain' | 'expert'>(null)

  return (
    <div className={styles.demo}>
      <p className={styles.q}>
        まったく同じアドバイスです。
        <br />
        「信頼できる」と感じるのは？
      </p>

      <div className={styles.cards}>
        <button
          type="button"
          className={`${styles.card} ${vote === 'plain' ? styles.picked : ''}`}
          onClick={() => vote === null && setVote('plain')}
          disabled={vote !== null}
        >
          <span className={styles.who}>ある人</span>
          <span className={styles.quote}>「朝に光を浴びると睡眠が整いますよ」</span>
        </button>
        <button
          type="button"
          className={`${styles.card} ${vote === 'expert' ? styles.picked : ''}`}
          onClick={() => vote === null && setVote('expert')}
          disabled={vote !== null}
        >
          <span className={styles.who}>
            👩‍⚕️ 睡眠の専門家 <span className={styles.badge}>★</span>
          </span>
          <span className={styles.quote}>「朝に光を浴びると睡眠が整いますよ」</span>
        </button>
      </div>

      {vote !== null && (
        <div className={styles.reveal} aria-live="polite">
          <p>
            文章は<strong>一字一句同じ</strong>。でも「専門家」の一言で、急に正しく感じませんか？
          </p>
          <p className={styles.small}>
            一つの目立つ長所（肩書き・見た目・実績）が、全体の評価まで底上げする——これがハロー効果。
            “見た目の良さ”が中身の評価に染み出すのも、同じ仕組みです。
          </p>
          <button type="button" className={styles.again} onClick={() => setVote(null)}>
            もう一度
          </button>
        </div>
      )}
    </div>
  )
}
