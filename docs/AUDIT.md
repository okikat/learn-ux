# アプリ内監査レポート（さわって学ぶUX）

> **本書は「指摘のみ」のレポートです。アプリ本体のコードは一切変更していません。**
> 観点別に、重大度（High / Med / Low）と該当 `path:line` を添えています。
> 「(要確認)」は静的解析ベースで実機未確認の項目です。
> 監査日時点のブランチ：`claude/busy-meitner-1Tgkh`。`npm run build` / `npm test`(65) は緑。

## 総評

完成度は総じて高く、**TypeScript strict・`any`/`@ts-ignore` ゼロ・console/TODO 残骸ゼロ・タイマー cleanup 徹底・storage は try/catch＋ホワイトリスト検証・外部送信ゼロ（プライバシー良好）・時間表記/敬体/半角の統一・用語集約・リンク破れなし**と、土台はしっかりしています。
一方で「UXの手本たれ」を掲げる基準に照らすと、**共有コンポーネントの `:hover` 規約違反（タッチ端末で“選択中”残り）**と**色の直書き**、そして**ErrorBoundary 不在・OGP/favicon 不在**が目立ちます。**有料化の観点では PRO が実質ノーガード**で、これは別途 `docs/MONETIZATION.md` に詳述しています。

| 観点 | High | Med | Low |
| --- | --- | --- | --- |
| A. アクセシビリティ＆自己原則 | 5 | 13 | 多数 |
| B. コード品質・設計・性能 | 0 | 5 | 3 |
| C. 内容一貫性・コピー | 0 | 2 | 3 |
| D. SEO・メタ・共有 | 2(構造) | 2 | 1 |
| E. セキュリティ・プライバシー・依存 | 0 | 1 | 1 |
| F. 有料化レディネス（PROゲート） | 重大 | — | — |

---

## A. アクセシビリティ＆自己原則（レイアウト/色/hover/モバイル/ダーク）

### A-1. `:hover` が `@media (hover: hover)` の外（ルール3違反・最優先の“規約違反”）
`src/laws/*` は全25箇所が遵守。**共有UIだけ**が裸の `:hover` で、タッチで触れた箇所が「選択中」風に残ります。

- **[High]** `src/components/NavMenu.module.css:18` `.toggle:hover`（ハンバーガー）
- **[High]** `src/components/NavMenu.module.css:79` `.top:hover`
- **[High]** `src/components/NavMenu.module.css:109` `.catRow:hover`
- **[High]** `src/components/NavMenu.module.css:188` `.subLink:hover`
- **[High]** `src/pages/HomePage.module.css:107` `.catChip:hover`（同ファイル80行の `@media (hover:hover)` の外。`.introLink:hover` は内側で正しい→片手落ち）
- **[Med]** `src/components/LawCard.module.css:30` `.card:hover`
- **[Med]** `src/components/LawDetail.module.css:157` `.pagerLink:hover`
- **[Med]** `src/components/Layout.module.css:46` `.brand:hover`
- **[Med]** `src/components/FakeLinkTrap.module.css:10` `.fakeLink:hover`
- **[Low]** `src/index.css:160` `a:hover`（グローバル。意図的の可能性 (要確認)）

### A-2. 直書き色（ルール2違反）
`--accent-ink`（=白）等のトークンが既に**22箇所で使用**されているのに、下記は `#fff` 直書き。多くは彩度の高い accent/good/bad 背景の上で白文字が概ね耐えますが、規約上は違反＝トークン化で一貫性を。

