import type { Category, LawMeta } from '../types'

// 見え方（ゲシュタルト）
import ProximityDemo from '../laws/proximity/ProximityDemo'
import SimilarityDemo from '../laws/similarity/SimilarityDemo'
import CommonRegionDemo from '../laws/common-region/CommonRegionDemo'
import PragnanzDemo from '../laws/pragnanz/PragnanzDemo'
// 記憶
import MillerDemo from '../laws/miller/MillerDemo'
import SerialPositionDemo from '../laws/serial-position/SerialPositionDemo'
import VonRestorffDemo from '../laws/von-restorff/VonRestorffDemo'
import ZeigarnikDemo from '../laws/zeigarnik/ZeigarnikDemo'
// 判断・行動
import HickDemo from '../laws/hick/HickDemo'
import SelectiveAttentionDemo from '../laws/selective-attention/SelectiveAttentionDemo'
import GoalGradientDemo from '../laws/goal-gradient/GoalGradientDemo'
import ParkinsonDemo from '../laws/parkinson/ParkinsonDemo'
// 操作・速さ
import FittsDemo from '../laws/fitts/FittsDemo'
import DohertyDemo from '../laws/doherty/DohertyDemo'
import JakobDemo from '../laws/jakob/JakobDemo'
import PostelDemo from '../laws/postel/PostelDemo'
// 設計の心得
import TeslerDemo from '../laws/tesler/TeslerDemo'
import AestheticDemo from '../laws/aesthetic/AestheticDemo'
import PeakEndDemo from '../laws/peak-end/PeakEndDemo'
import ParetoDemo from '../laws/pareto/ParetoDemo'

/** トップページのカテゴリ（この順で表示）。 */
export const categories: { id: Category; label: string; blurb: string }[] = [
  { id: 'perception', label: '見え方（ゲシュタルト）', blurb: '配置と見た目で“まとまり”が生まれる' },
  { id: 'memory', label: '記憶', blurb: '人の記憶のクセに沿って設計する' },
  { id: 'decision', label: '判断・行動', blurb: '選ぶ・動く・続けるを後押しする' },
  { id: 'operation', label: '操作・速さ', blurb: '速く・迷わず・快適に操作させる' },
  { id: 'design', label: '設計の心得', blurb: '作り手が持っておきたい原則' },
]

/**
 * 20のUX法則。並び順＝カテゴリ順。解説・Tips・一言定義はすべて独自記述。
 */
