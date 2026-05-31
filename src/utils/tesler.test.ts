import { describe, it, expect } from 'vitest'
import { lookupAddress, SAMPLE_ZIPS } from './tesler'

describe('lookupAddress', () => {
  it('登録済みの郵便番号から住所を引く', () => {
    expect(lookupAddress('1000001')).toEqual({
      prefecture: '東京都',
      city: '千代田区千代田',
    })
  })
  it('ハイフン付きでも引ける', () => {
    expect(lookupAddress('100-0001')).toEqual({
      prefecture: '東京都',
      city: '千代田区千代田',
    })
  })
  it('未登録は null', () => {
    expect(lookupAddress('9999999')).toBeNull()
  })
})

describe('SAMPLE_ZIPS', () => {
  it('サンプルが引ける郵便番号である', () => {
    expect(SAMPLE_ZIPS.length).toBeGreaterThan(0)
    for (const z of SAMPLE_ZIPS) {
      expect(lookupAddress(z)).not.toBeNull()
    }
  })
})
