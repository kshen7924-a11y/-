const asset = file => `/assets/wild-case/${file}`;

function artwork(file, title, note, options = {}) {
  return {src: asset(`${file}.webp`), title, note, ...options};
}

export const wildCase = {
  turnaround: artwork('turnaround', '正面 / 左侧 / 背面 / 道具', '原始三视图。左右以小野自身为准，三张角色图使用同一观察尺度。', {width: 1674, height: 1024}),
  master: artwork('master', '标准角色母板', '原始母板标注识别点、毛发分区和跨镜头一致性要求。', {width: 1536, height: 1024}),
  details: [
    artwork('detail-tuft', '单侧主毛束', '角色右上方的尖毛束是轮廓记号。头顶长毛随发束走向分缕。'),
    artwork('detail-eyes', '蓝绿异瞳', '自身右眼为蓝色圆瞳，左眼为绿色菱形瞳。半垂眼睑保留安静的神态。'),
    artwork('detail-collar', '炭黑交叠折领', '几何折领、半肩袖和短下摆，与细软白绒形成材质对比。'),
    artwork('detail-ribbon', '左腕朱红结', '左腕系一枚红结，两条带尾一长一短，作为全身最集中的暖色。'),
    artwork('detail-feet', '短身与宽脚', '短腿接宽阔的炭黑分趾脚，脚背有短毛。手保持圆润的全毛轮廓。'),
    artwork('detail-axe', '弯月巨斧', '金属刃柄一体，保留单刃、连续镂空和完整长柄。')
  ],
  scenes: [
    artwork('scene-moon-rock', '月环陨石', '用大尺度的行星环衬托孤身角色，远距离仍能读到毛束和斧形。', {layout: 'wide', width: 1536, height: 1024}),
    artwork('scene-mountain', '风隘前的孤旅', '雾气拉开前后层次，留出角色和长柄道具的完整空间。'),
    artwork('scene-ridge', '雾岭远行', '改为肩扛姿态，保持毛束方向、折领和左腕红结。'),
    artwork('scene-coast', '暮光海岸', '落日暖光改变白绒的受光色，仍保留暗色衣料与金属的区分。'),
    artwork('scene-moon-workshop', '午夜缝月工坊', '让低头缝补的动作承担叙事，表现小野耐心、专注的一面。'),
    artwork('scene-greenhouse', '温室里的微光旅伴', '冷暖光同时落在毛绒与金属上，保留轮廓的反差。'),
    artwork('scene-paper-boat', '雨巷里的红纸船', '把腕带的红色延伸到纸船，成为街景里一处明确的视线落点。'),
    artwork('scene-rain-flower', '雨中为小花遮雨', '收住动作幅度，用身体朝向和护花动作表现温柔。')
  ],
  expressions: [
    artwork('expression-study', '六格面部表情', '就绪、好奇、微笑、坚定、疑惑、低落。保留毛束和异瞳，通过眼睑、视线与嘴角表达变化。', {width: 1536, height: 1024}),
    artwork('expression-pack', '四款姿态贴纸', '从标准形象和原始场景提取就绪、回望、专注、守护，附透明 PNG。', {width: 1500, height: 1000})
  ],
  toys: [
    artwork('toy-studio', '标准款手办概念', '将长毛转译成顺向雕塑纹理，服装做炭黑哑面，弯月道具保留拉丝金属观感。', {width: 1536, height: 1024}),
    artwork('toy-packaging', '外盒与陈列提案', '将角色形象、朱红标识与材质信息放进同一套外盒和陈列版式。', {width: 1500, height: 1000, download: asset('toy-packaging.png')})
  ],
  promo: [
    artwork('promo-poster', '角色主视觉海报', '以完整持斧形象建立识别，标题和红色图形放大轮廓的张力。', {width: 1060, height: 1590, download: asset('promo-poster.png')}),
    artwork('promo-social', '社媒角色故事卡', '以「替一朵花挡雨」为叙事入口，4:5 画幅保留角色动作和小花。', {width: 960, height: 1200, download: asset('promo-social.png')})
  ],
  guideHref: asset('wild-character-guide.pdf'),
  stickerHref: asset('wild-stickers.zip')
};
