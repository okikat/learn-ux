import { useCallback, useEffect, useRef, useState } from 'react'
import { smoothProgress, jankyProgress } from '../../utils/peakEnd'
import styles from './PeakEndDemo.module.css'

const DURATION = 4000 // A・B 共通の総時間（ここが同じなのがポイント）
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
        AとBは<strong>合計時間がまったく同じ</strong>ダウンロードです。違うのは<strong>「終わり方」</strong>だけ。両方を再生して、どちらが快適だったか選んでください。
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
        janky
      />

      {bothPlayed && vote === null && (
        <div className={styles.voteBox}>
          <p className={styles.voteQ}>どちらのダウンロードが「快適」でしたか？</p>
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
            実は B は最後に<strong>「99%」で固まって</strong>なかなか終わりません（誰もが知る、あのイライラ）。
            A はスッと完了します。<strong>合計時間は同じ</strong>でも、人は<strong>「終わり方」</strong>で体験全体を評価する——これがピーク・エンドの法則です。
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
  janky,
}: {
  title: string
  progress: number
  played: boolean
  playing: boolean
  disabled: boolean
  onPlay: () => void
  janky?: boolean
}) {
  const pct = Math.round(progress * 100)
  const done = played && !playing
  const stuck = janky && playing && pct >= 99
  return (
    <div className={styles.row}>
      <button type="button" className={styles.playBtn} onClick={onPlay} disabled={disabled}>
        {done ? `${title}を再生 ↺` : `${title}を再生 ▶`}
      </button>
      <div className={styles.track}>
        <span className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
      <span className={styles.pct}>
        {done ? (janky ? '完了 😣' : '完了 ✓') : stuck ? '99% 🔄' : `${pct}%`}
      </span>
    </div>
  )
}
