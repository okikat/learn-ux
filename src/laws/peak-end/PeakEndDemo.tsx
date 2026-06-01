import { useState } from 'react'
import styles from './PeakEndDemo.module.css'

type Store = 'A' | 'B'

/**
 * ピーク・エンドの法則：同じ買い物（商品・値段・手順は同一）でも、
 * 「最後の画面（締め方）」が違うと体験全体の印象が変わる。
 * 悪い終わり方(B) と 良い終わり方(A) を見比べさせ、どちらをまた使うか問う。
 */
export default function PeakEndDemo() {
  const [bought, setBought] = useState<{ A: boolean; B: boolean }>({ A: false, B: false })
  const [vote, setVote] = useState<Store | null>(null)

  const bothBought = bought.A && bought.B
  const reset = () => {
    setBought({ A: false, B: false })
    setVote(null)
  }

  return (
    <div className={styles.demo}>
      <p className={styles.lead}>
        同じ商品を2つのお店で買います。<strong>商品も値段も手順も同じ</strong>。
        違うのは<strong>「最後の画面」だけ</strong>です。両方で買って、見比べてください。
      </p>

      <div className={styles.stores}>
        <StoreCard store="A" bought={bought.A} onBuy={() => setBought((b) => ({ ...b, A: true }))} />
        <StoreCard store="B" bought={bought.B} onBuy={() => setBought((b) => ({ ...b, B: true }))} />
      </div>

      {bothBought && vote === null && (
        <div className={styles.voteBox}>
          <p className={styles.voteQ}>どちらのお店を、また使いたいですか？</p>
          <div className={styles.voteBtns}>
            <button type="button" className={styles.voteBtn} onClick={() => setVote('A')}>
              店A
            </button>
            <button type="button" className={styles.voteBtn} onClick={() => setVote('B')}>
              店B
            </button>
          </div>
        </div>
      )}

      {vote !== null && (
        <div className={styles.reveal} aria-live="polite">
          <p>
            あなたの選択：<strong>店{vote}</strong>
          </p>
          <p className={styles.revealText}>
            商品も値段も手順も<strong>まったく同じ</strong>。なのに多くの人が<strong>店A</strong>を選ぶのは、
            人が体験全体を<strong>「終わり方」</strong>で評価するから——これがピーク・エンドの法則です。
            申込みやチェックアウトの<strong>最後の一画面</strong>こそ、丁寧に締めくくる価値があります。
          </p>
          <button type="button" className={styles.retry} onClick={reset}>
            もう一度ためす
          </button>
        </div>
      )}
    </div>
  )
}

function StoreCard({ store, bought, onBuy }: { store: Store; bought: boolean; onBuy: () => void }) {
  return (
    <div className={styles.store}>
      <div className={styles.storeHead}>
        <span className={styles.storeTag}>店{store}</span>
        <span className={styles.steps}>カート→住所→支払い（手順は同じ）</span>
      </div>
      <div className={styles.product}>
        <span className={styles.thumb} aria-hidden="true" />
        <span className={styles.pInfo}>
          <span className={styles.pName}>ワイヤレスイヤホン</span>
          <span className={styles.pPrice}>¥3,000</span>
        </span>
      </div>

      {/* ボタン⇄結果の差し替えで枠が動かないよう、最小高さを確保 */}
      <div className={styles.action}>
        {!bought ? (
          <button type="button" className={styles.buyBtn} onClick={onBuy}>
            購入を確定する
          </button>
        ) : store === 'A' ? (
          <div className={`${styles.ending} ${styles.endingGood}`}>
            <span className={styles.endingIcon} aria-hidden="true">
              🎉
            </span>
            <span className={styles.endingText}>
              ご購入ありがとうございます！
              <br />
              また会えるのを楽しみにしています😊
            </span>
          </div>
        ) : (
          <div className={`${styles.ending} ${styles.endingBad}`}>
            <span className={styles.endingIcon} aria-hidden="true">
              ⚠️
            </span>
            <span className={styles.endingText}>
              エラーが発生しました。
              <br />
              お手数ですが最初からやり直してください。
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
