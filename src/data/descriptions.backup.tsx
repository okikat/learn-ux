import type { ReactNode } from 'react'
import FakeLinkTrap from '../components/FakeLinkTrap'

/**
 * 「やさしい文体」に書き換える前の、現行（くわしめ）の解説文＋気づきの保存。
 * アプリ本体では未使用＝バックアップ専用。
 * 戻したいときは、該当エントリの description / takeaway を src/data/laws.tsx に貼り戻す。
 *
 * ※ 書き換えた法則ぶんだけ、ここに順次追加していく。
 */
export const originalDescriptions: Record<
  string,
  { description: ReactNode[]; takeaway: string }
> = {
  proximity: {
    description: [
      '人は、距離が近いものを“仲間”として無意識にグループ化する。だから要素の間隔を変えるだけで、線や枠を引かなくても「どれとどれが一組か」を伝えられる。',
      '逆に、関係ないものまで近づけると、無関係なものが一塊に見えて誤解を生む。余白は飾りではなく、関係性を示す強力な道具だ。',
    ],
    takeaway: '位置を変えず間隔を調整するだけで、まとまりの見え方が一変する。余白こそが関係性を語る。',
  },
  similarity: {
    description: [
      '色・形・大きさなどが似ている要素を、人は“同じ役割の仲間”として結びつけて見る。近くになくても、見た目の共通点だけでグループを作れる。',
      <>
        この性質は便利な反面、危うさもある。
        <FakeLinkTrap>
          リンクでない文字を青字＋下線にすると「押せそう」と誤解される。
        </FakeLinkTrap>
        見た目の類似は、機能の類似だと受け取られるのだ。
      </>,
    ],
    takeaway: '色や形をそろえるだけで“仲間”が生まれる。見た目の共通点は、機能の共通点だと受け取られる。',
  },
}
