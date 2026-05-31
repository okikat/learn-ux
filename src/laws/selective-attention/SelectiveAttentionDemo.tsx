import { useState } from 'react'
import styles from './SelectiveAttentionDemo.module.css'

type Phase = 'intro' | 'play' | 'done'
type Reason = 'purchase' | 'found'

const BANNERS = [
  'ポイント2倍キャンペーン中',
  '3,000円以上のご購入で送料無料',
  'あすつく対応エリアが拡大しました',
]
const TARGET = 1

export default function SelectiveAttentionDemo() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [reason, setReason] = useState<Reason>('purchase')
  const [wrong, setWrong] = useState(false)

  const begin = () => {
    setWrong(false)
    setPhase('play')
  }
  const toDone = (r: Reason) => {
    setReason(r)
    setPhase('done')
  }

  if (phase === 'intro') {
    return (
      <div className={styles.demo}>
        <p className={styles.task}>
          あなたは買い物中。<strong>「送料が無料になる条件」</strong>を確認してから、操作してみてください。
        </p>
        <button type="button" className={styles.start} onClick={begin}>
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
              <span className={styles.pPrice}>¥2,480</span>
            </span>
          </div>

          <div className={styles.banners}>
            {BANNERS.map((b, i) => (
              <button
                key={i}
                type="button"
                className={styles.banner}
                onClick={() => (i === TARGET ? toDone('found') : setWrong(true))}
              >
                {b}
              </button>
            ))}
          </div>

          <button type="button" className={styles.buy} onClick={() => toDone('purchase')}>
            購入する
          </button>
        </div>
        {wrong && <p className={styles.hint}>それは別のお知らせ。「送料無料」の条件を探して。</p>}
      </div>
    )
  }

  return (
    <div className={styles.demo}>
      <p className={styles.verdict} aria-live="polite">
        {reason === 'purchase'
          ? '「送料無料」の帯を飛ばして“購入”を押しましたね。'
          : 'よく気づけました。でも、目立つ「購入」に目が行きませんでしたか？'}
      </p>
      <p className={styles.reveal}>
        人は<strong>目立つもの（購入ボタン）に注意が向き、似た見た目のグレーの帯は読み飛ばします</strong>
        （選択的注意・バナーブラインドネス）。大事な情報を“ありがちな帯”にすると、置いてあっても気づかれません。
      </p>

      <div className={styles.fix}>
        <span className={styles.fixLabel}>改善：大事な情報は、目立つ操作のすぐ隣に</span>
        <div className={styles.fixInner}>
          <span className={styles.fixNote}>3,000円以上のご購入で送料無料！</span>
          <span className={styles.buyStatic}>購入する</span>
        </div>
      </div>

      <button type="button" className={styles.retry} onClick={begin}>
        もう一度
      </button>
    </div>
  )
}
