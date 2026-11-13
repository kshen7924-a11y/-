const artwork = (year, file, alt) => ({
  src: `/assets/jagat-recap/${year}/${file}.webp`,
  alt
});
const select = (year, entries) => entries.map(([file, alt]) => artwork(year, file, alt));

export const recapYears = [
  {
    year: 2024,
    title: '把这一年，连成星图',
    theme: 'JAGAT 2024 ANNUAL REPORT',
    summary: '用夜空和发光角色建立活动入口，把初次相遇、好友、纪念日与地图足迹串成一段向下展开的年度回忆。',
    hero: artwork(2024, 'hero', '2024 年度报告主画面，荧光角色与星图'),
    heroCaption: '以原开屏的发光角色与紫蓝星空重组横版主画面，保留原活动的色彩与主体。',
    reportTitle: '用星图讲述个人回忆',
    reportText: '用初遇的日期开启叙事，把关系数据放进好友星球和纪念日，把位置记录放回地图。最后用一张汇总页收束碎片，让用户看见这一年的整体轮廓。',
    reportGroups: [
      {
        id: 'connections',
        title: '开场与关系',
        images: select(2024, [
          ['opening', '年度报告开屏'],
          ['first-day', '初遇 · 把日期作为故事起点'],
          ['friends', '好友星球 · 新认识的伙伴'],
          ['anniversary', '关系纪念日 · 时间线']
        ])
      },
      {
        id: 'footprints',
        title: '足迹与总结',
        images: select(2024, [
          ['footprints-city', '城市留驻 · 立体城市景观'],
          ['footprints-world', '跨国足迹 · 卷轴世界地图'],
          ['footprints', '地图足迹 · 探索过的地点'],
          ['summary', '年度总结 · 关系与足迹回顾']
        ])
      }
    ],
    cards: [],
    socialTitle: '从开屏延伸到社媒',
    socialText: '信息流海报用发光角色集中传达年度主题，限时动态保留手机端的纵向阅读节奏，轮播接续展开相遇与足迹。三种版式共用星空、角色轮廓和荧光色，让用户在进入应用前就能识别同一次活动。',
    socialCopy: '在 JAGAT 的这一年，你和谁初遇，又点亮了哪些地方？打开 JAGAT 2024 年度报告，重看你们一起走过的足迹。',
    social: select(2024, [
      ['social-feed', '信息流 · 年度报告主海报'],
      ['social-story', '限时动态 · 报告入口'],
      ['social-carousel', '轮播 2 · 和谁相遇'],
      ['social-footprints', '轮播 3 · 走过哪里']
    ])
  },
  {
    year: 2025,
    title: '2025 你的人生电影',
    shortTitle: '你的人生电影',
    theme: 'JAGAT 2025 ANNUAL REPORT',
    summary: '从复古取景器进入影院，把个人、好友、情侣三条内容线写进同一部电影，再以八款角色海报延续分享。',
    hero: artwork(2025, 'hero', '2025 年度报告主画面，三款电影角色海报'),
    heroCaption: '从八张原分享卡中选取三款角色，借用剧院幕布、胶片边框和暖橙色光重组横版主画面。',
    reportTitle: '把生活记录写成电影情节',
    reportText: '「开始播放」把查看报告变成开映动作。个人篇以常驻片场、取景地与驻留时间组织足迹，好友篇用主演和同行讲关系，情侣篇用相遇日期和相处时长记录两人故事。',
    reportGroups: [
      {
        id: 'personal',
        title: '开场与个人篇',
        images: select(2025, [
          ['report-opening', '取景器开屏 · 开始播放'],
          ['report-intro', '开幕 · 用幕布引入个人叙事'],
          ['report-city', '常驻片场 · 用城市表现年度足迹'],
          ['report-places', '地点记录 · 放映机与胶片'],
          ['report-duration', '最久取景地 · 用钟表表现时间']
        ])
      },
      {
        id: 'friends',
        title: '好友篇',
        images: select(2025, [
          ['report-friends-cast', '好友篇 · 领衔主演'],
          ['report-friends-count', '好友篇 · 长路漫漫，总要结伴同行']
        ])
      },
      {
        id: 'couple',
        title: '情侣篇',
        images: select(2025, [
          ['report-couple-date', '情侣篇 · 最佳情侣'],
          ['report-couple-count', '情侣篇 · 相处时长统计']
        ])
      }
    ],
    cardsTitle: '八种角色，共用一座影院',
    cardsText: '固定幕布、座椅与品牌位置，用灯光色、人物动作和道具区分八种身份。单张分享时保留角色个性，八张并列时仍能看出来自同一场活动。',
    cards: select(2025, [
      ['card-01', '专注当下的独立电影人'],
      ['card-02', '全球采风的短剧导演'],
      ['card-03', '市井生活的驻场导演'],
      ['card-04', '浪迹天涯的公路片主角'],
      ['card-05', '深藏不露的王牌编剧'],
      ['card-06', '纵横四海的传奇制片人'],
      ['card-07', '限量公映的文艺片主角'],
      ['card-08', '随性漫游的客座监制']
    ]),
    socialTitle: '让年度电影走出报告',
    socialText: '首映海报用角色群像建立主题，限时动态让单个角色在竖屏中出场。三页轮播按开场、回放、晒角色推进，预演打开报告后能看到的内容。',
    socialCopy: '如果 2025 是一部电影，谁和你一起领衔主演？打开 JAGAT 年度报告，按下播放键，看看你今年的取景地、同行人和银幕角色。',
    social: select(2025, [
      ['social-feed', '信息流 · 年度首映海报'],
      ['social-story', '限时动态 · 年度电影开映'],
      ['social-carousel-01', '轮播 1 · 请按下播放键'],
      ['social-carousel-02', '轮播 2 · 日常，也有名场面'],
      ['social-carousel-03', '轮播 3 · 把今年的角色晒出来']
    ])
  }
];
