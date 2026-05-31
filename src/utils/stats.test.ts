import { describe, it, expect } from 'vitest'
import { mean, clamp, formatMs, percent, wrapIndex } from './stats'

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

describe('formatMs', () => {
  it('1000ms未満はそのまま整数ms', () => {
    expect(formatMs(420)).toBe('420ms')
    expect(formatMs(420.7)).toBe('421ms')
  })
  it('1000ms以上は秒を併記', () => {
    expect(formatMs(1500)).toBe('1.50秒 (1500ms)')
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
