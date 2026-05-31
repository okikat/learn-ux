import { useCallback, useEffect, useRef, useState } from 'react'
import { smoothProgress, jankyProgress } from '../../utils/peakEnd'
import styles from './PeakEndDemo.module.css'

const DURATION = 3500 // A・B 共通の総時間（ここが同じなのがポイント）
type Bar = 'A' | 'B'

export default function PeakEndDemo() {
  const [progA, setProgA] = useState(0)
  const [progB, setProgB] = useState(0)
  const [playing, setPlaying] = useState<Bar | null>(null)
  const [playedA, setPlayedA] = useState(false)
  const [playedB, setPlayedB] = useState(false)
  const [vote, setVote] = useState<Bar | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const play = useCallback((bar: Bar) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    setPlaying(bar)
    const setProg = bar === 'A' ? setProgA : setProgB
    const fn = bar === 'A' ? smoothProgress : jankyProgress
    setProg(0)
    const start = performance.now()
    const tick = (now: number) => {
      const t = (now - start) / DURATION
      if (t >= 1) {
        setProg(1)
        setPlaying(null)
        if (bar === 'A') setPlayedA(true)
        else setPlayedB(true)
        rafRef.current = null
        return
      }
      setProg(fn(t))
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const bothPlayed = playedA && playedB

  return (
    <div className={styles.demo}>
      <p className={styles.lead}>
        AとBは<strong>所要時間がまったく同じ</strong>進捗バーです。両方を再生して、感じ方を比べてください。
      </p>

      <ProgressRow
        title="A"
        progress={progA}
        played={playedA}
        playing={playing === 'A'}
        disabled={playing !== null}
        onPlay={() => play('A')}
      />
      <ProgressRow
        title="B"
        progress={progB}
        played={playedB}
        playing={playing === 'B'}
        disabled={playing !== null}
        onPlay={() => play('B')}
      />

      {bothPlayed && vote === null && (
        <div className={styles.voteBox}>
          <p className={styles.voteQ}>どちらが「快適」に感じましたか？</p>
          <div className={styles.voteBtns}>
            <button type="button" className={styles.voteBtn} onClick={() => setVote('A')}>
              Aが快適
            </button>
            <button type="button" className={styles.voteBtn} onClick={() => setVote('B')}>
              Bが快適
            </button>
          </div>
        </div>
      )}

      {vote !== null && (
        <div className={styles.reveal} aria-live="polite">
          <p>
            あなたの選択：<strong>{vote}</strong>
          </p>
          <p className={styles.revealText}>
            実は <strong>A はなめらかに終わり、B は最後で停滞</strong>します（総時間は同じ）。
            多くの人は終わり方が軽い A を快適と感じます。
            <strong>同じ時間でも「終わり」の印象が体験全体の評価を左右する</strong>——これがピーク・エンドの法則です。
          </p>
          <button
            type="button"
            className={styles.retry}
            onClick={() => {
              setVote(null)
              setPlayedA(false)
              setPlayedB(false)
              setProgA(0)
              setProgB(0)
            }}
          >
            もう一度ためす
          </button>
        </div>
      )}
    </div>
  )
}

function ProgressRow({
  title,
  progress,
  played,
  playing,
  disabled,
  onPlay,
}: {
  title: string
  progress: number
  played: boolean
  playing: boolean
  disabled: boolean
  onPlay: () => void
}) {
  const pct = Math.round(progress * 100)
  return (
    <div className={styles.row}>
      <button type="button" className={styles.playBtn} onClick={onPlay} disabled={disabled}>
        {played && !playing ? `${title}を再生 ↺` : `${title}を再生 ▶`}
      </button>
      <div className={styles.track}>
        <span className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
      <span className={styles.pct}>{pct}%</span>
    </div>
  )
}
