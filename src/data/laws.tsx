import type { Category, LawMeta } from '../types'
import FakeLinkTrap from '../components/FakeLinkTrap'
import Term from '../components/Term'

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
      'わたしたちは、近くにあるものを自然と「仲間」だと感じます。だから、要素の“間隔”を変えるだけで、線や枠がなくても「どれとどれが一組か」が伝わります。',
      '逆に、関係ないものまで近づけると、ひとまとまりに見えて誤解のもとに。余白は“飾り”ではなく、関係性を伝える大事な道具なんです。',
    ],
    tips: [
      '関連する項目（ラベルと入力欄など）は近づけ、別グループとは十分な余白で離す。',
      '区切り線や枠を足す前に、まず“間隔”だけでグループ化できないか考える。',
      '余白をケチらない。詰め込みは関係性を壊し、かえって読みにくくする。',
    ],
    takeaway: '位置はそのまま、間隔を変えるだけで「まとまり」の見え方がガラッと変わります。余白こそが、関係性を語ってくれます。',
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
      '色や形、大きさが似ているもの同士を、わたしたちは「同じ役割の仲間」として結びつけて見ます。離れていても、見た目が似ているだけでグループに見えるんです。',
      <>
        この性質は便利な反面、ちょっと危うさも。
        <FakeLinkTrap>
          リンクでない文字を青字＋下線にすると「押せそう」と勘違いされます。
        </FakeLinkTrap>
        見た目が似ていると、「機能も同じ」だと受け取られてしまうのです。
      </>,
    ],
    tips: [
      '同じ意味・役割のものは見た目をそろえ、違うものははっきり区別する。',
      '押せる要素（ボタン・リンク）と押せない要素のスタイルを明確に分ける。',
      <>
        色だけでグループ分けしない。形・位置も併用する（<Term>色覚多様性</Term>への配慮）。
      </>,
    ],
    takeaway: '色や形をそろえるだけで“仲間”が生まれます。見た目の共通点は、「機能も同じ」だと受け取られます。',
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
      '要素を共通の枠（枠線・背景色・カードなど）で囲むと、それだけで強く「ひとまとまり」だと感じられます。この力は近接よりも強く、少し離れていても、同じ枠の中なら仲間に見えます。',
      'カードUIや、セクションごとの背景分けが効くのはこのためです。枠で囲むことは、「これは仲間です」と一瞬で宣言するようなものなんです。',
    ],
    tips: [
      '関連情報はカードや背景でひとまとめにし、グループの境界を明確にする。',
      '区切りたいときは、間隔だけでなく“領域（枠・背景）”で分けると確実。',
      '枠を多用しすぎると線だらけになる。背景色や余白とも使い分ける。',
    ],
    takeaway: '位置はそのまま、枠で囲むだけで「まとまり」が生まれます。共通領域は、近接よりも強くグループを作ります。',
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
      <>
        見えている情報が欠けていても、脳はそれを「いちばん単純で分かりやすい形」に補って理解しようとします。欠けた円が3つ並ぶだけで、描かれていない三角形が浮かんで見えるのは、このはたらき（<Term>プレグナンツ</Term>）のおかげです。
      </>,
      'だから、単純で整った形ほど速く正しく伝わり、記憶にも残ります。複雑さは脳の負担になり、誤解や見落としのもとになります。',
    ],
    tips: [
      'アイコンやロゴは、できるだけ単純な形に削ぎ落とす。',
      '情報や図は規則的で秩序あるレイアウトにして、読み解く負担を減らす。',
      '装飾的な複雑さより、一目で構造が分かる単純さを優先する。',
    ],
    takeaway: '脳は複雑な形を、いちばん単純な見方にまとめてしまいます。単純さは、速く正しく伝えるための近道です。',
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
      '人がいちど頭に置いておける“かたまり”の数は、だいたい7前後（近ごろは4前後という説も）と言われます。情報を長い羅列のまま見せると、頭からあふれてしまいます。',
      <>
        でも、意味のあるまとまり（<Term>チャンク</Term>）に区切ると、同じ量でもぐっと覚えやすくなります。電話番号やカード番号が区切って書かれているのは、まさにこの工夫です。
      </>,
    ],
    tips: [
      <>
        桁の多い数字（電話・カード番号）は、区切って表示・入力させる。（例：
        <span style={{ whiteSpace: 'nowrap' }}>(012) 345-6789</span>）
      </>,
      'メニューや設定は関連ごとにグループ化し、1グループの項目数を絞る。',
      <>
        「何個まで」と数にこだわりすぎず、意味のまとまり（<Term>チャンク</Term>化）をつくる。
      </>,
    ],
    takeaway: '同じ桁数でも、区切られた数字のほうがずっと思い出しやすくなります。「かたまりに分ける」ことが、記憶を助けてくれます。',
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
      'いくつも項目が並ぶと、人は最初（初頭効果）と最後（新近効果）をよく覚えていて、真ん中は抜け落ちがちです。リストの両端は、いわば“記憶のゴールデンゾーン”です。',
      'だからナビやメニューでは、いちばん大事な項目を端（最初か最後）に置くと記憶に残りやすくなります。埋もれさせたくないものを真ん中に置くのは避けましょう。',
    ],
    tips: [
      '最も重要なメニュー項目やアクションは、並びの先頭か末尾に置く。',
      'ナビゲーションの両端（左端・右端）は目立つので、主要導線を配置する。',
      '「とりあえず真ん中」を避け、優先度で位置を決める。',
    ],
    takeaway: '並びの“両端”は記憶に残り、真ん中は埋もれます。大事なものは、端に置きましょう。',
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
      '似たものが並ぶ中で1つだけ見た目が違うと、そこに強く目が向き、記憶にも残ります。だから、いちばん押してほしいアクションを“目立つ1つ”にすると、視線と行動を自然に導けます。',
      'ただし、目立つ要素を増やしすぎると、お互いに打ち消し合って、結局どれも目立たなくなります。強調は、絞ってこそ効きます。',
    ],
    tips: [
      '最重要アクションは「1画面に1つ」だけ目立たせ、視線を集中させる。',
      <>
        色や形だけに頼らず、サイズ・余白・コントラストも併用する（<Term>色覚多様性</Term>への配慮）。
      </>,
      '強調を乱発しない。目立つものが増えるほど、際立ちは薄れていく。',
    ],
    takeaway: 'たくさんの中で1つだけ違うものは、後からでも思い出せます。「際立ち」が記憶を作ります。',
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
      '人は、終わったことよりも、やりかけ・中断したことのほうをよく覚えていて、ずっと気にかけ続けます。「あと少しで終わる」という状態は、「最後まで終わらせたい」という強い気持ちを生みます。',
      '進捗バーや達成度メーター、「あと1ステップ」表示が効くのは、この効果のおかげです。ただし、未完了をあおりすぎると、ストレスや義務感になってしまうので注意しましょう。',
    ],
    tips: [
      '進捗バーや達成度（プロフィール完成度など）で“あと少し”を見せ、完了を後押しする。',
      '手続きは小さなステップに分け、進んでいる実感を与える。',
      '未完了を“煽る”のではなく、気持ちよく完了に導くことを目指す。',
    ],
    takeaway: '「あと1つ」のやりかけは、人を完成まで引っぱります。進捗を見せることが、行動を後押しします。',
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
      '人が「選ぶ」のにかかる時間は、選択肢が増えるほど長くなります。たくさん並べると親切に見えますが、実際は迷いを生み、離脱や「決定疲れ」につながります。',
      '選択肢をしぼる、少しずつ見せる、おすすめや初期値を用意する——こうした工夫で、選ぶ負担はぐっと軽くできます。',
    ],
    tips: [
      '主要導線の選択肢は厳選し、めったに使わないものは折りたたむか後段に送る。',
      '項目が多いときは“段階的に小出し”にする（例：最初は要点だけ見せ、「もっと見る」で残りを開く）。',
      '推奨・既定値を示し、「考えずに選べる」近道を用意する。',
    ],
    takeaway: '30択は3択よりはっきり遅くなります。選択肢の“数”そのものが、決める速さに効いてきます。',
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
      '人は目的に関係する情報だけを見て、それ以外（広告っぽいもの、いつもの場所のバナーなど）は、気づく前に無意識でふるい落としてしまいます。これが「バナー・ブラインドネス」の正体です。',
      'つまり、“置いてある”ことと“見てもらえる”ことは別物です。大事な情報を広告っぽい見た目や場所に置くと、あることすら気づかれません。',
    ],
    tips: [
      '重要な情報は、広告と区別がつく“素直なコンテンツ”の見た目・位置で置く。',
      '派手な装飾やバナー風の枠で大事な要素を飾らない（逆に無視される）。',
      'ユーザーが探しているもの（目的）の動線上に、必要な情報を置く。',
    ],
    takeaway: '広告っぽい見た目や場所は、置いてあっても素通りされます。大事な情報ほど、“素直に”見せましょう。',
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
      '人は、ゴールが近いと感じるほど「達成したい」という力が強まります。スタンプカードが残りわずかになると急に集めたくなるのは、このためです。',
      '大事なのは“近さの感じ方”です。最初から少し進んだ状態（おまけの一歩）を見せるだけで、ゴールが近く感じられ、最後までやり切る人が増えます（エンダウド・プログレス）。',
    ],
    tips: [
      '進捗を見せ、「ゴールまであと◯」を明示してラストスパートを促す。',
      '最初の一歩を“すでに済み”の状態で見せる（例：10個中2個プレゼント済み）。',
      '達成の直前は、手間や障害を減らして一気に終わらせてあげる。',
    ],
    takeaway: 'ゴールが近いほど、人は加速します。“最初の一歩”を渡してあげるだけで、やり切る人は増えます。',
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
      '使える時間が長いほど、作業はその時間を使い切るまで自然とふくらみます。締め切りが遠いと、本当はすぐ終わることも、ついダラダラ続いてしまうものです。',
      '裏を返せば、少し短めの締め切りを設けたり、手間そのものを減らしたりすれば、作業はぐっと速く片づきます。',
    ],
    tips: [
      'フォームや手続きは“必要な時間・手数”そのものを減らす（自動入力・初期値）。',
      '現実的で少し短めの締め切りや制限時間で、ダラダラを防ぐ。',
      '完了までの手数を見せ、「すぐ終わる」と感じさせて先延ばしを防ぐ。',
    ],
    takeaway: '時間を与えるほど、作業はふくらみます。手数と“余白”を減らせば、サッと終わります。',
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
      '的にたどり着くまでの時間は、的が遠いほど、また小さいほど長くなります。指やカーソルは「狙って動かす」動作なので、小さくて離れた的ほど、時間も押し間違いも増えます。',
      '逆に、よく使うボタンを大きく、手元（親指の届く範囲）に置けば、操作は速く快適になります。画面の端や角は、カーソルがそこで止まるので、いわば“はみ出さない大きな的”として使えます。',
    ],
    tips: [
      '主要アクションのボタンは十分大きく（最低44px）、関連する操作はまとめて近くに置く。',
      'スマホでは重要操作を画面下部＝親指の自然な可動域に配置する。',
      '削除など危険な操作はあえて小さく・離して置き、フィッツを“逆用”して誤操作を防ぐ。',
    ],
    takeaway: '同じ「押す」でも、小さくて遠い的は明らかに時間がかかります。大きさと距離が、操作の速さと正確さを決めます。',
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
      '画面の反応がおおむね0.4秒以内に返ると、人は「待っている」という感覚から解放され、テンポよく作業に集中できます。反応が遅れるほど集中は途切れ、イライラや離脱が増えていきます。',
      <>
        本当に速くは処理できない場面でも、押した瞬間の<Term>フィードバック</Term>（反応・<Term>スケルトン</Term>表示・<Term>楽観的更新</Term>）で“速い”と感じてもらうことが大切です。
      </>,
    ],
    tips: [
      '主要操作の反応は0.4秒以内を目標にする。体感速度がそのまま満足度を左右する。',
      '時間のかかる処理は、押した瞬間に何か反応を返す（ローディング・スケルトン・楽観的更新）。',
      '進捗や残りを見せ、「ちゃんと動いている」ことを伝えて不安と体感待ち時間を減らす。',
    ],
    takeaway: '0.4秒を超えると、とたんに“待たされてる感”が出ます。すぐ反応すること自体が、快適さを作ります。',
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
      'ユーザーは1日の大半を、“あなた以外”のサービスで過ごしています。そこで身についた操作のクセ——ロゴを押せばトップに戻る、カートは右上にある、といった期待——を、初めて来たあなたのサイトにもそのまま持ち込みます。',
      'だから、世間の“お決まり”に沿ったUIほど、覚え直す手間がほぼゼロになります。奇抜なだけのUIは「使い方を覚え直す」負担を強います。個性はコンテンツや世界観で出し、操作の作法は標準に寄せるのが賢いやり方です。',
    ],
    tips: [
      'ロゴは左上でホームに戻る、検索は上部、購入ボタンは目立つ色——定番の配置はあえて踏襲する。',
      '「新しさ」は見た目やコンテンツで出し、基本操作の作法までは奇抜にしない。',
      '慣習を破るなら、それを上回る明確な利点と、ていねいな案内をセットにする。',
    ],
    takeaway: '「見慣れた配置」のほうが、目的の操作を圧倒的に速く見つけられます。お決まりに乗ることが、いちばん速い“慣れてもらい方”です。',
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
      'ユーザーの入力は、どうしてもばらつくものです。全角と半角、ハイフンのあるなし、前後の空白——それを「間違い」として弾くのではなく、受け取れる範囲で受け取って、こちら側で整えてあげます。',
      '入り口は広く受け止めつつ、中で扱うデータはきっちり統一した形に整える。この「入力にはやさしく、内部にはきびしく」が、使い心地と堅牢さを両立させます。',
    ],
    tips: [
      '表記ゆれ（全角数字・空白・記号）は弾かず、自動で整形・正規化して受理する。',
      'エラーで突き返す前に「こちらで直せないか」をまず考える。',
      '受理はゆるく、しかし保存・送信するデータ形式は厳密に統一する。',
    ],
    takeaway: '雑に入れても正しく整う入力欄は、ユーザーに余計なことを考えさせません。受け止めるやさしさが、そのまま使いやすさになります。',
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
      'ある仕組みがもともと持っている複雑さは、ゼロにはできません。変えられるのは「誰がそれを引き受けるか」だけ。アプリ側が複雑さを引き受ければユーザーは楽になり、手を抜けば、そのしわ寄せはユーザーへいきます。',
      '良い設計は、面倒な処理（自動補完・推測・整形）をできるだけシステム側で引き受け、ユーザーの手間を肩代わりします。',
    ],
    tips: [
      '自動入力・推測・初期値で、ユーザーが負う複雑さを肩代わりする。',
      '「これは本当にユーザーに入力させる必要があるか？」を常に問い直す。',
      '削れない複雑さは、せめて分かりやすい形に整理してから提示する。',
    ],
    takeaway: '同じ作業でも、アプリが肩代わりするほどユーザーの手数は減ります。複雑さは消えず、“どちらが持つか”が動くだけです。',
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
      '人は、整って美しいデザインを、たとえ機能が同じでも「使いやすそう」「信頼できる」と感じやすいものです。美しさは第一印象の信頼を生み、ちょっとした使いにくさを許してもらえる“クッション”にもなります。',
      <>
        ただし、見た目だけで中身の問題を隠しきれるわけではありません。土台の<Term>ユーザビリティ</Term>があってこその効果だと心得ておきましょう。
      </>,
    ],
    tips: [
      '余白・配色・タイポグラフィをていねいに整え、第一印象の信頼を獲得する。',
      '美しさで“ごまかす”のではなく、使いやすさの土台の上に美を載せる。',
      'ユーザビリティテストでは、見た目の良さが問題を覆い隠していないか注意する。',
    ],
    takeaway: '機能が同じでも、整ったUIのほうが「信頼できる・使いやすい」と感じられます。見た目も、体験の一部なんです。',
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
      '人は、出来事の全部を平均して覚えているわけではありません。いちばん感情が動いた瞬間（ピーク）と、最後の瞬間（エンド）の印象が、記憶全体の評価を大きく左右します。',
      'だから、途中の細かなアラよりも、「どこにヤマ場を作り、どう締めくくるか」が効いてきます。同じ所要時間でも、終わりが心地よいと、体験全体が「良かった」と記憶されやすくなります。',
    ],
    tips: [
      '完了・成功の瞬間（エンド）をていねいに演出し、気持ちよく終わらせる。',
      '待ち時間や手続きは、終盤に向けて軽く・速く感じられるよう設計する。',
      'どこか一点に“うれしいピーク”を意図的に作る（さりげない達成感や心地よい反応）。',
    ],
    takeaway: '同じ所要時間でも、「終わりがスッと締まる」ほうが心地よく記憶に残ります。終わり方が、印象を作ります。',
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
      '多くの場面で、結果のおよそ8割は、原因のおよそ2割から生まれます。プロダクトでも、よく使われる機能はごく一部で、その少数が体験の価値の大半を支えていることが多いのです。',
      'だから、すべての機能に均等に力を注ぐより、“効く2割”を見きわめて磨くほうが、限られた時間で大きな成果につながります。',
    ],
    tips: [
      '利用データを見て、よく使われる“効く2割”の機能を最優先で磨く。',
      'あまり使われない機能は、隠す・簡素化する・場合により削る。',
      '新機能を足す前に、主要機能の体験が十分かを問い直す。',
    ],
    takeaway: 'ごく一部の要素が、価値の大半を生みます。“効く2割”に集中するのが、いちばん効率的です。',
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
      <>
        人は何かを評価するとき、最初に見せられた数字（<Term>アンカー</Term>）を無意識のうちに基準にして、そこから少し調整して答えを出します。だから、最初の数字が高ければ高めに、低ければ低めに見積もってしまいます。
      </>,
      '「定価¥9,800 → ¥4,980」の取り消し線が効くのは、このためです。同じ¥4,980でも、先に高い数字を見ていると“お得”に感じます。',
    ],
    tips: [
      '見せたい価値より高い基準（定価・比較対象）を先に示すと、後の数字が魅力的に見える。',
      'ただし非現実的なアンカーは不信を招く。誠実な比較に留める。',
      'ユーザーに見積もらせる場面では、最初に出す数字（初期値・例示）の影響を意識する。',
    ],
    takeaway: '同じ¥4,980でも、先に高い値段を見せられると「お得」に感じます。最初の数字が、判断の基準を作るのです。',
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
      'まったく同じ内容でも、前向きに言うか・後ろ向きに言うかで、受け手の判断は大きく変わります。「成功率90%」と「失敗率10%」は同じ意味なのに、前者のほうが選ばれやすいのです。',
      'だから、“何を言うか”だけでなく“どう言うか”が体験を左右します。誠実さは保ちつつ、前向きな言い方で伝えるのが基本です。',
    ],
    tips: [
      '同じ事実は、ユーザーの利益が伝わる前向きな表現を選ぶ（「残り10%」より「90%完了」）。',
      'ネガティブな数字を出すときは、文脈や対処法とセットにする。',
      '誤認を招くフレーミングは避ける。短期的に得でも信頼を失う。',
    ],
    takeaway: '「90%成功」と「10%失敗」は同じこと。それでも前者を選んでしまう——伝え方が、判断を変えます。',
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
      '2択では迷う人も、3つ目に「明らかに見劣りする選択肢（おとり）」を足すと、それと比べて魅力的に見える選択肢を選びやすくなります。',
      '価格プランで“真ん中がいちばんお得”に見える構成が、その典型です。おとりは、選ばせたい選択肢を引き立てるために置かれます。',
    ],
    tips: [
      '選んでほしいプランの近くに、それより少し劣る比較対象を置くと魅力が際立つ。',
      'おとりは1つに絞る。選択肢を増やしすぎるとヒックの法則で逆効果。',
      'ユーザーを欺く露骨なおとりは避け、納得感のある比較に留める。',
    ],
    takeaway: 'おとりを1つ足すだけで、選ばれる割合が偏ります。比べる相手が、選択を作るのです。',
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
      '自分では判断しづらいとき、人は「ほかの多くの人の行動」を手がかりにします。レビュー件数や★評価、「人気No.1」「売れ筋」表示が効くのは、このためです。',
      '数字や他の人の声は、迷いを減らして安心を与えます。ただし、“やらせ”がバレると、信頼を一気に失います。',
    ],
    tips: [
      'レビュー件数・利用者数・ランキングなど、信頼できる社会的証明を見せる。',
      '具体的な数字や実名の声ほど効く（「多くの人」より「1,240件・★4.8」）。',
      '証明は本物だけ。捏造・盛りは長期的に最大の損失になる。',
    ],
    takeaway: '同じ商品でも「★4.8・1,240件・人気No.1」が付くと、ぐっと選びたくなります。',
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
      '手に入りにくいものや、もうすぐ無くなるものを、人は「価値が高い」と感じて欲しくなります。「在庫残り2点」「本日23:59まで」が背中を押すのは、このためです。',
      <>
        希少性は強力ですが、嘘のあおり（偽のカウントダウンなど）は信頼を壊す<Term>ダークパターン</Term>になりがちです。
      </>,
    ],
    tips: [
      '本当に限りがあるもの（在庫・期限）は、正直に明示すると行動を後押しできる。',
      '数量・期限はリアルタイムで正確に。偽の希少性は厳禁。',
      '希少性に頼りすぎず、商品本来の価値も伝える。',
    ],
    takeaway: '同じ商品でも「残り2点・本日限り」が付くと、急に欲しくなります。少なさが、価値に化けるのです。',
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
      '同じ金額でも、得る喜びより、失う痛みのほうが大きく感じられます。だから「無料お試しが終了します」「ポイントが失効します」といった“失う”お知らせは、強く行動を促します。',
      'この偏りは、選ぶときのリスクの取り方も変えます。得する場面では手堅く、損する場面では一発逆転を狙いがちになります。',
    ],
    tips: [
      '「得られる」より「失う・逃す」を避けたい心理に訴える（ただし誠実に）。',
      '無料期間・保有ポイント・カート保存など、“失いたくないもの”を可視化する。',
      '不安の過剰な煽りは避け、ユーザーの利益に沿わせる。',
    ],
    takeaway: '「+1000円」より「−1000円」のほうが、心にずっしり重い。だから“失う”が、人を動かします。',
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
      <>
        これまで注ぎ込んだ時間やお金（取り戻せない＝<Term>サンクコスト</Term>）が惜しくて、やめたほうがいい場面でも、つい続けてしまいます。「ここまで来たんだから」という気持ちが、判断を狂わせます。
      </>,
      '本当に考えるべきは“これからの損得”だけ。過去に使った分は、これからの選択には関係ありません。',
    ],
    tips: [
      'ユーザーが「もったいない」で不利な選択を続けないよう、いつでも引き返せる導線を用意する。',
      '解約・中断のしやすさは、長期的な信頼につながる（無理な囲い込みの逆）。',
      '自分の設計判断でも、作り込んだ機能への固執がないか問い直す。',
    ],
    takeaway: 'つぎ込むほど「やめる」が難しくなります。でも、過去に使った分は、これからの判断には関係ないのです。',
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
      'とくに意味がなくても、何度も接したものに、人は親しみと好意を持ちます。見慣れたロゴ・色・レイアウトが“なんとなく良い”と感じられるのは、このためです。',
      'だから、一貫したブランド表現をくり返すと、じわじわ好意と信頼が育ちます。ただし、やりすぎると、飽きや嫌悪に変わることもあります。',
    ],
    tips: [
      'ブランドの色・形・トーンを一貫して反復し、見慣れ→好意を育てる。',
      '新要素は、馴染みのある文脈の中に少しずつ載せる（急な刷新は抵抗を生む）。',
      '反復はほどほどに。しつこさは逆効果になりうる。',
    ],
    takeaway: 'よく見たものほど“なんとなく好き”になります。見慣れることが、静かに好意を育てます。',
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
      '人は、あらかじめ選ばれている初期値を、わざわざ変えずにそのまま受け入れがちです。チェックのあるなし、初期プラン、初期設定が、最終的な結果を大きく左右します。',
      <>
        だから「何を初期値にするか」は、とても重要な設計判断です。ただし、ユーザーに不利な初期チェック（勝手にオン）は、典型的な<Term>ダークパターン</Term>です。
      </>,
    ],
    tips: [
      '“多くの人にとって最善”を初期値にする（選ばなくても良い結果になるように）。',
      'ユーザーに不利なオプトイン（メール・課金）を初期ONにしない。',
      '初期値は変更しやすく、何が選ばれているかを明示する。',
    ],
    takeaway: '初期チェックのまま進む人が大多数です。初期値は、いちばん強く“そっと背中を押す力”です。',
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
      '人は、いちど自分のものになったものを、持つ前より高く評価します。同じ品でも「売るときの値段」は「買うときに出す値段」より高くなりがちです。',
      '無料お試し・お気に入り登録・カスタマイズなどで“自分のもの”という感覚が生まれると、手放しにくくなります。',
    ],
    tips: [
      '無料体験やお試しで、先に“自分のもの”という感覚を持ってもらう。',
      '保存・カスタマイズ・マイリストなど「自分の」要素を作ると愛着が増す。',
      'ただし解約をわざと難しくするのは逆効果。信頼を損なう。',
    ],
    takeaway: '同じ物でも「売値 ＞ 買値」になりがち。持っているだけで、価値が上がって見えるのです。',
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
      'コインやくじのように毎回が独立した偶然でも、人は「表が続いたから次は裏」と、過去が未来に影響すると錯覚します。でも実際は、毎回の確率は変わりません。',
      'この錯覚は、ガチャや抽選、統計の読み違いを生みます。確率は“流れ”ではなく、毎回それぞれ独立、ということを忘れないようにしましょう。',
    ],
    tips: [
      '確率に関わるUI（抽選・ガチャ）では、独立性を誤解させない誠実な表示を。',
      '「そろそろ当たる」と射幸心をあおる演出はダークパターンになりうる。',
      'データを見せるときは、偶然の連続を“傾向”と誤読させないよう注意する。',
    ],
    takeaway: 'コインに記憶はありません。何回続こうと、次もやっぱり50%です。',
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
      <>
        人は出来事の多さや確率を、事実ではなく「どれだけ例を思い出しやすいか」で見積もりがちです。これも
        <Term>ヒューリスティック</Term>の一つ。だから、ニュースで繰り返し見る派手な出来事ほど、実際より多く起きていると感じてしまいます。
      </>,
      '印象の強さが、判断をゆがめます。レビューや事例も、目立つ一件が全体の印象を支配しがちです。',
    ],
    tips: [
      '怖い・派手な事例の印象に流されず、実際のデータで判断する。',
      'ユーザーに見せる事例は、印象だけで誤解を生まないよう代表性に配慮する。',
      '“最近見た・よく見る”が「正しい・多い」とは限らないと自戒する。',
    ],
    takeaway: 'ニュースで目立つ出来事ほど“多そう”に錯覚します。強い印象は、起きやすさとは別物です。',
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
      '見た目・肩書き・実績など、一つでも目立つ長所があると、人はその“それ以外”まで高く評価してしまいます。美しいデザインのサービスが「中身も良さそう」と感じられるのは、その典型です。',
      '逆に、一つの欠点が全体の印象を下げる「逆ハロー」もあります。第一印象は、その後の評価に長く尾を引きます。',
    ],
    tips: [
      '第一印象（見た目・最初の体験）に投資する。後の評価まで押し上げる。',
      '信頼の手がかり（実績・受賞・専門性）を、誠実に分かりやすく示す。',
      'ただし“見た目だけ”で中身が伴わないと、いずれ逆ハローで一気に崩れる。',
    ],
    takeaway: '同じ言葉でも「専門家」のひと言で、急に正しく感じます。目立つ長所が、全体の印象まで染めるのです。',
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
      'いちど「こうだ」と思い込むと、人はそれを支持する情報ばかり選び、反対の証拠を見落としがちです。だから「自分の考えは正しい」という確信は、確かめないまま、どんどん強まってしまいます。',
      '作り手にとっては、こわい罠です。「このデザインで完璧」という思い込みは、反対の証拠（＝実際のユーザーの行動）でしか崩せません。',
    ],
    tips: [
      '自分の仮説の“反証”を意識的に探す（賛成意見だけ集めない）。',
      'ユーザーテスト・A/Bテストで、思い込みを実データで検証する。',
      'レビュー依頼では「良い点」だけでなく「ダメな点」も明示的に聞く。',
    ],
    takeaway: '信じていると、賛成してくれる情報ばかり選んでしまいます。反対の証拠は、意識して探さないと見えてきません。',
    accent: '#e03131',
    category: 'bias',
    Demo: ConfirmationDemo,
    ready: true,
    tier: 'pro',
  },
]

/** 無料20＋有料14の全件（スラッグ検索用）。 */
export const allLaws: LawMeta[] = [...laws, ...biases]
