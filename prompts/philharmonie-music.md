# 巴黎爱乐厅 · 音乐展与音乐会详情 · 复用 Prompt

由 [结构化案例](../entries/philharmonie-music.json) 自动生成。参考观察与具体边界见 [调研](../research/philharmonie-music.md)。

## 正向 Prompt

为[音乐展/有节目单的文化活动]制作巴黎爱乐厅法语Video Games & Music展览详情的局部研究，以2026-10-07快照为准，相关内容采用George Benjamin真实音乐会。桌面保留48px深蓝快速导航、105px白色主导航、中轴174×197px下垂官方sprite品牌；625px蓝色游戏手柄主图，下缘海军蓝渐变托住38px大写活动名和23px日期。右侧16px圆角白票务面板上浮约254px，正文/侧栏约2:1并用原生sticky；手机票务回正常流先于正文，不锁定滚轮。Horaires/Tarifs/Infos Accessibilité用原生details，展期2026.04.02–11.01，预约仅跳官方。两张Joachim Bertrand展览现场图按顺序穿插正文，不做轮播。相关音乐会为2026.10.23 20h00、约2小时含一次中场，Programme & distribution展开四部真实节目和阵容；George Benjamin/Ayano Kamei/John Stulz三幅署名摄影用500ms水平轨道，前后/暂停与触摸可操作。500ms来自观察，ease及6秒自动间隔为本地近似；指针、焦点、离屏和后台停止推进，减少动态仅手动即时切换。音乐会内联区域比独立原详情小，应说明边界。官方Philharmonique仅用于大写标题，正文Arial近似Source Sans Pro，禁止缺小写字体套正文。保留Playlist官方外链，不复制第三方cookie视频、追踪、账号和售票后端；记录素材URL、尺寸、hash、作者署名和真实未复现范围。

## 负向约束

不要把音乐展做成像素游戏伪官网，不捏造日期或购票成功，不套相同软件产品卡片，不把展览顺序摄影改成轮播。

## 制作约束

- 使用官方Video Games & Music主图、展览摄影、George Benjamin摄影与sprite品牌标识。
- 桌面主图625px高，左正文约2/3，右侧白色16px圆角票务面板跨越主图和内容边界。
- 手机导航精简，票务面板进入正常流优先显示，不粘在窄屏覆盖正文。
- 音乐会为2026.10.23 20h00的George Benjamin场次，日期/阵容/节目按2026-10-07官方快照。
- 原站视频受第三方cookie控制，本地不嵌入YouTube或追踪脚本。
- 自然滚动；展览摄影静态顺序阅读，音乐会滑轨可暂停，减少动态仅手动即时切换。

## 检查方法

再选择一场经过官方核验的音乐会，对照节目/阵容结构，保留展览与音乐会信息表达差异。

[查看 Demo](../demos/philharmonie-music/index.html) · [返回参考库](../index.html#style/philharmonie-music)
