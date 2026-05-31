import { useState } from 'react'
import styles from './PragnanzDemo.module.css'

const R = 16
// 3つのパックマンの中心（viewBox 0..100）。上向きの三角形を作る配置。
const PACS = [
  { cx: 50, cy: 20 },
  { cx: 22, cy: 72 },
  { cx: 78, cy: 72 },
]
// 3点の重心。錯視ONのとき、各パックマンの口（欠け）はここを向く。
const CX = (PACS[0].cx + PACS[1].cx + PACS[2].cx) / 3
const CY = (PACS[0].cy + PACS[1].cy + PACS[2].cy) / 3

/** 中心(cx,cy)・半径r のパックマン。口（60度の欠け）が mouthDeg 方向を向く。 */
function pacPath(cx: number, cy: number, r: number, mouthDeg: number) {
  const half = 30
  const a1 = ((mouthDeg + half) * Math.PI) / 180
  const a2 = ((mouthDeg - half) * Math.PI) / 180
  const x1 = (cx + r * Math.cos(a1)).toFixed(2)
  const y1 = (cy + r * Math.sin(a1)).toFixed(2)
  const x2 = (cx + r * Math.cos(a2)).toFixed(2)
  const y2 = (cy + r * Math.sin(a2)).toFixed(2)
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2} Z`
}

export default function PragnanzDemo() {
  const [aligned, setAligned] = useState(true)

  return (
    <div className={styles.demo}>
      {/* 文言が切り替わっても高さが暴れないよう、両方を重ねて最大高さを確保する
          （非表示側も visibility:hidden で場所を保持）。配色に依存しない表現にする。 */}
      <div className={styles.qStack}>
        <p className={`${styles.q} ${aligned ? '' : styles.hidden}`} aria-hidden={!aligned}>
          図の中央に、三角形が見えますか？
        </p>
        <p className={`${styles.q} ${aligned ? styles.hidden : ''}`} aria-hidden={aligned}>
          回すと消えます。線は元々ありません。
        </p>
      </div>

      <svg
        className={styles.stage}
        viewBox="0 0 100 100"
        role="img"
        aria-label="欠けた円が3つ。口の向きがそろうと、引かれていない三角形が中央に浮かんで見える。"
      >
        {PACS.map((p, i) => {
          const toCentroid = (Math.atan2(CY - p.cy, CX - p.cx) * 180) / Math.PI
          // 錯視ON＝口は中心向き / OFF＝口を外向き（180度反転）に描き直す
          const mouthDeg = aligned ? toCentroid : toCentroid + 180
          return <path key={i} className={styles.pac} d={pacPath(p.cx, p.cy, R, mouthDeg)} />
        })}
      </svg>

      <button type="button" className={styles.toggle} onClick={() => setAligned((a) => !a)}>
        {/* ラベルの長短でボタン幅が変わらないよう、こちらも重ねて最大幅を確保 */}
        <span className={styles.btnStack}>
          <span className={aligned ? '' : styles.hidden}>欠けの向きを回す</span>
          <span className={aligned ? styles.hidden : ''}>元に戻す</span>
        </span>
      </button>

      <p className={styles.note}>
        脳は欠けた円のすき間を、<strong>いちばん単純で安定した形＝三角形</strong>として補って“見て”しまう（プレグナンツ）。
        だからロゴやアイコンは、線が少なく単純な形ほど速く正しく伝わる。
      </p>
    </div>
  )
}
