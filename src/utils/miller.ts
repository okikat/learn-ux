/** ミラーの法則デモ用：チャンク化と入力一致判定。 */

/** 数字文字列を指定サイズで区切る。余りは末尾チャンクにまとめる。 */
export function chunk(digits: string, sizes: number[]): string[] {
  const out: string[] = []
  let i = 0
  for (const size of sizes) {
    if (i >= digits.length) break
    out.push(digits.slice(i, i + size))
    i += size
  }
  if (i < digits.length) out.push(digits.slice(i))
  return out
}

/** 空白・ハイフンを無視して数字列が一致するか */
export function digitsEqual(a: string, b: string): boolean {
  const norm = (s: string) => s.replace(/[\s-]/g, '')
  return norm(a) === norm(b) && norm(a).length > 0
}

/** n桁のランダムな数字列を作る */
export function randomDigits(n: number): string {
  let s = ''
  for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10)
  return s
}
