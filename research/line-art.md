# 线描：用绘制顺序解释组成

核验日期：2026-10-07。真实案例为 [Vivus 官方示范站](https://maxwellito.github.io/vivus/) 和 [Codrops 原作者 SVG Drawing Animation](https://tympanus.net/codrops/2013/12/30/svg-drawing-animation/)。它们是开发者/设计师示范，不冒充商业产品官网。

## 已核验事实

- Vivus 官方站对比 delayed、sync、oneByOne 三种绘制方式，提供 replay、rewind、时间函数与场景编排示例。[Vivus](https://maxwellito.github.io/vivus/)
- Codrops 原作者实验展示先描绘轮廓再出现图像，以及先出现网页示意框架的思路。[Codrops](https://tympanus.net/codrops/2013/12/30/svg-drawing-animation/)
- Jake Archibald 的原始说明把虚线长度和偏移关联到路径长度，构成线条逐步出现的机制。[Animated line drawing](https://jakearchibald.com/2013/animated-line-drawing-svg/)
- `stroke-dashoffset` 调整 dash array 偏移，可动画；长度可相对于 `pathLength` 解析。[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dashoffset)

注意版本边界：旧 Vivus README 对特定实现提出“先转为 path”的要求；当前 SVG 的 dash 属性并非只适用于 path。本 demo 全部原创主体路径恰好采用 path，但没有把旧库限制当成现代规范。

## 设计推断

线条适合呈现轮廓、分解与构造。对建筑工作室而言，稳定的线宽、工程标签和空白能表达精确；合理绘制顺序可以让观看者逐步发现组成关系。这是设计推断，不是对用户理解速度的实测结论。

描绘不是等待门槛。只要文字或内容必须等动画播完，优雅感就可能变成延迟。因此本 demo 默认终态，允许手动重播和任意进度回看。

## Demo 映射

原创 Monoline 工作室使用宽标题、固定窄侧栏、通栏建筑线稿与细工具条，区别于通用营销卡片。SVG 画出院落住宅、玻璃墙、树和水面，蓝灰色只用于少量强调。

| 参考机制 | 原创迁移 |
| --- | --- |
| oneByOne / 顺序描绘 | 按基础、屋顶、立柱、窗格、环境顺序出现 |
| 可重播示范 | 3200ms 用户主动触发，默认完整线稿 |
| stroke 偏移 | 每条路径 `pathLength=100`，用归一化进度设置 dashoffset |
| 参数探索 | 滑块控制进度并中止进行中的动画 |

另提供三种项目类型选择，改变咨询说明；该功能服务工作室语义，与线稿工具分开。

## 约束与适用边界

- 路径需以 stroke 表示，填色区域不会因为 dashoffset 自动被绘制。
- 主轮廓与辅助线使用有限层级；小屏不能让细线成为唯一理解方式。
- 不自动隐藏正文、不劫持滚轮、无绘制完毕后的强制弹窗。
- 原生滑块与按钮支持键盘；状态文字 `aria-live` 提供完成信息。
- `prefers-reduced-motion` 下重播显示终态，绘制动画不会使内容消失。
- 适合建筑、工业设计、工艺与结构介绍；照片信息为主时，线描适合作为局部补充。

## 复用入口

[结构化条目与完整 Prompt](../entries/line-art.json) · [独立 Demo](../demos/line-art/index.html)

改造练习：替换成机械产品的原创分解图，让描绘顺序对应支架、外壳与接口。
