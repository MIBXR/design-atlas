# Claude — 衬线语气与 Cowork 演示

观察日期：2026-10-07。公开参考页：[https://claude.com/](https://claude.com/)。

## 直接观察与证据

CUA实访claude.com，主标题计算72px、AnthropicSerif；左栏标题/注册框/下载按钮，右栏圆角cowork-login-hero.mp4。初次Edge观察受Dark Reader影响，后续Root已在IAB核验公开官网并保存干净source.jpg；最终原站对照以清洁截图为准，本地浅底依据其配色与原始样式。后续一次导航自动去claude.ai/login，因此立即停止该路径，不读取任何账户内容。匿名HTML核验公开营销信息及品牌SVG。

## 第一方资料及交互规范

- [Claude 公开官网](https://claude.com/)（实例）：2026-10-07 CUA首屏及匿名HTML核验，Think fast/build faster、Cowork视频、Individual/Team计划。
- [WAI Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)（规范）：套餐受众切换的选择态和方向键参考。
- [WAI Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)（规范）：FAQ展开、键盘操作和状态表达依据；本地采用原生details。

没有将未取得的Claude品牌策略文章编造成设计意图。视觉原则是对首屏的分析推断；交互约束来自W3C Tabs与Accordion规范，分别映射套餐分类和FAQ。

## 分析推断

- 衬线大标题建立思考伙伴的语气，产品视频承接实际工作。
- 注册框在首屏即可辨识，操作层级集中而短。
- 温暖中性色与陶土品牌符号组合，保持低饱和。
- 套餐切换和FAQ减少一次性信息负担。

以上是对已观察页面的分析，除明确标注的来源内容外，不冒充官方作者意图。

## 复现映射

| 原站观察/机制 | 本地映射 | 差异/边界 |
|---|---|---|
| 衬线首屏 | 真实AnthropicSerif、72px、注册卡/视频左右结构 | 原始品牌SVG与视频本地化 |
| 注册展开 | email按钮切换表单、有效邮箱后本地反馈 | 不发送、不创建账号 |
| 套餐与FAQ | 受众/账期切换、原生details | 计划信息为日期快照 |

## 约束与差异

- 公开claude.com版本为基准，不读取claude.ai已登录账户。
- 使用实际官网字标、Anthropic字体和Cowork视频。
- 初次Edge观察受扩展变色影响，已由Root IAB补清洁公开官网截图；本地配色依据该截图与官网原始样式。
- 邮箱输入只在浏览器内，不发送、不创建账户。
- 套餐为2026-10-07快照，实际价格通过官方入口查看。

没有复现服务器认证、SSO、真正下载或订阅。视频为官方本地文件；reduced-motion暂停时没有原站视频poster，保留首帧。完整企业产品导航与所有FAQ未全量复制。

## 本地材料

- [Demo](../demos/claude-platform/index.html)
- [完整Prompt与设计约束](../entries/claude-platform.json)
- [素材清单](../demos/claude-platform/assets-manifest.json)
- [还原说明](../demos/claude-platform/fidelity.md)

私人学习记录；品牌与媒体版权保留给品牌及原作者。


## 2026-10-07 动效复审补正

本次官网Edge重定向到claude.ai后停止；root IAB同样重定向并遇Cloudflare。匿名claude.com HTML/CSS仍200取得；本地25.567秒媒体及按钮实操通过，源时序 unavailable。

保留官方Cowork视频静音loop、真实media事件驱动播放/暂停按钮与reduced-motion更新；本次原站重定向/Cloudflare，未给源页面hover或scroll添加未经现场核验的新动画。

2026-10-07动效复审无法在Edge或IAB打开未登录claude.com首页；本地媒体可操作不等于本次验证了原站所有hover/scroll时序。

本次原站操作、源码证据、observed/approximation/unavailable与本地实操详情见 [产品动效审计](MOTION-AUDIT-PRODUCTS.md)。旧观察的失联说明仅指早一轮，不覆盖本次成功实访；Claude和Qoder具体限制以上述复审为准。
