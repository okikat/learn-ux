import { useState } from 'react'
import styles from './EndowmentDemo.module.css'

export default function EndowmentDemo() {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [sell, setSell] = useState(800)
  const [buy, setBuy] = useState(800)

  if (step === 0) {
    return (
      <div className={styles.demo}>
        <div className={styles.mug} aria-hidden="true">☕</div>
        <p className={styles.q}>
          このマグカップは<strong>あなたのもの</strong>です。
          <br />
          最低いくらなら手放せますか？（売値）
        </p>
        <input
          className={styles.slider}
          type="range"
          min={0}
          max={2000}
          step={100}
          value={sell}
          onChange={(e) => setSell(Number(e.target.value))}
        />
        <span className={styles.val}>¥{sell.toLocaleString()}</span>
        <button type="button" className={styles.next} onClick={() => setStep(1)}>
          決めた
        </button>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className={styles.demo}>
        <div className={styles.mug} aria-hidden="true">☕</div>
        <p className={styles.q}>
          では、<strong>持っていない</strong>として。
          <br />
          同じマグ、最高いくらまで出して買いますか？（買値）
        </p>
        <input
          className={styles.slider}
          type="range"
          min={0}
          max={2000}
          step={100}
          value={buy}
          onChange={(e) => setBuy(Number(e.target.value))}
        />
        <span className={styles.val}>¥{buy.toLocaleString()}</span>
        <button type="button" className={styles.next} onClick={() => setStep(2)}>
          決めた
        </button>
      </div>
    )
  }

  const gap = sell - buy
  return (
    <div className={styles.demo}>
      <div className={styles.rows}>
        <div className={styles.rowItem}>
          <span>売値（手放す）</span>
          <strong>¥{sell.toLocaleString()}</strong>
        </div>
        <div className={styles.rowItem}>
          <span>買値（買う）</span>
          <strong>¥{buy.toLocaleString()}</strong>
        </div>
      </div>
      <div className={styles.reveal} aria-live="polite">
        {gap > 0 ? (
          <p>
            <strong>売値 ＞ 買値</strong>でしたね。多くの人がそうなります。
          </p>
        ) : (
          <p>今回は差が小さめ。一般には「売値 ＞ 買値」になりがちです。</p>
        )}
        <p className={styles.small}>
          同じ物でも、<strong>自分が持っているだけで価値を高く見積もる</strong>——これが保有効果。
          無料お試しで“自分のもの”にさせると手放しにくくなるのも、この力です。
        </p>
        <button type="button" className={styles.again} onClick={() => setStep(0)}>
          もう一度
        </button>
      </div>
    </div>
  )
}
