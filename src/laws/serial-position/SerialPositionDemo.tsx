import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './SerialPositionDemo.module.css'

const POOL = [
  'みかん', 'さくら', 'でんわ', 'やま', 'ほし', 'くるま', 'ねこ',
  'つくえ', 'かぎ', 'ふね', 'とり', 'はな', 'ゆき', 'かさ', 'いし',
]
const LIST_LEN = 9
const SHOW_MS = 4200
const SHOW_MS_SLOW = 6500

type Phase = 'ready' | 'show' | 'recall' | 'result'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function SerialPositionDemo() {
  const [phase, setPhase] = useState<Phase>('ready')
  const [list, setList] = useState<string[]>([])
  const [choices, setChoices] = useState<string[]>([])
  const [picked, setPicked] = useState<Set<string>>(new Set())
  const [slow, setSlow] = useState(false)
  const timerRef = useRef<number | null>(null)
  const showMs = slow ? SHOW_MS_SLOW : SHOW_MS

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
  }, [])

  const start = useCallback(() => {
    const shuffled = shuffle(POOL)
    const nextList = shuffled.slice(0, LIST_LEN)
    const decoys = shuffled.slice(LIST_LEN, LIST_LEN + 3)
    setList(nextList)
    setChoices(shuffle([...nextList, ...decoys]))
    setPicked(new Set())
    setPhase('show')
    timerRef.current = window.setTimeout(() => {
      setPhase('recall')
      timerRef.current = null
    }, slow ? SHOW_MS_SLOW : SHOW_MS)
  }, [slow])

  const toggle = (w: string) => {
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(w)) next.delete(w)
      else next.add(w)
      return next
    })
  }

  if (phase === 'ready') {
    return (
      <div className={styles.demo}>
        <p className={styles.lead}>
          {LIST_LEN}個の単語が順番に一瞬出ます。あとで「どれがあったか」を選んでください。
        </p>
        <label className={styles.slowToggle}>
          <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} />
          <span>ゆっくり表示する</span>
        </label>
        <button type="button" className={styles.start} onClick={start}>
          スタート
        </button>
      </div>
    )
  }

  if (phase === 'show') {
    return (
      <div className={styles.demo}>
        <p className={styles.prompt}>覚えて！</p>
        <ol className={styles.showList}>
          {list.map((w, i) => (
            <li key={w} className={styles.showItem}>
              <span className={styles.pos}>{i + 1}</span>
              {w}
            </li>
          ))}
        </ol>
        <div className={styles.countdown}>
          <span className={styles.countdownBar} style={{ animationDuration: `${showMs}ms` }} />
        </div>
      </div>
    )
  }

  if (phase === 'recall') {
    return (
      <div className={styles.demo}>
        <p className={styles.prompt}>さっき出たのはどれ？（複数選べます）</p>
        <div className={styles.choices}>
          {choices.map((w) => (
            <button
              key={w}
              type="button"
              className={`${styles.choice} ${picked.has(w) ? styles.chosen : ''}`}
              onClick={() => toggle(w)}
            >
              {w}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.start}
          onClick={() => setPhase('result')}
          disabled={picked.size === 0}
        >
          答え合わせ
        </button>
      </div>
    )
  }

  // result
  return (
    <div className={styles.demo}>
      <p className={styles.prompt}>結果（位置ごとの正解）</p>
      <ol className={styles.resultList}>
        {list.map((w, i) => {
          const ok = picked.has(w)
          const edge = i === 0 || i === list.length - 1
          return (
            <li
              key={w}
              className={`${styles.resultItem} ${ok ? styles.ok : styles.miss} ${edge ? styles.edge : ''}`}
            >
              <span className={styles.pos}>{i + 1}</span>
              <span className={styles.word}>{w}</span>
              <span className={styles.mark}>{ok ? '◯' : '—'}</span>
            </li>
          )
        })}
      </ol>
      <p className={styles.note}>
        一般に、最初（1番）と最後（{list.length}番）は思い出しやすいと言われます（並びの<strong>両端</strong>が記憶に残る＝系列位置効果）。1回だと個人差が出るので、何度か試すと傾向が見えます。
      </p>
      <button type="button" className={styles.start} onClick={start}>
        もう一度ためす
      </button>
    </div>
  )
}
