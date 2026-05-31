/** パレートの法則デモ用：降順の累積シェアまわりの純関数。 */

/** 値を降順に並べ、上位から累積したシェア(0〜1)の配列を返す。 */
export function cumulativeShares(values: number[]): number[] {
  const total = values.reduce((a, b) => a + b, 0)
  if (total <= 0) return values.map(() => 0)
  const sorted = [...values].sort((a, b) => b - a)
  let acc = 0
  return sorted.map((v) => {
    acc += v
    return acc / total
  })
}

/** 上位 fraction(0〜1) の項目で、全体のどれだけ(0〜1)をカバーするか。 */
export function coverageByTopFraction(values: number[], fraction: number): number {
  const n = values.length
  if (n === 0) return 0
  const k = Math.max(0, Math.min(n, Math.round(n * fraction)))
  if (k === 0) return 0
  return cumulativeShares(values)[k - 1]
}
