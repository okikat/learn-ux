import { useState } from 'react'
import styles from './AestheticDemo.module.css'

type Choice = 'plain' | 'fancy'

/** A=素っ気ないUI / B=整ったUI。機能・情報は完全に同一。 */
export default function AestheticDemo() {
  const [vote, setVote] = useState<Choice | null>(null)
  const [tally, setTally] = useState({ plain: 0, fancy: 0 })

  const cast = (c: Choice) => {
    if (vote !== null) return
    setVote(c)
    setTally((t) => ({ ...t, [c]: t[c] + 1 }))
  }

  const total = tally.plain + tally.fancy
  const pct = (n: number) => (total === 0 ? 0 : Math.round((n / total) * 100))

  return (
    <div className={styles.demo}>
      <p className={styles.lead}>
        2つの天気カードは<strong>表示している情報も機能もまったく同じ</strong>です。
        どちらが「使いやすそう・信頼できる」と感じますか？
      </p>

      <div className={styles.cards}>
        {/* A: 素っ気ないUI */}
        <div className={styles.col}>
          <div className={styles.plainCard}>
            <div>天気 / 東京</div>
            <div>晴れ 23度</div>
            <div>降水確率: 10%</div>
            <div>湿度: 45%</div>
            <div>風: 北 2m/s</div>
            <button type="button" className={styles.plainBtn}>
              詳細
            </button>
          </div>
          <button type="button" className={styles.voteBtn} onClick={() => cast('plain')} disabled={vote !== null}>
            こちらを信頼（A）
          </button>
        </div>

        {/* B: 整ったUI */}
        <div className={styles.col}>
          <div className={styles.fancyCard}>
            <div className={styles.fancyHead}>
              <span className={styles.fancyCity}>東京</span>
              <span className={styles.fancyIcon} aria-hidden="true">
                ☀️
              </span>
            </div>
            <div className={styles.fancyTemp}>23°</div>
            <div className={styles.fancyCond}>晴れ</div>
            <ul className={styles.fancyMeta}>
              <li>
                <span>降水</span>
                <strong>10%</strong>
              </li>
              <li>
                <span>湿度</span>
                <strong>45%</strong>
              </li>
              <li>
                <span>風</span>
                <strong>北 2m/s</strong>
              </li>
            </ul>
            <button type="button" className={styles.fancyBtn}>
              詳細を見る
            </button>
          </div>
          <button type="button" className={styles.voteBtn} onClick={() => cast('fancy')} disabled={vote !== null}>
            こちらを信頼（B）
          </button>
        </div>
      </div>

      {vote !== null && (
        <div className={styles.reveal} aria-live="polite">
          <p className={styles.revealLead}>
            機能は同一なのに、整ったB（あなたは<strong>{vote === 'fancy' ? 'B' : 'A'}</strong>を選択）を
            「使いやすそう」と感じる人が多数です。これが美的ユーザビリティ効果。
          </p>
          <div className={styles.tally}>
            <TallyBar label="A 素っ気ない" value={tally.plain} pct={pct(tally.plain)} />
            <TallyBar label="B 整っている" value={tally.fancy} pct={pct(tally.fancy)} highlight />
          </div>
          <button
            type="button"
            className={styles.again}
            onClick={() => setVote(null)}
          >
            もう一度投票する
          </button>
        </div>
      )}
    </div>
  )
}

function TallyBar({
  label,
  value,
  pct,
  highlight,
}: {
  label: string
  value: number
  pct: number
  highlight?: boolean
}) {
  return (
    <div className={styles.tallyRow}>
      <span className={styles.tallyLabel}>{label}</span>
      <span className={styles.tallyTrack}>
        <span
          className={`${styles.tallyFill} ${highlight ? styles.tallyFillHi : ''}`}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className={styles.tallyVal}>
        {value}票 ({pct}%)
      </span>
    </div>
  )
}
