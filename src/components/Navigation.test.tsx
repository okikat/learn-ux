import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavMenu from './NavMenu'
import LawDetail from './LawDetail'
import { laws, biases, categories } from '../data/laws'
import type { LawMeta } from '../types'

afterEach(() => {
  cleanup()
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

function renderMenu() {
  return render(
    <MemoryRouter>
      <NavMenu />
    </MemoryRouter>,
  )
}

const openMenu = () => fireEvent.click(screen.getByRole('button', { name: 'メニューを開く' }))

// カテゴリ名の末尾「（…）」は表示上2段に改行されることがある（アクセシブル名に空白が入る）。
// 改行位置の空白を許容してマッチさせる。
const labelRe = (label: string) => new RegExp(label.replace('（', '\\s*（'))

describe('NavMenu（☰ グローバルメニュー）', () => {
  it('初期状態ではメニューは閉じている', () => {
    renderMenu()
    expect(screen.queryByRole('navigation', { name: 'メインメニュー' })).toBeNull()
  })

  it('☰ を押すと TOP・無料5カテゴリ・PRO が出る', () => {
    renderMenu()
    openMenu()
    expect(screen.getByRole('link', { name: 'TOP' })).toHaveAttribute('href', '/')
    for (const c of categories) {
      expect(screen.getByRole('button', { name: labelRe(c.label) })).toBeInTheDocument()
    }
    // PRO バッジ（有料カテゴリを含める）
    expect(screen.getByText('PRO')).toBeInTheDocument()
  })

  it('カテゴリを選ぶと、その小項目（法則リンク）が出る', () => {
    renderMenu()
    openMenu()
    const cat = categories[0]
    const firstLaw = laws.find((l) => l.category === cat.id)!
    // 開く前は小項目リンクは無い
    expect(screen.queryByRole('link', { name: firstLaw.titleJa })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: labelRe(cat.label) }))
    expect(screen.getByRole('link', { name: firstLaw.titleJa })).toHaveAttribute(
      'href',
      `/laws/${firstLaw.slug}`,
    )
  })

  it('PRO カテゴリを選ぶと、認知バイアスの小項目が出る', () => {
    renderMenu()
    openMenu()
    fireEvent.click(screen.getByRole('button', { name: /認知バイアス/ }))
    const firstBias = biases[0]
    expect(screen.getByRole('link', { name: firstBias.titleJa })).toHaveAttribute(
      'href',
      `/laws/${firstBias.slug}`,
    )
  })

  it('Esc キーで閉じる', () => {
    renderMenu()
    openMenu()
    expect(screen.getByRole('navigation', { name: 'メインメニュー' })).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('navigation', { name: 'メインメニュー' })).toBeNull()
  })

  it('ダークモードのiOS風スイッチで data-theme が切り替わる', () => {
    renderMenu()
    openMenu()
    const sw = screen.getByRole('switch', { name: 'ダークモード' })
    const before = document.documentElement.getAttribute('data-theme')
    fireEvent.click(sw)
    expect(document.documentElement.getAttribute('data-theme')).not.toBe(before)
    expect(sw).toHaveAttribute('aria-checked', before === 'dark' ? 'false' : 'true')
    fireEvent.click(sw)
    expect(document.documentElement.getAttribute('data-theme')).toBe(before)
  })
})

describe('LawDetail の前後ナビ（前/次の2つだけ・中央TOPなし）', () => {
  // 実 Demo は jsdom 非対応 API を使う可能性があるため、ページャ検証では
  // id で前後を引く性質だけ保ったまま Demo を無害化する。
  const stub = (base: LawMeta): LawMeta => ({ ...base, Demo: () => null })

  function renderPager(law: LawMeta) {
    render(
      <MemoryRouter>
        <LawDetail law={law} />
      </MemoryRouter>,
    )
    return screen.getByRole('navigation', { name: 'ほかの法則へ' })
  }

  it('中間の法則: 前後とも有効リンク・TOPボタンは無い', () => {
    const nav = renderPager(stub(laws[2]))
    expect(within(nav).getAllByRole('link')).toHaveLength(2)
    expect(within(nav).queryByText('TOP')).toBeNull()
    expect(within(nav).getByText('前の法則')).toBeInTheDocument()
    expect(within(nav).getByText('次の法則')).toBeInTheDocument()
  })

  it('先頭の法則: 「前」は無効（リンクは「次」だけ）', () => {
    const nav = renderPager(stub(laws[0]))
    expect(within(nav).getAllByRole('link')).toHaveLength(1)
    expect(within(nav).getByText('これが最初です')).toBeInTheDocument()
  })

  it('末尾の法則: 「次」は無効（リンクは「前」だけ）', () => {
    const nav = renderPager(stub(laws[laws.length - 1]))
    expect(within(nav).getAllByRole('link')).toHaveLength(1)
    expect(within(nav).getByText('これで最後です')).toBeInTheDocument()
  })

  it('PRO の前後ナビは PRO セット内で完結する', () => {
    const nav = renderPager(stub(biases[1]))
    const links = within(nav).getAllByRole('link')
    const hrefs = links.map((a) => a.getAttribute('href'))
    // すべて /laws/ 配下（無料側へ混ざらない）かつ前後が biases の隣
    expect(hrefs).toContain(`/laws/${biases[0].slug}`)
    expect(hrefs).toContain(`/laws/${biases[2].slug}`)
  })
})