- **[Med]** 共有UIの `#fff`（優先度高め）：`LawCard.module.css:67`(`.pro`)、`LawDetail.module.css:135`、`HomePage.module.css:55,114,168` → `var(--accent-ink)` へ。
- **[Med]** `NavMenu.module.css:271-272` トグルつまみ `background:#fff` ＋ `box-shadow rgba(0,0,0,..)` ← **`rgba(0,0,0,*)` は明示禁止対象**。影をトークン化。
- **[Med]** オレンジ gradient 直書き＋`#fff`：`jakob/JakobDemo.module.css:165-166`、`selective-attention/SelectiveAttentionDemo.module.css:108-109,179-180`（ダークでの白文字の妥当性 (要確認)）。
- **[Med]** `aesthetic/AestheticDemo.module.css:32,36,37`（`#999`,`#fff`,`#000`）「プレーンな悪い例」カード。意図的でもダークで白箱化＝低コントラスト。意図ならコメント/トークン化推奨 (要確認)。
- **[Low]** laws 各所の `#fff`（白文字で可だが要トークン化）：`mere-exposure`/`common-region`/`scarcity`/`similarity`/`sunk-cost`/`serial-position`/`proximity`/`loss-aversion`/`parkinson`/`decoy`/`goal-gradient`/`selective-attention`/`social-proof`/`zeigarnik`/`tesler` 等 約18ファイル。**機械的に `var(--accent-ink)` 置換で解消**。
- **[Low]** ブランド/装飾の固定色（`#8a5cf6`,`#d23b6d`,`#b5179e`,`#7b2ff7`,星 `#d9a514` 等）：両テーマ共通前提なら許容範囲だが直書き (要確認)。
- **[Low]** `doherty/DohertyDemo.module.css:140-141` スピナー `rgba(255,255,255,.4)`＋`#fff`、`parkinson/ParkinsonDemo.module.css:68-69` `color-mix(... #000)`、`mere-exposure/MereExposureDemo.tsx:5-8` 図形インライン色。

### A-3. アクセシビリティ（良好）
- `index.html` は `lang="ja"`、`:focus-visible` は `src/index.css:231` で共通定義済み。
- SVG：NavMenu のアイコンは装飾 `aria-hidden`＋親 `<button>` に `aria-label`。`pragnanz` SVG は `role="img"`＋`aria-label`。見出し階層も整合。
- **[Low]** `aesthetic/AestheticDemo.module.css:32` `#999` ボーダー＋白背景は**ダークで薄線/低コントラスト**の可能性 (要確認)。

### A-4. 非該当（確認済み・問題なし）
- `mix-blend-mode`：src 内**不使用**（クリア）。
- `display:none` 2件は状態トグルではない：`tesler:126`（ネイティブのピッカー指標を隠し自前アイコンに差替）、`Layout:76`（モバイルで副題非表示＝レスポンシブ）。トグル片側は正しく `visibility:hidden`。

---

## B. コード品質・設計・性能

総じて健全（High なし）。

- **[Med] テストはあるがアプリ未使用の util export** — 二重管理・体裁乖離。デモで使うか、未使用なら util＋テストごと削除を検討。
  - `utils/fitts.ts:10 indexOfDifficulty`（※フィッツの核概念なのにデモは距離のみ使用＝**教材的にも惜しい**）
  - `utils/peakEnd.ts:8 smoothProgress` / `:17 jankyProgress`
  - `utils/stats.ts:10 clamp` / `:20 percent` / `:26 wrapIndex`
  - （`utils/pareto.ts:4 cumulativeShares` は内部利用ありで死蔵ではない）
