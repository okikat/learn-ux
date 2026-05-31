import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './VonRestorffDemo.module.css'

const COUNT = 8
const SHOW_MS = 2200
type Phase = 'intro' | 'show' | 'recall' | 'result'

export default function VonRestorffDemo() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [highlight, setHighlight] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  const start = useCallback(() => {
    setHighlight(Math.floor(Math.random() * COUNT))
    setPicked(null)
    setPhase('show')
    timerRef.current = window.setTimeout(() => {
      setPhase('recall')
      timerRef.current = null
    }, SHOW_MS)
  }, [])

  const pick = useCallback((i: number) => {
    setPicked(i)
    setPhase('result')
  }, [])

  if (phase === 'intro') {
    return (
      <div className={styles.demo}>
        <div className={styles.center}>
          <p className={styles.lead}>
            8個のボタンが一瞬出ます。<strong>1つだけ色が違います</strong>。
            あとで「どれが目立っていたか」を当ててください。
          </p>
          <button type="button" className={styles.start} onClick={start}>
            スタート
          </button>
        </div>
      </div>
    )
  }

  const correct = picked === highlight
  const prompt =
    phase === 'show'
      ? 'よく見て…'
      : phase === 'recall'
        ? '目立っていたのはどれ？タップで回答'
        : correct
          ? '正解！'
          : '惜しい！ 正解は色付きの方'

  // show / recall / result は同じグリッド要素を使い回す（class だけ切替）。
  // 要素をアンマウントしないので、強調セルの拡大・影の描画残りが起きない。
  return (
    <div className={styles.demo}>
      <p
        className={`${styles.prompt} ${
          phase === 'result' ? (correct ? styles.okText : styles.ngText) : ''
        }`}
      >
        {prompt}
      </p>
      <div className={styles.grid}>
        {Array.from({ length: COUNT }, (_, i) => {
          const interactive = phase === 'recall'
          const isHi = i === highlight && phase !== 'recall'
          const isWrong = phase === 'result' && i === picked && i !== highlight
          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              aria-hidden={interactive ? undefined : true}
              aria-label={interactive ? `${i + 1}番` : undefined}
              className={`${interactive ? styles.cellBtn : styles.cell} ${
                isHi ? styles.cellHi : ''
              } ${isWrong ? styles.cellWrong : ''}`}
              onClick={interactive ? () => pick(i) : undefined}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      {phase === 'result' && (
        <>
          <p className={styles.note}>
            周りと違う1つは、見た時間が同じでも記憶に残りやすい。だから「最重要の1つ」を際立たせると効きます。
          </p>
          <button type="button" className={styles.start} onClick={start}>
            もう一度ためす
          </button>
        </>
      )}
    </div>
  )
}
