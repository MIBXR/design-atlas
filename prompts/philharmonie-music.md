# 巴黎爱乐厅 · 音乐展与音乐会详情 · 复用 Prompt

由 [结构化案例](../entries/philharmonie-music.json) 自动生成。参考观察与具体边界见 [调研](../research/philharmonie-music.md)。

## 正向 Prompt

以2026-10-07实访的巴黎爱乐厅Video Games & Music法语展览详情为基准，使用官方游戏手柄字母主视觉、两张Joachim Bertrand现场摄影、官方Philharmonique Regular/Bold大写标题与sprite字标；正文使用完整小写字形的Arial替代原站Source Sans Pro，禁止将大写展示字体套到正文，另将真实George Benjamin音乐会作为相关文化内容。桌面保留48px深蓝快速导航、105px白色主导航、中间174×197px下垂品牌区域；625px活动主图加下缘海军蓝渐变，左下38px大写活动名和23px日期，右侧白色16px圆角票务面板上浮约254px。正文左宽右窄约2:1，侧栏原生sticky，但禁止滚动锁屏。票务包含真实日期、预约官网链接和Horaires/Tarifs/无障碍折叠行；两张展览照片按原站顺序穿插正文，不改成轮播。音乐会区用George Benjamin真人图、23Oct2026 20h00、阵容和可展开的四部节目。390px简化导航中轴字标、主图约380px，票务进入正常文档流置正文之前，摄影与节目单单列。prefers-reduced-motion关闭平滑滚动，不加载追踪和第三方视频。版权与本地学习说明放页末，预约跳转官方站点。 音乐会人物摄影使用原站George Benjamin、Ayano Kamei、John Stulz三人图与署名，保留观察到的500ms水平滑轨和前后/暂停控制，自动间隔未取得时明确标为本地近似。

## 负向约束

不要把音乐展做成像素游戏伪官网，不捏造演出日期，不模拟购票成功，不用同一软件产品模板排列所有文化内容，不将Dark Reader黑底当作原始品牌设计。

## 制作约束

- 使用官方Video Games & Music主图、展览摄影、George Benjamin摄影与sprite品牌标识。
- 桌面主图625px高，左正文约2/3，右侧白色16px圆角票务面板跨越主图和内容边界。
- 手机导航精简，票务面板进入正常流优先显示，不粘在窄屏覆盖正文。
- 音乐会日期须来自真实详情；历史Juke-box场次不当作未来可预订事件。
- 原站视频受第三方cookie控制，本地不嵌入YouTube或追踪脚本。
- 只有原生滚动，无闪烁像素特效；reduce motion关闭平滑滚动。

## 检查方法

再选择一场经过官方核验的音乐会，对照节目/阵容结构，保留展览与音乐会信息表达差异。

[查看 Demo](../demos/philharmonie-music/index.html) · [返回参考库](../index.html#style/philharmonie-music)
