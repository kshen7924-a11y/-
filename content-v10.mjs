// Content recovered from the current dist/portfolio.js.
// Existing local video files are retained as separate motion studies.
// Project colors are editable interface accents, not claims about delivered brand guidelines.

import {wildCase} from './wild-case-content.mjs';
import {treasureOfficerCase} from './treasure-officer-content.mjs';
import {coinHuntCase} from './coin-hunt-content.mjs';
import {gemringCase} from './gemring-case-content.mjs';
import {filledProjectSlots,projectAdditions} from './project-additions.mjs';
import {projectCovers} from './project-covers.mjs';

export {filledProjectSlots};

export const profile = {
  name: '申凯',
  english: 'KAI SHEN',
  logo: 'shenkai3246',
  city: '中国 · 成都',
  phone: '15680038632',
  email: 'kshen7924@gmail.com',
  intro: '我是申凯，一名视觉设计师。从平面与品牌设计出发，持续探索视觉语言在数字内容和线下场景中的表达。',
  bio: [
    '目前在 JAGAT 团队参与应用营销与线下活动设计，并负责全球寻宝活动的主视觉设计。',
    '我关注画面的辨识度，也关注设计如何传递信息、服务真实的项目目标。',
    '持续探索 AI 创作、动态表达与数字交互。'
  ],
  skills: ['品牌识别', '海报视觉', '活动创意', 'IP 探索'],
  process: ['理解背景', '形成方向', '视觉探索', '场景落地']
};

