import { useState } from 'react'
import styles from './ConfirmationDemo.module.css'

type Vote = 'a' | 'b' | 'c'

export default function ConfirmationDemo() {
  const [vote, setVote] = useState<Vote | null>(null)

  return (
    <div className={styles.demo}>
      <p className={styles.q}>
        あなたは「朝型の人ほど成功する」と信じています。
        <br />
        どの記事を読みますか？
      </p>

      <div className={styles.choices}>
        <button type="button" className={styles.choice} onClick={() => vote === null && setVote('a')} disabled={vote !== null}>
          ① 朝型CEOたちの成功習慣
        </button>
        <button type="button" className={styles.choice} onClick={() => vote === null && setVote('b')} disabled={vote !== null}>
          ② 夜型だった天才たち
        </button>
        <button type="button" className={styles.choice} onClick={() => vote === null && setVote('c')} disabled={vote !== null}>
          ③「睡眠型と成功は無関係」という研究
        </button>
      </div>

      {vote !== null && (
        <div className={styles.reveal} aria-live="polite">
          {vote === 'a' ? (
            <p>
              ①を選んだあなたは、自分の考えを<strong>裏づける</strong>情報を選びました（とても自然な反応です）。
            </p>
          ) : (
            <p>②③を選べた人は少数派。多くの人は①の“裏づけ”を選びます。</p>
          )}
          <p className={styles.small}>
            人は信念を支持する情報ばかり集め、反証を避けがち——確証バイアス。だから設計では、自分にもユーザーにも
            <strong>“反対の証拠”を意識的に見せる</strong>工夫が要る（A/Bテストやユーザーテストが効くのはこのため）。
          </p>
          <button type="button" className={styles.again} onClick={() => setVote(null)}>
            もう一度
          </button>
        </div>
      )}
    </div>
  )
}
