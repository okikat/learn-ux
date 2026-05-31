/** テスラーの法則デモ用：郵便番号→住所の簡易ルックアップ。 */

export interface Address {
  prefecture: string
  city: string
}

/** デモ用の小さな住所テーブル（実サービスではDBやAPIが肩代わりする部分）。 */
const TABLE: Record<string, Address> = {
  '1000001': { prefecture: '東京都', city: '千代田区千代田' },
  '5300001': { prefecture: '大阪府', city: '大阪市北区梅田' },
  '6028566': { prefecture: '京都府', city: '京都市上京区' },
  '0600001': { prefecture: '北海道', city: '札幌市中央区北一条西' },
  '8120011': { prefecture: '福岡県', city: '福岡市博多区博多駅前' },
}

/** 郵便番号（ハイフン可）から住所を引く。未登録は null。 */
export function lookupAddress(zip: string): Address | null {
  const d = zip.replace(/\D/g, '')
  return TABLE[d] ?? null
}

export const SAMPLE_ZIPS = Object.keys(TABLE)
