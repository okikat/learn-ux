import { useState } from 'react'
import styles from './LossAversionDemo.module.css'

type Pick = 'sure' | 'gamble'

export default function LossAversionDemo() {
  const [round, setRound] = useState<0 | 1 | 2>(0)
  const [gain, setGain] = useState<Pick | null>(null)
  const [loss, setLoss] = useState<Pick | null>(null)

  const reset = () => {
    setGain(null)
    setLoss(null)
    setRound(0)
  }

  if (round === 0) {
    return (
      <div className={styles.demo}>
        <span className={styles.tag}>① もらえる場面</span>
        <p className={styles.q}>どちらを選ぶ？</p>
        <div className={styles.choices}>
          <button type="button" className={styles.choice} onClick={() => { setGain('sure'); setRound(1) }}>
            <span className={styles.lead}>確実に</span>
            <span className={styles.big}>+1,000円</span>
            <span className={styles.sub}>ノーリスク</span>
          </button>
          <button type="button" className={styles.choice} onClick={() => { setGain('gamble'); setRound(1) }}>
            <span className={styles.lead}>50%で</span>
            <span className={styles.big}>+2,000円</span>
            <span className={styles.sub}>50%で 0円</span>
          </button>
        </div>
      </div>
    )
  }

  if (round === 1) {
    return (
      <div className={styles.demo}>
        <span className={`${styles.tag} ${styles.tagLoss}`}>② 払う場面</span>
        <p className={styles.q}>どちらを選ぶ？</p>
        <div className={styles.choices}>
          <button type="button" className={styles.choice} onClick={() => { setLoss('sure'); setRound(2) }}>
            <span className={styles.lead}>確実に</span>
            <span className={styles.big}>−1,000円</span>
            <span className={styles.sub}>ノーリスク</span>
          </button>
          <button type="button" className={styles.choice} onClick={() => { setLoss('gamble'); setRound(2) }}>
            <span className={styles.lead}>50%で</span>
            <span className={styles.big}>−2,000円</span>
            <span className={styles.sub}>50%で 0円</span>
          </button>
        </div>
      </div>
    )
  }

  const typical = gain === 'sure' && loss === 'gamble'
  return (
    <div className={styles.demo}>
      <div className={styles.summary}>
        <div className={styles.sumRow}>
          <span>もらう場面</span>
          <strong>{gain === 'sure' ? '確実を選んだ' : '賭けを選んだ'}</strong>
        </div>
        <div className={styles.sumRow}>
          <span>払う場面</span>
          <strong>{loss === 'sure' ? '確実を選んだ' : '賭けを選んだ'}</strong>
        </div>
      </div>
      <div className={styles.reveal} aria-live="polite">
        {typical ? (
          <p>
            多くの人と同じ選び方です。<strong>もらう時は手堅く、払う時は賭けに出た</strong>のでは？
          </p>
        ) : (
          <p>
            人により分かれますが、一般には<strong>もらう時は手堅く・払う時は賭けに出る</strong>傾向があります。
          </p>
        )}
        <p className={styles.small}>
          面白いのは、得と損で選び方が逆転すること。人は<strong>得る喜びより、失う痛みを約2倍強く感じる</strong>
          （損失回避）。だから「失う・逃す」を避けたい心理は、強く行動を動かします。
        </p>
        <button type="button" className={styles.again} onClick={reset}>
          もう一度
        </button>
      </div>
    </div>
  )
}
