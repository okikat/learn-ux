import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Term from './Term'
import { glossary } from '../data/glossary'

afterEach(cleanup)

describe('Term（用語ポップアップ）', () => {
  it('用語集に無い語は、ただのテキスト（ボタン化しない）', () => {
    render(<Term>存在しない語</Term>)
    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.getByText('存在しない語')).toBeInTheDocument()
  })

  it('用語集にある語はタップで意味が出る／もう一度タップで閉じる', () => {
    render(<Term>ヒューリスティック</Term>)
    const btn = screen.getByRole('button', { name: 'ヒューリスティック' })
    expect(screen.queryByRole('tooltip')).toBeNull()

    fireEvent.click(btn)
    expect(screen.getByRole('tooltip')).toHaveTextContent(glossary['ヒューリスティック'])
    expect(btn).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(btn)
    expect(screen.queryByRole('tooltip')).toBeNull()
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('Esc キーで閉じる', () => {
    render(<Term>ヒューリスティック</Term>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('tooltip')).toBeNull()
  })
})
