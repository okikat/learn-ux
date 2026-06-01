import { useState } from 'react'
import styles from './EndowmentDemo.module.css'

type Phase = 'pull' | 'got' | 'result'
type Choice = 'keep' | 'swap'

const CHARS = [
  { emoji: '⚔️', name: '炎の剣士' },
  { emoji: '🏹', name: '風の狩人' },
  { emoji: '🔮', name: '雷の魔導士' },
  { emoji: '🛡️', name: '氷の騎士' },
]

/**
 * 保有効果：自分が手に入れたものを高く感じ、手放したくなくなる。
 * ソシャゲのガチャを引く →「同じ★3の別キャラと交換できる」と提案 → 多くは“この子がいい”と手放さない。
 * デジタルでも“自分が引いたキャラ”には所有感が生まれる＝アプリ文脈で現実味のある例。
 */
export default function EndowmentDemo() {
  const [phase, setPhase] = useState<Phase>('pull')
  const [char, setChar] = useState(0)
  const [choice, setChoice] = useState<Choice | null>(null)

  const pull = () => {
    setChar(Math.floor(Math.random() * CHARS.length))
    setPhase('got')
  }
  const reset = () => {
    setChoice(null)
    setPhase('pull')
  }

  if (phase === 'pull') {
    return (
      <div className={styles.demo}>
        <p className={styles.lead}>ソシャゲのガチャを1回引きます。タップしてみてください。</p>
        <button type="button" className={styles.gacha} onClick={pull}>
          <span className={styles.gachaIcon} aria-hidden="true">🎰</span>
          <span className={styles.gachaLabel}>ガチャを引く</span>
        </button>
      </div>
    )
  }

  const c = CHARS[char]

  if (phase === 'got') {
    return (
      <div className={styles.demo}>
        <span className={styles.getTag}>GET! あなたのキャラ</span>
        <div className={styles.card}>
          <span className={styles.rarity}>★★★</span>
          <span className={styles.charIcon} aria-hidden="true">{c.emoji}</span>
          <span className={styles.charName}>{c.name}</span>
        </div>
        <p className={styles.q}>
          <strong>別の★3キャラ</strong>と交換できます。
          <br />
          どうする？
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
            <span className={styles.cIcon} aria-hidden="true">🔄</span>
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
            <span className={styles.cIcon} aria-hidden="true">💛</span>
            この子がいい
          </button>
        </div>
      </div>
    )
  }

  const kept = choice === 'keep'
  return (
    <div className={styles.demo}>
      <div className={styles.card}>
        <span className={styles.rarity}>★★★</span>
        <span className={styles.charIcon} aria-hidden="true">{kept ? c.emoji : '❔'}</span>
        <span className={styles.charName}>{kept ? c.name : '別の★3キャラ'}</span>
      </div>
      <div className={styles.reveal} aria-live="polite">
        {kept ? (
          <p>交換しませんでしたね。じつは多くの人が同じ選択をします。</p>
        ) : (
          <p>交換した少数派！ 交換せず手元に残す人が多数です。</p>
        )}
        <p className={styles.small}>
          レアリティが同じ＝<strong>価値は同じ</strong>。面白いのは、別の子を引いていたら
          <strong>今度はその子を手放したくなくなる</strong>こと。自分が手にした“この子”を特別に感じる——これが保有効果。
          ガチャのキャラを売れない設計や「コンプしたい」心理も、この力です。
        </p>
        <button type="button" className={styles.again} onClick={reset}>
          もう一度
        </button>
      </div>
    </div>
  )
}
