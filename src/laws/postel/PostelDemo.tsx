import { useState } from 'react'
import { formatJpPhone, toHalfWidthDigits } from '../../utils/postel'
import styles from './PostelDemo.module.css'

const SAMPLES = [
  { label: '全角', value: '０９０１２３４５６７８' },
  { label: '空白区切り', value: '090 1234 5678' },
  { label: '記号つき', value: '(090)1234-5678' },
  { label: '東京03', value: '０３ー１２３４ー５６７８' },
]

export default function PostelDemo() {
  const [raw, setRaw] = useState('')
  const digits = toHalfWidthDigits(raw)
  const formatted = formatJpPhone(raw)
  const accepted = digits.length >= 10

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="postel-input">
        電話番号を入力（全角・空白・ハイフン・カッコ、どれでもOK）
      </label>
      <input
        id="postel-input"
        className={styles.input}
        type="text"
        inputMode="tel"
        placeholder="例: ０９０ー1234 5678"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        autoComplete="off"
      />

      <div className={styles.samples}>
        <span className={styles.samplesLabel}>雑な入力を試す:</span>
        {SAMPLES.map((s) => (
          <button key={s.label} type="button" className={styles.chip} onClick={() => setRaw(s.value)}>
            {s.label}
          </button>
        ))}
        <button type="button" className={styles.chipClear} onClick={() => setRaw('')}>
          クリア
        </button>
      </div>

      <div className={styles.pipeline}>
        <div className={styles.step}>
          <span className={styles.stepLabel}>受け取った入力（寛容に受理）</span>
          <code className={styles.stepValue}>{raw || '（未入力）'}</code>
        </div>
        <div className={styles.arrow} aria-hidden="true">
          ↓ アプリが自動で整える
        </div>
        <div className={`${styles.step} ${accepted ? styles.stepOk : ''}`}>
          <span className={styles.stepLabel}>
            整形結果（厳格な内部表現）{accepted && <span className={styles.badge}>✓ 受理</span>}
          </span>
          <code className={styles.stepResult}>{formatted || '—'}</code>
        </div>
      </div>

      <p className={styles.hint}>
        {accepted
          ? 'どんな書き方でも、同じきれいな形に整いました。'
          : '数字を10桁以上入れると、自動で整形されます。'}
      </p>
    </div>
  )
}
