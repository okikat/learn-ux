import { useCallback, useEffect, useRef, useState } from 'react'
import { chunk, digitsEqual, randomDigits } from '../../utils/miller'
import styles from './MillerDemo.module.css'

const DIGIT_COUNT = 10
const SHOW_MS = 2500

type Phase = 'ready' | 'show' | 'input'
interface RoundResult {
  chunked: boolean
  shown: string
  answer: string
  correct: boolean
}

export default function MillerDemo() {
  // round 0 = バラ羅列, round 1 = チャンク化
  const [roundIndex, setRoundIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('ready')
  const [digits, setDigits] = useState('')
  const [answer, setAnswer] = useState('')
  const [results, setResults] = useState<RoundResult[]>([])
  const timerRef = useRef<number | null>(null)

  const chunked = roundIndex === 1

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  const start = useCallback(() => {
    const next = randomDigits(DIGIT_COUNT)
    setDigits(next)
    setAnswer('')
    setPhase('show')
    timerRef.current = window.setTimeout(() => {
      setPhase('input')
      timerRef.current = null
    }, SHOW_MS)
  }, [])

  const submit = useCallback(() => {
    const correct = digitsEqual(answer, digits)
    const result: RoundResult = { chunked, shown: digits, answer, correct }
    setResults((prev) => [...prev, result])
    if (roundIndex + 1 >= 2) {
      setRoundIndex(2) // done
    } else {
      setRoundIndex((i) => i + 1)
      setPhase('ready')
    }
  }, [answer, digits, chunked, roundIndex])

  const reset = useCallback(() => {
    setResults([])
    setRoundIndex(0)
    setPhase('ready')
    setDigits('')
    setAnswer('')
  }, [])

  // 完了画面
  if (roundIndex >= 2) {
    return (
      <div className={styles.demo}>
        <h3 className={styles.title}>結果</h3>
        <ul className={styles.results}>
          {results.map((r, i) => (
            <li key={i} className={styles.resultItem}>
              <span className={styles.resultMode}>{r.chunked ? '3-3-4 区切り' : 'バラ羅列'}</span>
              <span className={`${styles.resultMark} ${r.correct ? styles.ok : styles.ng}`}>
                {r.correct ? '正解 ◯' : '不正解 ✗'}
              </span>
              <span className={styles.resultShown}>
                出題 {r.chunked ? chunk(r.shown, [3, 3, 4]).join('-') : r.shown}
              </span>
            </li>
          ))}
        </ul>
        <p className={styles.note}>
          多くの場合、区切って見せた方が思い出しやすくなります（チャンク化）。
        </p>
        <button type="button" className={styles.retry} onClick={reset}>
          もう一度ためす
        </button>
      </div>
    )
  }

  return (
    <div className={styles.demo}>
      <div className={styles.bar}>
        <span className={styles.counter}>
          ラウンド {roundIndex + 1} / 2（{chunked ? '区切りあり' : '区切りなし'}）
        </span>
      </div>

      {phase === 'ready' && (
        <div className={styles.center}>
          <p className={styles.lead}>
            {DIGIT_COUNT}桁の数字が一瞬だけ出ます。覚えて入力してください。
          </p>
          <button type="button" className={styles.start} onClick={start}>
            数字を見る
          </button>
        </div>
      )}

      {phase === 'show' && (
        <div className={styles.center}>
          <div className={styles.flash} aria-live="polite">
            {chunked
              ? chunk(digits, [3, 3, 4]).map((c, i) => (
                  <span key={i} className={styles.chunk}>
                    {c}
                  </span>
                ))
              : digits.split('').map((d, i) => (
                  <span key={i} className={styles.single}>
                    {d}
                  </span>
                ))}
          </div>
          <div className={styles.countdown}>
            <span className={styles.countdownBar} />
          </div>
          <p className={styles.lead}>覚えて！</p>
        </div>
      )}

      {phase === 'input' && (
        <div className={styles.center}>
          <p className={styles.lead}>さっきの数字は？</p>
          <input
            className={styles.input}
            type="text"
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="数字を入力"
            autoFocus
          />
          <button type="button" className={styles.start} onClick={submit} disabled={answer.length === 0}>
            回答する
          </button>
        </div>
      )}
    </div>
  )
}
