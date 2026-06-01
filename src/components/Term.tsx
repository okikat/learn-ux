import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { createPortal } from 'react-dom'
import { glossary } from '../data/glossary'
import styles from './Term.module.css'

let seq = 0

type Pos = { top: number; left: number; arrow: number; below: boolean }

/**
 * 難語・カタカナ語に「破線の下線」を付け、タップで意味を吹き出し表示する。
 *  - 意味は用語集（glossary）から引く。無い語はただのテキストにフォールバック。
 *  - 吹き出しは createPortal で body に出すオーバーレイ＝本文を押し出さない（ガタつかない）。
 *  - 画面端でははみ出さないよう左右をクランプ。上が狭ければ下に出す。
 *  - 外側タップ / Esc / スクロールで閉じる。同時に開くのは1つ（開くと前のは閉じる挙動は外側タップで担保）。
 */
export default function Term({ children }: { children: string }) {
  const def = glossary[children]
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<Pos | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const popRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(`term-${(seq += 1)}`)

  const place = () => {
    const btn = btnRef.current
    if (!btn) return
    const r = btn.getBoundingClientRect()
    const pad = 8
    const popW = Math.min(260, window.innerWidth - pad * 2)
    const popH = popRef.current?.offsetHeight ?? 96
    // 横：単語の中央に寄せ、画面内にクランプ
    let left = r.left + r.width / 2 - popW / 2
    left = Math.max(pad, Math.min(left, window.innerWidth - pad - popW))
    // 矢印のx（吹き出し内座標）。端でも吹き出し内に収める
    const arrow = Math.max(16, Math.min(r.left + r.width / 2 - left, popW - 16))
    // 縦：基本は上。上の余白が足りず下が広ければ下に出す
    const roomAbove = r.top - pad
    const roomBelow = window.innerHeight - r.bottom - pad
    const below = roomAbove < popH && roomBelow > roomAbove
    const top = below ? r.bottom + pad : r.top - pad - popH
    setPos({ top, left, arrow, below })
  }

  useLayoutEffect(() => {
    if (open) place()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node
      if (btnRef.current?.contains(t) || popRef.current?.contains(t)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onMove = () => setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onMove, true)
    window.addEventListener('resize', onMove)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onMove, true)
      window.removeEventListener('resize', onMove)
    }
  }, [open])

  // 用語集に無ければ素のテキスト（フェイルセーフ）
  if (!def) return <>{children}</>

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={styles.term}
        aria-expanded={open}
        aria-describedby={open ? idRef.current : undefined}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
      >
        {children}
      </button>
      {open &&
        createPortal(
          <div
            ref={popRef}
            id={idRef.current}
            role="tooltip"
            className={`${styles.pop} ${pos?.below ? styles.below : styles.above}`}
            style={
              pos
                ? ({ top: pos.top, left: pos.left, '--arrow': `${pos.arrow}px` } as CSSProperties)
                : { visibility: 'hidden', top: 0, left: 0 }
            }
          >
            <span className={styles.popWord}>{children}</span>
            <span className={styles.popDef}>{def}</span>
          </div>,
          document.body,
        )}
    </>
  )
}
