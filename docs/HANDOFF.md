# 引き継ぎ書（HANDOFF） — やるUX

最終更新: 2026-05-31 / 作業ブランチ: `claude/focused-bohr-BRsKo`（PR #1 → `main`）

## このプロジェクトは何か
UXの心理法則を「読むのではなく、さわって覚える」インタラクティブ学習アプリ「**やるUX**」。
React 19 + TypeScript + Vite / CSS Modules / react-router-dom(HashRouter) / 状態は useState / Vitest。

## いまの完成状況（コードはすべて完成・プッシュ済み）
- **無料20法則**（5カテゴリ：見え方/記憶/判断・行動/操作・速さ/設計の心得）。各：①定義 ②解説 ③触れるデモ ④Tips＋「この体験から分かること」。
- **有料パック「認知バイアス」¥980：14項目**（トップ最下部のPRO区画。無料と視覚的に分離・前後ナビもセット内で完結）。
- 第三者視点の**UX監修レポート**＝ `docs/ux-review-free20.md`（指摘＋対応ログ）。指摘はすべて反映済み。
- `npm run build` 成功（127モジュール）/ `npm test` 50件すべて緑 / 375pxで全デモ動作・コンソールエラー0 を実機（ヘッドレスChromium）で確認済み。

## ブランチ／リモートの状態
- `claude/focused-bohr-BRsKo` … 本体（全コミット）。PR #1 で `main` にマージ待ち。
- `main` … 空の初期コミットのみ（PRのベース）。
- `gh-pages` … **ビルド済みサイト**（`index.html` / `assets/*` / `.nojekyll`）。← スマホ公開用。
- GitHub Actionsのデプロイ用ワークフローは**削除済み**（Actions方式は下記理由で断念）。

## 残タスク：スマホで見られる「公開URL」を出す（あと1クリック）
リポジトリは既に **public** 済み。`gh-pages` に成果物も公開済み。あとはユーザー操作のみ：

1. GitHub → リポジトリ → **Settings** → 左メニュー **Pages**
2. **Build and deployment → Source: 「Deploy from a branch」**
3. **Branch: `gh-pages` / フォルダ `/ (root)`** を選んで **Save**
4. 1〜2分後、**https://okikat.github.io/learn-ux/** がスマホでタップして開けるようになる
   （base は相対パス＋HashRouter のため、サブパス配信でもリロード/直リンクで404にならない）

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
1. ユーザーがPages設定（上記）→ 公開URL確定。
2. 必要なら PR #1 を `main` にマージ。
3. 監視（PR購読）でCIイベントに対応（現状CIワークフローは無し）。
4. 販売フェーズ：有料14を別配布（note/BOOTH）に切り出し、無料20のみ公開、の出し分け。
