import { useRef, useState } from 'react'
import { formatMs } from '../../utils/stats'
import styles from './SelectiveAttentionDemo.module.css'

type Phase = 'intro' | 'play' | 'done'

export default function SelectiveAttentionDemo() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [ms, setMs] = useState(0)
  const [wrong, setWrong] = useState(false)
  const startRef = useRef(0)

  const begin = () => {
    setWrong(false)
    startRef.current = performance.now()
    setPhase('play')
  }
  const hit = () => {
    setMs(performance.now() - startRef.current)
    setPhase('done')
  }

  if (phase === 'intro') {
    return (
      <div className={styles.demo}>
        <p className={styles.task}>
          お題：<strong>「送料が無料になる条件」</strong>が書いてある所を、できるだけ速く見つけてタップ！
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
        <p className={styles.hint}>「送料無料の条件」はどこ？</p>
        <div className={styles.page}>
          <div className={styles.block} onClick={() => setWrong(true)}>
            <div className={styles.h}>商品の説明</div>
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.lineShort} />
          </div>

          {/* 広告風バナー：ここに答えがあるが、見落としやすい */}
          <button type="button" className={styles.adBanner} onClick={hit}>
            <span className={styles.adTag}>PR</span>
            <span className={styles.adText}>3,000円以上のご購入で 送料無料！</span>
          </button>

          <div className={styles.block} onClick={() => setWrong(true)}>
            <div className={styles.h}>カスタマーレビュー</div>
            <div className={styles.line} />
            <div className={styles.lineShort} />
          </div>
        </div>
        {wrong && <p className={styles.wrong}>そこには書いてありません。広告っぽい所も見てみて。</p>}
      </div>
    )
  }

  return (
    <div className={styles.demo}>
      <p className={styles.doneTime}>
        見つけるまで <strong>{formatMs(ms)}</strong>
      </p>
      <p className={styles.reveal} aria-live="polite">
        答えは「広告っぽいバナー」の中にありました。人は<strong>広告に見える場所を無意識に読み飛ばします</strong>
        （バナー・ブラインドネス＝選択的注意）。だから本当に伝えたい情報は、
        広告と区別がつく“素直なコンテンツ”として置くのが鉄則です。
      </p>
      <button type="button" className={styles.start} onClick={begin}>
        もう一度
      </button>
    </div>
  )
}
