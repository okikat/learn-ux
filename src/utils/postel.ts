/** ポステルの法則デモ用：電話番号入力の寛容な受理と厳格な整形。 */

/** 全角数字を半角化し、数字だけを取り出す（記号・空白・ハイフンは捨てる） */
export function toHalfWidthDigits(input: string): string {
  const half = input.replace(/[０-９]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) - 0xfee0),
  )
  return half.replace(/\D/g, '')
}

/**
 * 日本の電話番号らしく整形する（簡易ルール）。
 * 携帯(070/080/090)=3-4-4、フリーダイヤル(0120)=4-3-3、
 * 東京/大阪(03/06)=2-4-4、その他=3-3-4。
 * 桁が足りない入力途中は数字のまま返す（寛容）。
 */
export function formatJpPhone(input: string): string {
  const d = toHalfWidthDigits(input)
  if (d.length === 0) return ''

  if (/^0[789]0/.test(d) && d.length >= 11) {
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`
  }
  if (/^0120/.test(d) && d.length >= 10) {
    return `${d.slice(0, 4)}-${d.slice(4, 7)}-${d.slice(7, 10)}`
  }
  if (/^0[36]/.test(d) && d.length >= 10) {
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`
  }
  if (d.length >= 10) {
    return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 10)}`
  }
  return d
}
