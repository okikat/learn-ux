import { describe, it, expect } from 'vitest'
import { chunk, digitsEqual, randomDigits } from './miller'

describe('chunk', () => {
  it('3-4-4 で区切る', () => {
    expect(chunk('09012345678', [3, 4, 4])).toEqual(['090', '1234', '5678'])
  })
  it('余りは末尾にまとめる', () => {
    expect(chunk('123456789', [3, 3])).toEqual(['123', '456', '789'])
  })
  it('短い入力でも破綻しない', () => {
    expect(chunk('12', [3, 4])).toEqual(['12'])
  })
})

describe('digitsEqual', () => {
  it('ハイフン・空白を無視して比較', () => {
    expect(digitsEqual('090-1234-5678', '09012345678')).toBe(true)
    expect(digitsEqual('090 1234 5678', '09012345678')).toBe(true)
  })
  it('違えば false', () => {
    expect(digitsEqual('123', '124')).toBe(false)
  })
  it('空同士は false（未入力を正解にしない）', () => {
    expect(digitsEqual('', '')).toBe(false)
  })
})

describe('randomDigits', () => {
  it('指定桁数の数字列を返す', () => {
    const s = randomDigits(10)
    expect(s).toHaveLength(10)
    expect(/^\d{10}$/.test(s)).toBe(true)
  })
})
