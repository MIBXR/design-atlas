# 等轴 3D：空间作为解释工具

核验日期：2026-10-07。案例为 [Monument Valley 系列官网](https://www.monumentvalleygame.com/) 及 [ustwo 的 Monument Valley 3 页面](https://ustwogames.co.uk/our-games/monument-valley-3/)；制图依据 [Adobe Isometric art](https://www.adobe.com/products/photoshop/isometric-art.html)。

## 证据与观察边界

- 系列官网可被 web 工具定位，但文本提取内容有限。不能据此声称已核验其全部滚动效果。
- 开发商页面描述极简世界、建筑及实验艺术启发、不可能几何，和通过旋转建筑发现路径的游戏体验。[ustwo](https://ustwogames.co.uk/our-games/monument-valley-3/)
- 因此本条借鉴的是宣传所呈现的建筑世界与体验气质；本 demo 的图层切换是原创网页迁移，不能当作该官网已有交互。
- Adobe 的制图说明以二维表现三维，示范左右方向的 30° 线条，以及用侧面明暗构造体积。[Adobe](https://www.adobe.com/products/photoshop/isometric-art.html)

## 设计推断

固定投影让多个对象容易组成同一世界，明暗和相对尺寸提供结构信息。极简小场景适合让人理解一个系统，而温和色彩与留白可以支持安静探索的主题。这里未提出“更高转化”“降低认知负荷”等未经验证的数值结论。

区分三类概念：等轴是平行投影；透视有消失点；用 SVG 绘制等轴图并不等于可旋转的 3D 引擎。原游戏的不可能几何也不是工程意义的三维构造证明。

## Demo 映射

本地原创世界 Little Terraces 由陶土平台、奶油塔楼、薄荷温室、路径、水池与树木组成，不复用原游戏关卡。

投影公式：`screenX = 400 + (x − y) × unit × cos(30°)`；`screenY = 201 + (x + y) × unit × sin(30°) − z × unit`。全部几何共用坐标；每个体块使用顶、左、右三种明度。

| 层次 | 呈现 | 交互 |
| --- | --- | --- |
| 世界气质 | 窄叙事栏 + 大浮岛 | 章节锚点 |
| 系统组成 | 基础、建筑、花园三组 SVG | 整体或聚焦；其他组降低透明度 |
| 空间关系 | 保留图层次序 | 展开时分层偏移 |
| 体验目标 | 三个有编号的旅程章节 | 静态可读说明 |

## 约束与适用边界

- 投影角度、比例和阴影方向必须统一，不能给每个组件随意换视角。
- 图形仍是固定二维示意；场景的互动控件要可聚焦，并用文字同步解释。
- 小屏先呈现价值主张，再呈现场景与按钮。不能仅提供细小热点。
- 图层变化为用户触发，`prefers-reduced-motion` 时取消过渡。
- 适用于游戏世界、园区、复杂技术系统；不可代替精确建筑图或真实实时 3D 产品展示。

## 复用入口

[结构化条目与完整 Prompt](../entries/isometric-3d.json) · [独立 Demo](../demos/isometric-3d/index.html)

改造练习：把岛屿替换为数据基础设施，使计算、存储、网络成为三个焦点，保留统一投影与层次说明。
