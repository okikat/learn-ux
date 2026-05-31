import { useState } from 'react'
import styles from './GamblersFallacyDemo.module.css'

type Vote = 'heads' | 'tails' | 'same'

export default function GamblersFallacyDemo() {
  const [vote, setVote] = useState<Vote | null>(null)

  return (
    <div className={styles.demo}>
      <p className={styles.q}>
        コインを振ったら<strong>表が5回連続</strong>で出ました。
      </p>
      <div className={styles.coins} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={styles.coin}>
            表
          </span>
        ))}
      </div>

      <p className={styles.q2}>次の1回は？</p>
      <div className={styles.choices}>
        <button type="button" className={styles.choice} onClick={() => setVote('heads')} disabled={vote !== null}>
          また表が出やすい
        </button>
        <button type="button" className={styles.choice} onClick={() => setVote('tails')} disabled={vote !== null}>
          そろそろ裏が出やすい
        </button>
        <button type="button" className={styles.choice} onClick={() => setVote('same')} disabled={vote !== null}>
          どちらも同じ（50%）
        </button>
      </div>

      {vote !== null && (
        <div className={styles.reveal} aria-live="polite">
          <p>
            正解は<strong>「どちらも同じ（50%）」</strong>。
            {vote === 'same' ? ' お見事！' : '「そろそろ裏」と感じた人も多いはず。'}
          </p>
          <p className={styles.small}>
            コインに記憶はありません。過去がどうでも、次は毎回50%。「連続したから次は逆」と感じるのがギャンブラーの誤謬。
            <strong>過去の結果は、未来の確率を変えません</strong>。
          </p>
          <button type="button" className={styles.again} onClick={() => setVote(null)}>
            もう一度
          </button>
        </div>
      )}
    </div>
  )
}
