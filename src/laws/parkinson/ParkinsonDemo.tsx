import { useState } from 'react'
import styles from './ParkinsonDemo.module.css'

const NEED_MIN = 30 // 本来の所要時間（分）

export default function ParkinsonDemo() {
  const [hours, setHours] = useState(4) // 与える締め切り（時間）
  const allottedMin = hours * 60
  const needPct = Math.round((NEED_MIN / allottedMin) * 100)
  const expandPct = 100 - needPct

  return (
    <div className={styles.demo}>
      <p className={styles.task}>
        タスク：<strong>スライドを1枚つくる</strong>（本当は30分で終わる作業）
      </p>

      <label className={styles.label} htmlFor="pk-slider">
        与える締め切り：<strong>{hours}時間</strong>
      </label>
      <input
        id="pk-slider"
        className={styles.slider}
        type="range"
        min={1}
        max={8}
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
      />

      <div className={styles.bar} aria-hidden="true">
        <span className={styles.need} style={{ width: `${needPct}%` }}>
          {needPct >= 18 ? '必要 30分' : ''}
        </span>
        <span className={styles.expand} style={{ width: `${expandPct}%` }}>
          {expandPct >= 20 && (
            <>
              膨らんだ時間
              <br />
              （先延ばし・やり直し）
            </>
          )}
        </span>
      </div>

      <p className={styles.note}>
        与える時間が長いほど、同じ作業が<strong>締め切りいっぱいまで膨張</strong>します
        （30分で済むのに{hours}時間…）。短く現実的な締め切りや、手数を減らす工夫が効く。
      </p>
    </div>
  )
}
