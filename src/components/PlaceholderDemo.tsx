import styles from './PlaceholderDemo.module.css'

/** デモ未実装の法則で使う仮表示。段階的に各法則のデモへ差し替える。 */
export default function PlaceholderDemo() {
  return (
    <div className={styles.wrap} role="status">
      <span className={styles.icon} aria-hidden="true">
        🛠️
      </span>
      <p className={styles.text}>
        このインタラクティブ・デモは準備中です。
        <br />
        次の段階でこの場所に実装されます。
      </p>
    </div>
  )
}
