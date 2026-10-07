# Google Material：表现力与组件秩序

观察：**2026-10-07**。[真实页面](https://m3.material.io/)。国家／地区指参考机构来源，不概括一个国家的所有设计。

## 观察范围与来源

首页桌面入口到页尾、反向浏览、主题／暂停／目录已实操作；响应式在本地另以390px核验。

- [Material Design 3 当前官方首页](https://m3.material.io/)（实例）：2026-10-07英文首页：88px侧栏/64px手机顶栏、主题与暂停、真实视频、CTA与卡片圆角状态、1294px首屏断点。
- [Material：Motion physics system](https://m3.material.io/styles/motion/overview/how-it-works)（规范）：May2025物理系统：expressive/standard、spatial/effects和速度层级，与首页时间曲线区分。
- [Google Design：Expressive研究](https://design.google/library/expressive-material-design-google-research)（理论）：颜色、形状、大小、动效与容器共同引导注意和分组，并保留情境与基础可用性。
- [Google Design：品牌与Material](https://design.google/library/staying-true-to-your-identity-material-branding)（理论）：历史品牌指南的字体、图像和颜色一致性；旧色阶例子不是当前M3通用token。
- [W3C：Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)（规范）：非必要用户触发动效可关闭，自动媒体提供独立暂停。

## 构成与设计逻辑

学习当前 Material Design 3 官方首页：固定图标侧栏、相邻大圆角首屏、真实组件视频和有不同分组的资源目录。配色、字体、容器与交互状态共享规则，让表现力与可读性同时成立。

以下构成职责是本库对观察的分析，时序和动作分别在下一表注明。

| 元素 | 职责与约束 |
|---|---|
| 配色 | 原始组件样式的#f8f1f6中性hero与#1c1b1d文字承托紫色#6442d6主动作；深色切换surface/on-surface角色，丰富色彩留给真实组件图像。 |
| 字体 | 本地官方Google Sans 475提供96px/45px主标题与57px/36px节标题，Google Sans Text正文和Symbols图标形成清晰尺度层级。 |
| 排版 | 固定窄导航与宽内容分离；首屏两块8px相邻大面板，正文按真实1/2/3资源组及大节距组织，手机改顶栏和单列。 |
| 图像 | 真实官方9秒4000×2000MP4、元数据poster和20张官方组件／资源配图，保持原始文件并按官网区域映射。 |
| 形状 | 24px面板圆角、48px胶囊主动作、圆形视频及设置按钮；按压／聚焦时有有意义的圆角变化。 |
| 层级 | 中性品牌面板和最大标题先定位产品，紫色主按钮强调行动，单个横向I/O资源先强调更新，随后组件和入门资料逐层引导。 |
| 整体协调 | 配色角色、字体族、容器圆角和状态层贯穿导航、hero、资源和页尾；鲜活组件图像由稳定网格与中性正文容器协调。 |

## 交互巧思与本地对应

| 触发 | 原站行为与本地对应 | 设计作用 | 范围与差异 |
|---|---|---|---|
| 进入首页 | 静音9秒组件视频开始循环，独立按钮可暂停；全局暂停影响视频、状态过渡和涟漪。 | 用真实组件变化说明设计系统，用户保有观看控制。 | 保留官方MP4；减少动态初始停播。 |
| 点击或键盘激活按钮／卡片 | CTA圆角48→16px，资源卡24→48px；200/300ms cubic-bezier(.2,0,0,1)。 | 形状与状态层共同表达当前动作，界面表现力来自一致的反馈。 | 角色颜色和圆角对应原CSS；300ms点击位置涟漪为本地近似。 |
| 进入目录或二级主题 | 300ms侧向抽屉；二级内容200ms延后再200ms淡入。 | 导航容器保持连续，内容层级在同一位置变化。 | 本地dialog与官方链接；不复制Angular文档路由。 |
| 切换主题／系统主题变化 | 深浅语义角色切换；手动值保存，OS变化清除保存值。 | 让可读性适应环境，同时保持品牌图像与层级。 | 行为依据公开theme service；存储键隔离于参考库。 |

## 主题与声音

**主题（system-and-manual）：**初始读取保存的选择或系统偏好，手动开关持久保存；系统偏好改变时清除手动值并重新跟随系统。 改变 surface/on-surface、primary/on-primary 等语义角色，保留媒体原色与按钮层级。

**声音（none）：**官方组件视频静音，独立播放和全局动效暂停均可操作。 动态组件展示承担行为说明；首页没有独立背景音乐，不将视频运动误作声音反馈。

## 边界与练习

正文改写，完整文档路由与外链页面不在本地。首页CTA并非物理弹簧；M3物理系统只作理论来源。

先用主题开关比较角色配对，再暂停全局动效并用键盘聚焦资源卡，观察没有运动时状态是否仍清楚；若换品牌色，只改一组primary／container会怎样影响正文与按钮的协调？

[Demo](../demos/google-material/index.html) · [桌面预览](../previews/google-material.jpg) · [手机预览](../previews/mobile/google-material.jpg) · [Prompt](../prompts/google-material.md) · [素材归属与hash](../demos/google-material/assets-manifest.json)
