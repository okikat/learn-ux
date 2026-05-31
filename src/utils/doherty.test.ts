import { describe, it, expect } from 'vitest'
import { responseVerdict } from './doherty'

describe('responseVerdict', () => {
  it('100ms以下は instant', () => {
    expect(responseVerdict(0).level).toBe('instant')
    expect(responseVerdict(100).level).toBe('instant')
  })
  it('101〜400ms は ok（しきい値内）', () => {
    expect(responseVerdict(101).level).toBe('ok')
    expect(responseVerdict(400).level).toBe('ok')
  })
  it('401〜1000ms は slow', () => {
    expect(responseVerdict(401).level).toBe('slow')
    expect(responseVerdict(1000).level).toBe('slow')
  })
  it('1000ms超は bad', () => {
    expect(responseVerdict(1001).level).toBe('bad')
    expect(responseVerdict(5000).level).toBe('bad')
  })
})
