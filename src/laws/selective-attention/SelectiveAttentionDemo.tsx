import { useState } from 'react'
import styles from './SelectiveAttentionDemo.module.css'

type Phase = 'intro' | 'play' | 'result'

export default function SelectiveAttentionDemo() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [missed, setMissed] = useState(true)

  const finish = (didMiss: boolean) => {
    setMissed(didMiss)
    setPhase('result')
  }

  if (phase === 'intro') {
    // あえて「クーポンを探して」とは言わない（言うと探してしまい、法則が成立しない）
    return (
      <div className={styles.demo}>
        <p className={styles.task}>
          ネットでお買い物中。<strong>この商品を買って</strong>みてください。
        </p>
        <button
          type="button"
          className={styles.start}
          onClick={() => {
            setMissed(true)
            setPhase('play')
          }}
        >
          スタート
        </button>
      </div>
    )
  }

  if (phase === 'play') {
    return (
      <div className={styles.demo}>
        <div className={styles.page}>
          <div className={styles.product}>
            <span className={styles.thumb} aria-hidden="true" />
            <span className={styles.pInfo}>
              <span className={styles.pName}>ワイヤレスイヤホン</span>
              <span className={styles.pPrice}>¥3,000</span>
            </span>
          </div>

          {/* 広告のような帯。中に「20%OFFクーポン」が埋もれている */}
          <button type="button" className={styles.coupon} onClick={() => finish(false)}>
            🎟 今だけ20%OFFクーポン（タップで適用）
          </button>

          {/* 目立つ購入ボタン。つい押してしまう */}
          <button type="button" className={styles.buy} onClick={() => finish(true)}>
            購入する　¥3,000
          </button>
        </div>
      </div>
    )
  }

  // result（悪い例を体験 → 良い例を提示）
  return (
    <div className={styles.demo}>
      <p className={styles.verdict} aria-live="polite">
        {missed ? '¥3,000の定価で購入しました。' : 'クーポンに気づけましたね。'}
      </p>
      <p className={styles.reveal}>
        人は目的（買う）に集中し、<strong>広告のような帯は読み飛ばします</strong>
        （選択的注意・バナーブラインドネス）。20%OFFクーポンは、すぐ上にあっても見落とされがちです。
      </p>

      <div className={styles.compare}>
        <div className={styles.exBlock}>
          <span className={`${styles.exLabel} ${styles.badLabel}`}>✗ 悪い例</span>
          <span className={styles.couponStatic} aria-hidden="true">
            🎟 今だけ20%OFFクーポン
          </span>
          <span className={styles.exDesc}>大事な情報を“広告風の帯”で別に置く → 見落とされる。</span>
        </div>
        <div className={styles.exBlock}>
          <span className={`${styles.exLabel} ${styles.goodLabel}`}>✓ 良い例</span>
          <span className={styles.couponBuy} aria-hidden="true">
            クーポンを使って購入　¥2,400（−20%）
          </span>
          <span className={styles.exDesc}>クーポンを操作（購入ボタン）に統合 → 見落としようがない。</span>
        </div>
      </div>

      <button type="button" className={styles.retry} onClick={() => setPhase('intro')}>
        もう一度
      </button>
    </div>
  )
}
