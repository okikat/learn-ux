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

  const pick = useCallback(
    (i: number) => {
      setPicked(i)
      setPhase('result')
    },
    [],
  )

  const correct = picked === highlight

  return (
    <div className={styles.demo}>
      {phase === 'intro' && (
        <div className={styles.center}>
          <p className={styles.lead}>
            8個のボタンが一瞬出ます。<strong>1つだけ色が違います</strong>。
            あとで「どれが目立っていたか」を当ててください。
          </p>
          <button type="button" className={styles.start} onClick={start}>
            スタート
          </button>
        </div>
      )}

      {phase === 'show' && (
        <>
          <p className={styles.prompt}>よく見て…</p>
          <div className={styles.grid}>
            {Array.from({ length: COUNT }, (_, i) => (
              <div
                key={i}
                className={`${styles.cell} ${i === highlight ? styles.cellHi : ''}`}
                aria-hidden="true"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </>
      )}

      {phase === 'recall' && (
        <>
          <p className={styles.prompt}>目立っていたのはどれ？タップで回答</p>
          <div className={styles.grid}>
            {Array.from({ length: COUNT }, (_, i) => (
              <button
                key={i}
                type="button"
                className={styles.cellBtn}
                onClick={() => pick(i)}
                aria-label={`${i + 1}番`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {phase === 'result' && (
        <>
          <p className={`${styles.prompt} ${correct ? styles.okText : styles.ngText}`}>
            {correct ? '正解！ よく覚えていましたね' : '惜しい！ 正解は色付きの方'}
          </p>
          <div className={styles.grid}>
            {Array.from({ length: COUNT }, (_, i) => (
              <div
                key={i}
                className={`${styles.cell} ${i === highlight ? styles.cellHi : ''} ${
                  i === picked && i !== highlight ? styles.cellWrong : ''
                }`}
                aria-hidden="true"
              >
                {i + 1}
              </div>
            ))}
          </div>
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
