const asset = (name, alt, width = 1680, height = 945) => ({
  src: `/assets/fu-jen-campus/${name}.webp`,
  alt,
  width,
  height
});

const hero = asset('kv', 'JAGAT 情報局原活动主视觉，含等高线、放大镜和信箱图形');

export const fuJenCampus = {
  id: 'fu-jen-campus',
  title: '辅仁大学线下活动',
  subtitle: 'JAGAT 情報局 · 校园推广与限定徽章',
  category: 'campaign',
  label: 'CAMPAIGN / JAGAT',
  color: '#181815',
  cover: hero.src,
  previewCover: '/assets/fu-jen-campus/cover-portrait.webp',
  description: '在輔大市集推广 JAGAT，让路过的同学有机会认识这款地图社交 App。活动以「你的校友都在這」为主题，把现场的摊位、海报和限定徽章与站内活动页面连在一起。',
  hero,
  badge: asset('badge-card', '原稿中的笨鸟徽章与黄色等高线背卡组合示意', 525, 525),
  sections: [
    {
      id: 'identity',
      title: '把校园画成一张情报地图',
      text: '等高线把画面拉回 JAGAT 的地图语境，放大镜、信箱和定位图标像可以贴在地图上的标记。标题字形搭配亮粉、荧光绿和橙色，把「情报局」的语气延伸到不同活动物料。',
      images: [
        asset('visual-elements', '原稿 · 放大镜、信箱、定位图标与其他活动图形'),
        asset('title-studies', '原稿 · JAGAT 情報局活动标题的字形和组合探索')
      ]
    },
    {
      id: 'touchpoints',
      title: '从摊位走到 App 里',
      text: '摊位和主题海报先让路过的同学认出活动，产品介绍与流程图说明 JAGAT 能做什么、怎么参与。进入 App 后，活动 H5、弹窗和群聊 Banner 继续沿用同一套视觉。',
      images: [
        asset('booth', '原稿 · 輔大市集活动帐篷与摊位贴图设计'),
        asset('campaign-posters', '原稿 · 迷霧重重、超讚der、天菜店家三张活动主题海报'),
        asset('participation', '原稿 · JAGAT 产品介绍与线下参与流程图'),
        asset('in-app-h5', '原稿 · JAGAT 情報局站内活动 H5'),
        asset('in-app-assets', '原稿 · 站内群聊 Banner、弹窗和侧边栏图标'),
        asset('capsule-machine', '原稿 · 校园活动扭蛋机的外观物料设计')
      ]
    },
    {
      id: 'badge',
      title: '一枚只属于辅仁的徽章',
      text: '我设计了辅仁专属的笨鸟徽章。角色戴着蓝色眼罩，身体借用了 JAGAT 饮料杯的轮廓。原稿同时展示了正背面、背面的坐标和双固定件，以及印有等高线和星星的黄色背卡。',
      images: [
        asset('badge-spec', '原稿 · 辅仁限定实体徽章的正背面、背卡与组合示意')
      ]
    },
    {
      id: 'poster',
      title: '校友集合！',
      text: '为作品集补做的市集宣传海报。保留原活动的亮粉和荧光绿，用一句短标题和限定徽章吸引视线，把「来輔大市集认识 JAGAT」放在最直接的位置。',
      images: [
        asset('market-poster', '作品集补作 · 校友集合！輔大市集宣传海报', 1050, 1350)
      ]
    }
  ]
};
