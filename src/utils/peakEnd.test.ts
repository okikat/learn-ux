import { describe, it, expect } from 'vitest'
import { smoothProgress, jankyProgress } from './peakEnd'

describe('smoothProgress / jankyProgress', () => {
  it('どちらも開始は0、終了は1（総時間は同じ）', () => {
    expect(smoothProgress(0)).toBe(0)
    expect(smoothProgress(1)).toBe(1)
    expect(jankyProgress(0)).toBe(0)
    expect(jankyProgress(1)).toBeCloseTo(1, 5)
  })

  it('範囲外も0〜1に収まる', () => {
    expect(smoothProgress(-1)).toBe(0)
    expect(smoothProgress(2)).toBe(1)
    expect(jankyProgress(-1)).toBe(0)
    expect(jankyProgress(2)).toBeCloseTo(1, 5)
  })

  it('janky は終盤で99%に貼りつく', () => {
    expect(jankyProgress(0.7)).toBeCloseTo(0.99, 5)
    expect(jankyProgress(0.95)).toBeCloseTo(0.99, 5)
  })

  it('smooth はなめらかに進む（中間で既にそこそこ）', () => {
    expect(smoothProgress(0.5)).toBeCloseTo(0.75, 5)
  })
})
