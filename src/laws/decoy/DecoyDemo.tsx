import { useState } from 'react'
import styles from './DecoyDemo.module.css'

interface Plan {
  id: string
  name: string
  price: string
  detail: string
  share: number
  decoy?: boolean
}

const PLANS_NO: Plan[] = [
  { id: 'A', name: 'ライト', price: '¥500', detail: '容量 5GB', share: 50 },
  { id: 'C', name: 'プロ', price: '¥1,000', detail: '容量 100GB', share: 50 },
]
const PLANS_DECOY: Plan[] = [
  { id: 'A', name: 'ライト', price: '¥500', detail: '容量 5GB', share: 20 },
  { id: 'B', name: 'スタンダード', price: '¥900', detail: '容量 10GB', share: 5, decoy: true },
  { id: 'C', name: 'プロ', price: '¥1,000', detail: '容量 100GB', share: 75 },
]

export default function DecoyDemo() {
  const [decoy, setDecoy] = useState(false)
  const plans = decoy ? PLANS_DECOY : PLANS_NO

  return (
    <div className={styles.demo}>
      <div className={styles.switch}>
        <button
          type="button"
          className={`${styles.tab} ${!decoy ? styles.active : ''}`}
          onClick={() => setDecoy(false)}
        >
          2プラン
        </button>
        <button
          type="button"
          className={`${styles.tab} ${decoy ? styles.active : ''}`}
          onClick={() => setDecoy(true)}
        >
          おとりを追加
        </button>
      </div>

      <div className={styles.plans}>
        {plans.map((pl) => (
          <div
            key={pl.id}
            className={`${styles.plan} ${pl.share >= 70 ? styles.best : ''} ${pl.decoy ? styles.isDecoy : ''}`}
          >
            <div className={styles.head}>
              <span className={styles.pName}>
                {pl.name}
                {pl.decoy && <span className={styles.tag}>おとり</span>}
                {pl.share >= 70 && <span className={styles.tagBest}>選ばれる</span>}
              </span>
              <span className={styles.pPrice}>{pl.price}</span>
            </div>
            <span className={styles.pDetail}>{pl.detail}</span>
            <span className={styles.shareWrap}>
              <span className={styles.shareBar} style={{ width: `${pl.share}%` }} />
            </span>
            <span className={styles.shareVal}>選ばれやすさ（目安）{pl.share}%</span>
          </div>
        ))}
      </div>

      <p className={styles.caption} aria-live="polite">
        {decoy
          ? '「プロまであと¥100なのに容量は1/10」のおとりを置くと、プロが“断然お得”に見えて選ばれます。'
          : '2択だと、安いライトと高機能プロで好みが分かれます。'}
      </p>
      <p className={styles.note}>
        選ばせたい選択肢の近くに“少し見劣りする比較対象”を置くと際立つ（おとり効果）。おとりは1つだけ・誠実に。
      </p>
    </div>
  )
}
