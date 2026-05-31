/** ドハティのしきい値まわりの純関数。 */

export type ResponseLevel = 'instant' | 'ok' | 'slow' | 'bad'

export interface Verdict {
  level: ResponseLevel
  label: string
}

/**
 * 応答時間(ms)を体感レベルに変換する。
 * 0.4秒(400ms)がドハティのしきい値。これを超えると「待たされた感」が出る。
 */
export function responseVerdict(ms: number): Verdict {
  if (ms <= 100) return { level: 'instant', label: '瞬時 — 操作が途切れない' }
  if (ms <= 400) return { level: 'ok', label: '快適 — しきい値(0.4秒)内で没頭できる' }
  if (ms <= 1000) return { level: 'slow', label: 'やや待たされる — 集中が切れ始める' }
  return { level: 'bad', label: 'ストレス域 — 離脱したくなる' }
}