const baseProjects = [
  {
    id: 'lord',
    title: 'LORD',
    subtitle: '海洋与航行意象下的品牌识别',
    category: 'brand',
    label: 'BRAND IDENTITY',
    cover: '/assets/lord-07.webp',
    alternate: '/assets/lord-09.webp',
    color: '#2445FF',
    description: '围绕海洋与航行意象，探索品牌标志、字标及场景应用。通过帆船、装备与网页中的呈现，建立统一的视觉识别。',
    tags: ['标志设计', '视觉规范', '应用效果稿'],
    images: [
      {src: '/assets/lord-07.webp', alt: 'LORD · 方案一帆船应用效果稿'},
      {src: '/assets/lord-02.webp', alt: 'LORD · 方案一图形标志'},
      {src: '/assets/lord-03.webp', alt: 'LORD · 方案一图形构成'},
      {src: '/assets/lord-06.webp', alt: 'LORD · 方案一标志组合'},
      {src: '/assets/lord-09.webp', alt: 'LORD · 方案一装备应用效果稿'},
      {src: '/assets/lord-10.webp', alt: 'LORD · 方案一网页应用效果稿'},
      {src: '/assets/lord-15.webp', alt: 'LORD · 方案二帆船应用效果稿'}
    ],
    sections: [
      {title: '设计出发点', text: '围绕海洋与航行意象，探索品牌标志与字标的表达。'},
      {title: '视觉识别', text: '将图形标志、字标与组合规则整理为统一的视觉语言。'},
      {title: '场景应用', text: '通过帆船、装备与网页中的设计效果稿展示应用方向。'}
    ],
    note: '展示内容为品牌设计方案及应用效果稿；方案一与方案二应分别标明。'
  },
  {
    id: 'gemring',
    title: 'GEMRING',
    subtitle: '智能戒指 · 品牌、包装与电商视觉',
    category: 'brand',
    label: 'BRAND & E-COMMERCE',
    cover: gemringCase.hero.src,
    alternate: '/assets/gem-guideline-03.webp',
    color: '#ded5c8',
    description: '我为 GEMRING 智能戒指设计品牌标志与包装，并将视觉延展到亚马逊商品图、A+ 详情、广告和品牌独立站。',
    tags: ['品牌识别', '包装设计', '电商视觉', '独立站'],
    images: [
      {src: '/assets/gem-logo-01.webp', alt: 'GEMRING · 完整标志组合'},
      {src: '/assets/gem-guideline-02.webp', alt: 'GEMRING · 标志组合与比例'},
      {src: '/assets/gem-guideline-03.webp', alt: 'GEMRING · 深浅背景应用'},
      {src: '/assets/gem-guideline-04.webp', alt: 'GEMRING · 图形与字标应用'},
      {src: '/assets/gem-guideline-05.webp', alt: 'GEMRING · 中文字体规范'},
      {src: '/assets/gem-guideline-06.webp', alt: 'GEMRING · 英文字体规范'}
    ],
    sections: [
      {title: '识别系统', text: '从图形标志与字标出发，整理品牌的组合规则。'},
      {title: '应用与字体', text: '以黑白应用与中英文字体规范，保持不同介质中的识别一致性。'}
    ],
    gemringCase
  },
  {
    id: 'jagat',
    title: 'JAGAT / JAGA IP',
    subtitle: '从角色识别到情景延展',
    category: 'brand',
    label: 'CHARACTER & IDENTITY',
    cover: '/assets/jagat-01.webp',
    alternate: '/assets/jagat-02.webp',
    color: '#FF4C33',
    description: '以鲜明配色与表情建立角色识别，通过多视角、动作与情景延展，让品牌角色在不同内容中保持一致。',
    tags: ['IP 设计', '角色规范', '情景延展'],
    images: [
      {src: '/assets/jagat-01.webp', alt: 'JAGAT / JAGA IP · 角色多视角与比例'},
      {src: '/assets/jagat-02.webp', alt: 'JAGAT / JAGA IP · 角色表情与动作'},
      {src: '/assets/jagat-03.webp', alt: 'JAGAT / JAGA IP · 角色情景延展'}
    ],
    sections: [
      {title: '角色识别', text: '以鲜明配色与角色表情建立识别。'},
      {title: '规范与延展', text: '通过多视角、动作与情景延展，使角色在不同内容中保持一致。'}
    ],
    note: '当前展示为 IP 规范选页；项目背景、个人分工与应用成果仍待补充。'
  },
  {
    id: 'footprint-stickers',
    title: '足迹冰箱贴纸活动',
    subtitle: '从打卡收集、自由拼贴到社媒分享',
    category: 'campaign',
    label: 'CAMPAIGN / FOOTPRINTS',
    cover: '/assets/footprint-stickers/hero-original.webp',
    color: '#b4a0eb'
  },
  {
    id: 'jagat-recap',
    title: 'JAGAT 年度报告',
    subtitle: '2024–2025 · 年度运营活动与社媒传播',
    category: 'campaign',
    label: 'CAMPAIGN / JAGAT',
    cover: '/assets/jagat-recap/cover.webp',
    alternate: '/assets/jagat-recap/alternate.webp',
    color: '#201332'
  },
  {
    id: 'miaole',
    title: '喵叻沐浴露',
    subtitle: '把猫咪靠近的瞬间画成一个品牌',
    category: 'brand',
    label: 'BRAND IDENTITY',
    cover: '/assets/miaole-case/social-01.webp',
    alternate: '/assets/miaole-case/product-original.webp',
    color: '#FEFDF9',
    description: '喵叻是一款添加猫薄荷成分的人用沐浴露。我把「洗完澡，猫咪也许会凑近闻一闻」画成一段日常小故事，再将同一套视觉语言延展到瓶标、电商和宣传画面。',
    tags: ['标志设计', '整体 VI 方向', '包装设计', '电商与宣传视觉']
  },
  {
    id: 'treasure',
    title: '全球寻宝活动',
    subtitle: 'COIN HUNT GO! · 城市运营、代币设计与品牌联名',
    category: 'campaign',
    label: 'CAMPAIGN / JAGAT',
    cover: '/assets/poster-16.webp',
    alternate: '/assets/poster-17.webp',
    color: '#FF4C33',
    description: '围绕寻宝这一核心体验，将活动信息转化为鲜明的视觉语言。以主视觉为起点，延展城市活动、传播海报与不同场景的设计。',
    tags: ['活动主视觉', '全球寻宝', '视觉延展'],
    images: [
      {src: '/assets/poster-16.webp', alt: '全球寻宝活动 · 成都寻宝海报'},
      {src: '/assets/poster-17.webp', alt: '全球寻宝活动 · 卷轴寻宝海报'},
      {src: '/assets/poster-03.webp', alt: '全球寻宝活动 · COIN HUNT 海报'},
      {src: '/assets/poster-11.webp', alt: '全球寻宝活动 · 咬住财富活动视觉'}
    ],
    sections: [
      {title: '核心体验', text: '围绕寻宝体验，将活动信息组织为鲜明的主视觉。'},
      {title: '视觉延展', text: '从主视觉延展至城市活动、传播海报与不同场景。'},
      {title: '动效选录', text: '现有卷轴寻宝动效作为活动视觉素材的一部分展示。'}
    ],
    video: '/assets/video-treasure.mp4',
    coinHuntCase,
    note: '完整项目过程、分工和成果数据将在素材整理后补充。'
  },
  {
    id: 'jakarta',
    title: 'JAKARTA / 印尼专场',
    subtitle: '城市主题活动视觉',
    category: 'campaign',
    label: 'CAMPAIGN / JAGAT',
    cover: '/assets/poster-10.webp',
    alternate: '/assets/poster-07.webp',
    color: '#2445FF',
    description: '为线下活动建立鲜明的视觉入口，将城市识别、场景元素与活动信息组织在同一画面中。',
    tags: ['活动海报', '城市主题', '线下传播'],
    images: [
      {src: '/assets/poster-10.webp', alt: 'JAKARTA / 印尼专场 · 活动海报'},
      {src: '/assets/poster-07.webp', alt: 'JAGAT 商店 · 现有相关活动视觉选录'}
    ],
    sections: [
      {title: '视觉入口', text: '以城市识别与场景元素组织线下活动信息。'},
      {title: '现有选录', text: '保留印尼专场与 JAGAT 商店相关视觉；更多现场与应用素材待补充。'}
    ],
    note: '更多现场与应用素材待补充；关联素材的具体项目背景与个人分工待确认。'
  },
  {
    id: 'wild',
    title: 'WILD IMPACT',
    subtitle: '小野 · 角色规范与 IP 延展',
    category: 'ip',
    label: 'PERSONAL IP',
    cover: '/assets/wild-master-cutout-v1.png',
    alternate: '/assets/wild-seated.png',
    color: '#2d2926',
    description: '小野的弯月斧和尖毛束构成远距离识别，异瞳、绒毛与红结保留亲近感。案例展示角色标准及跨场景、贴纸、潮玩和传播物料的应用。',
    tags: ['个人 IP', '角色规范', '潮玩与传播'],
    wildCase
  },
  {
    id: 'treasure-officer',
    title: '寻宝官',
    subtitle: 'JAGAT 寻宝角色 · 形象规范与应用',
    category: 'ip',
    label: 'CHARACTER IP / JAGAT',
    cover: '/assets/treasure-officer-case/cover-portrait.webp',
    previewCover: '/assets/treasure-officer-case/cover-portrait.webp',
    color: '#dbe8fb',
    description: '用帽徽、红发与金币建立寻宝官的视觉识别，以动作、场景、贴纸、潮玩和物料延续角色在寻宝活动中的表达。',
    tags: ['角色 IP', '形象规范', '活动延展'],
    treasureOfficerCase
  }
];

