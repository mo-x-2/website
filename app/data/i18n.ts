export type Locale = 'en' | 'ja'

export type LocalizedString = { en: string; ja: string }

export function t(value: LocalizedString, locale: Locale): string {
  return value[locale]
}

export const ui = {
  hero: {
    line1Prefix: {
      en: "Hi. I am a Master's student at",
      ja: "こんにちは。",
    },
    line1Suffix: {
      en: ", The University of Tokyo.",
      ja: "所属、東京大学の修士課程に在籍しています。",
    },
    line2: {
      en: "My research interests include HCI, HAI, and HRI.",
      ja: "HCI・HAI・HRI を中心に研究しています。",
    },
  },
  about: {
    title: { en: "About Me", ja: "About Me" },
    bio: {
      en: "I was born in Osaka and earned my bachelor's degree at Nagoya University, where I studied the fundamentals of computer science with a major in robotics. Currently, I am pursuing a master's degree at The University of Tokyo while on an exchange program at the University of Sydney. My research focuses on the nature of communication between humans and artificial agents. I am deeply interested in how we perceive, feel, and interact with entities like robots and virtual agents. Ultimately, I want to explore how we can establish a meaningful coexistence between humans and technology.",
      ja: "大阪出身で、名古屋大学でロボティクスを専攻しつつコンピュータサイエンスの基礎を学び、学士号を取得しました。現在は東京大学の修士課程に在籍し、シドニー大学への交換留学も経験しています。研究では、人と人工エージェントとのコミュニケーションのあり方に焦点を当てています。ロボットやバーチャルエージェントといった存在を、人がどのように知覚し、感じ、関わり合うかに強い関心があり、最終的には人とテクノロジーが意味あるかたちで共存できる道を探っていきたいと考えています。",
    },
    interestsTitle: { en: "Personal Interests", ja: "Personal Interests" },
    interests: {
      en: "I have a profound curiosity for human-centric culture—music, film, and manga—as well as the diverse expressions I encounter through my travels in the world. To me, technology is an extension of this creativity. I am driven by its power to turn the \"impossible\" into \"the everyday,\" moving people’s emotions and reshaping our world in the process.",
      ja: "音楽、映画、漫画といった、人の感情が結晶化した「文化」のすべてに深い敬意と好奇心を抱いています。特に海外へ足を運ぶ際、その土地の文脈で生まれる表現に触れることは、私にとって欠かせないライフワークです。そうした「人が作るもの」への関心の延長線上に、私はテクノロジーを位置づけています。テクノロジーには、不可能を可能にする力があり、それが人々の生活や感情を揺さぶり、やがて「新しい日常」として溶け込んでいく。そのダイナミックな変容のプロセスに、私は何よりも魅力を感じています。",
    },
  },
  projects: {
    title: { en: "Projects", ja: "Projects" },
    tags: {
      Research: { en: "Research", ja: "研究" },
      Project: { en: "Project", ja: "プロジェクト" },
      Work: { en: "Work", ja: "作品" },
    } as Record<string, LocalizedString>,
  },
  background: {
    title: { en: "Background", ja: "Background" },
    courses: [
      {
        date: { en: "Apr 2020 - Mar 2024", ja: "2020/4 - 2024/3" },
        title: { en: "B.C. at Nagoya University", ja: "名古屋大学 学士" },
        dept: { en: "Department of Computer Science", ja: "情報学部 コンピュータ科学科" },
        lab: { en: "Nagao Laboratory", ja: "長尾研究室" },
      },
      {
        date: { en: "Aug 2025 - Jul 2026", ja: "2025/8 - 2026/7" },
        title: {
          en: "Studying Abroad at The University of Sydney",
          ja: "シドニー大学 留学",
        },
        description: { en: "Exchange Program", ja: "交換留学プログラム" },
      },
      {
        date: {
          en: "Apr 2024 - Mar 2027(Expected)",
          ja: "2024/4 - 2027/3（予定）",
        },
        title: { en: "M.S. at The University of Tokyo", ja: "東京大学 修士" },
        dept: { en: "III/GSII", ja: "学際情報学府" },
        lab: { en: "Ishiguro Laboratory", ja: "石黒研究室" },
      },
    ],
    showMore: { en: "Show More", ja: "もっとみる" },
    showLess: { en: "Show Less", ja: "とじる" },
    publications: { en: "Publications", ja: "論文・発表" },
    conferencePapers: { en: "Conference Papers", ja: "国際会議論文" },
    thesis: { en: "Thesis", ja: "学位論文" },
    extracurricular: { en: "Extracurricular Activities", ja: "課外活動" },
    internationalExperience: { en: "International Experience", ja: "国際経験" },
    internationalItems: {
      en: "・Exchange Student, University of Sydney (Australia, Aug 2025 - Jul 2026)\n・Selected participant, Women in Cybersecurity Program (University of North Carolina at Chapel Hill, U.S., 2 weeks, September 2023)\n・Participant, CuriousU Summer School (University of Twente, Netherlands, 2 weeks, August 2022)\n・Selected participant, Osaka Prefectural Global Leaders High School Short-term Training Program (California, the U.S., 2 weeks, August 2018)",
      ja: "・交換留学生、シドニー大学（オーストラリア、2025年8月 - 2026年7月）\n・選抜参加、Women in Cybersecurity Program（ノースカロライナ大学チャペルヒル校、米国、2週間、2023年9月）\n・参加、CuriousU Summer School（トゥウェンテ大学、オランダ、2週間、2022年8月）\n・選抜参加、大阪府立グローバルリーダーズ高校 短期研修プログラム（カリフォルニア、米国、2週間、2018年8月）",
    },
    certification: { en: "Certification", ja: "資格" },
    certificationItems: {
      en: "・Feb 2025 - IELTS 6.5\n・Apr 2023 - TOEIC 875\n・Dec 2022 - Applied Information Technology Engineer Examination\n・Nov 2021 - Fundamental Information Technology Engineer Examination",
      ja: "・2025/2 - IELTS 6.5\n・2023/4 - TOEIC 875\n・2022/12 - 応用情報技術者試験\n・2021/11 - 基本情報技術者試験",
    },
  },
  gallery: {
    title: { en: "Photo Gallery", ja: "Photo Gallery" },
  },
  modal: {
    with: { en: "With", ja: "With" },
    viewCode: { en: "View Code", ja: "View Code" },
    viewProject: { en: "View Project", ja: "View Project" },
    back: { en: "← Back to Projects", ja: "← Back to Projects" },
    tag: { en: "Type", ja: "Type" },
    period: { en: "Period", ja: "Period" },
    team: { en: "Team", ja: "Team" },
    overview: { en: "Overview", ja: "Overview" },
  },
} as const

