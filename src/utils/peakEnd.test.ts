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
    expect(jankyProgress(2)).toBeCloseTo(1, 5)
  })

  it('終盤(t=0.9)で smooth は janky より進んでいる（=後半が軽い）', () => {
    expect(smoothProgress(0.9)).toBeGreaterThan(jankyProgress(0.9))
  })

  it('janky は終盤(0.85→1.0)で残り1割をのろのろ進む', () => {
    expect(jankyProgress(0.85)).toBeCloseTo(0.9, 5)
    expect(jankyProgress(0.925)).toBeCloseTo(0.95, 5)
  })
})
