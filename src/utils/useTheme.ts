import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/**
 * 初期テーマを決める優先順位:
 *  1. index.html のインラインスクリプトが既に設定した data-theme（チラつき防止）
 *  2. localStorage に保存したユーザーの明示的な選択
 *  3. OS の配色設定（prefers-color-scheme）
 * jsdom 等 matchMedia 非対応環境でも落ちないようガードする。
 */
export function getInitialTheme(): Theme {
  const current = document.documentElement.dataset.theme
  if (current === 'dark' || current === 'light') return current
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* localStorage 不可でも続行 */
  }
  const mq =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null
  return mq && mq.matches ? 'dark' : 'light'
}

/** テーマ状態と切替関数。`<html data-theme>` と localStorage に反映する。 */
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* 保存不可でも続行 */
    }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return [theme, toggle]
}
