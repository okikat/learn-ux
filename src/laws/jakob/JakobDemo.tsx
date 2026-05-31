import { useCallback, useRef, useState } from 'react'
import { formatMs } from '../../utils/stats'
import styles from './JakobDemo.module.css'

type Sub = 'intro' | 'play' | 'done'

export default function JakobDemo() {
  const [roundIndex, setRoundIndex] = useState(0) // 0=おなじみ, 1=奇抜
  const [sub, setSub] = useState<Sub>('intro')
  const [times, setTimes] = useState<number[]>([])
  const [wrong, setWrong] = useState(false)
  const startRef = useRef(0)

  const weird = roundIndex === 1

  const begin = useCallback(() => {
    setWrong(false)
    startRef.current = performance.now()
    setSub('play')
  }, [])

  const finish = useCallback(() => {
    const elapsed = performance.now() - startRef.current
    setTimes((prev) => [...prev, elapsed])
    if (roundIndex + 1 >= 2) setSub('done')
    else {
      setRoundIndex((i) => i + 1)
      setSub('intro')
    }
  }, [roundIndex])

  const reset = useCallback(() => {
    setTimes([])
    setRoundIndex(0)
    setSub('intro')
    setWrong(false)
  }, [])

  if (sub === 'done') {
    const diff = times[1] - times[0]
    return (
      <div className={styles.demo}>
        <h3 className={styles.title}>結果：ボタンを見つけるまでの時間</h3>
        <div className={styles.rows}>
          <Row label="おなじみ配置" time={times[0]} all={times} />
          <Row label="奇抜な配置" time={times[1]} all={times} danger />
        </div>
        <p className={styles.note}>
          {diff > 0
            ? `見慣れた配置の方が約 ${formatMs(diff)} 速く見つけられました。`
            : '今回は差が小さめでした。慣習に沿うほど迷いは減ります。'}
          {' '}※奇抜版は意図的に探しにくくしています。1回の計測なので個人差・偶然で前後します。
        </p>
        <button type="button" className={styles.btn} onClick={reset}>
          もう一度ためす
        </button>
      </div>
    )
  }

  if (sub === 'intro') {
    return (
      <div className={styles.demo}>
        <div className={styles.bar}>
          <span className={styles.counter}>
            ラウンド {roundIndex + 1} / 2（{weird ? '奇抜な配置' : 'おなじみ配置'}）
          </span>
        </div>
        <div className={styles.introBox}>
          <p className={styles.introLead}>
            次の画面で「<strong>購入を確定する</strong>」ボタンを
            <br />
            できるだけ速く見つけて押してください。
          </p>
          <button type="button" className={styles.btnPrimary} onClick={begin}>
            準備OK・開始
          </button>
        </div>
      </div>
    )
  }

  // play
  return (
    <div className={styles.demo}>
      <div className={styles.bar}>
        <span className={styles.counter}>「購入を確定する」を探して押す！</span>
      </div>

      {weird ? (
        <div className={styles.screenWeird}>
          <button type="button" className={styles.tinyLink} onClick={finish}>
            購入を確定する
          </button>
          <div className={styles.weirdPrice}>¥12,800（小計）</div>
          <button type="button" className={styles.bigDecoy} onClick={() => setWrong(true)}>
            🎁 いますぐ開く！
          </button>
          <div className={styles.weirdSearch}>🔍 商品を検索</div>
          <div className={styles.weirdItem}>商品：ワイヤレスヘッドホン</div>
          <div className={styles.weirdLogo}>SHOP LOGO</div>
        </div>
      ) : (
        <div className={styles.screen}>
          <div className={styles.topbar}>
            <span className={styles.logo}>SHOP LOGO</span>
            <span className={styles.search}>🔍 検索</span>
          </div>
          <div className={styles.item}>商品：ワイヤレスヘッドホン</div>
          <div className={styles.price}>小計：¥12,800</div>
          <div className={styles.actions}>
            <button type="button" className={styles.secondary} onClick={() => setWrong(true)}>
              クーポンを使う
            </button>
            <button type="button" className={styles.primary} onClick={finish}>
              購入を確定する
            </button>
          </div>
        </div>
      )}

      {wrong && <p className={styles.wrong}>それは別のボタンです。「購入を確定する」を探して！</p>}
    </div>
  )
}

function Row({
  label,
  time,
  all,
  danger,
}: {
  label: string
  time: number
  all: number[]
  danger?: boolean
}) {
  const max = Math.max(...all, 1)
  const width = Math.max(8, Math.round((time / max) * 100))
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.track}>
        <span
          className={`${styles.fill} ${danger ? styles.fillDanger : ''}`}
          style={{ width: `${width}%` }}
        />
      </span>
      <span className={styles.rowTime}>{formatMs(time)}</span>
    </div>
  )
}
