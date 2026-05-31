import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { laws, categories, biases, biasPack } from '../data/laws'
import { useTheme } from '../utils/useTheme'
import styles from './NavMenu.module.css'

type Group = {
  id: string
  label: string
  pro?: boolean
  items: { slug: string; titleJa: string }[]
}

/**
 * ヘッダー右の「☰」グローバルメニュー。
 *  - 一番上に TOP。以降は無料5カテゴリ ＋ 認知バイアス（PRO）。
 *  - カテゴリを選ぶと、その小項目（各法則）が「左」へフライアウト表示。
 *  - 展開中はヘッダーとメニュー以外を半透明グレーで覆う（その部分タップで閉じる）。
 *
 * ヘッダーは backdrop-filter のため固定配置の基準（包含ブロック）になってしまう。
 * 覆い／メニューは createPortal で body 直下に描画してビューポート基準にする。
 */
export default function NavMenu() {
  const [open, setOpen] = useState(false)
  const [activeCat, setActiveCat] = useState<string | null>(null)
  const [menuTop, setMenuTop] = useState(56)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const [theme, toggleTheme] = useTheme()
  const isDark = theme === 'dark'

  const freeGroups = useMemo<Group[]>(
    () =>
      categories.map((c) => ({
        id: c.id,
        label: c.label,
        items: laws
          .filter((l) => l.category === c.id)
          .map((l) => ({ slug: l.slug, titleJa: l.titleJa })),
      })),
    [],
  )
  const proGroup = useMemo<Group>(
    () => ({
      id: 'pro',
      label: biasPack.label,
      pro: true,
      items: biases.map((l) => ({ slug: l.slug, titleJa: l.titleJa })),
    }),
    [],
  )

  const active =
    activeCat === proGroup.id
      ? proGroup
      : freeGroups.find((g) => g.id === activeCat) ?? null

  const closeAll = () => {
    setOpen(false)
    setActiveCat(null)
  }

  // ルート遷移したら必ず閉じる
  useEffect(() => {
    setOpen(false)
    setActiveCat(null)
  }, [location.pathname])

  // 開いている間だけ: Escで閉じる／背面スクロール固定／ヘッダー下端を測る
  useEffect(() => {
    if (!open) return
    const measure = () => {
      const header = toggleRef.current?.closest('header')
      if (header) setMenuTop(header.getBoundingClientRect().bottom)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setActiveCat(null)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      window.removeEventListener('resize', measure)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  const renderRow = (g: Group) => {
    const isActive = activeCat === g.id
    return (
      <li key={g.id}>
        <button
          type="button"
          className={`${styles.catRow} ${isActive ? styles.catRowActive : ''}`}
          aria-expanded={isActive}
          onClick={() => setActiveCat((cur) => (cur === g.id ? null : g.id))}
        >
          <span className={styles.caret} aria-hidden="true">
            ◀
          </span>
          <span className={styles.catLabel}>{g.label}</span>
          {g.pro && <span className={styles.proBadge}>PRO</span>}
        </button>
      </li>
    )
  }

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={open}
        aria-controls="global-menu"
        onClick={() => (open ? closeAll() : setOpen(true))}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            className={styles.overlay}
            style={{ '--menu-top': `${menuTop}px` } as CSSProperties}
          >
            {/* ヘッダーとメニュー以外を覆う半透明グレー（タップで閉じる） */}
            <button className={styles.scrim} aria-label="メニューを閉じる" onClick={closeAll} />

            {/* 小項目（選択カテゴリの一覧）をメニューの左にフライアウト */}
            {active && (
              <nav className={styles.submenu} aria-label={`${active.label}の小項目`}>
                <p className={styles.submenuHead}>{active.label}</p>
                <ul className={styles.subList}>
                  {active.items.map((it) => (
                    <li key={it.slug}>
                      <Link
                        to={`/laws/${it.slug}`}
                        className={styles.subLink}
                        onClick={closeAll}
                      >
                        {it.titleJa}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* メインメニュー（右ドロワー） */}
            <nav
              id="global-menu"
              ref={panelRef}
              tabIndex={-1}
              className={styles.panel}
              aria-label="メインメニュー"
            >
              <Link to="/" className={styles.top} onClick={closeAll}>
                TOP
              </Link>
              <div className={styles.divider} aria-hidden="true" />
              <ul className={styles.catList}>{freeGroups.map(renderRow)}</ul>
              <div className={styles.divider} aria-hidden="true" />
              <ul className={styles.catList}>{renderRow(proGroup)}</ul>

              <div className={styles.divider} aria-hidden="true" />
              <div className={styles.themeRow}>
                <span className={styles.themeLabel}>
                  <svg
                    className={styles.themeIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
                      fill="currentColor"
                    />
                  </svg>
                  ダークモード
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isDark}
                  aria-label="ダークモード"
                  className={styles.switch}
                  onClick={toggleTheme}
                >
                  <span className={styles.knob} aria-hidden="true" />
                </button>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </>
  )
}
