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
        {/* 枠は背景に敷くだけ。ドットの位置は枠の有無で一切動かない。 */}
        {boxed && (
          <div className={`${styles.grid} ${styles.regions}`} aria-hidden="true">
            <span className={`${styles.region} ${styles.regionA}`} />
            <span className={`${styles.region} ${styles.regionB}`} />
          </div>
        )}
        <div className={`${styles.grid} ${styles.dots}`}>
          {dots.map((d) => (
            <span key={d} className={styles.dot} />
          ))}
        </div>
      </div>

      <p className={styles.caption} aria-live="polite">
        {boxed
          ? '点の位置はそのまま。枠で囲うだけで「2つのグループ」にハッキリ分かれて見える。'
          : '6つの点。これだけだと、まとまりの境目はあいまい。'}
      </p>
    </div>
  )
}
