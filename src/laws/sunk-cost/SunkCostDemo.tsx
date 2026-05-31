import { useState } from 'react'
import styles from './SunkCostDemo.module.css'

export default function SunkCostDemo() {
  const [hours, setHours] = useState(80)
  const [choice, setChoice] = useState<'keep' | 'quit' | null>(null)
  const reluctance = Math.min(95, Math.round((hours / 120) * 90) + 5)

  return (
    <div className={styles.demo}>
      <p className={styles.scene}>
        あるゲームに <strong>{hours}時間</strong> つぎ込んだ。でも正直、もう<strong>飽きた</strong>。さあ、どうする？
      </p>

      <label className={styles.label} htmlFor="sc-slider">
        つぎ込んだ時間：{hours}時間
      </label>
      <input
        id="sc-slider"
        className={styles.slider}
        type="range"
        min={0}
        max={120}
        step={5}
        value={hours}
        onChange={(e) => {
          setHours(Number(e.target.value))
          setChoice(null)
        }}
      />

      <div className={styles.meter}>
        <span className={styles.meterFill} style={{ width: `${reluctance}%` }} />
      </div>
      <span className={styles.meterLabel}>「やめるのがもったいない」度（イメージ）{reluctance}%</span>

      {choice === null ? (
        <div className={styles.choices}>
          <button type="button" className={styles.keep} onClick={() => setChoice('keep')}>
            もったいないし続ける
          </button>
          <button type="button" className={styles.quit} onClick={() => setChoice('quit')}>
            やめる
          </button>
        </div>
      ) : (
        <div className={styles.reveal} aria-live="polite">
          {choice === 'keep' ? (
            <p>「ここまでやったし…」と、つい続けたくなりますよね。</p>
          ) : (
            <p>スパッと決断！ じつはこれが合理的です。</p>
          )}
          <p className={styles.small}>
            つぎ込んだ{hours}時間は<strong>もう戻ってきません（サンクコスト）</strong>。
            続けるかは“これから楽しいか”だけで決めるのが正解で、過去の投資は判断材料にしないのがコツ。
          </p>
          <button type="button" className={styles.again} onClick={() => setChoice(null)}>
            選び直す
          </button>
        </div>
      )}
    </div>
  )
}
