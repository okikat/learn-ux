import { useState } from 'react'
import styles from './EndowmentDemo.module.css'

type Phase = 'gift' | 'offer' | 'result'
type Choice = 'keep' | 'swap'

/**
 * 保有効果：もらった瞬間から手放したくなくなる。
 * くじでマグを「受け取る」→ 同価値のペンと交換できると提案 → 多くは交換せず持ち続ける。
 * （中身は同価値なのに手放したくない＝保有効果。Knetsch のマグ／ペン実験を体感版に）
 */
export default function EndowmentDemo() {
  const [phase, setPhase] = useState<Phase>('gift')
  const [choice, setChoice] = useState<Choice | null>(null)

  const reset = () => {
    setPhase('gift')
    setChoice(null)
  }

  if (phase === 'gift') {
    return (
      <div className={styles.demo}>
        <p className={styles.lead}>くじが当たりました！ タップして受け取ってください。</p>
        <button type="button" className={styles.gift} onClick={() => setPhase('offer')}>
          <span className={styles.giftIcon} aria-hidden="true">🎁</span>
          <span className={styles.giftLabel}>受け取る</span>
        </button>
      </div>
    )
  }

  if (phase === 'offer') {
    return (
      <div className={styles.demo}>
        <div className={styles.owned}>
          <span className={styles.item} aria-hidden="true">☕</span>
          <span className={styles.ownedTag}>あなたのマグ</span>
        </div>
        <p className={styles.q}>
          同じ¥1,000相当の<strong>ボールペン</strong>と
          <br />
          交換できます。どうしますか？
        </p>
        <div className={styles.choices}>
          <button
            type="button"
            className={styles.choice}
            onClick={() => {
              setChoice('swap')
              setPhase('result')
            }}
          >
            <span className={styles.cIcon} aria-hidden="true">🖊️</span>
            交換する
          </button>
          <button
            type="button"
            className={styles.choice}
            onClick={() => {
              setChoice('keep')
              setPhase('result')
            }}
          >
            <span className={styles.cIcon} aria-hidden="true">☕</span>
            持っておく
          </button>
        </div>
      </div>
    )
  }

  const kept = choice === 'keep'
  return (
    <div className={styles.demo}>
      <div className={styles.owned}>
        <span className={styles.item} aria-hidden="true">{kept ? '☕' : '🖊️'}</span>
        <span className={styles.ownedTag}>{kept ? 'マグのまま' : 'ペンに交換した'}</span>
      </div>
      <div className={styles.reveal} aria-live="polite">
        {kept ? (
          <p>交換しませんでしたね。じつは多くの人が同じ選択をします。</p>
        ) : (
          <p>交換した少数派！ 一般には、交換せず持ち続ける人が多数です。</p>
        )}
        <p className={styles.small}>
          マグもペンも<strong>同じ¥1,000相当</strong>。面白いのは、最初に
          <strong>ペンをもらっていたら今度はペンを手放したくなくなる</strong>こと。手にした“自分のもの”を高く感じる——これが保有効果。
          無料お試しや返品保証が効くのも、この力です。
        </p>
        <button type="button" className={styles.again} onClick={reset}>
          もう一度
        </button>
      </div>
    </div>
  )
}
