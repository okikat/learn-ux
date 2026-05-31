/** フィッツの法則まわりの純関数。 */

/**
 * フィッツの法則の「難易度指数（Index of Difficulty, ID）」。
 * Shannon版: ID = log2(D / W + 1)
 *  - D: 標的までの距離, W: 標的の幅
 * IDが大きいほど（遠い/小さいほど）到達に時間がかかる、という指標。
 * 距離0や幅0でも破綻しないよう正規化してある。
 */
export function indexOfDifficulty(distance: number, width: number): number {
  if (width <= 0 || distance < 0) return 0
  return Math.log2(distance / width + 1)
}

/** 2点間のユークリッド距離 */
export function distanceBetween(
  a: { x: number; y: number },
  b: { x: number; y: number },
): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}
