import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './Layout.module.css'
import NavMenu from './NavMenu'

/**
 * 全ページ共通の枠。
 * ヘッダのロゴ＝ホームへのリンクにしているのは、それ自体が
 * 「ヤコブの法則（ロゴで先頭に戻れる慣習）」の実践でもある。
 */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link to="/" className={styles.brand} aria-label="ホーム（法則の一覧）へ戻る">
            <span className={styles.brandMark} aria-hidden="true">
              UX
            </span>
            <span className={styles.brandText}>やるUX</span>
          </Link>
          <div className={styles.headerRight}>
            <span className={styles.tagline}>さわって学ぶUX</span>
            <NavMenu />
          </div>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className="container">
          <p className={styles.footerNote}>
            出典:{' '}
            <a
              href="https://lawsofux.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Jon Yablonski “Laws of UX”
            </a>
            （lawsofux.com / オライリー・ジャパン 邦訳）。解説文はすべて本アプリの独自記述です。
          </p>
        </div>
      </footer>
    </div>
  )
}
