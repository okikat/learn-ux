/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // `--mode standalone` のときだけ、JS/CSSを全部1つのHTMLに埋め込む。
    // → ネット接続なしで index.html をダブルクリックするだけで開けるプレビューになる。
    ...(mode === 'standalone' ? [viteSingleFile()] : []),
  ],
  // サブパス配信でも壊れないよう相対パス出力にする
  base: './',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
}))
