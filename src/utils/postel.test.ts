import { describe, it, expect } from 'vitest'
import { toHalfWidthDigits, formatJpPhone } from './postel'

describe('toHalfWidthDigits', () => {
  it('全角数字を半角化する', () => {
    expect(toHalfWidthDigits('０９０')).toBe('090')
  })
  it('記号・空白・ハイフンを捨てて数字だけ残す', () => {
    expect(toHalfWidthDigits('(03) 1234-5678')).toBe('0312345678')
    expect(toHalfWidthDigits('０９０－１２３４ ５６７８')).toBe('09012345678')
  })
})

describe('formatJpPhone', () => {
  it('空文字は空文字', () => {
    expect(formatJpPhone('')).toBe('')
  })
  it('全角の携帯番号でも 3-4-4 に整形', () => {
    expect(formatJpPhone('０９０１２３４５６７８')).toBe('090-1234-5678')
  })
  it('空白区切りの携帯番号も整形', () => {
    expect(formatJpPhone('090 1234 5678')).toBe('090-1234-5678')
  })
  it('東京03は 2-4-4', () => {
    expect(formatJpPhone('0312345678')).toBe('03-1234-5678')
  })
  it('フリーダイヤル0120は 4-3-3', () => {
    expect(formatJpPhone('0120123456')).toBe('0120-123-456')
  })
  it('桁が足りない入力途中は数字のまま', () => {
    expect(formatJpPhone('0312')).toBe('0312')
  })
})
