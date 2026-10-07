# Qoder：中国站工作台与多形态平台

观察日期：2026-10-07。参考：[公开页面](https://qoder.cn/)。原站内容以该日期与语言版本为准。

## 设计特点与分析

中国站用约66px导航、约110px起的36px双行左标题和右说明，Qoder CN字标约123×26px。约y332起#80c777绿色工作台满幅铺开，无外层圆角；白色主区与浅灰侧栏区分品牌底景和应用内容。国际版促销/Qwen标签不属于这一版。

应用工作台先提供任务与上下文证据，再按使用形态解释入口；绿色大面建立品牌识别，产品内容保持中性色。产品族文档的理解、计划、执行、验证与迭代用于流程组织，是产品理论而非视觉作者声明。

## 交互机制与复现映射

| 触发与元素 | 原站观察／公开源码 | 本地实现与差异 |
|---|---|---|
| Hero路径 | 公开样式：路径1为13.824s linear flow与4.8s ease-in-out breathe；路径2为16.64s/6.4s，delay−18s/−4.8s；焦点3.8s cubic-bezier(.4,0,.2,1)。 | 保留时序，SVG曲线及焦点位置为局部近似。 |
| 五平台ProductShowcase | 公开2071脚本：tab onClick、Swiper speed400、autoplay delay20000、pauseOnMouseEnter、mobile allowTouchMove。 | 400ms横向进退、20秒自动、鼠标进入暂停、点控/手动暂停/手机滑动；减少动态即时切换并停止自动。 |
| 四项FeatureSection | 另一个组件为mouseenter、10秒自动，image y100%→0→−100%、150ms。 | 未迁移；该时序不用于五平台轮播。 |
| 模式与任务 | 源演示模式动作未现场核验；公开首页预览无iframe。 | 编码/通用、任务回执与协作展开为本地模拟，不调用模型。 |

## 理论与约束

五平台与协作章节仅局部研究，不称CN首页所有后续区域等价。官方SVG、手机图与CN字标本地保存；Instrument Sans未取得，回退Arial/Microsoft YaHei。移动端重排核心UI、收束侧栏，tab只在自身容器横滚；完整Agent SDK、QoderWake、企业条款和真实在线任务未覆盖。

## 来源与材料

- [Qoder 中国站官方网站](https://qoder.cn/)（实例）：2026-10-07中国站：CN字标、36px标题与全幅绿色工作台；公开首页样式给出路径/焦点时间。
- [Qoder 产品族官方定义](https://docs.qoder.com/product-series/what-is-qoder)（理论）：第一方文档定义理解、计划、执行、验证与迭代的产品循环及多形态职责。
- [WAI Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)（规范）：模式与平台选择的语义、选中状态和方向键参考。
- [Qoder 当前公开组件脚本](https://qoder.cn/_next/static/chunks/2071-0dba5db130b82f90.js)（实例）：ProductShowcase为Swiper speed400、delay20000、pauseOnMouseEnter及mobile touch；FeatureSection为150ms纵向和10秒循环。

[原站对照](screenshots/qoder-platform-source.jpg) · [Demo](../demos/qoder-platform/index.html) · [完整Prompt与设计元素](../entries/qoder-platform.json) · [还原范围](../demos/qoder-platform/fidelity.md) · [资产来源](../demos/qoder-platform/assets-manifest.json)。品牌与媒体权利归原作者。
