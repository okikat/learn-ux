# CLAUDE.md — やるUX 開発ガイド

UXの心理法則を「さわって学ぶ」インタラクティブ学習アプリ。
React 19 + TypeScript + Vite / CSS Modules + CSSカスタムプロパティ / react-router-dom(HashRouter) / 状態は useState / Vitest。

## このアプリの大原則（最重要）

**このアプリ自身が、UXの良い手本でなければならない。** UXを教える題材なので、
土台のUXが甘いと説得力を失う。すべての変更は次を満たすこと。

### 1. レイアウトを動かさない（ガタつき禁止）
状態変化（トグル・回答前後・展開/折りたたみ・文言の出し分けなど）で、**枠・バー・
ボタン・図の位置やサイズが伸び縮みしてはいけない。** 文字数や行数・項目数で
サイズが変わる要素は、**取り得る最大の状態に合わせて固定**する。
- 推奨実装：複数の文言/ラベルを **CSS grid で同じセルに重ね**、非アクティブ側は
  `visibility: hidden`（`display:none` は不可＝場所が消える）で**場所を確保**する。
  これでマジックナンバーなしに「最大に合わせて固定」できる（例: `src/laws/pragnanz/PragnanzDemo`）。
- 図やコントロールの位置は、操作の前後で動かさない。

### 2. スマホ・PC 両対応
最小幅 **375px**（できれば 320px）から広い画面まで破綻しないこと。タップ標的は
`var(--tap)`（44px）以上。`prefers-reduced-motion` を尊重（index.css で対応済み）。

### 3. ライト/ダーク両対応
色は**必ずデザイントークン**（`src/index.css` の CSS 変数）経由で指定する。
- 明るい前提の直書き色（`#fff` 背景・`#000` 文字・黒い枠 `rgba(0,0,0,..)` など）を避ける。
- **`mix-blend-mode: multiply` 等の合成はダーク背景で色が濁る**ので使わない
  （顔料的な重なり表現が要るなら、トークン化した半透明色で代替）。
- 変更後はライト/ダーク両方で目視（または配色トークンの妥当性）を確認。

### 4. アクセシビリティ
意味のある画像/SVGには `role="img"` と `aria-label`。装飾は `aria-hidden`。
キーボード操作・フォーカス可視（`:focus-visible` は index.css で共通化済み）。

## コマンド
```bash
npm ci          # 依存インストール
npm run build   # tsc -b && vite build（型チェック込み）
npm test        # Vitest（純関数＋主要コンポーネント）
```
変更したら **build と test を必ず緑にする**。

## 公開（GitHub Pages / gh-pages ブランチ配信）
ビルド成果物 `dist` を `gh-pages` に配信。手順は `docs/HANDOFF.md` 参照。
反映確認は `https://okikat.github.io/learn-ux/?probe=$(date +%s)` を curl して
参照アセット名が新ビルドと一致するかで判定（Pages 反映に 1〜2 分）。

## 構成
```
src/
├── components/  共通レイアウト・カード・法則ページの型・メニュー など
├── pages/       トップ / 各法則ページ
├── laws/        各法則のインタラクティブ・デモ（1法則=1フォルダ）
├── data/laws.tsx 法則のメタデータ（定義・解説・Tips・カテゴリ）。description は ReactNode 可
└── utils/       計測まわりの純関数（テスト付き）＋ useTheme
```

## ブランチ
開発は作業ブランチ（例: `claude/busy-meitner-1Tgkh`）。`main` への直 push はしない。
