/** デモ各所で使う、計測・集計まわりの純関数。 */

/** 平均値（空配列は0） */
export function mean(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((sum, v) => sum + v, 0) / values.length
}

/** 値を[min, max]に収める */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

/** ミリ秒を「x.x秒」表記に（既定は小数1桁。digits=2 で「x.xx秒」＝差が丸まる比較用） */
export function formatSeconds(ms: number, digits = 1): string {
  return `${(ms / 1000).toFixed(digits)}秒`
}

/** part / total を 0〜100 の整数パーセントで返す（total=0 は 0） */
export function percent(part: number, total: number): number {
  if (total === 0) return 0
  return Math.round((part / total) * 100)
}

/** 配列をindexで安全に巡回（負やはみ出しでも有効インデックスに丸める） */
export function wrapIndex(index: number, length: number): number {
  if (length <= 0) return 0
  return ((index % length) + length) % length
}
