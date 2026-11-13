const image = (src, alt, width, height, kind = '原项目设计') => ({src, alt, width, height, kind});
const original = (name, alt, width, height) => image(`/assets/quwan-intmo-additions/${name}.webp`, alt, width, height);
const selected = (name, alt, width, height) => image(`/assets/quwan-case/${name}.webp`, alt, width, height);
const mockup = (name, alt) => image(`/assets/quwan-case/${name}.webp`, alt, 1536, 1024, '作品集补作 · AI 效果图');

const hero = original('cover', 'INTMO 趣玩云集 · 橙底白字品牌标志', 1440, 1019);

export const quwanIntmo = {
  id: 'quwan-intmo',
  title: '趣玩云集商场',
  subtitle: '商业地产视觉 · 品牌、招商与导视落地',
  category: 'brand',
  label: 'BRAND / WAYFINDING',
  color: '#e6441c',
  cover: hero.src,
  hero,
  description: '趣玩云集是贵阳金融北城的社区商业项目。设计要让商场容易被认出，让商户看懂招商信息，也让顾客进场后找得到路。',
  role: '参与标志设计、招商与海报视觉、广告物料设计，以及整体导视系统设计与落地。',
  outcome: '标志规范、三种画幅的招商大屏、品牌及节日海报、导视规范、标识点位与车库分区方案。',
  note: '展出的标志、海报、招商物料和导视图纸来自项目原稿。三张空间效果图为作品集补作，案例的实施部分以原始方案和点位图呈现。',
  sections: [
    {
      id: 'identity',
      title: '让社区商业一眼可辨',
      nav: '品牌识别',
      text: '相连的双圆是标志的识别主体。后续 INTMO 版把图形与中英文字标固定为一组，再通过标准制图、橙白和黑白版本说明不同底色下的用法。导视提案中的早期拼音版也保留在案例里。',
      images: [
        original('01-01', 'INTMO 标志标准制图与品牌橙', 1440, 1019),
        original('01-02', '品牌橙底反白与浅底橙色组合', 1440, 1019),
        original('01-03', '黑白印刷使用的标志组合', 1440, 1019)
      ]
    },
    {
      id: 'leasing',
      title: '一套招商主视觉，三种屏幕版式',
      nav: '招商传播',
      text: '「火热招商」用大字和彩色放射图形抢占远距离视线。超宽屏和横屏把项目与意向商家信息放在左侧，近竖屏改为底部横栏，给标题留出足够面积。三稿并列可以看到同一组内容如何随画幅重新分配。',
      mockup: mockup('mockup-leasing', '招商大屏在商业中庭的展示效果'),
      images: [
        selected('leasing-wide', '超宽屏 · 1884 × 801，信息栏左置', 1884, 801),
        selected('leasing-standard', '横屏 · 1583 × 832，信息栏左置', 1583, 832),
        selected('leasing-portrait', '近竖屏 · 1408 × 1536，信息栏下移', 1408, 1536)
      ]
    },
    {
      id: 'advertising',
      title: '把开场的热闹延续到日常',
      nav: '海报与广告',
      text: '品牌海报用「走！趣玩来都来了！」和角色插画传达社区商业的活力，节日海报围绕具体节点换主题和画面。灯箱效果图补充了海报在商场走廊里的观看尺度。',
      mockup: mockup('mockup-lightbox', '品牌海报在商场走廊的灯箱展示效果'),
      images: [
        selected('poster-brand', '品牌宣传海报 · 走！趣玩来都来了！', 1125, 2436),
        selected('poster-season', '节日海报 · 圣诞节', 1125, 2436)
      ]
    },
    {
      id: 'wayfinding',
      title: '从认出商场，到找对方向',
      nav: '导视与落地',
      text: '导视原稿把幕墙识别、室内指引和车库分区纳入同一套系统。幕墙字考虑建筑比例和昼夜可读性，室内统一箭头与设施图标，车库以分区字母和颜色辅助辨认。流程图和点位图展示了如何把规范推进到具体的空间位置。',
      mockup: mockup('mockup-wayfinding', '室内立式楼层牌与悬挂式方向牌的组合效果'),
      images: [
        selected('wayfinding-schedule', '导视设计管理流程 · 设计与制作阶段', 1034, 1462),
        selected('wayfinding-placement', '导视点位布置 · 平面示意', 1034, 1462),
        selected('wayfinding-facade', '幕墙发光立体字 · 应用规范及早期标志示意', 1034, 1462),
        original('02-01', '导视标识色彩规范', 1019, 1440),
        original('02-02', '方向箭头与公共设施图标规范', 1019, 1440),
        selected('wayfinding-parking', '车库分区 · 字母与色彩规范', 1034, 1462)
      ]
    }
  ]
};
