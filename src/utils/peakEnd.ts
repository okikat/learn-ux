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
 * 序盤で一気に9割まで進むが、終盤で停滞して最後がもたつく（イヤな終わり方）。
 * 総時間は smooth と同じ。
 */
export function jankyProgress(t: number): number {
  const x = clamp01(t)
  if (x < 0.85) return (x / 0.85) * 0.9
  return 0.9 + ((x - 0.85) / 0.15) * 0.1
}