- **[Med] ErrorBoundary 不在** — `src` 全体に ErrorBoundary/`componentDidCatch` なし。DOM計測系（Term/NavMenu/Fitts 等が `getBoundingClientRect`/`matchMedia` 多用）が実行時例外を投げると**アプリ全体が白画面**に。ルート直下に fallback 1枚を推奨（実クラッシュは (要確認)）。
- **[Med] タイマー駆動フェーズ遷移の重複**（5デモ：`miller`/`mere-exposure`/`von-restorff`/`serial-position`/`doherty`）— `usePhaseTimer` 的フックへ抽出余地。
- **[Med] `utils/useTheme.ts` 無テスト** — 唯一の「副作用つき util」（storage 読み書き＋matchMedia フォールバック＋DOM反映）。壊れ値/例外時フォールバックが未検証（テーマ切替自体は Navigation.test で間接カバー）。
- **[Med] 34デモを `laws.tsx` で全 eager import → 単一チャンク** — 一覧表示でも全34デモが main に同梱（生391KB/gzip≈126KB）。`React.lazy`＋`Suspense` でルート単位の遅延ロードにすれば初回JSを大きく削減可（「ガタつき厳禁」に沿った fallback 設計は要確認）。
- **[Low] `key={i}`（配列index）** — `MillerDemo.tsx:74,123,128`/`FittsDemo.tsx:163`/`VonRestorffDemo.tsx:79`/`gamblers-fallacy:16`/`goal-gradient:11`/`pragnanz:54`/`LawDetail.tsx:36,64`。静的/append-only で実害低だが安定ID推奨。
- **[Low] テストの穴** — フェーズ管理デモ（状態機械）にコンポーネントテストなし／ルーティングのフォールバック（`*`→`/`、不正slug→`/`）に検証なし。
- **良好**：strict＋`noUnusedLocals` 等／`any`・`@ts-ignore` ゼロ／非null `!` は `main.tsx:7` のみ／`eslint-disable` は `Term.tsx:53` の妥当な1件／storage 堅牢／StrictMode 二重実行耐性。

---

## C. 内容一貫性・コピー

- **[Med] 通貨表記ゆれ** — `data/laws.tsx:680`（loss-aversion takeaway）が `「+1000円」より「−1000円」`。他は `¥` 前置＋桁区切り（`¥9,800`/`¥4,980`/`¥2,980`/`¥1,800`）。**統一するなら `¥1,000`**。
- **[Med]（※有料化と直結）** `index.html:8` の meta description が「**すべて無料。**」だが `¥980` の PRO パックが存在（`laws.tsx:536-538`）。**商品構成と矛盾** → 有料化を進めるなら文言修正。
- **[Low] takeaway の plain/polite 混在文** 3件（`laws.tsx:586/680/776`）— 文末は敬体でルール違反ではないが、前半が体言止め/だ調でリズムが揺れる。歯切れ重視の意図かも (要確認)。
- **良好**：時間表記「0.0秒」統一（全デモ `formatSeconds()` 経由、裸の "ms"/併記なし）／description・takeaway 34件すべて敬体／半角統一・全角数字混入0／用語は `glossary.ts` 1か所集約。`descriptions.backup.tsx`（旧文体）は**非import＝非配信**で実害なし。

---

## D. SEO・メタ・共有

`public/` ディレクトリは**存在せず**、SEO 静的アセットは皆無。

- **[High]（構造）** OGP/Twitterカードが**全く無い**（`index.html`）— SNS/チャット共有でタイトル・説明・サムネが出ず、拡散に不利。
- **[High]（構造）** **HashRouter × GitHub Pages の原理的限界** — 各法則は `#/laws/xxx`。クローラ/OGPは `#` 以降を無視→**全法則が共有上は同一 `index.html`（同一メタ）扱い**。OGP を足してもページ別OGP/個別インデックスは SPA/Hash では実現不可（プリレンダ/SSG なしでは）。本気で集客するなら History ルーティング＋静的書き出しの検討が必要。
- **[Med]** favicon/apple-touch-icon が無い（タブ/ブックマークが既定アイコン＝完成度を損なう）。
- **[Med]** robots.txt / sitemap.xml が無い。
- **[Low]** `vite.config.ts:13` `base:'./'`（相対パス）で `/learn-ux/` 配信は正しく動作＝**問題なし**。

---

## E. セキュリティ・プライバシー・依存

