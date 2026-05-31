import { useMemo, useState } from 'react'
import { calculateAge } from '../../utils/age'
import styles from './TeslerDemo.module.css'

export default function TeslerDemo() {
  // A: 全部自分で入力（年齢も自分で計算）
  const [aY, setAY] = useState('')
  const [aM, setAM] = useState('')
  const [aD, setAD] = useState('')
  const [aAge, setAAge] = useState('')
  // B: アプリが肩代わり（生年月日だけ）
  const [bDate, setBDate] = useState('')

  const bAge = useMemo(() => {
    if (!bDate) return null
    const d = new Date(bDate)
    if (Number.isNaN(d.getTime())) return null
    return calculateAge(d, new Date())
  }, [bDate])

  const aFilled = [aY, aM, aD, aAge].filter((v) => v.trim() !== '').length
  const bFilled = bDate.trim() !== '' ? 1 : 0

  return (
    <div className={styles.demo}>
      <div className={styles.cards}>
        {/* A 版 */}
        <section className={styles.card}>
          <header className={styles.cardHead}>
            <span className={styles.cardTag}>A</span>
            <h3 className={styles.cardTitle}>全部、自分で書く</h3>
          </header>
          <div className={styles.fields}>
            <div className={styles.ymd}>
              <Field label="生年" value={aY} onChange={setAY} ph="2000" />
              <Field label="月" value={aM} onChange={setAM} ph="6" narrow />
              <Field label="日" value={aD} onChange={setAD} ph="15" narrow />
            </div>
            <Field label="年齢（自分で計算して入力）" value={aAge} onChange={setAAge} ph="例: 25" />
          </div>
          <p className={styles.effort}>
            入力する項目：<strong>{aFilled} / 4</strong>
          </p>
        </section>

        {/* B 版 */}
        <section className={`${styles.card} ${styles.cardB}`}>
          <header className={styles.cardHead}>
            <span className={`${styles.cardTag} ${styles.cardTagB}`}>B</span>
            <h3 className={styles.cardTitle}>アプリが肩代わり</h3>
          </header>
          <div className={styles.fields}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>生年月日</span>
              <input
                className={styles.input}
                type="date"
                value={bDate}
                onChange={(e) => setBDate(e.target.value)}
              />
            </label>
            <div className={styles.auto}>
              <span className={styles.autoLabel}>年齢</span>
              <span className={styles.autoValue}>
                {bAge !== null ? `${bAge}歳` : '生年月日から自動で計算されます'}
              </span>
            </div>
          </div>
          <p className={styles.effort}>
            入力する項目：<strong>{bFilled} / 1</strong>
          </p>
        </section>
      </div>

      <p className={styles.note}>
        「年齢を出す」という複雑さは消えていません。Bでは、その計算をアプリが肩代わりしているだけ。
        誰かが必ず引き受ける——それがテスラーの法則です。
      </p>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  ph,
  narrow,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  ph?: string
  narrow?: boolean
}) {
  return (
    <label className={`${styles.field} ${narrow ? styles.narrow : ''}`}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        className={styles.input}
        type="text"
        inputMode="numeric"
        value={value}
        placeholder={ph}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </label>
  )
}
