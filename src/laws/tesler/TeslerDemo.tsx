import { useMemo, useState } from 'react'
import { lookupAddress, SAMPLE_ZIPS } from '../../utils/tesler'
import styles from './TeslerDemo.module.css'

export default function TeslerDemo() {
  // A: 全部自分で入力
  const [aZip, setAZip] = useState('')
  const [aPref, setAPref] = useState('')
  const [aCity, setACity] = useState('')

  // B: アプリが肩代わり（郵便番号だけ）
  const [bZip, setBZip] = useState('')
  const bAddr = useMemo(() => lookupAddress(bZip), [bZip])

  const aFilled = [aZip, aPref, aCity].filter((v) => v.trim() !== '').length
  const bFilled = bZip.trim() !== '' ? 1 : 0

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
            <Field label="郵便番号" value={aZip} onChange={setAZip} placeholder="1000001" inputMode="numeric" />
            <Field label="都道府県" value={aPref} onChange={setAPref} placeholder="東京都" />
            <Field label="市区町村" value={aCity} onChange={setACity} placeholder="千代田区千代田" />
          </div>
          <p className={styles.effort}>
            あなたが入力する項目：<strong>{aFilled} / 3</strong>
          </p>
        </section>

        {/* B 版 */}
        <section className={`${styles.card} ${styles.cardB}`}>
          <header className={styles.cardHead}>
            <span className={`${styles.cardTag} ${styles.cardTagB}`}>B</span>
            <h3 className={styles.cardTitle}>アプリが肩代わり</h3>
          </header>
          <div className={styles.fields}>
            <Field
              label="郵便番号"
              value={bZip}
              onChange={setBZip}
              placeholder="1000001"
              inputMode="numeric"
            />
            <div className={styles.auto}>
              <span className={styles.autoLabel}>都道府県・市区町村</span>
              <span className={styles.autoValue}>
                {bAddr ? `${bAddr.prefecture} ${bAddr.city}` : '郵便番号から自動入力されます'}
              </span>
            </div>
          </div>
          <div className={styles.zipChips}>
            {SAMPLE_ZIPS.slice(0, 3).map((z) => (
              <button key={z} type="button" className={styles.zipChip} onClick={() => setBZip(z)}>
                {z}
              </button>
            ))}
          </div>
          <p className={styles.effort}>
            あなたが入力する項目：<strong>{bFilled} / 1</strong>
          </p>
        </section>
      </div>

      <p className={styles.note}>
        住所を完成させる複雑さは消えていません。Bでは、その手間をアプリ（住所データ）が肩代わりしているだけ。
        誰かが必ず引き受ける——それがテスラーの法則です。
      </p>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  inputMode?: 'numeric' | 'text'
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        className={styles.input}
        type="text"
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </label>
  )
}
