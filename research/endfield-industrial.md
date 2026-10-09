# 终末地：从完整门户理解明亮工业语言

归档 **2026-10-09**，[中国大陆官网](https://endfield.hypergryph.com/)。研究覆盖当日八章公开门户。干员/玩法/AIC的白底亮黄是其中一种分区语言；活动首页是雪凇幽梦，世界观是深色点云，不能把整站概括为同一黄绿卡片。

## 一手观察与源码证据

主负责人实际浏览黑/黄Updating、活动首页、干员与2D→3D、世界观和其他分区，并通过浏览器开发工具采集原DOM/CSS、portrait规则、公开Next数据与资源。静态抽取只解析JSON/literal与模块引用，不执行原bundle；模块原URL/hash及偏移可回读。当前干员模块18039是35项，中文layout另有26项旧数组，不可混用。35项各有头像/立绘/肖像/enter/idle，共175资源，元数据与中文flat文本映射完整。

源“3D”不是人物网格。实际祀影片3840×1080左右RGB/alpha合成1920×1080透明canvas；源码alpha=R*.3+G*.59+B*.11，enter ended换idle循环。世界观另有六个原Float32 xyz点云：帝江号、锚点、集成工业系统、天师桩、天使、裂地者，无header，按Y跨度1900规范化后应用各模型offset/pivot/scale/laser参数。静态算法与资源存在不自动证明扫描、拖动、转场和边缘与原站一致。

影像有10项真实标题/日期/分类和预览，玩法四项为视频、AIC五项为图片。原相册黑→黄→媒体400ms各delay0/250/500，文字500/500ms。原公告采用左clip500ms与Y30%组件600ms入场，延迟300ms后卡片300ms横移。原CSS字体、斜线大字、网格/mask、媒体书脊与自然滚动构成比仅配色更有辨识度。

## 交互声音

干员页用短促机械音确认操作，头像悬停不发声。当前官网实测以下四段均进入实际 `playing` 状态，音量为 `1`；重复点击已选头像仍播放，双击会让两个音频对象重叠。

| 操作 | 官方音效 | 浏览器读取时长 |
| --- | --- | --- |
| 选择头像、2D/3D切换 | [char_click.beff5b.mp3](https://web.hycdn.cn/endfield/official-v4/_next/static/media/sound/char_click.beff5b.mp3) | 0.625秒 |
| 上下翻动头像轨道 | [arrow_click.a72c10.mp3](https://web.hycdn.cn/endfield/official-v4/_next/static/media/sound/arrow_click.a72c10.mp3) | 0.217秒 |
| 手机展开人物档案 | [char_detail_enter.babc4e.mp3](https://web.hycdn.cn/endfield/official-v4/_next/static/media/sound/char_detail_enter.babc4e.mp3) | 1.467秒 |
| 手机关闭人物档案 | [close_click.fe1dc4.mp3](https://web.hycdn.cn/endfield/official-v4/_next/static/media/sound/close_click.fe1dc4.mp3) | 0.435秒 |

[源码8858模块26097](https://web.hycdn.cn/endfield/official-v4/_next/static/chunks/8858-4aae27eec09dc3ad.js)使用10个 `HTMLAudioElement` 的池，检查持久化 `ef-official-sound-control.enabled`，同音效可叠加，池空时忽略新声，结束后归还槽位；关闭只阻止后续短效。[Header源码226](https://web.hycdn.cn/endfield/official-v4/_next/static/chunks/226-a3c1ec0fe1472086.js)将PC及手机喇叭连到同一全局状态，并同时控制循环BGM；手机关闭时换静音SVG及 `#cccccc`，开启时用原喇叭SVG。BGM独立淡入淡出并在后台暂停，源码配置桌面音量1、移动UA音量0.1，与短效固定音量1分开。

本地沿用四段原始短效和10槽叠加；关闭声音或进入后台时立即停止已响短效，是本地控制策略。目录卡片选择复用头像反馈，属于网页内的迁移；已采集首页“全部干员”仅打开官方目录，独立目录的选卡音效尚未核验。源码偏移及逐段出处见[来源映射](../demos/endfield-industrial/source-provenance.json)。

## 实现与可提取机制

[本地八章](../demos/endfield-industrial/index.html#operator)恢复原CSS/字体、35目录与真透明视频、六点云、10影像、日历、4玩法/5AIC与公告。35位人物完整中文介绍从当前简中文本映射提取，逐key及原值哈希核对；正式业务仍进入官方。原[明日方舟案例](../entries/arknights-world.json)的暗灰青色全屏档案与[莱茵影像](rhine-lab.md)的米白橙色有不同媒介与状态证据，不能混为一句“方舟风”。

[斜线注册大字与前景记录](../patterns/hatched-registration-type.json)抽取装饰尺度/记录层级，原源shallow背景opacity .05、纹理 .75rem及mask可回读；[竖向类别书脊与横向媒体](../patterns/vertical-media-spine.json)抽取类别与媒体的共同边界。既有[单一信号色](../patterns/restrained-signal-color.json)继续复用，不按品牌重复建“黄绿工业”分类。

按[W3C Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)让选中状态同时有名称/边界/程序状态；[交互动画](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)为减少动态的设计依据，不给官网作合规认证。当前源码与实现覆盖已核对，最终浏览器1440/390/键盘/减弱动态/失败/反向状态仍由主负责人补证；[状态矩阵](../demos/endfield-industrial/state-matrix.md)明确pending，不能提前全面pass。

首版把页面主动缩成单人/单工业图并新增教学放大和说明，遗漏真实目录、影片、点云与大部分章节；本轮删除这些替代。完整来源/hash/资源变换见[清单](../demos/endfield-industrial/assets-manifest.json)与[范围说明](../demos/endfield-industrial/fidelity.md)。
