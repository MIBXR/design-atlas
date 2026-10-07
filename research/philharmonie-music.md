# 巴黎爱乐厅 · 音乐展与音乐会详情

研究日期：2026-10-07。版本：2026-10-07；法语展览与音乐会详情。实际参考URL：[https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music](https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music)。

## 第一方来源与可观察证据

1. [Video Games & Music exhibition — official detail](https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music) — 实例。2026-10-07 CUA实访桌面/390px；点击Horaires/Tarifs核验内容，主图和现场摄影从当前DOM提取。展览日期Apr2–Nov1 2026。
2. [Philharmonie saison 26/27](https://philharmoniedeparis.fr/fr/programmation/saison-26-27) — 实例。实访官方季节目，发现音乐会详情链接；不将所有季节目当作当前未结束场次。
3. [Carte blanche à George Benjamin — official detail](https://philharmoniedeparis.fr/fr/activite/concert/29485-carte-blanche-george-benjamin) — 实例。web与CUA双核验23 Oct2026 20h00、阵容、四部节目及约2h含1intermission；正式图片源来自CDN。
4. [W3C WAI Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) — 规范。展开按钮控制内容可见性，按钮状态应对应展开/折叠；本地使用原生details/summary或button加aria-expanded。是实现规范，不能证明机构使用该设计理论。

## 原站实访

实访展览详情、saison26/27和Juke-box contemporain，再打开当前George Benjamin详情。确认Juke-box2026-09-19页面标记事件已过，不用于当前可预约场次；George Benjamin真实日期23Oct2026。展览点击Horaires与Tarifs，核验常规开放时段及15/11/9/6欧分级，折叠正文见源DOM。桌面票务面板跨主图下边缘；主图右下有Feelings/Périmètre署名。Edge安装Dark Reader导致白底/字标色彩受影响，拒非必要cookie后保存无遮挡截图；Root IAB此域连接关闭，未得到正常截图，所以未伪造清洁图。原始CSS bg-white=rgb255255255、bg-navy=rgb0,27,59、bg-lipstick=rgb190,36,79已直接读取，作为实现颜色证据。390px实访首捕出现短暂缩放布局，确认innerWidth390和viewport meta后本地按内容不溢出要求实现适配，不能声称手机逐像素一致。

原站截图：[philharmonie-music-source.jpg](screenshots/philharmonie-music-source.jpg)。浏览器采样是当次页面状态，不能视为未来不变。资产URL、下载尺寸、格式及实际SHA256见[资产清单](../demos/philharmonie-music/assets-manifest.json)。

## 八项设计关系

- **color**：官方CSS核验海军蓝#001b3b、白色面板、#be244f票务和#fdafe3支持入口。
- **typography**：官方Philharmonique标题大写，正文保持分段；原站部分正文Source Sans Pro，本地该部分有字体差异。
- **layout**：主视觉左下活动名，右侧票务面板上浮；长正文与侧栏分工，手机票务回到文档流。
- **imagery**：真实游戏手柄字母CG主图、Joachim Bertrand展览现场、Matthew Lloyd的George Benjamin摄影。
- **shape**：品牌标识下垂矩形、16px圆角内容/票务块、长胶囊按钮；非所有内容统一卡片。
- **hierarchy**：大活动名和日期识别主题，预约按钮和折叠时间/价格解决到访问题，照片和节目单提供内容深度。
- **motion**：保留菜单、折叠详情和手动图库；原站音乐会自动轮播被改为静态照片，差异明确说明。
- **coherence**：统一中轴品牌与蓝色基础，展览用互动现场图、音乐会用阵容/节目单，跨内容类型保持不同表达。

## 观察、推断与实现映射

以下设计解释是本研究的推断，不是机构未发表的设计哲学。音乐展的互动体验和访问时间，以及音乐会的日期、演出阵容与节目。右侧票务区域支持快速查阅时间/价格，正文保留观展体验和真实图片。

| 来源观察或规范 | 本地实现与边界 |
|---|---|
| 原站：中心下垂字标 + 深蓝上条 + 白色主导航 | 本地：真实sprite#logo-pp-vertical与两导航层；小屏收束中轴 |
| 原站：上浮票务、日期、Horaires/Tarifs/Accessibility按钮 | 本地：sticky侧栏与details；复制核验时段/价格摘要，真实预订仍进入官网 |
| 原站：展览现场图片和音乐会节目/阵容 | 本地：两官方照片手动图库；真实George Benjamin图、日期和节目单 |
| 规范：Disclosure键盘与展开状态 | 本地：原生details/summary由浏览器提供状态与Enter/Space行为；不声称整站全面符合WCAG |

## 理论与约束

- 使用官方Video Games & Music主图、展览摄影、George Benjamin摄影与sprite品牌标识。
- 桌面主图625px高，左正文约2/3，右侧白色16px圆角票务面板跨越主图和内容边界。
- 手机导航精简，票务面板进入正常流优先显示，不粘在窄屏覆盖正文。
- 音乐会日期须来自真实详情；历史Juke-box场次不当作未来可预订事件。
- 原站视频受第三方cookie控制，本地不嵌入YouTube或追踪脚本。
- 只有原生滚动，无闪烁像素特效；reduce motion关闭平滑滚动。

W3C Disclosure规范用于实现折叠/导航按钮，不用于推断原站团队是否遵循这套规范。机构设计目标只采信其明确发表的说明；视觉判断记录为研究者解释。

## 复用Prompt

以2026-10-07实访的巴黎爱乐厅Video Games & Music法语展览详情为基准，使用官方游戏手柄字母主视觉、两张Joachim Bertrand现场摄影、官方Philharmonique Regular/Bold与sprite字标，另将真实George Benjamin音乐会作为相关文化内容。桌面保留48px深蓝快速导航、105px白色主导航、中间174×197px下垂品牌区域；625px活动主图加下缘海军蓝渐变，左下38px大写活动名和23px日期，右侧白色16px圆角票务面板上浮约254px。正文左宽右窄约2:1，侧栏原生sticky，但禁止滚动锁屏。票务包含真实日期、预约官网链接和Horaires/Tarifs/无障碍折叠行；图库手动前后切两张原图。音乐会区用George Benjamin真人图、23Oct2026 20h00、阵容和可展开的四部节目。390px简化导航中轴字标、主图约380px，票务进入正常文档流置正文之前，图库与节目单单列。prefers-reduced-motion关闭平滑滚动，不加载追踪和第三方视频。版权与本地学习说明放页末，预约跳转官方站点。

**避免**：不要把音乐展做成像素游戏伪官网，不捏造演出日期，不模拟购票成功，不用同一软件产品模板排列所有文化内容，不将Dark Reader黑底当作原始品牌设计。

## 未复现与差异

以展览详情为主，另把真实音乐会详情局部整合为一个案例的相关内容，原官网这两项是独立URL。未复制长文、所有合作方、第三方视频、newsletter、账户和售票后台。大写标题使用官方 Philharmonique；该展示字体缺少普通小写字形，正文改用 Arial，和原站 Source Sans Pro 有字体差异。展览照片手动图库、音乐会静态人物图是本地学习调整；原音乐会多图自动轮播未复制。源截图存在DarkReader影响，原配色取第一方CSS，不把截图黑底作为原设计。

## 本地验证

桌面和390px手机实际浏览器验证指标与交互结果保存于[qa.json](../demos/philharmonie-music/qa.json)；预览见[desktop](../previews/philharmonie-music.jpg)与[mobile](../previews/mobile/philharmonie-music.jpg)。
