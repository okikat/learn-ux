import { useState } from 'react'
import styles from './ParkinsonDemo.module.css'

const NEEDED = 3 // 本当に必要な日数（固定）
const MAX = 14

export default function ParkinsonDemo() {
  const [allotted, setAllotted] = useState(10)
  const usedPct = (allotted / MAX) * 100
  const neededPct = (NEEDED / MAX) * 100
  const waste = allotted - NEEDED

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="pk-slider">
        与える締め切り：<strong>{allotted}日</strong>
      </label>
      <input
        id="pk-slider"
        className={styles.slider}
        type="range"
        min={3}
        max={MAX}
        value={allotted}
        onChange={(e) => setAllotted(Number(e.target.value))}
      />

      <div className={styles.bars}>
        <div className={styles.barRow}>
          <span className={styles.barLabel}>本当に必要</span>
          <span className={styles.track}>
            <span className={`${styles.fill} ${styles.need}`} style={{ width: `${neededPct}%` }} />
          </span>
          <span className={styles.val}>{NEEDED}日</span>
        </div>
        <div className={styles.barRow}>
          <span className={styles.barLabel}>実際に使う</span>
          <span className={styles.track}>
            <span className={`${styles.fill} ${styles.use}`} style={{ width: `${usedPct}%` }} />
          </span>
          <span className={styles.val}>{allotted}日</span>
        </div>
      </div>

      <p className={styles.note}>
        与える時間が増えるほど、作業は<strong>そのぶん膨張</strong>して時間を使い切ってしまう
        （いまの“ムダ”は約 <strong>{waste}日</strong>）。だから現実的で<strong>少し短めの締め切り</strong>や、
        入力の自動化などで“余白”を減らすと、サッと終わります。
      </p>
    </div>
  )
}
