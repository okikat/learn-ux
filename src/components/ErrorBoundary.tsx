import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './ErrorBoundary.module.css'

type Props = { children: ReactNode }
type State = { hasError: boolean }

/**
 * ルート直下のエラーバウンダリ。デモ等が実行時に例外を投げても、
 * アプリ全体が白画面になるのを防ぎ、やさしい復帰導線を出す。
 * ルートが変わると App 側で key を変えて自動リセットする。
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // 外部送信はしない（プライバシー方針）。デバッグ用にコンソールへのみ残す。
    console.error('ErrorBoundary が UI エラーを捕捉しました:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div className={`container ${styles.wrap}`} role="alert">
        <div className={styles.card}>
          <span className={styles.icon} aria-hidden="true">
            ⚠️
          </span>
          <h1 className={styles.title}>うまく表示できませんでした</h1>
          <p className={styles.body}>
            一時的な問題が起きたようです。ページを再読み込みするか、トップに戻ってお試しください。
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.reload}
              onClick={() => window.location.reload()}
            >
              再読み込み
            </button>
            <Link to="/" className={styles.home}>
              トップへ戻る
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
