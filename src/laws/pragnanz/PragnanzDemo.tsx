import { useState } from 'react'
import styles from './PragnanzDemo.module.css'

export default function PragnanzDemo() {
  const [answer, setAnswer] = useState<null | 'simple' | 'complex'>(null)

  return (
    <div className={styles.demo}>
      <p className={styles.q}>この図形、パッと見て「何」に見えますか？</p>

      <div className={styles.figure} aria-hidden="true">
        <span className={styles.circle} style={{ left: '22%', top: '8%' }} />
        <span className={styles.circle} style={{ left: '46%', top: '8%' }} />
        <span className={styles.circle} style={{ left: '34%', top: '42%' }} />
      </div>

      {answer === null ? (
        <div className={styles.options}>
          <button type="button" className={styles.opt} onClick={() => setAnswer('simple')}>
            重なった3つの丸
          </button>
          <button type="button" className={styles.opt} onClick={() => setAnswer('complex')}>
            たくさんの複雑な断片
          </button>
        </div>
      ) : (
        <div className={styles.reveal} aria-live="polite">
          <p>
            多くの人は「<strong>重なった丸</strong>」と捉えます。バラバラの複雑な断片の集まり、とは見ません。
          </p>
          <p className={styles.small}>
            脳は、複雑な形をいちばん<strong>単純で安定した形</strong>に“まとめて”認識します（プレグナンツ）。
            ロゴが少数の円や四角で作られがちなのも、「単純な形ほど速く正しく伝わる」この性質を使っているから。
          </p>
          <button type="button" className={styles.again} onClick={() => setAnswer(null)}>
            もう一度
          </button>
        </div>
      )}
    </div>
  )
}
