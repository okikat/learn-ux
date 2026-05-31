import { describe, it, expect } from 'vitest'
import { calculateAge } from './age'

describe('calculateAge', () => {
  const birth = new Date('2000-06-15')

  it('誕生日の前日はまだ歳を取らない', () => {
    expect(calculateAge(birth, new Date('2026-06-14'))).toBe(25)
  })
  it('誕生日当日に歳を取る', () => {
    expect(calculateAge(birth, new Date('2026-06-15'))).toBe(26)
  })
  it('誕生日を過ぎていれば加算済み', () => {
    expect(calculateAge(birth, new Date('2026-12-31'))).toBe(26)
  })
  it('誕生月より前の月では引かれる', () => {
    expect(calculateAge(birth, new Date('2026-01-01'))).toBe(25)
  })
})
