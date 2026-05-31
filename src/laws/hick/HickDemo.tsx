import { useCallback, useEffect, useRef, useState } from 'react'
import { formatMs } from '../../utils/stats'
import styles from './HickDemo.module.css'

/** 30択ぶん用意した、見分けのつく語彙プール。 */
// 文字数をそろえた語彙（2〜3文字）。長い語が1つだけ浮いて目立たないように。
const WORDS = [
  'りんご', 'みかん', 'ぶどう', 'もも', 'いちご', 'メロン',
  'バナナ', 'すいか', 'なし', 'かき', 'レモン', 'キウイ',
  'いぬ', 'ねこ', 'うさぎ', 'きつね', 'くま', 'ぱんだ',
  'ぞう', 'きりん', 'しか', 'さる', 'たぬき', 'くじら',
  'くるま', 'ふね', 'バス', 'つくえ', 'いす', 'とけい',
  'かさ', 'ぼうし', 'くつ', 'ほし', 'やま', 'はな',
]

const ROUNDS = [3, 30]

function pickRound(optionCount: number): { target: string; options: string[] } {
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5)
  const options = shuffled.slice(0, optionCount)
  const target = options[Math.floor(Math.random() * options.length)]
  return { target, options }
}

type Sub = 'intro' | 'play' | 'done'

export default function HickDemo() {
  const [roundIndex, setRoundIndex] = useState(0)
  const [sub, setSub] = useState<Sub>('intro')
  const [round, setRound] = useState(() => pickRound(ROUNDS[0]))
  const [times, setTimes] = useState<number[]>([])
  const [wrong, setWrong] = useState(false)
  const startRef = useRef(0)

  const optionCount = ROUNDS[roundIndex]

  // ラウンドが変わったら新しい問題を用意
  useEffect(() => {
    if (roundIndex < ROUNDS.length) {
      setRound(pickRound(ROUNDS[roundIndex]))
      setSub('intro')
    }
  }, [roundIndex])

  // 「準備OK・開始する」を押した位置に選択肢ボタンが現れると、そこへ
  // フォーカス（青枠）が移ってしまうことがある。play 突入直後に解除する。
  useEffect(() => {
    if (sub !== 'play') return
    const id = requestAnimationFrame(() => {
      const el = document.activeElement as HTMLElement | null
      if (el && el.tagName === 'BUTTON') el.blur()
    })
    return () => cancelAnimationFrame(id)
  }, [sub])

  const begin = useCallback(() => {
    startRef.current = performance.now()
    setWrong(false)
    setSub('play')
  }, [])

  const choose = useCallback(
    (word: string) => {
      if (word !== round.target) {
        setWrong(true)
        return
      }
      const elapsed = performance.now() - startRef.current
      setTimes((prev) => [...prev, elapsed])
      if (roundIndex + 1 >= ROUNDS.length) {
        setSub('done')
      } else {
        setRoundIndex((i) => i + 1)
      }
    },
    [round.target, roundIndex],
  )

  const reset = useCallback(() => {
    setTimes([])
    setRoundIndex(0)
    // roundIndex=0 のとき useEffect は再発火しないので明示的に作り直す
    setRound(pickRound(ROUNDS[0]))
    setSub('intro')
  }, [])

  if (sub === 'done') {
    const diff = times[1] - times[0]
    return (
      <div className={styles.demo}>
        <h3 className={styles.resultTitle}>結果</h3>
        <div className={styles.resultRows}>
          <div className={styles.resultRow}>
            <span className={styles.rLabel}>3択</span>
            <span className={styles.rBarWrap}>
              <span className={styles.rBar} style={{ width: `${barWidth(times[0], times)}%` }} />
            </span>
            <span className={styles.rTime}>{Math.round(times[0])}ms</span>
          </div>
          <div className={styles.resultRow}>
            <span className={styles.rLabel}>30択</span>
            <span className={styles.rBarWrap}>
              <span className={`${styles.rBar} ${styles.rBarBig}`} style={{ width: `${barWidth(times[1], times)}%` }} />
            </span>
            <span className={styles.rTime}>{Math.round(times[1])}ms</span>
          </div>
        </div>
        <p className={styles.resultNote}>
          {diff > 0
            ? `30択は3択より約 ${formatMs(diff)} 多くかかりました。`
            : '今回は差が小さめでした。'}
          {' '}※1回の計測なので、個人差や偶然で前後します。何度か試すと傾向が見えます。
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
          ラウンド {roundIndex + 1} / {ROUNDS.length}（{optionCount}択）
        </span>
      </div>

      {sub === 'intro' ? (
        <div className={styles.intro}>
          <p className={styles.introLead}>
            この単語を、できるだけ速く選んでください：
          </p>
          <p className={styles.targetWord}>「{round.target}」</p>
          <button type="button" className={styles.start} onClick={begin}>
            準備OK・開始する
          </button>
        </div>
      ) : (
        <>
          <p className={styles.playPrompt}>
            「<strong>{round.target}</strong>」をタップ！
          </p>
          <div
            className={`${styles.grid} ${optionCount > 10 ? styles.gridDense : styles.gridWide}`}
          >
            {round.options.map((w) => (
              <button key={w} type="button" className={styles.option} onClick={() => choose(w)}>
                {w}
              </button>
            ))}
          </div>
          {wrong && <p className={styles.wrong}>それは違います。「{round.target}」を探して！</p>}
        </>
      )}
    </div>
  )
}

function barWidth(value: number, all: number[]): number {
  const max = Math.max(...all, 1)
  return Math.max(8, Math.round((value / max) * 100))
}
