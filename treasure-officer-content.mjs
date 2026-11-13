const asset = file => `/assets/treasure-officer-case/${file}`;

function artwork(key, title, note, download = false) {
  return {
    key,
    title,
    note,
    src: asset(`${key}.webp`),
    ...(download ? {download: asset(`${key}.png`)} : {})
  };
}

export const treasureOfficerCase = {
  hero: artwork('pose-discovery', '捧币站姿', '原始角色稿'),
  turnaround: artwork('turnaround', '正面、右侧、背面', '根据已有动作稿补绘。右侧以角色自身为准，背面帽型和衣领为本次延展设定。'),
  details: [
    artwork('detail-cap', '浅蓝帽与杯形帽徽', '黄色弧带沿帽侧展开。正面蓝白杯形徽记保留吸管和杯盖轮廓。'),
    artwork('detail-hair', '珊瑚红发与闪电发饰', '齐颊短发和两撮低束发定住轮廓。黄色折线和蓝色发卡集中在角色右侧。'),
    artwork('detail-uniform', '水手领与百褶裙', '白色短袖配浅蓝滚边，裙褶、手套、白袜和蓝白鞋形成连续色块。'),
    artwork('detail-coin', '浮雕金币', '金币单独作为任务道具。厚边和浮雕在举币、捧币或特写中保持可读。')
  ],
  poses: [
    artwork('pose-discovery', '发现', '双手捧币，睁大双眼。'),
    artwork('pose-display', '展示', '跪姿举币，切换为星星眼。'),
    artwork('pose-leap', '庆祝', '腾空举币，用伸展动作拉开剪影。'),
    artwork('pose-victory', '搞定', '双手比 V，庆祝任务完成。'),
    artwork('pose-rest', '休息', '闭眼盘腿，把情绪收回来。'),
    artwork('pose-dance', '开心', '张开双臂，裙摆跟随转身。')
  ],
  scenes: [
    artwork('scene-route', '出发 · 广场读图', '用地图、视线和地面的黄色路线，引导观众从角色读到下一站。'),
    artwork('scene-discovery', '发现 · 公园找币', '用跪姿和暖光把视线落到金币，呈现找到线索后的惊喜。'),
    artwork('scene-celebration', '庆祝 · 举币跃起', '用腾空动作抬高金币，让它成为任务完成后的分享画面。')
  ],
  stickers: artwork('pose-stickers', '六张聊天表情', '以原始动作与神态为基础，搭配日常短句。'),
  toys: [
    artwork('toy-studio', '捧币款手办', '概念图以浅蓝圆台衬托角色，哑面制服、珊瑚红发和金属感金币采用不同的表面质感。'),
    artwork('toy-packaging', '外盒与陈列', '外盒以线索路径和奖章作图形线索，搭配完整捧币造型。', true)
  ],
  promo: [
    artwork('promo-poster', '活动主视觉海报', '用角色、金币和寻宝路线建立活动识别。', true),
    artwork('promo-social', '社媒宣传卡', '把寻宝邀请压缩进适合社媒信息流的 4:5 画幅。', true)
  ],
  promoBanner: artwork('cover', '横版角色主视觉', '以完整跃起姿态适配横版传播，金币和帽徽留在标题区域之外。'),
  guide: asset('character-guide.pdf'),
  stickerZip: asset('officer-stickers.zip')
};
