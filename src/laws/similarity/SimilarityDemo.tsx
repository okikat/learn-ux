import { useState } from 'react'
import styles from './SimilarityDemo.module.css'

type Mode = 'none' | 'color' | 'shape'

export default function SimilarityDemo() {
  const [mode, setMode] = useState<Mode>('none')
  const cells = Array.from({ length: 16 }, (_, i) => i)

  return (
    <div className={styles.demo}>
      <div className={styles.switch}>
        {(['none', 'color', 'shape'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            className={`${styles.tab} ${mode === m ? styles.active : ''}`}
            onClick={() => setMode(m)}
          >
            {m === 'none' ? '差なし' : m === 'color' ? '色で類似' : '形で類似'}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {cells.map((i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          const colored = mode === 'color' && (col === 0 || col === 2)
          const square = mode === 'shape' && (row === 0 || row === 2)
          return (
            <span
              key={i}
              className={`${styles.cell} ${colored ? styles.colored : ''} ${square ? styles.square : ''}`}
            />
          )
        })}
      </div>

      <p className={styles.caption}>
        {mode === 'none' && '全部同じだと、特定のまとまりは見えてこない。'}
        {mode === 'color' && '色が同じものが「縦の列」のまとまりとして浮かび上がる。'}
        {mode === 'shape' && '形が同じものが「横の行」のまとまりとして見える。'}
      </p>
    </div>
  )
}
