import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { laws } from '../data/laws'
import Term from '../components/Term'
import styles from './IntroPage.module.css'

/**
 * 「はじめに」ページ（/intro）。0からの人向けの導入。
 *  - ひとこと（難しそうの印象をほぐす）
 *  - UX・UIってなに？（違い＋身近な例）
 *  - このアプリでの学び方（用語ヒントの自己紹介つき）
 * Law 00 的な“最初に読む”位置づけ。ただし番号は振らない。
 */
export default function IntroPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])
  const first = laws[0]

  return (
    <main className={`container ${styles.page}`}>
      <header className={styles.head}>
        <p className={styles.kicker}>はじめての方へ</p>
        <h1 className={styles.title}>UX・UIって、なに？</h1>
      </header>

      <p className={styles.welcome}>
        「UX」って、なんだか難しそう……と思っていませんか？ 大丈夫です。
        むずかしい言葉は、あとから自然と分かってきます。まずは気軽に、ボタンを押して“なるほど！”を体験するところから始めましょう。
      </p>

      <section className={styles.section}>
        <div className={styles.compare}>
          <div className={styles.box}>
            <span className={styles.boxTag}>UI</span>
            <span className={styles.boxEn}>ユーザー・インターフェース</span>
            <span className={styles.boxText}>
              画面の見た目や操作そのもの。ボタン・文字・配置など、直接さわる部分です。
            </span>
          </div>
          <div className={`${styles.box} ${styles.boxUx}`}>
            <span className={styles.boxTag}>UX</span>
            <span className={styles.boxEn}>ユーザー・エクスペリエンス</span>
            <span className={styles.boxText}>
              それを使って感じる体験のすべて。「探しやすい」「迷わない」「また使いたい」まで含みます。
            </span>
          </div>
        </div>
        <p className={styles.para}>
          たとえば自動販売機なら、ボタンの並びや光り方が <strong>UI</strong>。お金を入れてから飲み物が出てくるまでの
          “スムーズさ・気持ちよさ”が <strong>UX</strong> です。<strong>UIはUXの一部</strong>。
          良いUIは良いUXの土台になりますが、UXはもっと広く、体験全体を指します。
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>このアプリでの学び方</h2>
        <p className={styles.para}>
          ここでは、UXを左右する<strong>“人の心理の法則”</strong>を、20＋14のミニ実験で<strong>さわって</strong>学びます。
          読むだけでなく、自分で触って「なるほど」を体験できるのが特徴です。
        </p>
        <p className={styles.para}>
          むずかしい用語（例：<Term>ヒューリスティック</Term>）は、文中の<strong>点線つきの言葉</strong>をタップすると、
          意味がポップアップします。気になったときだけ開けばOKです。
        </p>
      </section>

      <Link to={`/laws/${first.slug}`} className={styles.cta}>
        最初の法則からはじめる →
      </Link>
    </main>
  )
}
