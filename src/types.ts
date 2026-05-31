import type { ComponentType } from 'react'

/** 1つのUX法則を表すメタデータ。全ページがこの「型」で構成される。 */
export interface LawMeta {
  /** 一意なID（フィッツなら "fitts"） */
  id: string
  /** 表示用の通し番号 "01"〜"10" */
  no: string
  /** URLスラッグ（/laws/:slug） */
  slug: string
  /** 法則名（日本語） */
  titleJa: string
  /** 法則名（英語） */
  titleEn: string
  /** ①一言定義 */
  tagline: string
  /** ②自分の言葉での短い解説（段落配列） */
  description: string[]
  /** ④実践Tips（2〜3個） */
  tips: string[]
  /** デモ下に出す「この体験から分かること」 */
  takeaway: string
  /** カード等のアクセントカラー */
  accent: string
  /** ③触って体感するインタラクティブ・デモ */
  Demo: ComponentType
  /** デモ実装済みか（未実装は一覧で「準備中」表示） */
  ready: boolean
}
