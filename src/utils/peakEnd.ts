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
  if (x < 0.35) return (x / 0.35) * 0.99 // 序盤で一気に99%（最初は快調に見える）
  if (x < 0.97) return 0.99 // 99%で“長く”貼りつく（イライラのピーク＝悪い終わり方）
  return 0.99 + ((x - 0.97) / 0.03) * 0.01 // 最後にやっと完了
}
