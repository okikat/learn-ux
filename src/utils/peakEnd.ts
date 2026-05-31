/** ピーク・エンドの法則デモ用：同じ総時間で「終わり方」が異なる進捗カーブ。 */

function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t))
}

/** なめらかに進み、最後はスッと気持ちよく終わる（ease-out）。 */
export function smoothProgress(t: number): number {
  const x = clamp01(t)
  return 1 - (1 - x) * (1 - x)
}

/**
 * 序盤で一気に99%まで進むが、そこで長く“貼りつき”、最後だけ完了する。
 * 誰もが知る「99%で固まるダウンロード」。総時間は smooth と同じ。
 */
export function jankyProgress(t: number): number {
  const x = clamp01(t)
  if (x < 0.45) return (x / 0.45) * 0.9 // 0→90%
  if (x < 0.6) return 0.9 + ((x - 0.45) / 0.15) * 0.09 // 90→99%
  if (x < 0.98) return 0.99 // 99%で貼りつく（イライラ）
  return 0.99 + ((x - 0.98) / 0.02) * 0.01 // 最後に完了
}
