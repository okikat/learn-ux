import { useState } from 'react'
import styles from './PragnanzDemo.module.css'

type Variant = 'simple' | 'origin' | 'complex'

const COMPLEX_COLORS = ['#e8590c', '#1c7ed6', '#2f9e44']
// 「複雑な断片」を可視化する番号付き領域（理屈では分割できる、の意）
const FRAGMENTS = [
  { left: '8%', top: '26%' },
  { left: '64%', top: '26%' },
  { left: '38%', top: '10%' },
  { left: '38%', top: '40%' },
  { left: '38%', top: '66%' },
]

function MiniFig({ variant }: { variant: Variant }) {
  const base = [
    { left: '12%', top: '4%' },
    { left: '46%', top: '4%' },
    { left: '29%', top: '42%' },
  ]
  const simple = [
    { left: '0%', top: '8%' },
    { left: '54%', top: '8%' },
    { left: '27%', top: '50%' },
  ]
  const pts = variant === 'simple' ? simple : base
  return (
    <div className={styles.fig} aria-hidden="true">
      {pts.map((pt, i) => (
        <span
          key={i}
          className={`${styles.miniCircle} ${styles[variant]}`}
          style={variant === 'complex' ? { ...pt, background: COMPLEX_COLORS[i] } : pt}
        />
      ))}
      {variant === 'complex' &&
        FRAGMENTS.map((pt, i) => (
          <span key={`f${i}`} className={styles.frag} style={pt}>
            {i + 1}
          </span>
        ))}
    </div>
  )
}

export default function PragnanzDemo() {
  const [answered, setAnswered] = useState(false)

  if (!answered) {
    return (
      <div className={styles.demo}>
        <p className={styles.q}>この図形、パッと見て「何」に見えますか？</p>
        <div className={styles.figure} aria-hidden="true">
          <span className={styles.circle} style={{ left: '22%', top: '8%' }} />
          <span className={styles.circle} style={{ left: '46%', top: '8%' }} />
          <span className={styles.circle} style={{ left: '34%', top: '42%' }} />
        </div>
        <div className={styles.options}>
          <button type="button" className={styles.opt} onClick={() => setAnswered(true)}>
            重なった3つの丸
          </button>
          <button type="button" className={styles.opt} onClick={() => setAnswered(true)}>
            たくさんの複雑な断片
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.demo}>
      <div className={styles.figRow} aria-hidden="true">
        <figure className={styles.figItem}>
          <MiniFig variant="simple" />
          <figcaption className={styles.figCap}>単純：3つの丸</figcaption>
        </figure>
        <figure className={`${styles.figItem} ${styles.figCenter}`}>
          <MiniFig variant="origin" />
          <figcaption className={styles.figCap}>出題の図</figcaption>
        </figure>
        <figure className={styles.figItem}>
          <MiniFig variant="complex" />
          <figcaption className={styles.figCap}>複雑：いくつもの断片?</figcaption>
        </figure>
      </div>

      <div className={styles.reveal} aria-live="polite">
        <p>
          多くの人は<strong>左の「重なった3つの丸」</strong>と捉えます。
          右のように“いくつもの断片（番号の領域）の寄せ集め”とは見ません。
        </p>
        <p className={styles.small}>
          脳は複雑な形を、いちばん<strong>単純で安定した形</strong>にまとめて認識します（プレグナンツ）。
          ロゴが少数の円や四角で作られがちなのも、「単純な形ほど速く正しく伝わる」この性質を使っているから。
        </p>
        <button type="button" className={styles.again} onClick={() => setAnswered(false)}>
          もう一度
        </button>
      </div>
    </div>
  )
}
