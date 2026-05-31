import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './MereExposureDemo.module.css'

const SYMBOLS = [
  { id: 0, glyph: '◆', color: '#1c7ed6' },
  { id: 1, glyph: '●', color: '#e8590c' },
  { id: 2, glyph: '▲', color: '#2f9e44' },
  { id: 3, glyph: '■', color: '#b5179e' },
]
const FLASH_MS = 320
type Phase = 'intro' | 'show' | 'pick' | 'result'

function buildSequence(target: number): number[] {
  const seq: number[] = []
  for (let i = 0; i < 6; i++) seq.push(target) // 目立たせたい記号を多めに
  SYMBOLS.forEach((s) => {
    if (s.id !== target) seq.push(s.id)
  })
  return seq.sort(() => Math.random() - 0.5)
}

export default function MereExposureDemo() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [target, setTarget] = useState(0)
  const [current, setCurrent] = useState<number | null>(null)
  const [picked, setPicked] = useState<number | null>(null)
  const seqRef = useRef<number[]>([])
  const idxRef = useRef(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
  }, [])

  const start = useCallback(() => {
    // モーション過敏設定では点滅をゆっくりにする
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const flashMs = reduce ? 700 : FLASH_MS
    const t = Math.floor(Math.random() * SYMBOLS.length)
    setTarget(t)
    setPicked(null)
    seqRef.current = buildSequence(t)
    idxRef.current = 0
    setPhase('show')
    const step = () => {
      if (idxRef.current >= seqRef.current.length) {
        setCurrent(null)
        setPhase('pick')
        timerRef.current = null
        return
      }
      setCurrent(seqRef.current[idxRef.current])
      idxRef.current += 1
      timerRef.current = window.setTimeout(step, flashMs)
    }
    step()
  }, [])

  const pick = (id: number) => {
    setPicked(id)
    setPhase('result')
  }

  if (phase === 'intro') {
    return (
      <div className={styles.demo}>
        <p className={styles.lead}>
          4種類の記号が、つぎつぎ一瞬ずつ表示されます。覚えようとしなくてOK。終わったら「好きな記号」を選んでください。
        </p>
        <button type="button" className={styles.start} onClick={start}>
          スタート
        </button>
      </div>
    )
  }

  if (phase === 'show') {
    return (
      <div className={styles.demo}>
        <p className={styles.prompt}>ながめていてください…</p>
        <div className={styles.stage}>
          {current !== null && (
            <span className={styles.flash} style={{ color: SYMBOLS[current].color }}>
              {SYMBOLS[current].glyph}
            </span>
          )}
        </div>
      </div>
    )
  }

  if (phase === 'pick') {
    return (
      <div className={styles.demo}>
        <p className={styles.prompt}>どれが一番“しっくりくる／好き”ですか？</p>
        <div className={styles.options}>
          {SYMBOLS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={styles.opt}
              style={{ color: s.color }}
              onClick={() => pick(s.id)}
            >
              {s.glyph}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const hit = picked === target
  return (
    <div className={styles.demo}>
      <p className={styles.prompt}>
        {hit ? '当たり！ それ、いちばん多く出ていた記号です。' : 'ちなみに、いちばん多く出ていたのは…'}
      </p>
      <div className={styles.options}>
        {SYMBOLS.map((s) => (
          <span
            key={s.id}
            className={`${styles.opt} ${s.id === target ? styles.target : ''} ${
              s.id === picked && !hit ? styles.miss : ''
            }`}
            style={{ color: s.color }}
          >
            {s.glyph}
          </span>
        ))}
      </div>
      <p className={styles.note}>
        意味のない記号でも、<strong>たくさん見たものほど“なんとなく好き”</strong>になりやすい——単純接触効果。
        見慣れたブランドの色や形が好まれるのも同じ理由です。
      </p>
      <button type="button" className={styles.again} onClick={start}>
        もう一度
      </button>
    </div>
  )
}
