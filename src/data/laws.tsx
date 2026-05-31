import type { Category, LawMeta } from '../types'
import FakeLinkTrap from '../components/FakeLinkTrap'

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
// 認知バイアス・パック（有料）
import AnchoringDemo from '../laws/anchoring/AnchoringDemo'
import FramingDemo from '../laws/framing/FramingDemo'
import DecoyDemo from '../laws/decoy/DecoyDemo'
import SocialProofDemo from '../laws/social-proof/SocialProofDemo'
import ScarcityDemo from '../laws/scarcity/ScarcityDemo'
import LossAversionDemo from '../laws/loss-aversion/LossAversionDemo'
import SunkCostDemo from '../laws/sunk-cost/SunkCostDemo'
import MereExposureDemo from '../laws/mere-exposure/MereExposureDemo'
import DefaultEffectDemo from '../laws/default-effect/DefaultEffectDemo'
import EndowmentDemo from '../laws/endowment/EndowmentDemo'
import GamblersFallacyDemo from '../laws/gamblers-fallacy/GamblersFallacyDemo'
import AvailabilityDemo from '../laws/availability/AvailabilityDemo'
import HaloDemo from '../laws/halo/HaloDemo'
import ConfirmationDemo from '../laws/confirmation/ConfirmationDemo'

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
      <>
        この性質は便利な反面、危うさもある。
        <FakeLinkTrap>
          リンクでない文字を青字＋下線にすると「押せそう」と誤解される。
        </FakeLinkTrap>
        見た目の類似は、機能の類似だと受け取られるのだ。
      </>,
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
      '視覚情報が不完全でも、脳はそれを最も単純で安定した形に“補って”理解しようとする。欠けた円が3つ並ぶだけで、引かれてもいない三角形が浮かんで見えるのはそのため。',
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
      '桁の多い数字（電話・カード番号）は、区切って表示・入力させる。（例：(012) 345-6789）',
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

/** 有料パックの情報（トップで表示）。 */
export const biasPack = {
  label: '認知バイアス・パック',
  price: '¥980',
  blurb: '人の“判断のクセ”を突く実践集。マーケ・プロダクトにそのまま効く。',
}

/**
 * 認知バイアス・パック（有料 ¥980）。無料の20法則と同じ「型」で構成。
 * 解説・Tips・一言定義はすべて独自記述。
 */