- **良好** 解析/トラッキング**完全に無し**（GA/GTM/Plausible/Sentry/fetch/XHR/sendBeacon すべて0件）。外部送信ゼロ。`localStorage` はテーマ（`'dark'|'light'`）のみ、cookie/sessionStorage 不使用 → 現状 Cookie 同意・プライバシーポリシーは不要なレベル（※有料化で個人データを扱い始めたら要・`MONETIZATION.md` 参照）。
- **[Med] 依存の脆弱性** — `npm audit` で `vitest <4.1.0` に **critical**（Vitest UI サーバ起動時に任意ファイル読込/実行 / GHSA-5xrq-8626-4rwp）。ただし **devDependency** で**本番バンドルに非同梱**、Vitest UI を起動した時のみの面。実リスクは低いが、`vitest@4.x` への更新（breaking）を計画的に。
- **[Low]** リポジトリにシークレット混入なし（静的アプリ・APIキー等の利用なし）。

---

## F. 有料化レディネス（PRO ゲートの現状）＝**最重要・断定**

**PRO は現状「ラベルのみ・ガード一切なし」。** 全14バイアスの本文・Tips・気づき・**インタラクティブDemo がすべて公開JSバンドルに同梱**され、無料ユーザーが購入・ログインなしで完全閲覧できます。課金は実装上**まったく存在しません**。

根拠：
- `data/laws.tsx:30-44, 544-878` — 14個のPRO Demoを冒頭で **static import**、`biases[]` に本文込みでベタ書き（`React.lazy`/分割なし）。
- ビルド実機 — `dist/assets/index-*.js` に全PROスラッグ＋日本語本文がそのまま含有。
- `data/laws.tsx:881` `allLaws=[...laws,...biases]` → `pages/LawPage.tsx:8` が **tierチェックなし**で解決→`/laws/anchoring` 等に直アクセスで全文表示。
- `components/LawCard.tsx:16` の `PRO` は**バッジ表示のみ**、リンク先は無料と同一。`NavMenu`/`HomePage`/`CompletionPage` も直リンク開放。
- src 全体に `purchase/unlock/paywall/checkout/stripe/auth/login/locked/gate/entitlement` **0件**。`¥980`(`laws.tsx:536`) は表示テキストのみ。

→ **真の有料化には**「①購入/認証状態の保持 ②PRO本文・Demoの公開バンドルからの除外＋遅延/サーバ配信 ③ルート保護」の新規実装が必須。静的SPAのままでは“JSにコードがある＝実質公開”のため不可能。**詳細・段階プランは `docs/MONETIZATION.md`。**

---

## 推奨：着手順（修正は未実施・あくまで提案）

| 優先 | 項目 | 効果 | 目安 |
| --- | --- | --- | --- |
| 1 | `:hover` の `@media(hover:hover)` 包囲（A-1 の High 5＋Med 4） | 明確な規約違反・タッチUX劣化を即解消 | 小 |
| 2 | 共有UIの `#fff`→`var(--accent-ink)`／トグル影のトークン化（A-2 Med） | ダーク堅牢化・一貫性 | 小 |
| 3 | ルート直下に ErrorBoundary（B Med） | クラッシュ時の白画面回避＝「手本」の信頼性 | 小〜中 |
| 4 | meta「すべて無料」と `¥980` の整合（C/D Med）＋通貨表記統一 | 矛盾解消（有料化方針と連動） | 小 |
| 5 | favicon＋OGP/Twitterカード＋robots/sitemap（D） | 共有・完成度（OGPの個別化は構造的制約に留意） | 中 |
| 6 | `useTheme`／ルーティングのテスト追加・未使用util整理（B） | 保守性・体裁一致 | 中 |
| 7 | `React.lazy` でデモのルート分割（B Med） | 初回JS削減（fallbackは“ガタつき厳禁”準拠で） | 中 |
| — | 有料化（PROゲート） | 収益化 | 別計画＝`MONETIZATION.md` |

> ※ これらは提案です。ご指示があれば、優先度の高いものから個別に実装します。
