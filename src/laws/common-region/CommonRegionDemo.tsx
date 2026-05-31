import { useState } from 'react'
import styles from './CommonRegionDemo.module.css'

export default function CommonRegionDemo() {
  const [boxed, setBoxed] = useState(false)
  const dots = [0, 1, 2, 3, 4, 5]

  return (
    <div className={styles.demo}>
      <div className={styles.switch}>
        <button
          type="button"
          className={`${styles.tab} ${!boxed ? styles.active : ''}`}
          onClick={() => setBoxed(false)}
        >
          枠なし
        </button>
        <button
          type="button"
          className={`${styles.tab} ${boxed ? styles.active : ''}`}
          onClick={() => setBoxed(true)}
        >
          枠で囲む
        </button>
      </div>

      <div className={styles.stage}>
        {boxed ? (
          <>
            <div className={styles.region}>
              {dots.slice(0, 3).map((d) => (
                <span key={d} className={styles.dot} />
              ))}
            </div>
            <div className={styles.region}>
              {dots.slice(3).map((d) => (
                <span key={d} className={styles.dot} />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.row}>
            {dots.map((d) => (
              <span key={d} className={styles.dot} />
            ))}
          </div>
        )}
      </div>

      <p className={styles.caption}>
        {boxed
          ? '点を動かさず枠で囲むだけで、「2つのグループ」にハッキリ分かれて見える。'
          : '6つの点。これだけだと、まとまりの境目はあいまい。'}
      </p>
    </div>
  )
}
