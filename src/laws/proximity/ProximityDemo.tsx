import { useState } from 'react'
import styles from './ProximityDemo.module.css'

const PAIRS = [
  { label: '氏名', value: '山田 太郎' },
  { label: 'メールアドレス', value: 'taro@example.com' },
  { label: '電話番号', value: '090-1234-5678' },
  { label: '住所', value: '東京都千代田区1-1' },
]

export default function ProximityDemo() {
  const [grouped, setGrouped] = useState(false)
  return (
    <div className={styles.demo}>
      <div className={styles.switch} role="tablist">
        <button
          type="button"
          className={`${styles.tab} ${!grouped ? styles.active : ''}`}
          onClick={() => setGrouped(false)}
        >
          近接なし
        </button>
        <button
          type="button"
          className={`${styles.tab} ${grouped ? styles.active : ''}`}
          onClick={() => setGrouped(true)}
        >
          近接でまとめる
        </button>
      </div>

      <div className={`${styles.list} ${grouped ? styles.grouped : styles.flat}`}>
        {PAIRS.map((p) => (
          <div key={p.label} className={styles.pair}>
            <span className={styles.label}>{p.label}</span>
            <span className={styles.value}>{p.value}</span>
          </div>
        ))}
      </div>

      <p className={styles.caption}>
        {grouped
          ? '項目名と値を近づけ、ペアどうしを離すと、どれが対なのか一目で分かる。'
          : 'すべて等間隔だと、どの値がどの項目のものか分かりにくい。'}
      </p>
    </div>
  )
}
