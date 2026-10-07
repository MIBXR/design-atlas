# Persona 5 Royal · 黑金角色拼贴 · 局部保真说明

- 真实页面：[https://persona.atlus.com/p5r/?lang=en#](https://persona.atlus.com/p5r/?lang=en#)
- 实访日期：2026-10-07；源截图：[当前真实页面](../../research/screenshots/persona-kinetic-source.jpg)
- 实现类别：reference-study；用户授权品牌/官方公开素材用于本地私人研究。

## 对应区域与机制

当前英文 Royal 官网：SEGA 顶条、红色平台条；黑金首屏，中心群像，左金色剪貼标题与PV、右 Available Now、中央下部 P5R Logo。角色区切入暗红网点，巨型主人公与阿尔赛纳，左档案、底部人物肖像、右学校制服/怪盗服切换。

本地构成：中心大型群像+左右独立标题；全幅红色角色舞台；倾斜昼夜画面。

官方 Royal 群像、真实主人公/龙司/杏及各自制服、怪盗服、对应Persona；昼夜两种生活以官方游戏截图连接。

- 三角色切换同步姓名、身份、配音、真实立绘与Persona。
- 学校制服/怪盗服两个独立素材真实切换。
- PV按钮进入官网脚本所用英文 YouTube 宣传片；不伪称本地BGM。

## 仍有差异

- 本地3人档案，原站完整角色数量更多；不复现全部资料。
- 用CSS光线替代完整官网星芒/动效；字标、角色与主要标题使用官方素材。
- PV跳转官网实际英文视频，不内嵌年龄验证或第三方播放器。
- 购买按钮去真实官网平台入口，无本地交易流程。

## 素材与声音

所有已取得的公开素材见 [assets-manifest.json](assets-manifest.json)，包含实际URL、用途、格式、像素尺寸/媒体信息、处理方式与版权归属。没有打包原站SDK、账号或分析脚本，也没有嵌入原站整页。素材权利归原品牌，使用范围为本库私人学习。

音频均默认关闭；实际播放成功与失败状态由按钮和状态区呈现，页面隐藏时暂停。Persona/原神的未核验BGM不会以自作音频替代后标成原曲。

## QA

浏览器截图与控件测试结果将在本条 QA 记录补充；没有把静态源码检查等同完整可用性验证。

## 浏览器实测 · 2026-10-07

- 桌面设置 1440×1000、手机设置 390×844；正文/文档宽分别约 1424.8/1425 和 375.2/375 CSS px，无横向溢出。全部图像加载成功。
- 实际点击坂本龙司及 SCHOOL UNIFORM，姓名更新为坂本龙司，角色图变为 ryuji-school.png，Persona 变为 captain-kidd.png，选中状态更新。
- 本地无未核验的背景音乐；有声官方英文 PV 按钮使用原站公开的 YouTube ID `gGXpOFD0SDs`，不自动播放。
- 桌面与手机真实截图：`../../previews/persona-kinetic.jpg`、`../../previews/persona-kinetic-mobile.jpg`。

截图由 CUA 在 Edge 浏览器保存。视口设置与浏览器实际截图像素不同：桌面 JPG 约 1425×990，手机 JPG 约 375×811；不放大或伪造分辨率。音频自动播放拒绝分支与 reduced-motion 降级均在代码中处理；本次未模拟浏览器拒绝或系统 reduced-motion 设置，不将它们记为已实测。

## 动效补审 · 2026-10-07

实点官方Next到Kasumi，slick-track变为translate3d(-1305px,0,0)；官方配置infinite:false，默认Slick速度500ms。服装按钮使当前chara-box增加on。已补500ms角色整体横移、边界及暂停光点。首屏kv-canvas/bg-stars和两帧截图确认可见金色闪光变化；本地光点曲线、周期7s为原创近似，未运行PIXI。此次源站Canvas角色群像未完整出现；不以该失败状态推断角色登场轨迹。三人子集不包含源站第二位Kasumi；服装状态未复刻全部层变换。

验证说明：1440×1000桌面和390×844手机均实际操作。减少动态采用本页`?motion=reduce`应用级入口测试，系统prefers-reduced-motion当时为false，没有更改系统/浏览器设置。它覆盖同一降级逻辑，但不等同于OS偏好切换实测。完整观察与验证见 [十例审计](../../research/MOTION-AUDIT-GAMES-ART-JP.md#persona-kinetic)。
