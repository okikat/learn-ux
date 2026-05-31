import { useState } from 'react'
import styles from './ZeigarnikDemo.module.css'

const STEPS = [
  { id: 'name', label: '名前を登録', done: true },
  { id: 'icon', label: 'アイコンを設定', done: true },
  { id: 'mail', label: 'メールを確認', done: true },
  { id: 'bio', label: '自己紹介を書く', done: false },
]

export default function ZeigarnikDemo() {
  const [doneExtra, setDoneExtra] = useState(false)
  const total = STEPS.length
  const completed = STEPS.filter((s) => s.done).length + (doneExtra ? 1 : 0)
  const pct = Math.round((completed / total) * 100)

  return (
    <div className={styles.demo}>
      <div className={styles.card}>
        <div className={styles.head}>
          <span className={styles.title}>プロフィール完成度</span>
          <span className={styles.pct}>{pct}%</span>
        </div>
        <div className={styles.bar}>
          <span className={styles.fill} style={{ width: `${pct}%` }} />
        </div>

        <ul className={styles.steps}>
          {STEPS.map((s) => {
            const isDone = s.done || (s.id === 'bio' && doneExtra)
            return (
              <li key={s.id} className={`${styles.step} ${isDone ? styles.stepDone : styles.stepTodo}`}>
                <span className={styles.check}>{isDone ? '✓' : ''}</span>
                {s.label}
              </li>
            )
          })}
        </ul>

        {!doneExtra ? (
          <button type="button" className={styles.cta} onClick={() => setDoneExtra(true)}>
            あと1つ！ 残りを完成させる
          </button>
        ) : (
          <div className={styles.complete}>🎉 100% 完成！スッキリ！</div>
        )}
      </div>

      <p className={styles.note} aria-live="polite">
        {doneExtra
          ? '「あと1つ」の未完了が、あなたを完成までグイッと引っぱりました。これがツァイガルニク効果。'
          : '80%まで来て「あと1つ」が残っていると、妙に気になって埋めたくなりませんか？ 未完了は記憶と注意に残ります。'}
      </p>
      {doneExtra && (
        <button type="button" className={styles.reset} onClick={() => setDoneExtra(false)}>
          もう一度
        </button>
      )}
    </div>
  )
}
