import { useCallback, useRef, useState } from 'react'
import { formatSeconds, mean } from '../../utils/stats'
import { distanceBetween } from '../../utils/fitts'
import styles from './FittsDemo.module.css'

type Size = 'L' | 'S'
type Dist = 'near' | 'far'

interface Trial {
  size: Size
  dist: Dist
  /** 標的の直径(px) */
  px: number
  /** プレイ領域内の中心位置(%) */
  x: number
  y: number
}

interface Result {
  size: Size
  dist: Dist
  /** 到達時間(ms) */
  mt: number
  /** ホーム中心からの距離(px) */
  d: number
}

type Phase = 'ready' | 'go' | 'done'

/** 大小×遠近を織り交ぜた6試行。ホームは下部固定（親指ゾーン）。 */
const TRIALS: Trial[] = [
  { size: 'L', dist: 'near', px: 88, x: 50, y: 60 },
  { size: 'S', dist: 'far', px: 40, x: 15, y: 13 },
  { size: 'L', dist: 'far', px: 88, x: 83, y: 15 },
  { size: 'S', dist: 'near', px: 40, x: 50, y: 56 },
  { size: 'S', dist: 'far', px: 40, x: 17, y: 24 },
  { size: 'L', dist: 'far', px: 88, x: 80, y: 20 },
]

const sizeLabel = (s: Size) => (s === 'L' ? '大' : '小')
const distLabel = (d: Dist) => (d === 'near' ? '近' : '遠')

export default function FittsDemo() {
  const [phase, setPhase] = useState<Phase>('ready')
  const [trialIndex, setTrialIndex] = useState(0)
  const [results, setResults] = useState<Result[]>([])
  const [lastMt, setLastMt] = useState<number | null>(null)

  const startRef = useRef(0)
  const homeCenterRef = useRef({ x: 0, y: 0 })
  const homeRef = useRef<HTMLButtonElement>(null)
  const targetRef = useRef<HTMLButtonElement>(null)

  const current = TRIALS[trialIndex]

  const handleHome = useCallback(() => {
    const home = homeRef.current
    if (home) {
      const r = home.getBoundingClientRect()
      homeCenterRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
    }
    startRef.current = performance.now()
    setPhase('go')
  }, [])

  const handleTarget = useCallback(() => {
    const mt = performance.now() - startRef.current
    const target = targetRef.current
    let d = 0
    if (target) {
      const r = target.getBoundingClientRect()
      d = distanceBetween(homeCenterRef.current, {
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
      })
    }
    setResults((prev) => [...prev, { size: current.size, dist: current.dist, mt, d }])
    setLastMt(mt)
    if (trialIndex + 1 >= TRIALS.length) {
      setPhase('done')
    } else {
      setTrialIndex((i) => i + 1)
      setPhase('ready')
    }
  }, [current, trialIndex])

  const reset = useCallback(() => {
    setResults([])
    setTrialIndex(0)
    setLastMt(null)
    setPhase('ready')
  }, [])

  const meanBySize = (s: Size) =>
    mean(results.filter((r) => r.size === s).map((r) => r.mt))
  const meanByDist = (d: Dist) =>
    mean(results.filter((r) => r.dist === d).map((r) => r.mt))

  return (
    <div className={styles.demo}>
      <div className={styles.bar}>
        <span className={styles.counter}>
          {phase === 'done' ? '完了' : `試行 ${Math.min(trialIndex + 1, TRIALS.length)} / ${TRIALS.length}`}
        </span>
        {lastMt !== null && phase !== 'done' && (
          <span className={styles.last} aria-live="polite">
            直前: <strong>{formatSeconds(lastMt, 2)}</strong>
          </span>
        )}
      </div>

      <div className={styles.area}>
        {phase === 'go' && (
          <button
            ref={targetRef}
            type="button"
            onClick={handleTarget}
            className={`${styles.target} ${current.size === 'L' ? styles.large : styles.small}`}
            style={{ left: `${current.x}%`, top: `${current.y}%` }}
            aria-label={`標的（${sizeLabel(current.size)}・${distLabel(current.dist)}）を押す`}
          >
            押す
          </button>
        )}

        {phase === 'ready' && (
          <button ref={homeRef} type="button" onClick={handleHome} className={styles.home}>
            {trialIndex === 0 ? 'ここを押してスタート' : '次へ（ここを押す）'}
          </button>
        )}

        {phase === 'done' && (
          <div className={styles.doneMsg}>
            <span className={styles.doneIcon} aria-hidden="true">
              ✓
            </span>
            計測完了
          </div>
        )}

        <p className={`${styles.hint} ${phase === 'go' ? styles.hintGo : ''}`} aria-live="polite">
          {phase === 'go'
            ? '標的をできるだけ速く押す！'
            : phase === 'ready'
              ? '下のボタンを押すと、上のどこかに標的が出ます'
              : '結果は下にまとめました'}
        </p>
      </div>

      {phase === 'done' && (
        <div className={styles.results}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>標的</th>
                <th>距離</th>
                <th>到達時間</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <span className={`${styles.tag} ${r.size === 'S' ? styles.tagSmall : ''}`}>
                      {sizeLabel(r.size)}・{distLabel(r.dist)}
                    </span>
                  </td>
                  <td className={styles.num}>{Math.round(r.d)}px</td>
                  <td className={styles.num}>{formatSeconds(r.mt, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.summary}>
            <div className={styles.cmpGroup}>
              <span className={styles.cmpTitle}>大きさで比較</span>
              <div className={styles.cmpRow}>
                <span className={styles.cmpName}>大きい標的</span>
                <span className={styles.cmpVal}>{formatSeconds(meanBySize('L'), 2)}</span>
              </div>
              <div className={styles.cmpRow}>
                <span className={styles.cmpName}>小さい標的</span>
                <span className={styles.cmpVal}>{formatSeconds(meanBySize('S'), 2)}</span>
              </div>
            </div>
            <div className={styles.cmpGroup}>
              <span className={styles.cmpTitle}>距離で比較</span>
              <div className={styles.cmpRow}>
                <span className={styles.cmpName}>近い標的</span>
                <span className={styles.cmpVal}>{formatSeconds(meanByDist('near'), 2)}</span>
              </div>
              <div className={styles.cmpRow}>
                <span className={styles.cmpName}>遠い標的</span>
                <span className={styles.cmpVal}>{formatSeconds(meanByDist('far'), 2)}</span>
              </div>
            </div>
          </div>

          <p className={styles.caveat}>
            ※小さい標的(40px)は“難しさ”を見せる演出です。実際のUIではボタンを44px以上に。1回の計測なので個人差・偶然で前後します。
          </p>

          <button type="button" onClick={reset} className={styles.retry}>
            もう一度ためす
          </button>
        </div>
      )}
    </div>
  )
}
