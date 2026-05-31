import { describe, it, expect } from 'vitest'
import { cumulativeShares, coverageByTopFraction } from './pareto'

describe('cumulativeShares', () => {
  it('降順で累積し、最後は1になる', () => {
    const r = cumulativeShares([10, 30, 60])
    expect(r[0]).toBeCloseTo(0.6, 5) // 最大の60から
    expect(r[1]).toBeCloseTo(0.9, 5)
    expect(r[2]).toBeCloseTo(1, 5)
  })
  it('単調増加する', () => {
    const r = cumulativeShares([5, 5, 5, 5])
    expect(r[0]).toBeLessThan(r[1])
    expect(r[3]).toBeCloseTo(1, 5)
  })
  it('合計0は全て0', () => {
    expect(cumulativeShares([0, 0])).toEqual([0, 0])
  })
})

describe('coverageByTopFraction', () => {
  it('上位20%でおおよそ8割をカバーする例', () => {
    // 80:20 を体現する分布（上位2/10で約80%）
    const v = [40, 40, 4, 4, 2, 2, 2, 2, 2, 2]
    const cov = coverageByTopFraction(v, 0.2)
    expect(cov).toBeGreaterThan(0.75)
  })
  it('空配列は0', () => {
    expect(coverageByTopFraction([], 0.2)).toBe(0)
  })
})