export const biases: LawMeta[] = [
  {
    id: 'anchoring',
    no: '21',
    slug: 'anchoring',
    titleJa: 'アンカリング',
    titleEn: 'Anchoring',
    tagline: '最初に見た数字が、その後の判断の“基準”になる。',
    description: [
      '人は何かを評価するとき、最初に提示された数字（アンカー）を無意識の基準にして、そこから調整して答えを出す。だから最初の数字が高ければ高く、低ければ低く見積もりがちになる。',
      '「定価¥9,800 → ¥4,980」の取り消し線が効くのはこのため。同じ¥4,980でも、高いアンカーがあると“お得”に感じる。',
    ],
    tips: [
      '見せたい価値より高い基準（定価・比較対象）を先に示すと、後の数字が魅力的に見える。',
      'ただし非現実的なアンカーは不信を招く。誠実な比較に留める。',
      'ユーザーに見積もらせる場面では、最初に出す数字（初期値・例示）の影響を意識する。',
    ],
    takeaway: '同じ¥4,980でも、先に高い値段を見せられると「お得」に感じる。最初の数字が基準を作る。',
    accent: '#b5179e',
    category: 'bias',
    Demo: AnchoringDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'framing',
    no: '22',
    slug: 'framing',
    titleJa: 'フレーミング効果',
    titleEn: 'Framing Effect',
    tagline: '同じ事実でも、「言い方」で印象が変わる。',
    description: [
      'まったく同じ内容でも、ポジティブに言うかネガティブに言うかで、受け手の判断は大きく変わる。「成功率90%」と「失敗率10%」は同じなのに、前者の方が選ばれやすい。',
      'だから“何を言うか”だけでなく“どう言うか”が体験を左右する。誠実さを保ちつつ、前向きな枠組みで伝えるのが基本。',
    ],
    tips: [
      '同じ事実は、ユーザーの利益が伝わる前向きな表現を選ぶ（「残り10%」より「90%完了」）。',
      'ネガティブな数字を出すときは、文脈や対処法とセットにする。',
      '誤認を招くフレーミングは避ける。短期的に得でも信頼を失う。',
    ],
    takeaway: '「90%成功」と「10%失敗」は同じ。それでも前者を選ぶ——伝え方が判断を変える。',
    accent: '#d6336c',
    category: 'bias',
    Demo: FramingDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'decoy',
    no: '23',
    slug: 'decoy',
    titleJa: 'おとり効果',
    titleEn: 'Decoy Effect',
    tagline: '“引き立て役”を1つ置くと、狙った選択肢が選ばれる。',
    description: [
      '2択では迷う人も、3つ目に「明らかに見劣りする選択肢（おとり）」を加えると、それと比べて魅力的に見える特定の選択肢を選びやすくなる。',
      '価格プランで“真ん中が一番お得”に見える構成が典型。おとりは、選ばせたい選択肢を引き立てるために置かれる。',
    ],
    tips: [
      '選んでほしいプランの近くに、それより少し劣る比較対象を置くと魅力が際立つ。',
      'おとりは1つに絞る。選択肢を増やしすぎるとヒックの法則で逆効果。',
      'ユーザーを欺く露骨なおとりは避け、納得感のある比較に留める。',
    ],
    takeaway: 'おとりを1つ足すだけで、選ばれる割合が偏る。比較対象が選択を作る。',
    accent: '#1098ad',
    category: 'bias',
    Demo: DecoyDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'social-proof',
    no: '24',
    slug: 'social-proof',
    titleJa: '社会的証明',
    titleEn: 'Social Proof',
    tagline: 'みんなが選ぶものを、人は「正しい」と感じる。',
    description: [
      '自分で判断しづらいとき、人は「他の多くの人の行動」を手がかりにする。レビュー件数、★評価、「人気No.1」「売れ筋」表示が効くのはこのため。',
      '数字や他者の声は迷いを減らし、安心を与える。ただし“やらせ”が露見すると、一気に信頼を失う。',
    ],
    tips: [
      'レビュー件数・利用者数・ランキングなど、信頼できる社会的証明を見せる。',
      '具体的な数字や実名の声ほど効く（「多くの人」より「1,240件・★4.8」）。',
      '証明は本物だけ。捏造・盛りは長期的に最大の損失になる。',
    ],
    takeaway: '同じ商品でも「★4.8・1,240件・人気No.1」が付くと、ぐっと選びたくなる。',
    accent: '#f59f00',
    category: 'bias',
    Demo: SocialProofDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'scarcity',
    no: '25',
    slug: 'scarcity',
    titleJa: '希少性',
    titleEn: 'Scarcity',
    tagline: '「残りわずか」「期間限定」だと、価値が上がって見える。',
    description: [
      '手に入りにくいもの、もうすぐ無くなるものを、人は価値が高いと感じ、欲しくなる。「在庫残り2点」「本日23:59まで」が背中を押すのはこのため。',
      '希少性は強力だが、嘘の煽り（偽のカウントダウン等）は信頼を壊すダークパターンになりやすい。',
    ],
    tips: [
      '本当に限りがあるもの（在庫・期限）は、正直に明示すると行動を後押しできる。',
      '数量・期限はリアルタイムで正確に。偽の希少性は厳禁。',
      '希少性に頼りすぎず、商品本来の価値も伝える。',
    ],
    takeaway: '同じ商品でも「残り2点・本日限り」が付くと、急に欲しくなる。少なさが価値に化ける。',
    accent: '#e8590c',
    category: 'bias',
    Demo: ScarcityDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'loss-aversion',
    no: '26',
    slug: 'loss-aversion',
    titleJa: '損失回避',
    titleEn: 'Loss Aversion',
    tagline: '人は「得」より「損」を、約2倍強く嫌う。',
    description: [
      '同じ金額でも、得る喜びより失う痛みのほうが大きく感じられる。だから「無料お試しが終了します」「ポイントが失効します」という“失う”通知は、強く行動を促す。',
      'この非対称性は選択のリスク態度も変える。得の場面では手堅く、損の場面では一発逆転を狙いがちになる。',
    ],
    tips: [
      '「得られる」より「失う・逃す」を避けたい心理に訴える（ただし誠実に）。',
      '無料期間・保有ポイント・カート保存など、“失いたくないもの”を可視化する。',
      '不安の過剰な煽りは避け、ユーザーの利益に沿わせる。',
    ],
    takeaway: '「+1000円」より「−1000円」が心に重い。だから“失う”が人を動かす。',
    accent: '#5f3dc4',
    category: 'bias',
    Demo: LossAversionDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'sunk-cost',
    no: '27',
    slug: 'sunk-cost',
    titleJa: 'サンクコスト',
    titleEn: 'Sunk Cost Fallacy',
    tagline: 'すでに使った労力やお金が惜しくて、やめられなくなる。',
    description: [
      'これまで注ぎ込んだ時間やお金（取り戻せない＝サンクコスト）が惜しくて、合理的にはやめるべき場面でも続けてしまう。「ここまで来たんだから」は判断を狂わせる。',
      '本来の判断材料は“これからの損得”だけ。過去の投資は、未来の選択には関係ない。',
    ],
    tips: [
      'ユーザーが「もったいない」で不利な選択を続けないよう、いつでも引き返せる導線を用意する。',
      '解約・中断のしやすさは、長期的な信頼につながる（無理な囲い込みの逆）。',
      '自分の設計判断でも、作り込んだ機能への固執がないか問い直す。',
    ],
    takeaway: 'つぎ込むほど「やめる」が難しくなる。でも過去の投資は、未来の判断には無関係。',
    accent: '#c2255c',
    category: 'bias',
    Demo: SunkCostDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'mere-exposure',
    no: '28',
    slug: 'mere-exposure',
    titleJa: '単純接触効果',
    titleEn: 'Mere Exposure Effect',
    tagline: '何度も目にするほど、人はそれを好きになる。',
    description: [
      '特に意味がなくても、繰り返し接した対象に人は親しみと好意を持つ。見慣れたロゴ・色・レイアウトが“なんとなく良い”と感じられるのはこのため。',
      'だから一貫したブランド表現の反復は、じわじわ好意と信頼を育てる。ただし過剰な反復は、飽きや嫌悪に転じることもある。',
    ],
    tips: [
      'ブランドの色・形・トーンを一貫して反復し、見慣れ→好意を育てる。',
      '新要素は、馴染みのある文脈の中に少しずつ載せる（急な刷新は抵抗を生む）。',
      '反復はほどほどに。しつこさは逆効果になりうる。',
    ],
    takeaway: 'よく見たものほど“なんとなく好き”になる。見慣れは、静かに好意を作る。',
    accent: '#1c7ed6',
    category: 'bias',
    Demo: MereExposureDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'default-effect',
    no: '29',
    slug: 'default-effect',
    titleJa: 'デフォルト効果',
    titleEn: 'Default Effect',
    tagline: '初期値（デフォルト）は、たいていそのまま受け入れられる。',
    description: [
      '人は、あらかじめ選ばれている初期値を、わざわざ変えずにそのまま受け入れがち。チェックの有無、初期プラン、初期設定が、最終結果を大きく左右する。',
      'だから「何を初期値にするか」は最重要の設計判断。ただし、ユーザーに不利な初期チェック（勝手にオン）は典型的なダークパターン。',
    ],
    tips: [
      '“多くの人にとって最善”を初期値にする（選ばなくても良い結果になるように）。',
      'ユーザーに不利なオプトイン（メール・課金）を初期ONにしない。',
      '初期値は変更しやすく、何が選ばれているかを明示する。',
    ],
    takeaway: '初期チェックのまま進む人が大多数。初期値は、最も強い“そっと押す力”。',
    accent: '#0c8599',
    category: 'bias',
    Demo: DefaultEffectDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'endowment',
    no: '30',
    slug: 'endowment',
    titleJa: '保有効果',
    titleEn: 'Endowment Effect',
    tagline: '自分のものになると、急に手放したくなくなる。',
    description: [
      '人は、いったん自分の所有物になったものを、持つ前より高く評価する。同じ品でも「売る時の値段」は「買う時に出す値段」より高くなりがち。',
      '無料お試し・マイリスト・カスタマイズで“自分のもの”という感覚を作ると、手放しにくくなる。',
    ],
    tips: [
      '無料体験やお試しで、先に“自分のもの”という感覚を持ってもらう。',
      '保存・カスタマイズ・マイリストなど「自分の」要素を作ると愛着が増す。',
      'ただし解約をわざと難しくするのは逆効果。信頼を損なう。',
    ],
    takeaway: '同じ物でも「売値 ＞ 買値」。持っているだけで価値が上がる。',
    accent: '#f06595',
    category: 'bias',
    Demo: EndowmentDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'gamblers-fallacy',
    no: '31',
    slug: 'gamblers-fallacy',
    titleJa: 'ギャンブラーの誤謬',
    titleEn: "Gambler's Fallacy",
    tagline: '「続いたから、そろそろ逆」と感じてしまう。',
    description: [
      '独立した偶然（コイン・くじ）でも、人は「表が続いたから次は裏」と、過去が未来に影響すると錯覚する。実際には、毎回の確率は変わらない。',
      'この錯覚は、ガチャ・抽選・統計の読み違いを生む。確率は“流れ”ではなく、毎回独立であることを忘れない。',
    ],
    tips: [
      '確率に関わるUI（抽選・ガチャ）では、独立性を誤解させない誠実な表示を。',
      '「そろそろ当たる」と射幸心をあおる演出はダークパターンになりうる。',
      'データを見せるときは、偶然の連続を“傾向”と誤読させないよう注意する。',
    ],
    takeaway: 'コインに記憶はない。何回続こうと、次は毎回50%。',
    accent: '#7048e8',
    category: 'bias',
    Demo: GamblersFallacyDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'availability',
    no: '32',
    slug: 'availability',
    titleJa: '可用性ヒューリスティック',
    titleEn: 'Availability Heuristic',
    tagline: '思い出しやすいことを、「よく起きる」と錯覚する。',
    description: [
      '人は頻度や確率を、事実ではなく「どれだけ簡単に例を思い出せるか」で見積もる。だからニュースで繰り返される派手な出来事は、実際より多く起きていると感じる。',
      '印象の強さが判断を歪める。レビューや事例も、目立つ一件が全体の印象を支配しがち。',
    ],
    tips: [
      '怖い・派手な事例の印象に流されず、実際のデータで判断する。',
      'ユーザーに見せる事例は、印象だけで誤解を生まないよう代表性に配慮する。',
      '“最近見た・よく見る”が「正しい・多い」とは限らないと自戒する。',
    ],
    takeaway: 'ニュースで目立つ出来事ほど“多そう”に錯覚する。印象は頻度ではない。',
    accent: '#4263eb',
    category: 'bias',
    Demo: AvailabilityDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'halo',
    no: '33',
    slug: 'halo',
    titleJa: 'ハロー効果',
    titleEn: 'Halo Effect',
    tagline: '一つの際立った長所が、全体の評価まで底上げする。',
    description: [
      '見た目・肩書き・実績など一つの目立つ長所があると、人はその対象の“それ以外”まで高く評価してしまう。美しいデザインのサービスが「中身も良い」と感じられるのは典型例。',
      '逆に一つの欠点が全体を下げる「逆ハロー」もある。第一印象は、後の評価に長く尾を引く。',
    ],
    tips: [
      '第一印象（見た目・最初の体験）に投資する。後の評価まで押し上げる。',
      '信頼の手がかり（実績・受賞・専門性）を、誠実に分かりやすく示す。',
      'ただし“見た目だけ”で中身が伴わないと、いずれ逆ハローで一気に崩れる。',
    ],
    takeaway: '同じ言葉でも「専門家」の一言で正しく感じる。目立つ長所が全体を染める。',
    accent: '#f08c00',
    category: 'bias',
    Demo: HaloDemo,
    ready: true,
    tier: 'pro',
  },
  {
    id: 'confirmation',
    no: '34',
    slug: 'confirmation',
    titleJa: '確証バイアス',
    titleEn: 'Confirmation Bias',
    tagline: '人は、自分の考えを“裏づける”情報ばかり集める。',
    description: [
      'いったん信念を持つと、人はそれを支持する情報を選び、反証を無視・軽視しがち。だから「自分の仮説は正しい」という確信は、検証なしにどんどん強まってしまう。',
      '作り手にとっては危険な罠。「このデザインで完璧」という思い込みは、反証（実ユーザーの行動）でしか崩せない。',
    ],
    tips: [
      '自分の仮説の“反証”を意識的に探す（賛成意見だけ集めない）。',
      'ユーザーテスト・A/Bテストで、思い込みを実データで検証する。',
      'レビュー依頼では「良い点」だけでなく「ダメな点」も明示的に聞く。',
    ],
    takeaway: '信じていると、賛成の情報ばかり選んでしまう。反証は、意識しないと見えない。',
    accent: '#e03131',
    category: 'bias',
    Demo: ConfirmationDemo,
    ready: true,
    tier: 'pro',
  },
]

/** 無料20＋有料14の全件（スラッグ検索用）。 */
export const allLaws: LawMeta[] = [...laws, ...biases]
