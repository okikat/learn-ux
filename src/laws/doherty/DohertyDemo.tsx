import { useEffect, useRef, useState } from 'react'
import { formatMs } from '../../utils/stats'
import { responseVerdict } from '../../utils/doherty'
import styles from './DohertyDemo.module.css'

type Status = 'idle' | 'working' | 'done'

const PRESETS = [0, 400, 1000, 2000]

export default function DohertyDemo() {
  const [delay, setDelay] = useState(1000)
  const [showFeedback, setShowFeedback] = useState(true)
  const [status, setStatus] = useState<Status>('idle')
  const timerRef = useRef<number | null>(null)

  // アンマウント時にタイマーを片付ける
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  const run = () => {
    if (status === 'working') return
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    setStatus('working')
    timerRef.current = window.setTimeout(() => {
      setStatus('done')
      timerRef.current = null
    }, delay)
  }

  const verdict = responseVerdict(delay)
  const overThreshold = delay > 400

  return (
    <div className={styles.demo}>
      <div className={styles.controls}>
        <label className={styles.sliderLabel} htmlFor="doherty-delay">
          応答までの遅延：<strong>{formatMs(delay)}</strong>
        </label>
        <input
          id="doherty-delay"
          className={styles.slider}
          type="range"
          min={0}
          max={2000}
          step={50}
          value={delay}
          onChange={(e) => {
            setDelay(Number(e.target.value))
            setStatus('idle')
          }}
        />
        <div className={styles.scale}>
          <span>0</span>
          <span className={styles.threshold}>0.4秒</span>
          <span>2秒</span>
        </div>

        <div className={styles.presets}>
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              className={`${styles.chip} ${delay === p ? styles.chipActive : ''}`}
              onClick={() => {
                setDelay(p)
                setStatus('idle')
              }}
            >
              {p === 0 ? '即応' : formatMs(p)}
            </button>
          ))}
        </div>

        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={showFeedback}
            onChange={(e) => {
              setShowFeedback(e.target.checked)
              setStatus('idle')
            }}
          />
          <span>押した瞬間に「処理中」の反応を見せる（即時フィードバック）</span>
        </label>
      </div>

      <div className={styles.stage}>
        <button
          type="button"
          className={styles.action}
          onClick={run}
          disabled={status === 'working'}
          aria-busy={status === 'working'}
        >
          {status === 'working' && showFeedback ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              処理中…
            </>
          ) : (
            '送信する'
          )}
        </button>

        <div className={styles.result} aria-live="polite">
          {status === 'idle' && <span className={styles.muted}>ボタンを押して反応を体感してください</span>}
          {status === 'working' && !showFeedback && (
            <span className={styles.muted}>（…無反応。押せたのか分からない）</span>
          )}
          {status === 'done' && (
            <div className={`${styles.verdict} ${styles[verdict.level]}`}>
              <span className={styles.verdictTime}>完了 ✓ 待ち時間 {formatMs(delay)}</span>
              <span className={styles.verdictLabel}>{verdict.label}</span>
            </div>
          )}
        </div>
      </div>

      <p className={styles.note}>
        {overThreshold
          ? '0.4秒を超えています。チェックを外すと「無反応」になり、さらにストレスが増すのが分かります。'
          : 'しきい値（0.4秒）内。操作が途切れず快適に感じられます。'}
      </p>
    </div>
  )
}
