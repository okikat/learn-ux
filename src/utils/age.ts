/** テスラーの法則デモ用：生年月日から年齢を求める純関数。 */

/** birth から today 時点の満年齢を返す（誕生日前なら1引く）。 */
export function calculateAge(birth: Date, today: Date): number {
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1
  }
  return age
}
