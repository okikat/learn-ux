import { useState, type ReactNode } from 'react'
import styles from './FakeLinkTrap.module.css'

/**
 * 「リンクでない青字＋下線」の自己言及デモ。
 * 本物のリンクではないが、見た目がリンクに似ているため“押せそう”に見える——
 * という類似の法則の落とし穴を、説明文そのものに仕込んで体験させる。
 * 押すとオチ（リンクじゃないよ）が出て、もう一度押すと閉じる。
 */
export default function FakeLinkTrap({ children }: { children: ReactNode }) {
  const [tricked, setTricked] = useState(false)
  const toggle = () => setTricked((t) => !t)

  return (
    <>
      <span
        className={styles.fakeLink}
        role="button"
        tabIndex={0}
        aria-pressed={tricked}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
      >
        {children}
      </span>
      {tricked && (
        <span className={styles.gotcha} role="status">
          ——ほらね、押しちゃった😏 ただの青い文字で<strong>リンクじゃありません</strong>。
        </span>
      )}
    </>
  )
}
