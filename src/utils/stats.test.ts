import { describe, it, expect } from 'vitest'
import { mean, clamp, formatSeconds, percent, wrapIndex } from './stats'

describe('mean', () => {
  it('空配列は0', () => {
    expect(mean([])).toBe(0)
  })
  it('平均を返す', () => {
    expect(mean([2, 4, 6])).toBe(4)
    expect(mean([10])).toBe(10)
  })
})

describe('clamp', () => {
  it('範囲内はそのまま', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })
  it('下限・上限で丸める', () => {
    expect(clamp(-3, 0, 10)).toBe(0)
    expect(clamp(99, 0, 10)).toBe(10)
  })
})

describe('formatSeconds', () => {
  it('ミリ秒を「x.x秒」（小数1桁）に整形', () => {
    expect(formatSeconds(400)).toBe('0.4秒')
    expect(formatSeconds(1000)).toBe('1.0秒')
    expect(formatSeconds(3216)).toBe('3.2秒')
  })
  it('digits=2 で小数2桁（fitts用）', () => {
    expect(formatSeconds(480, 2)).toBe('0.48秒')
    expect(formatSeconds(1234, 2)).toBe('1.23秒')
  })
})

describe('percent', () => {
  it('割合を整数%で返す', () => {
    expect(percent(1, 4)).toBe(25)
    expect(percent(2, 3)).toBe(67)
  })
  it('total=0は0', () => {
    expect(percent(3, 0)).toBe(0)
  })
})

describe('wrapIndex', () => {
  it('範囲内はそのまま', () => {
    expect(wrapIndex(2, 5)).toBe(2)
  })
  it('はみ出しは巡回', () => {
    expect(wrapIndex(5, 5)).toBe(0)
    expect(wrapIndex(6, 5)).toBe(1)
    expect(wrapIndex(-1, 5)).toBe(4)
  })
  it('length=0は0', () => {
    expect(wrapIndex(3, 0)).toBe(0)
  })
})
