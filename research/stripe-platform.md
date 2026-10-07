# Stripe — 彩带与金融产品矩阵

观察日期：2026-10-07。公开参考页：[https://stripe.com/](https://stripe.com/)。

## 直接观察与证据

CUA实访英文首屏：白底原始设计被浏览器Dark Reader改为深色，存在data-darkreader标记；因此颜色采用早先保存的官网浅色截图及官网素材，而不复制扩展变色。主标题计算字号48px。源码/素材核验得到Söhne、wave-fallback-desktop、终端和收款背景。首屏及六类产品、全球规模、企业客户四个区域为还原范围。

同日原站截图：[research/screenshots/stripe-platform-source.png](../research/screenshots/stripe-platform-source.png)。

## 第一方资料及交互规范

- [Stripe 公开首页](https://stripe.com/)（实例）：第一方web正文和CUA首屏核验；当前英文版连续主标题、彩带、六类产品与客户案例。
- [Connect frontend design](https://stripe.com/blog/connect-front-end-experience)（理论）：2017第一方设计文章：复杂功能保持轻盈、产品界面就地展示。历史理论，不作为当前CSS证明。
- [WAI Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)（规范）：为客户案例和产品选择提供键盘方向键、选择状态参考；本地不是官网完整组件实现。

Stripe第一方Connect文章提出让复杂平台功能在前端保持清楚与轻盈；文章写于2017，本地把其原则用于产品矩阵，不把它描述为2026官网团队的当前设计说明。

## 分析推断

- 一段连续的大字号叙述同时给出平台定位与交易规模。
- 彩带提供品牌识别，细框线与产品界面维持金融工具的秩序。
- 用产品而非抽象图形展示收款、订阅、卡片与平台能力。
- 同一套主色用于核心行动，低饱和背景区分不同金融产品。

以上是对已观察页面的分析，除明确标注的来源内容外，不冒充官方作者意图。

## 复现映射

| 原站观察/机制 | 本地映射 | 差异/边界 |
|---|---|---|
| 首屏彩带 | 官方wave.webp + Söhne与段落式48px标题 | 静态图替代原站动态渲染 |
| 产品矩阵 | 六类产品、小圆角、真实终端与支付背景 | 其余界面由本地HTML绘制，金额为示例 |
| 企业案例 | 四项可切换介绍 | 原站内容仅局部摘要，未复制全部品牌故事 |

## 约束与差异

- 以2026-10-07官网版本为基准，2017设计文章仅作历史理论。
- 官方彩带使用静态回退图，不宣称复现原站WebGL渲染。
- 下载素材及字标保留原比例，不把品牌资产用于新商标。
- 金融指标为官网日期快照，界面金额为本地样例。
- 自然滚动；移动端卡片单列，菜单和弹窗可键盘关闭。

原站彩带的实时渲染、完整推荐器、新闻轮播未实现。客户字样中部分用文字代替专门字标；产品小界面为结构复现，非每个组件像素级复制。注册、登录、销售不连接服务器。

## 本地材料

- [Demo](../demos/stripe-platform/index.html)
- [完整Prompt与设计约束](../entries/stripe-platform.json)
- [素材清单](../demos/stripe-platform/assets-manifest.json)
- [还原说明](../demos/stripe-platform/fidelity.md)

私人学习记录；品牌与媒体版权保留给品牌及原作者。


## 2026-10-07 动效复审补正

实访导航pointer进入、产品矩阵与masked terminal transform 0/-100/-200%，首行Payment810×676/Billing400×676；官方样式只读核验。

Products导航真实mouseenter展开；客户标识循环横移；Payments终端文字在mask内向上滚动，checkout同步换商户/商品。每轮5秒/.75秒为局部近似。官方彩带仍使用静态fallback，未冒充WebGL动画。

原站彩带是canvas渲染，静态wave.webp仅是官方fallback；不能给静图添加任意抖动并宣称原站等价。付款自动状态与hover是不同触发。

本次原站操作、源码证据、observed/approximation/unavailable与本地实操详情见 [产品动效审计](MOTION-AUDIT-PRODUCTS.md)。旧观察的失联说明仅指早一轮，不覆盖本次成功实访；Claude和Qoder具体限制以上述复审为准。


### 波带源码隔离结果 · 2026-10-07

首屏波带已从官方公开 chunk 提取20个 SingleWave / Three.js r178 渲染模块，保留原折叠网格、vertex/fragment shader、配色纹理及 wide gj / medium P1 / small y7 配置（speed=4e-5，timeOffset=17500）。独立本地 loader 替代 Next/React运行时；Worker URL 指向本地文件。没有复制账户、统计、完整站点组件。新增本地暂停按钮；菜单/对话框打开及视口外/文档隐藏时暂停，reduce或GPU不可用时显示官方fallback。轮播/支付UI与源时序分开记录，不把这条缎带变成任意CSS摆动。

第一方模块来源：[https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/chunks/73692-415e845f6c581657.js](https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/chunks/73692-415e845f6c581657.js)；[Three.js core](https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/chunks/3dfade9e-4ca93d92ac876e62.js)、[Three.js renderer](https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/chunks/c67c952e-5362035f70172687.js)。源home index明确j={wide:P.gj,medium:P.P1,small:P.y7}，并非同文件其他EK/WD/nl模型。提取20个纯渲染模块后本地浏览器验证帧数/时间实际变化与暂停冻结，完整URL清单在资产provenance。
