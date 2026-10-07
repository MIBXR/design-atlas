# Stripe：彩带与金融产品矩阵

观察日期：2026-10-07。参考：[公开页面](https://stripe.com/)。原站内容以该日期与语言版本为准。

## 设计特点与分析

48px连续段落式定位置于细框线内容区；Söhne、海军蓝文字、紫色小圆角按钮与橙粉紫彩带协作。产品以不同底色和跨度呈现，Payments约810×676、Billing约400×676；后续全球指标与客户案例连接规模和业务证据。

彩带建立识别，网格和真实支付界面提供秩序；产品矩阵把抽象基础设施转换成可理解的业务模型。这是页面分析。

## 交互机制与复现映射

| 触发与元素 | 原站观察／公开源码 | 本地实现与差异 |
|---|---|---|
| 首屏波带 | 画面随时间形变；SingleWave模块67103/59168/19622定义控制器、网格/材料和配置。Home为gj/P1/y7。 | 隔离20个渲染模块及Three.js r178；保留folded mesh、原shader、light palette、640/1264响应式相机。speed=4e-5、timeOffset=17500、introTimeRamp每render+.016。 |
| Products指针进入 | 菜单展开；原站触发为指针进入。 | mouseenter幂等展开，click/keyboard、Esc及外部点击可关闭；.18秒过渡和140ms离开延迟为本地近似。 |
| 客户标识行 | 连续向左平移。 | 双份clip marquee，35秒周期为近似；部分字标以文本呈现。 |
| 付款UI时间轮换 | terminal文本在mask内translateY(0/−100/−200%)；ROASTERY→SHOWFLIX时商户、金额、checkout商品与颜色同步。 | 三种本地DOM场景；5秒间隔、.75秒过渡为近似，视口内循环。该状态由时间触发，额外hover shader高光未确认。 |
| 产品与客户操作 | 产品入口、业务模型和企业介绍。 | 产品说明/业务模型和四客户tab；账户、支付与销售不连接后台。 |

![Payments：终端文本与checkout在同一场景中联动](../previews/stripe-payment-motion.jpg)

## 理论与约束

2017 Connect文章解释复杂功能的轻盈、就地呈现，是历史理论。WAI Tabs用于本地选择状态与键盘。WebGL暂停按钮、菜单/对话框暂停、离屏/后台停渲染为本地适配；reduce/GPU失败显示官方fallback。容器裁切、标题混色、完整Billing及其他金融演示、推荐器和新闻未完整复现。源截图为中文，本地正文使用同日英文版。渲染来源及适配见[wave-provenance.json](../demos/stripe-platform/assets/wave-provenance.json)。Three.js core与renderer出处保存在该清单。

## 来源与材料

- [Stripe 公开首页](https://stripe.com/)（实例）：2026-10-07首页：Products指针进入展开、客户标识左移、Payments/Billing跨度与终端竖向换场景。
- [Connect frontend design](https://stripe.com/blog/connect-front-end-experience)（理论）：2017第一方文章解释复杂平台功能的轻盈呈现与就地产品展示；属于历史设计理论。
- [WAI Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)（规范）：客户案例与产品选择的键盘、选择状态参考。
- [Stripe 当前页产品样式](https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/css/0b96456ec501769a.css)（实例）：产品矩阵、终端mask和菜单的具体组件样式。
- [Stripe SingleWave 官网组件、shader与三档相机配置](https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/chunks/73692-415e845f6c581657.js)（实例）：模块67103控制器、59168网格/材料、19622配置；home presets gj/P1/y7，20个纯渲染模块。

[原站对照](screenshots/stripe-platform-source.png) · [Demo](../demos/stripe-platform/index.html) · [完整Prompt与设计元素](../entries/stripe-platform.json) · [还原范围](../demos/stripe-platform/fidelity.md) · [资产来源](../demos/stripe-platform/assets-manifest.json)。品牌与媒体权利归原作者。
