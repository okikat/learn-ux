# 引き継ぎ書（HANDOFF） — やるUX

最終更新: 2026-05-31（公開確認） / 作業ブランチ: `claude/busy-meitner-1Tgkh`（旧 `focused-bohr` は PR #1 で `main` にマージ済み）

## このプロジェクトは何か
UXの心理法則を「読むのではなく、さわって覚える」インタラクティブ学習アプリ「**やるUX**」。
React 19 + TypeScript + Vite / CSS Modules / react-router-dom(HashRouter) / 状態は useState / Vitest。

## いまの完成状況（コードはすべて完成・プッシュ済み）
- **無料20法則**（5カテゴリ：見え方/記憶/判断・行動/操作・速さ/設計の心得）。各：①定義 ②解説 ③触れるデモ ④Tips＋「この体験から分かること」。
- **有料パック「認知バイアス」¥980：14項目**（トップ最下部のPRO区画。無料と視覚的に分離・前後ナビもセット内で完結）。
- 第三者視点の**UX監修レポート**＝ `docs/ux-review-free20.md`（指摘＋対応ログ）。指摘はすべて反映済み。
- `npm run build` 成功（127モジュール）/ `npm test` 50件すべて緑 / 375pxで全デモ動作・コンソールエラー0 を実機（ヘッドレスChromium）で確認済み。**2026-05-31 にクリーン環境で再ビルド（127モジュール）・再テスト（50件緑）も確認。**
- **公開中**：**https://okikat.github.io/learn-ux/** （スマホでタップして閲覧可能・本日疎通確認）。PR #1 は `main` にマージ済み。
- **2026-05-31 追加UI**（作業ブランチ `claude/busy-meitner-1Tgkh`・`gh-pages`へ再デプロイ済み／ライブ反映を実機HTTPで確認）:
  - テーマ文言を「さわって**学ぶ**UX」へ変更（ヘッダー/トップ/title/OGP/README）。
  - ヘッダー右に**☰グローバルメニュー**（`NavMenu`）。TOP＋無料5カテゴリ＋認知バイアス(PRO)。カテゴリ選択で小項目を**左へフライアウト**、展開中はヘッダー/メニュー以外を半透明グレーで覆う（タップ/Escで閉じる）。backdrop-filter対策に `createPortal` で body 直下へ描画。
  - 下部ナビを**前/次の2つ**＋**note風2段**に（中央TOP廃止、先頭/末尾はグレー無効化）。
  - ビルド**129モジュール**・テスト**59件**緑（うちコンポーネントテスト9件を新規追加：`src/components/Navigation.test.tsx`）。

## ブランチ／リモートの状態
- `claude/focused-bohr-BRsKo` … 本体（全コミット）。PR #1 で `main` にマージ済み。
- `claude/busy-meitner-1Tgkh` … 現在の作業ブランチ（`focused-bohr` と同内容＋以降の更新）。
- `main` … PR #1 をマージ済み（無料20＋有料14＋docs 一式）。
- `gh-pages` … **ビルド済みサイト**（`index.html` / `assets/*` / `.nojekyll`）。← スマホ公開用。
- GitHub Actionsのデプロイ用ワークフローは**削除済み**（Actions方式は下記理由で断念）。

## ✅ 公開完了：スマホで見られる公開URL
**https://okikat.github.io/learn-ux/** で公開中（2026-05-31 疎通確認）。スマホでタップして閲覧可能。
- ソース：Settings → Pages →「Deploy from a branch」/ `gh-pages` `/(root)`（設定済み）。
- base は相対パス＋HashRouter のため、サブパス配信でもリロード/直リンクで404にならない。
- 内容を更新したいときは末尾の「gh-pages を更新する手順」を実行。

### 公開URLの“鍵”について（ユーザーの関心事）
- 公開はいつでも取り下げ可（Pagesをオフ／リポジトリを非公開に戻す）。
- GitHub Pages無料にパスワード保護はない＝「URLを知る人は開ける」。広く共有しなければ実質プレビュー用。
- **本番（販売）時は「無料だけ公開・有料は購入の向こうでロック」**にする（note/BOOTH等の購入ダウンロード、または認証付きホスティング）。公開サイトに有料分の静的ファイルを置くと誰でもDLできるため、リリースでは出し分ける。

## 代替の閲覧手段（公開URLが不要/難しい場合）
- **単一HTML**：`npm run build:standalone` → `dist-standalone/index.html`。ダブルクリックで開く（オフライン可、Androidで開きやすい）。
- **Netlify Drop**：`dist` を zip 化（`yaru-ux` フォルダ入り）→ https://app.netlify.com/drop にドラッグ → 即URL（iPhoneでも開ける）。アカウント登録は無料。

## 環境のハマりどころ（次のセッションへの注意）
- **GitHub Actionsの Pages デプロイは失敗する**：`actions/configure-pages` の有効化が、トークン権限/初回有効化の都合で失敗。→ Actions方式は使わず、**`gh-pages` ブランチ配信**にした。
- **コミット署名がサブworktree/別repoで失敗**（`environment-runner code-sign: missing source`）。`git worktree` 内や `/tmp` の別initリポでの `git commit` は通らない。→ **本worktree(/home/user/learn-ux)での通常コミット**か、**`git commit-tree` プラム配管**ならOK（gh-pagesはこれで作成した）。
- **サンドボックスから外部公開（トンネル）は不可**：cloudflared等は7844番がブロックで接続不可。ホスティングはGitHub Pages/Netlify等、外部サービス側で行う。

### gh-pages を更新する手順（将来、内容を更新したいとき）
```bash
npm run build
touch dist/.nojekyll
GIT_INDEX_FILE=/tmp/ghp.idx git -C dist --git-dir="$PWD/.git" --work-tree="$PWD/dist" add -A .
TREE=$(GIT_INDEX_FILE=/tmp/ghp.idx git write-tree)
COMMIT=$(git commit-tree "$TREE" -m "deploy: built site")
git push -f origin "$COMMIT:refs/heads/gh-pages"
```
（Pagesのソースを gh-pages に設定済みなら、push後に自動で再公開される）

## 出典・著作権
解説文・Tips・定義はすべて独自記述（転記なし）。出典クレジットは README 末尾（Jon Yablonski "Laws of UX" / lawsofux.com）。有料化しても、独自表現＋出典明記なら問題なし。

## 次にやると良いこと（任意）
1. ✅ Pages設定 → 公開URL確定（https://okikat.github.io/learn-ux/）。
2. ✅ PR #1 を `main` にマージ済み。
3. **販売の出し分け（重要・未対応）**：いまの公開サイトは**有料14もそのまま閲覧できる**（＝URLを知れば誰でも見られる）。本番販売時は、有料14を別配布（note/BOOTH等）へ切り出し、公開サイトは**無料20のみ**に出し分ける。→ ビルド分割の実装が必要。広くプレビュー共有する前に入れておくと流出を防げる。
4. （任意）アプリ本体のさらなる磨き込み・法則の追加・文言調整など。
