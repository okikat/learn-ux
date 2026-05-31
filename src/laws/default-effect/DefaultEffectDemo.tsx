import { useState } from 'react'
import styles from './DefaultEffectDemo.module.css'

export default function DefaultEffectDemo() {
  const [checked, setChecked] = useState(true)
  const [done, setDone] = useState(false)

  return (
    <div className={styles.demo}>
      <div className={styles.card}>
        <span className={styles.title}>アカウント登録</span>
        <label className={styles.row}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            disabled={done}
          />
          <span>
            📩 お得情報メールを受け取る<span className={styles.rec}>（おすすめ）</span>
          </span>
        </label>
        {!done ? (
          <button type="button" className={styles.submit} onClick={() => setDone(true)}>
            登録する
          </button>
        ) : (
          <div className={styles.result} aria-live="polite">
            {checked
              ? 'メール受信「ON」で登録完了。初期チェックのまま進みませんでしたか？'
              : '「OFF」で登録完了。わざわざ外したあなたは、実は少数派かも。'}
          </div>
        )}
      </div>

      <p className={styles.note}>
        初期値（デフォルト）は、ほとんどの人がそのまま受け入れる＝強力。だからこそ、ユーザーに不利な初期チェック（勝手にON）は避けたいダークパターン。
        “ユーザーのための良い初期値”を選ぶのが設計者の腕の見せどころ。
      </p>

      {done && (
        <button
          type="button"
          className={styles.again}
          onClick={() => {
            setDone(false)
            setChecked(true)
          }}
        >
          もう一度
        </button>
      )}
    </div>
  )
}