const additionsById = new Map(projectAdditions.map(project => [project.id, project]));
export const projects = [
  ...baseProjects.map(project => ({...project, ...additionsById.get(project.id)})),
  ...projectAdditions.filter(project => !baseProjects.some(base => base.id === project.id))
].map(project => ({...project, ...projectCovers[project.id]}));

const posterEntries = [
  ['poster-01', 'JAGAT', '字体与版式', 'creative'],
  ['poster-06', 'HEARTBEAT SIGNAL', '3D 视觉探索', '3d'],
  ['poster-19', 'JAGAT / RED', '材质与光影', '3d'],
  ['poster-20', 'YOUR WORLD', '邮筒与宇宙', '3d'],
  ['poster-18', 'FRIENDS BY YOUR SIDE', '3D 视觉', '3d'],
  ['poster-02', '透明杯体视觉', '材质探索', '3d'],
  ['poster-04', '三月视觉练习', '视觉探索', 'creative'],
  ['poster-09', '五月视觉练习', '3D 视觉', '3d'],
  ['poster-15', '大西瓜', '视觉探索', 'creative'],
  ['poster-11', '咬住财富', '活动视觉', 'operations'],
  ['poster-14', '复古摩托集合', '版式探索', 'creative'],
  ['poster-12', '哪吒', '视觉探索', 'illustration'],
  ['poster-05', '骑行视觉', '海报设计', 'creative'],
  ['poster-08', '万圣节海报', '活动视觉', 'operations'],
  ['poster-17', '卷轴寻宝', '活动视觉', 'operations'],
  ['poster-16', '成都寻宝', '活动视觉', 'operations'],
  ['poster-07', 'JAGAT 商店', '活动视觉', 'operations'],
  ['poster-10', '印尼专场', '活动视觉', 'operations'],
  ['poster-03', 'COIN HUNT', '活动视觉', 'operations'],
  ['poster-13', '联名活动', '视觉设计', 'illustration']
];

