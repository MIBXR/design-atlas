# The Met · 编辑式展览与馆藏陈列

研究日期：2026-10-07。版本：2026-10-07；英语公开官网局部。实际参考URL：[https://www.metmuseum.org/en](https://www.metmuseum.org/en)。

## 第一方来源与可观察证据

1. [The Met official English homepage](https://www.metmuseum.org/en) — 实例。2026-10-07 CUA实访；官网按浏览器语言初转中文，明确访问/en得到英语结构；Root保存干净IAB1440×1000截图。
2. [The Met Image and Data Resources](https://www.metmuseum.org/policies/image-resources) — 规范。Open Access政策区分公众领域作品与仍受限制作品，识别OA标记。这里不将官方海报、字体或主页摄影称为CC0。
3. [W3C WAI Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) — 规范。展开按钮控制内容可见性，按钮状态应对应展开/折叠；本地使用原生details/summary或button加aria-expanded。是实现规范，不能证明机构使用该设计理论。

## 原站实访

首页先自动跳转/zh，之后明确访问/en；1440×1000英语首屏建筑摄影约725px高，欢迎标题在下一白底区，标题框宽830px，font-size67.8873px，字体Austin Medium；Now On View桌面约半幅海报且右露下一张；390px导航换白色条并固定，海报约86%宽。Edge Dark Reader使正文黑底、首屏字标变黑；Root通过IAB另存正常白底源截图，本地颜色依官方规则和该正常截图。官网后续可能出现视频播放按钮但此次DOM没有可稳定下载video源，本地使用首帧建筑摄影。

原站截图：[met-museum-source.jpg](screenshots/met-museum-source.jpg)。浏览器采样是当次页面状态，不能视为未来不变。资产URL、下载尺寸、格式及实际SHA256见[资产清单](../demos/met-museum/assets-manifest.json)。

## 八项设计关系

- **color**：白底黑灰字和红色操作层，图像保持展览自己的颜色。
- **typography**：Austin衬线大标题与Inter目录型小文本产生编辑层级。
- **layout**：建筑照片约725px高；欢迎区左右分工；展架外框为白底而不是UI卡片。
- **imagery**：官方Sanity CDN建筑/展览海报与Met collection API藏品图，均本地化。
- **shape**：方角海报与细边CTA，会员区域仅一个轻边框圆角区域。
- **hierarchy**：照片定位实体空间，欢迎区提供行动，实用信息减轻到访决策，展览海报吸引浏览。
- **motion**：横向展览保留相邻海报露出提示浏览；本地增手动左右按钮和预览弹窗。
- **coherence**：字形分工、Met红操作与白底图下文字一致，馆藏照片与海报使用不同图像比例。

## 观察、推断与实现映射

以下设计解释是本研究的推断，不是机构未发表的设计哲学。到访纽约实体馆、正在展览与代表馆藏。先解决实用参观问题，再让展览海报和作品自然展开选择。

| 来源观察或规范 | 本地实现与边界 |
|---|---|
| 原站：Austin欢迎语 + Inter操作文 | 本地：官方字体均本地加载；初次Node请求429后Root IAB pageAssets下载成功 |
| 原站：四列参观信息 + 当前闭馆状态 | 本地：保留结构并标明2026-10-07观察日；不声称任何日期都是闭馆 |
| 原站：无框横向展览/馆藏陈列 | 本地：overflow-x+相邻露出，增左右控制；点击展览为学习预览弹窗 |
| 规范：开放资源和受版权限制资源明确区分 | 本地：清单逐项记URL/用途/hash，主站海报/字体均作为私人学习资源保存 |

## 理论与约束

- 标题用官方Austin Medium，操作文用官方Inter字体；不可用夸张科技字体替代。
- 首屏建筑图与欢迎标题分开；桌面双CTA右对齐，手机转单列。
- 四列实用信息在手机堆叠；展览依靠横向overflow，不让整个页面溢出。
- 展览海报保留原视觉，不在图片上重复绘制标题或大渐变遮罩。
- 日期和闭馆信息标注观察日，不由当前机器日期制造未核验开放状态。
- 官方开放许可只覆盖带OA条件的藏品资源，不涵盖全部品牌、字体与主页摄影。

W3C Disclosure规范用于实现折叠/导航按钮，不用于推断原站团队是否遵循这套规范。机构设计目标只采信其明确发表的说明；视觉判断记录为研究者解释。

## 复用Prompt

以2026-10-07的The Met英语首页为对象制作局部研究，必须使用assets内真实建筑观众摄影、四张当前展览海报、三张代表馆藏、官方Met字标、Austin Medium和Inter字体。首段为宽幅建筑照片，上覆透明渐变导航；第二段在白底安排左侧约68px Austin衬线欢迎标题与右侧红色/细边双CTA，之后四列图标加实用参观信息，明确观察日。展览区不采用卡片底色或大圆角：横向海报带下方标题、展期，下一张露出；馆藏图用较高比例和较小题注；会员区域才使用轻边框大区域。实现顶层导航展开、本地章节搜索、展览预览弹窗、手动左右浏览；到访/会员操作打开官方站点。390px改白色粘顶导航、43px标识、单列标题和信息，海报占可视宽约86%，横向滚动限定展架。保留prefers-reduced-motion即时滚动、原生dialog Escape、清晰焦点。研究说明和版权仅放页末，不占据主页欢迎区。

**避免**：不要深色科技SaaS模板，不用统一圆角卡片阵列，不虚构藏品或展期，不自动轮播，不把Open Access许可扩大到品牌资产。

## 未复现与差异

局部还原英语版前三类内容与会员区域；未复制全部40余展览、账户、票务和完整门户。额外左右按钮、搜索范围、展览预览弹窗为本地学习调整。官网主图可能加载动态媒体，本地仅官方摄影；不能称动画完全一致。Met官方字体由Root的IAB bundle补齐，未因首次429请求失败改用仿造字体。

## 本地验证

桌面和390px手机实际浏览器验证指标与交互结果保存于[qa.json](../demos/met-museum/qa.json)；预览见[desktop](../previews/met-museum.jpg)与[mobile](../previews/mobile/met-museum.jpg)。