export type ProjectLocaleContent = {
  company?: string
  overview: string
  features?: { title: string; description: string }[]
}

export const PROJECT_LOCALE: Record<number, { ja: ProjectLocaleContent }> = {
  8: {
    ja: {
      company: "東京大学 石黒研究室",
      overview:
        "「RecallMe」は、「過去の自分」との対話を通じた自己内省を探る体験デザインプロジェクトです。デジタルデバイスが極端な効率と速度を優先する時代において、深い内省は使い捨て的なデジタル交流によって妨げられがちです。これに対し、RecallMeはビンテージの回転式電話を「儀式的なインターフェース」として用います。受話器の重さやダイヤルの待ち時間といった身体的な摩擦を意図的に設計することで、AIとの対話を意味ある儀式として位置づけます。この身体的なフレーミングが、生成AIと人の感情のあいだを橋渡しし、個人的な物語を安全に再構築することを支えます。",
      features: [
        {
          title: "インタラクション",
          description:
            "インタラクションは深い没入のための4段階の儀式として設計されています。ユーザーが受話器を取り上げてダイヤルすると、日常から内省の状態へと移行します。AIオペレーターの案内のもと、声クローンされた過去の自分との対話が行われます。この設定により、ユーザーは成熟した現在の視点から過去の葛藤と向き合い、物語を再解釈したうえで、受話器を置くことで体験を締めくくります。",
        },
        {
          title: "システム",
          description:
            "ビンテージのModel 800回転式電話と生成AIパイプラインを統合しています。内部のESP32がフックスイッチとパルスダイヤルを監視し、ホストPC上のソフトウェアシーケンスを起動します。音声パイプラインはWhisper APIによる文字起こし、LLMによるキャラクター構築、ElevenLabsによる声クローンを用います。リアリティを高めるため、ユーザーの年齢に応じてピッチを調整し、受話器の音響特性を通して自然に響く声になるよう設計しています。",
        },
        {
          title: "動機",
          description:
            "手紙を書く習慣は、過去や未来の自分と出会う行為のように感じられ、痛みと喜びが入り混じった感情を呼び起こしてきました。従来のメディアは時間を超えて痕跡を残せますが、一方通行にとどまります。私はこの不可能性を超え、リアルタイムで身体性のある対話を作りたかったのです。「分人」——関係性によって形づくられる複数の真の自己からなるという考え——に導かれ、それは空間だけでなく時間にも広がると捉えています。RecallMeは、傷ついた過去の「分人」を現在の自分が慰めるような、深い自己内省と癒しを促すために生まれました。",
        },
      ],
    },
  },
  7: {
    ja: {
      company: "シドニー大学 ユニットプロジェクト",
      overview:
        "シドニー大学の「Pervasive Computing」ユニットで、SF技術の機能をシミュレートするという課題に着想を得て、「Ben 10 Watch」——意思でさまざまなエイリアンに変身できるSFデバイス——のプロトタイプを制作しました。既存の変身玩具が外見の再現にとどまりがちなのに対し、本プロジェクトは装着者の生理状態や身体動作に応答する真の「インタラクティブな変身」の実装を目指しました。内なる高揚や動きが衣服の視覚変化としてリアルタイムに表れるデジタルクロージングのプロトタイプを開発し、大学のショーケースでインタラクティブ展示として発表しました。",
      features: [
        {
          title: "インタラクション",
          description:
            "心拍センサが高覚醒（BPM > 90）を検出すると、サーボモータでウォッチフェイスが物理的にポップアップし、身体的な「変身」の瞬間をつくります。触覚的なロータリーエンコーダでエイリアンモードを選び、変身ポーズが衣服上の動的なLEDアニメーションにリアルタイムでマッピングされます。",
        },
        {
          title: "システム",
          description:
            "2台のESP32が変身シーケンスを同期します。Watchユニットが心拍センサで起動し、ロータリーエンコーダでエイリアン選択を管理し、IMUデータからジェスチャをオンデバイスMLで分類します。制御データはBluetooth経由でMantleユニットへ送られ、選択モードと動きに応じてLEDの色とパターンが動的に更新されます。",
        },
        {
          title: "ショーケース",
          description:
            "シドニー大学のショーケースで発表し、来場者が選択とジェスチャのシーケンスを体験し、衣服が即座に反応する様子を確認しました。SFファン、とりわけ少年たちがこうした技術が現実になることに興奮する姿を見られたことが特に印象的でした。",
        },
      ],
    },
  },
  6: {
    ja: {
      company: "個人制作",
      overview:
        "AwaseKagami（逢鏡）は、離れていても「偶然の出会い」を可能にする新しいコミュニケーション媒体です。双方が同じ瞬間に鏡を覗き込んだときだけ相手が表示され、一方向の通知や既読確認ではなく、同期とセレンディピティだけに基づくつながりをつくります。人物検出モデルと映像通信を組み合わせ、双方が同時に鏡を覗いたときだけ相手の映像を表示します。音声接続はなく、視線の重なりだけによる非言語的なやりとりが、思いがけない再会の喜びを日常に運び、遠方の大切な人との関係をやさしく保ちます。",
      features: [
        {
          title: "コンセプト",
          description:
            "現代のグローバル社会では物理的・心理的距離が広がり、孤立が増しています。既存のコミュニケーション媒体は既読や通知により意図の一方向的な可視化を強い、義務感や監視の感覚を生みます。一方、偶然の出会いは期待を押し付けることなく驚きと喜びをもたらし、再びつながる機会を与えます。AwaseKagamiは、大きな距離を超えてそうしたセレンディピティを再現するために設計しました。",
        },
        {
          title: "システム",
          description:
            "Node.jsサーバとSocket.IOで2つの分散した鏡のあいだのリアルタイムシグナリングを管理し、同期接続をつくります。サーバがちょうど2つのアクティブ接続を検出すると、WebRTC P2Pで直接映像ストリームを開始します。クライアント側ではTensorFlow.jsベースの顔検出が約150msごとに存在を監視し、ローカル状態・リモート状態・アクティブなWebRTCストリームがすべて「双方が同時に鏡を覗いている」ことを確認したときだけ、黒画面からフルスクリーンの遠隔映像へ切り替えます。",
        },
      ],
    },
  },
  5: {
    ja: {
      company: "株式会社電通 インターンシッププロジェクト",
      overview:
        "買い物中に店員に声をかけられて居心地が悪くなったことはありませんか？私たちは、内気さや社会不安を抱える人を支えるエージェントとしてRemora Barretteを作りました。ヘッドホンや有線イヤホンがしばしば示す「話しかけないで」という非言語的なサインに着想を得て、このウェアラブルは近づいてほしくないという意図をやさしく伝えます。店員の端末が近づくとバレッタがほんのり光り、「今はちょっと」と温かみのある非言語のメッセージを届けます。",
      features: [
        {
          title: "インスピレーション",
          description:
            "小判鮫が他の魚にくっつくことに着想を得て、それを模したウェアラブルアクセサリーが作れないかと考えました。他人に伝えにくい断りの意図を小判鮫が仲介してくれるような、ウェアラブルエージェントを模索しました。",
        },
        {
          title: "カラーバリエーション",
          description:
            "ユーザーの好みや服装に合わせられるよう、さまざまなカラーバリエーションを検討し、親しみやすく個性的なデザインを探りました。",
        },
        {
          title: "内部構造",
          description:
            "身につけられるほど小さく、愛着が持てるほどかわいいウェアラブルを開発しました。スマートフォンをビーコン化し、搭載したESP32でその信号を検出することで、近くの端末に反応する遊び心のあるコンパクトなデバイスにしています。",
        },
      ],
    },
  },
  4: {
    ja: {
      company: "東京大学 石黒研究室",
      overview:
        "人とエージェントのインタラクションにおいて、音声言語インタフェースは認知負荷の高さや騒音環境での実用性の低下といった課題を抱えがちです。意味内容を持たない非言語音であるSemantic-Free Utterances（SFUs）は、その緩和策として有望です。しかし既存手法は、リアルタイムで文脈に応じたSFU応答の生成という核心課題にほとんど取り組んでいません。ParaTalkは、大規模言語モデルでユーザーの発話を解釈し、SFUの一種であるParalinguistic Utterances（PUs）をリアルタイム生成するパラ言語対話システムです。感情状態と意図表現を動的に組み合わせて適切な応答を生成し、移動ロボット上のデモを通じて、言語・非言語コミュニケーションの可能性とエージェント対話インタフェース設計の指針を探ります。",
      features: [
        {
          title: "コンセプト",
          description:
            "ParaTalkは、人の言語（バーバル）とロボットの非言語のあいだの対話を可能にする基盤アーキテクチャを提案します。",
        },
        {
          title: "システムフロー",
          description:
            "ユーザーが言語で話し、システムが大規模言語モデルで解釈します。感情状態と意図表現に基づきParalinguistic Utterance（PU）を生成し、ロボットがPUで応答します。",
        },
      ],
    },
  },
  3: {
    ja: {
      company: "松尾・岩澤研究室 Showcaseチームプロジェクト",
      overview:
        "高性能シミュレーション環境Isaac Gymを用い、強化学習で四足ロボットを訓練し、複雑なパルクール的動作を可能にしました。シミュレーションの進歩により、短時間でそのような振る舞いを学習し、実世界に汎化するモデルを得ることができます。大量の学習データを迅速に集めることで、物理環境に適応できるモデルを開発しました。",
      features: [
        {
          title: "Isaac Gymでの強化学習",
          description:
            "先行研究に基づき、高性能シミュレーション環境でアプローチを再現し、強化学習で四足ロボットに複雑なパルクール的動作を学習させました。平坦・ギャップ・ハードル・パルクール・段差の5種地形を横断できる動作モデルを生成しました。",
        },
        {
          title: "実機展開",
          description:
            "学習済みモデルを四足ロボットUnitree Go1に展開し、シミュレーションの階段状地形を物理環境で再現して、実世界への転移を確認しました。",
        },
      ],
    },
  },
  2: {
    ja: {
      company: "東京大学 石黒研究室",
      overview:
        "ロボットが公共空間に進出するなか、第三者である傍観者はそれらをどう受け止めるのでしょうか。本プロジェクトは、「同行ロボット」とその操作者の関係を示す視覚的手がかりが、公共での受容にどう影響するかを調べました。「つながりの可視性」（物理的なリンク）と「制御の可視性」（明らかな権限）に着目し、自律・ジョイスティック・リードの3条件を比較した結果、つながりと制御の両方が見えるリード条件が最も高い受容を示しました。特にロボットへの抵抗感が高い人ほど、なじみのある「犬とリード」のメタファーから恩恵を受け、不安が大きく軽減されました。",
      features: [
        {
          title: "目的と手法",
          description:
            "視覚的デザイン要素が傍観者の印象にどう影響するか、特にロボットへの既存の抵抗感（NARS）との相互作用に着目して探ります。視覚手がかりの効果を分離するため、自動化したWizard-of-Oz方式ですれ違い遭遇をシミュレートする統制実験を行いました。",
        },
        {
          title: "デザイン示唆",
          description:
            "人とロボットの協力関係を明示的に可視化することが、社会的統合の鍵であることが示唆されました。不慣れな技術にためらう人には、リードのような可視の物理的制約が親近感を生み、共有空間での第三者受容を大きく改善します。",
        },
      ],
    },
  },
  1: {
    ja: {
      company: "名古屋大学 長尾研究室",
      overview:
        "名古屋大学長尾研究室のプロジェクトとして、屋外環境を自律移動するロボットの技術チャレンジ「つくばチャレンジ」に参加しました。このチャレンジでは、車椅子型ロボット「WHILL」を再開発し、歩行者道路や市街地を自律走行させました。私の貢献は、物体検出とセマンティックセグメンテーションのためのiOSアプリ開発、およびROSによるWHILLの動作制御でした。",
      features: [
        {
          title: "iOSアプリ開発",
          description:
            "YOLOv8nとBiSeNetV2を組み合わせ、配達対象の検出と走行可能領域の抽出を行い、ユーザー評価に基づくマクロF1スコア約0.96で最適な接近方向を選択するiOSアプリです。",
        },
        {
          title: "屋外環境でのフィールド実験",
          description:
            "「つくばチャレンジ2023」で実機による実世界テストを実施しました。視覚情報に基づく配達ロボットの屋外自律ナビゲーションの達成を目指しました。",
        },
      ],
    },
  },
}
