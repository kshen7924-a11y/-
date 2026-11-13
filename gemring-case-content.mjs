const image = (name, alt, width, height, kind) => ({
  src: `/assets/gemring-case/${name}.webp`, alt, width, height, kind
});

export const gemringCase = {
  hero: image('hero', 'GEMRING 智能戒指视觉设计，黑色与银色产品特写', 1728, 1080),
  role: '负责 Logo 与品牌识别、包装设计、电商主图与 A+ 详情视觉、广告素材及独立站视觉。',
  note: '案例采用品牌规范、包装设计稿、电商与广告原稿，以及中文独立站页面实录。',
  sections: [
    {
      id: 'identity', nav: '品牌识别', title: '一套识别，适配不同尺度',
      text: '从几何字标到手写 Gem 标记，我为不同应用保留了清晰的识别方式。品牌规范整理了标志组合、比例、明暗底色和中英文字体，让识别能用在小尺寸戒面、盒盖和网页上。',
      lead: image('product-colors', '黑色、银色、香槟金、玫瑰金四款戒指', 1440, 490, '产品原图整理'),
      images: []
    },
    {
      id: 'packaging', nav: '包装', title: '从盒盖到每一个卡位',
      text: '包装延续低对比的黑色视觉。外盒考虑折叠、插口和标签区，内盒用侧掀结构组织开箱。内托给充电座留出圆形卡位，指模盒把八种尺寸分槽收纳。效果图和刀版并排，能看到外观如何落实到结构、材料与工艺。',
      lead: image('packaging-mockup', 'GEMRING 黑色包装、内盒、充电座和线材', 1332, 1332, '包装效果图'),
      images: [
        image('packaging-01', '外包装盒展开与折叠结构', 2000, 1125, '结构原稿'),
        image('packaging-02', '内盒上下盖、围边与合页', 2000, 1125, '结构原稿'),
        image('packaging-03', '充电座内托与圆形卡位', 2000, 1125, '结构原稿'),
        image('packaging-04', '指模内托与 7–14 号分槽', 2000, 1125, '结构原稿')
      ]
    },
    {
      id: 'amazon', nav: '电商视觉', title: '从识别产品，到看懂怎么选',
      text: '亚马逊白底主图交代戒指外观，后续商品图补充选尺和功能界面。A+ 详情以更宽的版式展开产品、App 和佩戴情景。中文电商稿用方形画幅组织功能图标和场景，让同一款产品在不同渠道都容易读懂。',
      images: [],
      groups: [
        {
          title: '亚马逊英文商品图',
          images: [
            image('amazon-product', '白底产品主图 · 黑色戒指斜角', 1200, 1500),
            image('amazon-sizing', '商品图 · 选尺流程与指模', 1200, 1500),
            image('amazon-sleep-card', '商品图 · 睡眠功能界面', 1200, 1500)
          ]
        },
        {
          title: '亚马逊英文 A+ 详情',
          images: [
            image('amazon-aplus-hero', 'A+ 首屏 · 双角度产品呈现', 1800, 1350),
            image('amazon-aplus-app', 'A+ 功能模块 · App 界面与信息层级', 1800, 1350),
            image('amazon-aplus-energy', 'A+ 场景模块 · 办公与能量信息', 1800, 1350),
            image('amazon-aplus-wear', 'A+ 场景模块 · 睡眠佩戴细节', 1800, 1350)
          ]
        },
        {
          title: '中文电商视觉',
          images: [
            image('amazon-cn-overview', '中文功能图 · 图标与功能概览', 1800, 1800),
            image('amazon-cn-wear', '中文场景图 · 睡眠与佩戴', 1800, 1800)
          ]
        }
      ]
    },
    {
      id: 'advertising', nav: '广告视觉', title: '同一产品，三种广告切入点',
      text: '三张英文竖版广告分别从多色戒指的材质、日常与运动佩戴，以及戒指与 App 的组合入手。每张只突出一个信息重点，用静物、人物场景和界面对应不同的阅读动机。',
      images: [
        image('ad-01', '多色戒指 · 水面静物', 1080, 1920),
        image('ad-02', '日常与运动 · 双场景佩戴', 1080, 1920),
        image('ad-03', '戒指与 App · 功能视觉', 1080, 1920)
      ]
    },
    {
      id: 'storefront', nav: '独立站', title: '把戒指放回日常使用场景',
      text: '独立站首页先用戒指特写交代外观和内圈细节，再通过生活场景和 App 界面解释佩戴后的使用体验。选录了中文手机页面的三个片段，可以沿着同一条阅读路径看到产品、场景和数据界面的衔接。',
      lead: image('storefront', '独立站首页 · 产品首屏、生活场景与 App 界面', 1245, 720, '中文独立站实录'),
      images: [],
      link: {href: 'https://shop.gemring.ai/zh', label: '查看 GEMRING 中文独立站'}
    }
  ]
};
