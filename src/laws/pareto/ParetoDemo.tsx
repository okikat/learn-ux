import { useMemo, useState } from 'react'
import { coverageByTopFraction } from '../../utils/pareto'
import styles from './ParetoDemo.module.css'

const FEATURES = [
  { name: '検索', usage: 50 },
  { name: '一覧を見る', usage: 30 },
  { name: 'お気に入り', usage: 5 },
  { name: '共有', usage: 4 },
  { name: '通知', usage: 3 },
  { name: '設定', usage: 2 },
  { name: '絞り込み', usage: 2 },
  { name: '並び替え', usage: 2 },
  { name: 'エクスポート', usage: 1 },
  { name: 'テーマ変更', usage: 1 },
]

export default function ParetoDemo() {
  const [pct, setPct] = useState(20)
  const sorted = useMemo(() => [...FEATURES].sort((a, b) => b.usage - a.usage), [])
  const usages = sorted.map((f) => f.usage)
  const n = sorted.length
  const k = Math.max(1, Math.round(n * (pct / 100)))
  const coverage = Math.round(coverageByTopFraction(usages, pct / 100) * 100)
  const maxUsage = Math.max(...usages)

  return (
    <div className={styles.demo}>
      <div className={styles.readout} aria-live="polite">
        上位 <strong>{pct}%</strong>（{k}機能）で、利用全体の{' '}
        <strong className={styles.big}>{coverage}%</strong> をカバー
      </div>

      <input
        className={styles.slider}
        type="range"
        min={10}
        max={100}
        step={10}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
        aria-label="上位何パーセントの機能に注目するか"
      />

      <ul className={styles.bars}>
        {sorted.map((f, i) => (
          <li key={f.name} className={styles.row}>
            <span className={styles.name}>{f.name}</span>
            <span className={styles.track}>
              <span
                className={`${styles.fill} ${i < k ? styles.hot : ''}`}
                style={{ width: `${(f.usage / maxUsage) * 100}%` }}
              />
            </span>
            <span className={styles.usage}>{f.usage}%</span>
          </li>
        ))}
      </ul>

      <p className={styles.note}>
        スライダーを<strong>20%</strong>あたりにすると、ごく一部の機能だけで利用の大半をカバーしているのが分かります。
        「全部に均等」ではなく、<strong>効く2割</strong>に力を集中するのが効率的（80:20）。
      </p>
    </div>
  )
}
