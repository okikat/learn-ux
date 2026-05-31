import { describe, it, expect } from 'vitest'
import { indexOfDifficulty, distanceBetween } from './fitts'

describe('indexOfDifficulty', () => {
  it('幅0・負の距離は0を返す（破綻しない）', () => {
    expect(indexOfDifficulty(100, 0)).toBe(0)
    expect(indexOfDifficulty(-5, 40)).toBe(0)
  })

  it('距離0ならID=0（log2(1)）', () => {
    expect(indexOfDifficulty(0, 40)).toBe(0)
  })

  it('距離が同じなら、幅が大きいほどIDは小さい（＝易しい）', () => {
    const small = indexOfDifficulty(300, 30)
    const large = indexOfDifficulty(300, 120)
    expect(large).toBeLessThan(small)
  })

  it('幅が同じなら、距離が遠いほどIDは大きい（＝難しい）', () => {
    const near = indexOfDifficulty(100, 40)
    const far = indexOfDifficulty(500, 40)
    expect(far).toBeGreaterThan(near)
  })

  it('既知の値: D/W=1 のとき ID=log2(2)=1', () => {
    expect(indexOfDifficulty(40, 40)).toBeCloseTo(1, 5)
  })
})

describe('distanceBetween', () => {
  it('3-4-5 の直角三角形で5を返す', () => {
    expect(distanceBetween({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5)
  })
  it('同じ点なら0', () => {
    expect(distanceBetween({ x: 7, y: 7 }, { x: 7, y: 7 })).toBe(0)
  })
})
