import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import FakeLinkTrap from './FakeLinkTrap'

afterEach(cleanup)

describe('FakeLinkTrap（リンクでない青字＋下線）', () => {
  it('押すとオチが出て、もう一度押すと消える', () => {
    render(<FakeLinkTrap>リンクでない文字</FakeLinkTrap>)
    const trap = screen.getByRole('button', { name: /リンクでない文字/ })
    expect(screen.queryByText(/リンクじゃありません/)).toBeNull()
    fireEvent.click(trap)
    expect(screen.getByText(/リンクじゃありません/)).toBeInTheDocument()
    fireEvent.click(trap)
    expect(screen.queryByText(/リンクじゃありません/)).toBeNull()
  })
})
