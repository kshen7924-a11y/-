const asset = filename => `/assets/coin-hunt-case/${filename}`;

function art(key, title, note = '', full) {
  return {src: asset(`${key}.webp`), title, note, ...(full ? {full: asset(`${full}.webp`)} : {})};
}

function coin(key, title, group) {
  return {
    key, title, group,
    flat: art(`coins/${key}-flat`, `${title} · 正反面平面稿`),
    effect: art(`coins/${key}-effect`, `${title} · 立体效果示意`)
  };
}

export const coinHuntCase = {
  hero: art('hero', '寻宝预告 · 原始活动插画'),
  logo: art('logo-board', '中英文活动标志'),
  materials: [
    art('coins/base-material-gold', '基础款 · 金色效果'),
    art('coins/base-material-silver', '基础款 · 银色效果'),
    art('coins/base-material-copper', '基础款 · 铜色效果')
  ],
  coins: [
    coin('base', '基础款', '基础款'),
    coin('fireworks', '烟花款', '节令款'),
    coin('snowflake', '雪花款', '节令款'),
    coin('sakura', '樱花款', '节令款'),
    coin('jasmine', '茉莉花款', '节令款'),
    coin('shanghai', '上海限定款', '城市限定'),
    coin('taobao', '淘宝闪购联名款', '品牌联名'),
    coin('cheers', 'CHEERS 联名款', '品牌联名'),
    coin('brt', 'BRT 联名款', '品牌联名'),
    coin('bingo', 'BingoPlus 联名款', '品牌联名')
  ],
  regions: [
    art('region-jinan', '济南、青岛 · 城市官宣', '用城市名和主画面把上线范围放在第一眼。'),
    art('region-hong-kong', '香港 · 寻宝规则', '把参与条件、查找方式和奖励说明安排在同一张图。'),
    art('region-shenzhen', '深圳 · 活动问答', '把容易卡住的步骤改成可快速查找的问答。'),
    art('region-japan', '日本 · 专场预告', '将专场名称和本地语放到活动标志的主要位置。'),
    art('region-malaysia', '马来西亚 · 榴莲季积分赛', '以当地熟悉的主题做识别，由规则长图承接积分玩法。'),
    art('region-manila', '菲律宾 · 马尼拉地标', '让马尼拉大教堂进入主画面，帮助用户把活动和城市联系起来。'),
    art('region-europe', '欧洲 · 第三期积分赛', '用期数和积分赛标识帮助用户辨认当前场次。'),
    art('region-austria', '奥地利 · 银币预告', '把本场代币置于画面中心，突出这一站的寻宝对象。')
  ],
  partners: [
    {
      title: '淘宝闪购 × JAGAT · 大湾区寻宝',
      intro: '联名主视觉抓住寻宝主题，规则 H5 解释怎么参加，寻宝秘籍按场次给地图和线索。七夕与餐饮权益稿负责在不同时间和入口重新唤起参与。广州北京路场还把藏宝图接到文化地标打卡、集章和兑奖。',
      href: 'https://www.yuexiu.gov.cn/yxdt/rdzt/yxhdrl/qb/content/post_10391131.html',
      source: '广州越秀区 · 北京路活动记录',
      images: [
        art('taobao-kv', '大湾区寻宝 · 联名主视觉', '把橙色、角色和金币放进同一套主画面。'),
        art('taobao-h5-entry', '寻宝秘籍 · 入口', '先说明本阶段主题，再引导用户看线索。点击查看整页。', 'taobao-h5'),
        art('taobao-h5-map', '寻宝秘籍 · 地图', '将城市和寻宝范围落到可识别的地图。点击查看整页。', 'taobao-h5'),
        art('taobao-h5-rules', '湾区寻宝 · 规则 H5', '聚焦实体币领取流程。点击查看含虚拟币、道具和兑换规则的完整原稿。', 'taobao-h5-guide'),
        art('taobao-qixi', '七夕 · 阶段宣传', '把固定的寻宝识别延续到节日主题。'),
        art('taobao-banner-milk-tea', '奶茶权益 · Banner', '用具体权益承接活动入口。'),
        art('taobao-banner-supper', '夜宵权益 · Banner', '针对夜间消费场景改写入口信息。'),
        art('taobao-banner-coupon', '红包权益 · Banner', '将权益提示放在小版位的主要阅读区。')
      ]
    },
    {
      title: '书亦烧仙草 × JAGAT · 亦起来寻宝',
      intro: '从「半杯都是料，满地都是宝」出发，把饮品和寻宝奖品放进同一套叙事。主视觉唤起兴趣，活动介绍与 H5 承接规则。',
      images: [
        art('shuyi-kv', '亦起来寻宝 · 联名主视觉'),
        art('shuyi-h5-entry', '活动 H5 · 首屏', '点击查看完整原稿。', 'shuyi-h5'),
        art('shuyi-h5-rules', '活动 H5 · 参与说明', '点击查看完整原稿。', 'shuyi-h5')
      ]
    },
    {
      title: 'BingoPlus × JAGAT · 菲律宾场',
      intro: '联名主视觉延续金币识别。马尼拉宣传把地图与本地交通意象放到画面前景，站内弹窗由寻宝官说明线索与道具，Mystery Box H5 承接主题任务。',
      href: 'https://bingoplus.ph/blog/bingoplus-highlights-at-the-panagbenga-festival/',
      source: 'BingoPlus · 菲律宾联名活动记录',
      images: [
        art('bingo-kv', 'Coin Hunt · 联名主视觉'),
        art('bingo-promo-manila', '马尼拉 · 地图横版宣传'),
        art('bingo-popup', '寻宝官 · 活动弹窗'),
        art('bingo-h5-entry', 'Mystery Box · 活动 H5', '点击查看完整原稿。', 'bingo-h5')
      ]
    }
  ]
};
