# 赛马娘国际页：群像赛道与斜切叙事

研究日期：2026-10-07。地区版本：国际英文官网 [Umamusume: Pretty Derby](https://umamusume.com/)。[官方 App Store](https://apps.apple.com/us/app/umamusume-pretty-derby/id6480433538) 将此域名列为游戏官网。日本门户 umamusume.jp 在本次 Edge 研究中连接关闭，因此没有把它的版式写入此次复现。

## 直接观察到的事实

- 桌面页面主容器最大约2000px，首屏是一整幅绿色赛道群像KV。官网在图片中使用人物纵深、跑道弧线和明暗建立运动方向，没有通用的文案/产品卡片双栏。
- 下载徽章在首屏左下侧；右侧是竖向站名与滚动提示，下载附近有官方社交入口。390px官网载入独立竖版 `kv.CNY-_2Hw.avif`，并非简单缩小横版。
- 后续顺序是 News、About、Gameplay、Characters、Media。News 是日期/分类与标题组成的横向条目。About 有预告缩略图。Gameplay 有三态、前后箭头、可选择的页码；训练、学园互动和比赛分别有对应立绘与竖屏画面。
- 荧绿倾斜标题带、白色斜线和斜切说明板反复出现。官方图片与路径已从可见DOM、图片加载资源记录核验，存入本地assets。
- 没有获得可直接复用的官网BGM。本地预告按钮连接 [官方国际版发布预告](https://www.youtube.com/watch?v=uCaWqXP54Mc)，不冒充本地音频播放。

## 设计判断（推断）

大群像让已有角色粉丝迅速找到熟悉角色，也让新访客先感受规模和活力。斜切语言与赛道、奔跑姿态的前进方向协调；它同时将静态新闻和玩法连接到竞技主题。这是基于构图的推断，不是官方公开的设计意图。

## 规范与约束

[W3C轮播教程](https://www.w3.org/WAI/tutorials/carousels/) 要求使用者可以控制轮播、通过键盘操作，并理解当前项。局部demo采用手动切换，更新图片、说明与aria-pressed状态；不使用定时翻页。[W3C交互动效说明](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) 的AAA条款强调可关闭非必要交互动效，本地取消减少动态模式下的平滑滚动与位移过渡。

## 本地映射

`demos/uma-musume/index.html` 保留官方首屏KV、下载徽章、荧绿斜切标题、新闻条目、倾斜预告框和三态玩法叠合结构；本地Sections工具菜单与说明页是教学补充。Characters/Media完整区、动态运营接口、Cookie弹层、商店营销浮窗没有复制。详细差异见demo中的 `fidelity.md`。新闻是2026-10-07调研时的简化快照，链接仍指向真实公告，不是实时服务。

所有素材来源、文件尺寸与用途见 `assets-manifest.json`。官方图像和商标权利归 Cygames，私人学习范围不代表获准公开再发布。

## 2026-10-07 动效补审更新

实点Gameplay Next，Splide list为translateX(-2000px)，transition:transform 400ms cubic-bezier(.25,1,.5,1)；初始Previous disabled，中间两箭头可用。已替换瞬时换图为完整三面板滑轨，并补首尾禁用状态。源站人物集合滚动带和完整官网内容不在局部实现范围；教学菜单/PV说明框仍明确是本地新增。

本轮记录优先于初版的静态/手动实现描述。原站触发、脚本证据、实际手机/键盘验证与诚实限制见 [十例动效审计](MOTION-AUDIT-GAMES-ART-JP.md#uma-musume)。