export const posters = posterEntries.map(([id, title, caption, category]) => ({
  id,
  title,
  caption,
  category,
  src: `/assets/${id}.webp`,
  thumb: `/assets/${id}-thumb.webp`
}));

export const posterCategories = [
  {id: 'illustration', name: '插画', english: 'ILLUSTRATION', cover: '/assets/poster-12.webp'},
  {id: '3d', name: '3D', english: '3D EXPLORATIONS', cover: '/assets/poster-06.webp'},
  {id: 'creative', name: '创意', english: 'CREATIVE VISUALS', cover: '/assets/poster-01.webp'},
  {id: 'operations', name: '运营', english: 'CAMPAIGN VISUALS', cover: '/assets/poster-16.webp'}
];

// Pending records preserve the existing archive slots for future projects.
export const pendingProjects = [
  ...Array.from({length: 7}, (_, index) => ({
    id: `brand-${index + 4}`,
    title: `品牌项目 ${String(index + 4).padStart(2, '0')}`,
    category: 'brand',
    fields: ['品牌介绍', '视觉识别', '设计过程', '应用展示']
  })),
  ...Array.from({length: 3}, (_, index) => ({
    id: `campaign-${index + 3}`,
    title: `活动项目 ${String(index + 3).padStart(2, '0')}`,
    category: 'campaign',
    fields: ['活动背景', '主视觉设计', '运营物料', '现场与成果']
  })),
  ...Array.from({length: 5}, (_, index) => ({
    id: `case-${index + 1}`,
    title: `项目经历 ${String(index + 1).padStart(2, '0')}`,
    category: 'experience',
    fields: ['项目背景与目标', '个人职责与分工', '设计过程与方案', '落地成果与复盘']
  }))
].filter(project => !filledProjectSlots[project.id]);

export const motionStudies = [
  {
    id: 'video-may',
    title: '五月练习 · 动效',
    caption: '现有动效选录',
    src: '/assets/video-may.mp4',
    poster: '/assets/video-may.webp'
  },
  {
    id: 'video-treasure',
    title: '卷轴寻宝 · 动效',
    caption: 'JAGAT 寻宝活动视觉选录',
    src: '/assets/video-treasure.mp4',
    poster: '/assets/video-treasure.webp'
  }
];
