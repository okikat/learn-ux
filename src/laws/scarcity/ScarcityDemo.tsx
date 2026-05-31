import { useState } from 'react'
import styles from './ScarcityDemo.module.css'

export default function ScarcityDemo() {
  const [on, setOn] = useState(false)

  return (
    <div className={styles.demo}>
      <div className={styles.switch}>
        <button
          type="button"
          className={`${styles.tab} ${!on ? styles.active : ''}`}
          onClick={() => setOn(false)}
        >
          ふつう
        </button>
        <button
          type="button"
          className={`${styles.tab} ${on ? styles.active : ''}`}
          onClick={() => setOn(true)}
        >
          希少性を出す
        </button>
      </div>

      <div className={`${styles.card} ${on ? styles.urgent : ''}`}>
        <span className={styles.thumb} aria-hidden="true" />
        <div className={styles.body}>
          <span className={styles.name}>限定デザインのマグカップ</span>
          {on && <span className={styles.stock}>⚠ 残り2点・本日23:59まで</span>}
          <span className={styles.price}>¥1,800</span>
          <span className={`${styles.cart} ${on ? styles.pulse : ''}`}>カートに入れる</span>
        </div>
      </div>

      <p className={styles.caption} aria-live="polite">
        {on
          ? '同じ商品でも「残りわずか・期限つき」だと、急に欲しく＆“今すぐ買わなきゃ”と感じませんか？'
          : '在庫や期限の表示がないと、「また今度でいいか」となりがち。'}
      </p>
      <p className={styles.note}>
        少なさ・締め切りは価値を高めて見せる（希少性）。ただし“偽の在庫・偽カウントダウン”は信頼を壊すダークパターン。必ず正直に。
      </p>
    </div>
  )
}