export const laws: LawMeta[] = [
  // ───────── 見え方（ゲシュタルト） ─────────
  {
    id: 'proximity',
    no: '01',
    slug: 'proximity',
    titleJa: '近接の法則',
    titleEn: 'Law of Proximity',
    tagline: '近くに置かれた要素どうしは、ひとつのまとまりに見える。',
    description: [
      '人は、距離が近いものを“仲間”として無意識にグループ化する。だから要素の間隔を変えるだけで、線や枠を引かなくても「どれとどれが一組か」を伝えられる。',
      '逆に、関係ないものまで近づけると、無関係なものが一塊に見えて誤解を生む。余白は飾りではなく、関係性を示す強力な道具だ。',
    ],
    tips: [
      '関連する項目（ラベルと入力欄など）は近づけ、別グループとは十分な余白で離す。',
      '区切り線や枠を足す前に、まず“間隔”だけでグループ化できないか考える。',
      '余白をケチらない。詰め込みは関係性を壊し、かえって読みにくくする。',
    ],
    takeaway: '位置を変えず間隔を調整するだけで、まとまりの見え方が一変する。余白こそが関係性を語る。',
    accent: '#3aa6b9',
    category: 'perception',
    Demo: ProximityDemo,
    ready: true,
  },
  {
    id: 'similarity',
    no: '02',
    slug: 'similarity',
    titleJa: '類似の法則',
    titleEn: 'Law of Similarity',
    tagline: '見た目が似ている要素は、同じ仲間だと感じられる。',
    description: [
      '色・形・大きさなどが似ている要素を、人は“同じ役割の仲間”として結びつけて見る。近くになくても、見た目の共通点だけでグループを作れる。',
      'この性質は便利な反面、危うさもある。リンクでない文字を青字＋下線にすると「押せそう」と誤解される。見た目の類似は、機能の類似だと受け取られるのだ。',
    ],
    tips: [
      '同じ意味・役割のものは見た目をそろえ、違うものははっきり区別する。',
      '押せる要素（ボタン・リンク）と押せない要素のスタイルを明確に分ける。',
      '色だけでグループ分けしない。形・位置も併用する（色覚多様性への配慮）。',
    ],
    takeaway: '色や形をそろえるだけで“仲間”が生まれる。見た目の共通点は、機能の共通点だと受け取られる。',
    accent: '#7b6ef6',
    category: 'perception',
    Demo: SimilarityDemo,
    ready: true,
  },
  {
    id: 'common-region',
    no: '03',
    slug: 'common-region',
    titleJa: '共通領域の法則',
    titleEn: 'Law of Common Region',
    tagline: '同じ枠や背景で囲むだけで、ひとつのグループに見える。',
    description: [
      '要素を共通の領域（枠線・背景色・カードなど）で囲むと、それだけで強力に「ひとまとまり」と認識される。この力は近接より強く、離れた要素でも同じ枠の中なら仲間に見える。',
      'カードUIやセクションの背景分けが効くのはこのため。境界を引くことは、関係性を一瞬で宣言する行為だ。',
    ],
    tips: [
      '関連情報はカードや背景でひとまとめにし、グループの境界を明確にする。',
      '区切りたいときは、間隔だけでなく“領域（枠・背景）”で分けると確実。',
      '枠を多用しすぎると線だらけになる。背景色や余白とも使い分ける。',
    ],
    takeaway: '点を動かさず枠で囲むだけで、まとまりが生まれる。共通領域は近接より強くグループを作る。',
    accent: '#2f9e44',
    category: 'perception',
    Demo: CommonRegionDemo,
    ready: true,
  },
  {
    id: 'pragnanz',
    no: '04',
    slug: 'pragnanz',
    titleJa: 'プレグナンツの法則',
    titleEn: 'Law of Prägnanz',
    tagline: '人は複雑な形を、いちばん単純で分かりやすい形に捉える。',
    description: [
      '視覚情報が複雑でも、脳はそれを最も単純で安定した解釈に“まとめて”理解しようとする。重なった円を「複雑な断片の集合」ではなく「重なった円」と見るのはそのため。',
      'だから単純で秩序ある形ほど速く正しく伝わり、記憶にも残る。複雑さは認知の負担となり、誤解や見落としを生む。',
    ],
    tips: [
      'アイコンやロゴは、できるだけ単純な形に削ぎ落とす。',
      '情報や図は規則的で秩序あるレイアウトにして、読み解く負担を減らす。',
      '装飾的な複雑さより、一目で構造が分かる単純さを優先する。',
    ],
    takeaway: '脳は複雑な形を最も単純な解釈にまとめる。単純さは、速く正しく伝わる近道。',
    accent: '#e8590c',
    category: 'perception',
    Demo: PragnanzDemo,
    ready: true,
  },

  // ───────── 記憶 ─────────
  {
    id: 'miller',
    no: '05',
    slug: 'miller',
    titleJa: 'ミラーの法則',
    titleEn: "Miller's Law",
    tagline: '人が一度に頭に保てるのは、おおよそ 7±2 個まで。',
    description: [
      '短期記憶に同時に置いておける“かたまり”の数は、だいたい7前後（近年は4前後という説も）に限られる。情報を長い羅列でそのまま見せると溢れてしまう。',
      'けれど、意味のあるまとまり（チャンク）に区切ると、同じ量でもぐっと覚えやすくなる。電話番号やカード番号が区切って書かれているのは、まさにこの工夫だ。',
    ],
    tips: [
      '桁の多い数字（電話・カード番号）は、区切って表示・入力させる（例：(012) 345-6789）。',
      'メニューや設定は関連ごとにグループ化し、1グループの項目数を絞る。',
      '「7」を魔法の数として崇めない。本質は“チャンク化”であって、項目数の上限そのものではない。',
    ],
    takeaway: '同じ桁数でも、区切られた数字のほうが圧倒的に思い出しやすい。チャンク化が記憶を助ける。',
    accent: '#2a9d8f',
    category: 'memory',
    Demo: MillerDemo,
    ready: true,
  },
  {
    id: 'serial-position',
    no: '06',
    slug: 'serial-position',
    titleJa: '系列位置効果',
    titleEn: 'Serial Position Effect',
    tagline: '並んだ項目は、最初と最後がいちばん記憶に残る。',
    description: [
      '一連の項目を見せられると、人は先頭（初頭効果）と末尾（新近効果）をよく覚え、真ん中は抜け落ちやすい。リストの両端は“記憶のゴールデンゾーン”だ。',
      'だからナビやメニューでは、最重要の項目を端（最初か最後）に置くと残りやすい。埋もれさせたくないものを真ん中に置くのは避けたい。',
    ],
    tips: [
      '最も重要なメニュー項目やアクションは、並びの先頭か末尾に置く。',
      'ナビゲーションの両端（左端・右端）は目立つので、主要導線を配置する。',
      '「とりあえず真ん中」を避け、優先度で位置を決める。',
    ],
    takeaway: '並びの“両端”は記憶に残り、真ん中は埋もれる。大事なものは端に置く。',
    accent: '#1c7ed6',
    category: 'memory',
    Demo: SerialPositionDemo,
    ready: true,
  },
  {
    id: 'von-restorff',
    no: '07',
    slug: 'von-restorff',
    titleJa: 'フォン・レストルフ効果',
    titleEn: 'Von Restorff Effect',
    tagline: '周りと違って際立つものほど、記憶に残る。',
    description: [
      '似たものが並ぶ中で1つだけ見た目が違うと、その要素は強く注意を引き、記憶に残りやすい。だから最も押してほしいアクションを“目立つ1つ”にすると、視線と行動を誘導できる。',
      'ただし目立つ要素を増やしすぎると、互いに打ち消し合って、結局どれも際立たなくなる。強調は絞ってこそ効く。',
    ],
    tips: [
      '最重要アクションは「1画面に1つ」だけ目立たせ、視線を集中させる。',
      '色や形だけに頼らず、サイズ・余白・コントラストも併用する（色覚多様性への配慮）。',
      '強調を乱発しない。目立つものが増えるほど、際立ちは薄れていく。',
    ],
    takeaway: '同じ要素の中で1つだけ違うものは、後からでも思い出せる。際立ちが記憶を作る。',
    accent: '#d9a514',
    category: 'memory',
    Demo: VonRestorffDemo,
    ready: true,
  },
  {
    id: 'zeigarnik',
    no: '08',
    slug: 'zeigarnik',
    titleJa: 'ツァイガルニク効果',
    titleEn: 'Zeigarnik Effect',
    tagline: '完了したことより、やりかけのことの方が気になって記憶に残る。',
    description: [
      '人は達成済みのタスクよりも、未完了・中断したタスクをよく覚えていて気にかけ続ける。「あと少しで終わる」状態は、完成させたいという強い動機を生む。',
      '進捗バー、達成度メーター、「あと1ステップ」表示が効くのはこの効果。ただし未完了を煽りすぎると、ストレスや義務感になりかねない点には注意。',
    ],
    tips: [
      '進捗バーや達成度（プロフィール完成度など）で“あと少し”を見せ、完了を後押しする。',
      '手続きは小さなステップに分け、進んでいる実感を与える。',
      '未完了を“煽る”のではなく、気持ちよく完了に導くことを目指す。',
    ],
    takeaway: '「あと1つ」の未完了は、人を完成まで引っぱる。進捗の可視化が行動を後押しする。',
    accent: '#d6336c',
    category: 'memory',
    Demo: ZeigarnikDemo,
    ready: true,
  },

  // ───────── 判断・行動 ─────────
  {
    id: 'hick',
    no: '09',
    slug: 'hick',
    titleJa: 'ヒックの法則',
    titleEn: "Hick's Law",
    tagline: '選択肢が増えるほど、決めるのにかかる時間は伸びる。',
    description: [
      '人が選択に要する時間は、選べる数が増えるほど長くなる。たくさん並べると親切に見えるが、実際には迷いを生み、離脱や「決定疲れ」につながる。',
      '選択肢を絞る、段階的に見せる、推奨や初期値を用意する——こうした工夫で、決定の負荷は大きく下げられる。',
    ],
    tips: [
      '主要導線の選択肢は厳選し、めったに使わないものは折りたたむか後段に送る。',
      '項目が多いときは“段階的に小出し”にする（例：最初は要点だけ見せ、「もっと見る」で残りを開く）。',
      '推奨・既定値を示し、「考えずに選べる」近道を用意する。',
    ],
    takeaway: '30択は3択よりはっきり遅い。選択肢の“数”そのものが、決定の速さに効いてくる。',
    accent: '#d23b6d',
    category: 'decision',
    Demo: HickDemo,
    ready: true,
  },
  {
    id: 'selective-attention',
    no: '10',
    slug: 'selective-attention',
    titleJa: '選択的注意',
    titleEn: 'Selective Attention',
    tagline: '人は関係なさそうな情報を、無意識に見飛ばす。',
    description: [
      '人は目的に関係する情報だけを選んで見て、それ以外（広告っぽいもの、いつもの定位置のバナー等）は意識に上る前にフィルターしてしまう。これが「バナー・ブラインドネス」の正体だ。',
      'つまり“置いてある”ことと“見られる”ことは別。大事な情報を広告に似た見た目や位置に置くと、存在ごと無視されてしまう。',
    ],
    tips: [
      '重要な情報は、広告と区別がつく“素直なコンテンツ”の見た目・位置で置く。',
      '派手な装飾やバナー風の枠で大事な要素を飾らない（逆に無視される）。',
      'ユーザーが探しているもの（目的）の動線上に、必要な情報を置く。',
    ],
    takeaway: '広告っぽい見た目・場所は、置いてあっても無視される。大事な情報ほど“素直に”見せる。',
    accent: '#c2255c',
    category: 'decision',
    Demo: SelectiveAttentionDemo,
    ready: true,
  },
  {
    id: 'goal-gradient',
    no: '11',
    slug: 'goal-gradient',
    titleJa: '目標勾配効果',
    titleEn: 'Goal-Gradient Effect',
    tagline: 'ゴールが近づくほど、人のやる気と行動は加速する。',
    description: [
      '人は目標に近いと感じるほど、それを達成しようとする力が強まる。スタンプカードが残り少なくなると急に集めたくなるのは、このため。',
      '重要なのは“近さの感じ方”。最初から少し進んだ状態（見せかけの一歩）を与えるだけで、ゴールが近く感じられ、完走率が上がる（エンダウド・プログレス）。',
    ],
    tips: [
      '進捗を見せ、「ゴールまであと◯」を明示してラストスパートを促す。',
      '最初の一歩を“すでに済み”の状態で見せる（例：10個中2個プレゼント済み）。',
      '達成の直前は、手間や障害を減らして一気に終わらせてあげる。',
    ],
    takeaway: 'ゴールが近いほど人は加速する。“最初の一歩”を与えるだけで完走率は上がる。',
    accent: '#f08c00',
    category: 'decision',
    Demo: GoalGradientDemo,
    ready: true,
  },
  {
    id: 'parkinson',
    no: '12',
    slug: 'parkinson',
    titleJa: 'パーキンソンの法則',
    titleEn: "Parkinson's Law",
    tagline: '作業は、与えられた時間をめいっぱい使うまで膨張する。',
    description: [
      '与えた時間が長いほど、その作業は時間を使い切るまで自然と膨らんでしまう。締め切りが遠いと、本来すぐ終わる作業もダラダラ続いてしまうのが人の性。',
      '裏を返せば、現実的で少し短めの制約を与えたり、手間そのものを減らしたりすれば、作業はぐっと速く片づく。',
    ],
    tips: [
      'フォームや手続きは“必要な時間・手数”そのものを減らす（自動入力・初期値）。',
      '現実的で少し短めの締め切りや制限時間で、ダラダラを防ぐ。',
      '完了までの手数を見せ、「すぐ終わる」と感じさせて先延ばしを防ぐ。',
    ],
    takeaway: '時間を与えるほど作業は膨張する。手数と“余白”を減らせば、サッと終わる。',
    accent: '#5f3dc4',
    category: 'decision',
    Demo: ParkinsonDemo,
    ready: true,
  },

  // ───────── 操作・速さ ─────────
  {
    id: 'fitts',
    no: '13',
    slug: 'fitts',
    titleJa: 'フィッツの法則',
    titleEn: "Fitts's Law",
    tagline: '標的は、大きく・近いほど、速く正確に押せる。',
    description: [
      'ある的に到達するまでの時間は、的が遠いほど、また小さいほど長くなる。指やカーソルは「狙って動かす」動作なので、小さく離れた標的ほど時間も誤タップも増える。',
      '逆に、主要なボタンを大きく、手元（親指の届く範囲）に置けば操作は速く快適になる。画面の端や角は、カーソルが行き止まる“無限の幅を持つ的”として活用できる。',
    ],
    tips: [
      '主要アクションのボタンは十分大きく（最低44px）、関連する操作はまとめて近くに置く。',
      'スマホでは重要操作を画面下部＝親指の自然な可動域に配置する。',
      '削除など危険な操作はあえて小さく・離して置き、フィッツを“逆用”して誤操作を防ぐ。',
    ],
    takeaway: '同じ「押す」でも、小さく遠い的は明らかに時間がかかる。大きさと距離が、操作の速さと正確さを決める。',
    accent: '#5b5bd6',
    category: 'operation',
    Demo: FittsDemo,
    ready: true,
  },
  {
    id: 'doherty',
    no: '14',
    slug: 'doherty',
    titleJa: 'ドハティのしきい値',
    titleEn: 'Doherty Threshold',
    tagline: '応答が0.4秒以内だと、人は待たされた感なく没頭できる。',
    description: [
      'システムの反応がおおむね0.4秒以内に返ると、人は「待っている」という意識から解放され、テンポよく作業に没頭できる。反応が遅れるほど集中は途切れ、ストレスや離脱が増えていく。',
      '実際に速くできない処理でも、押した瞬間のフィードバック（反応・スケルトン表示・楽観的更新）で“速い”と感じさせることが重要だ。',
    ],
    tips: [
      '主要操作の反応は0.4秒以内を目標にする。体感速度がそのまま満足度を左右する。',
      '時間のかかる処理は、押した瞬間に何か反応を返す（ローディング・スケルトン・楽観的更新）。',
      '進捗や残りを見せ、「ちゃんと動いている」ことを伝えて不安と体感待ち時間を減らす。',
    ],
    takeaway: '0.4秒を超えると途端に“待たされてる感”が出る。即応性そのものが、快適さを作る。',
    accent: '#e0533d',
    category: 'operation',
    Demo: DohertyDemo,
    ready: true,
  },
  {
    id: 'jakob',
    no: '15',
    slug: 'jakob',
    titleJa: 'ヤコブの法則',
    titleEn: "Jakob's Law",
    tagline: 'ユーザーは他サイトでの経験を、あなたのサイトにも期待する。',
    description: [
      'ユーザーは1日の大半を“あなた以外”のサービスで過ごしている。そこで身につけた操作のクセ——ロゴを押せば先頭に戻る、カートは右上にある、といった期待——を、初めて訪れたあなたのサイトにもそのまま持ち込む。',
      'だから世間の慣習に沿ったUIほど学習コストはほぼゼロになり、奇抜なだけのUIは「使い方を覚え直す」負担を強いる。独自性はコンテンツや世界観で出し、操作の作法は標準に寄せるのが賢い。',
    ],
    tips: [
      'ロゴは左上でホームに戻る、検索は上部、購入ボタンは目立つ色——定番の配置はあえて踏襲する。',
      '「新しさ」は見た目やコンテンツで出し、基本操作の作法までは奇抜にしない。',
      '慣習を破るなら、それを上回る明確な利点と、ていねいな案内をセットにする。',
    ],
    takeaway: '「見慣れた配置」のほうが、目的の操作を圧倒的に速く見つけられる。慣習に乗ることが最速のオンボーディング。',
    accent: '#e0792b',
    category: 'operation',
    Demo: JakobDemo,
    ready: true,
  },
  {
    id: 'postel',
    no: '16',
    slug: 'postel',
    titleJa: 'ポステルの法則',
    titleEn: "Postel's Law",
    tagline: '入力には寛容に、内部の扱いには厳格に。',
    description: [
      'ユーザーの入力は揺れるもの。全角と半角、ハイフンの有無、前後の空白——それらを「間違い」として弾くのではなく、受け取れる範囲で受け取り、こちらで整えてあげる。',
      '受け口は広く取りつつ、内部で扱うデータは厳密な形に正規化する。この「寛容な入力／厳格な内部表現」が、使い心地と堅牢さを同時に成立させる。',
    ],
    tips: [
      '表記ゆれ（全角数字・空白・記号）は弾かず、自動で整形・正規化して受理する。',
      'エラーで突き返す前に「こちらで直せないか」をまず考える。',
      '受理はゆるく、しかし保存・送信するデータ形式は厳密に統一する。',
    ],
    takeaway: '雑に入れても正しく整う入力欄は、ユーザーに考えさせない。寛容さが、そのまま使いやすさになる。',
    accent: '#2f7fd1',
    category: 'operation',
    Demo: PostelDemo,
    ready: true,
  },

  // ───────── 設計の心得 ─────────
  {
    id: 'tesler',
    no: '17',
    slug: 'tesler',
    titleJa: 'テスラーの法則',
    titleEn: "Tesler's Law",
    tagline: 'どんな仕組みにも消せない複雑さがあり、誰かが必ず引き受ける。',
    description: [
      'あるプロセスが本質的に持つ複雑さは、ゼロにはできない。減らせるのは「誰がそれを負担するか」だけだ。アプリ側が複雑さを引き受ければユーザーは楽になり、手を抜けばユーザーにしわ寄せがいく。',
      '優れた設計は、面倒な処理（補完・推測・整形）をできる限りシステム側に寄せ、ユーザーの負担を肩代わりする。',
    ],
    tips: [
      '自動入力・推測・初期値で、ユーザーが負う複雑さを肩代わりする。',
      '「これは本当にユーザーに入力させる必要があるか？」を常に問い直す。',
      '削れない複雑さは、せめて分かりやすい形に整理してから提示する。',
    ],
    takeaway: '同じ作業でも、アプリが肩代わりするほどユーザーの手数は減る。複雑さは消えず、“移動”するだけ。',
    accent: '#1f9d6b',
    category: 'design',
    Demo: TeslerDemo,
    ready: true,
  },
  {
    id: 'aesthetic',
    no: '18',
    slug: 'aesthetic',
    titleJa: '美的ユーザビリティ効果',
    titleEn: 'Aesthetic–Usability Effect',
    tagline: '見た目が美しいUIは、実際に使いやすいと感じられる。',
    description: [
      '人は整って美しいデザインを、たとえ機能が同じでも「使いやすそう」「信頼できる」と感じやすい。美しさは第一印象の信頼を生み、多少の使いにくさを許す“緩衝材”にもなる。',
      'ただし、見た目だけで中身の問題を覆い隠せるわけではない。土台のユーザビリティがあってこその効果だと心得たい。',
    ],
    tips: [
      '余白・配色・タイポグラフィをていねいに整え、第一印象の信頼を獲得する。',
      '美しさで“ごまかす”のではなく、使いやすさの土台の上に美を載せる。',
      'ユーザビリティテストでは、見た目の良さが問題を覆い隠していないか注意する。',
    ],
    takeaway: '機能が同じでも、整ったUIのほうが「信頼できる・使いやすい」と感じる。見た目は体験の一部。',
    accent: '#8a5cf6',
    category: 'design',
    Demo: AestheticDemo,
    ready: true,
  },
  {
    id: 'peak-end',
    no: '19',
    slug: 'peak-end',
    titleJa: 'ピーク・エンドの法則',
    titleEn: 'Peak–End Rule',
    tagline: '体験の印象は、“最も強い瞬間”と“終わり方”でほぼ決まる。',
    description: [
      '人は出来事の全部を平均して覚えてはいない。最も感情が動いた瞬間（ピーク）と、最後の瞬間（エンド）の印象が、記憶全体の評価を強く支配する。',
      'だから途中の細かな粗より、どこにヤマ場を作り、どう締めくくるかが効く。同じ所要時間でも、終わりが心地よいと、体験全体が「良かった」と記憶されやすい。',
    ],
    tips: [
      '完了・成功の瞬間（エンド）をていねいに演出し、気持ちよく終わらせる。',
      '待ち時間や手続きは、終盤に向けて軽く・速く感じられるよう設計する。',
      'どこか一点に“うれしいピーク”を意図的に作る（さりげない達成感や心地よい反応）。',
    ],
    takeaway: '総時間が同じでも、「終わりがスッと締まる」ほうが心地よく記憶に残る。終わり方が印象を作る。',
    accent: '#b5563f',
    category: 'design',
    Demo: PeakEndDemo,
    ready: true,
  },
  {
    id: 'pareto',
    no: '20',
    slug: 'pareto',
    titleJa: 'パレートの法則',
    titleEn: 'Pareto Principle',
    tagline: '成果の大半は、ごく一部の要素から生まれる（80:20）。',
    description: [
      '多くの場面で、結果のおよそ8割は原因のおよそ2割から生まれる。プロダクトでも、よく使われる機能はごく一部で、その少数が体験の価値の大半を担っていることが多い。',
      'だから全機能に均等に力を注ぐより、“効く2割”を見極めて磨く方が、限られた時間で大きな成果につながる。',
    ],
    tips: [
      '利用データを見て、よく使われる“効く2割”の機能を最優先で磨く。',
      'あまり使われない機能は、隠す・簡素化する・場合により削る。',
      '新機能を足す前に、主要機能の体験が十分かを問い直す。',
    ],
    takeaway: 'ごく一部の要素が価値の大半を生む。“効く2割”に集中するのが効率的。',
    accent: '#0ca678',
    category: 'design',
    Demo: ParetoDemo,
    ready: true,
  },
]
