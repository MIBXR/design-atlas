# Fuji Rock：现场照片与节日导览

观察：**2026-10-07**。[真实页面](https://www.fujirockfestival.com/)。国家／地区指参考机构来源，不概括一个国家的所有设计。

## 观察范围与来源

真实首页从首图到页尾及返回，菜单、语言、Featured与公开common.js/top-2026.js/CSS核对。

- [Fuji Rock 官方首页](https://www.fujirockfestival.com/)（实例）：2026-10-07：2026首页橙色栏、山菜单、现场照片、蓝色Featured和米色新闻。
- [Fuji Rock 2026 官方结束报告](https://www.fujirockfestival.com/news/detail/fb6a67473bc9938)（实例）：2026.07.28官方结束报告；7月24–26日活动已结束，页面是年份快照。
- [IBM Design Language：Layout overview](https://www.ibm.com/design/language/layout/overview/)（理论）：关系、比例、重复和层级解释照片与导览的职责，不表示主办方采用IBM规范。
- [W3C WAI：Carousels Tutorial](https://www.w3.org/WAI/tutorials/carousels/)（规范）：自动轮播应有暂停、手动、键盘和当前状态；本地保留3.6秒轮换并提供停止。
- [官方公开交互脚本 · 2026-10-07](https://www.fujirockfestival.com/2026/assets/js/top-2026.js)（实例）：主图3600ms/800ms；Featured600ms中心循环/3600ms自动；common.js与CSS提供加载1200ms、菜单400ms三维变换及背景1秒.25。

## 构成与设计逻辑

橙色固定栏与白色窄字标把现场照片串成同一音乐节；山形菜单、蓝色票据、圆角图标导览让情绪与实用信息并行。

以下构成职责是本库对观察的分析，时序和动作分别在下一表注明。

| 元素 | 职责与约束 |
|---|---|
| 配色 | #e64219橙贯穿header/日期，#0075ba蓝用于导览/Featured/票据，#f2efeb与#e3dbd4使菜单层级清晰。 |
| 字体 | 真实窄高Logo、短粗日期、大英文栏目、较小日文链接；不引入原站未提供的花体字。 |
| 排版 | 68px固定顶栏、右上100px山菜单、满视口照片、右竖票据；后续横向Featured与新闻列表避免同构。 |
| 图像 | 真实官方现场照片的desktop/mobile版本、Featured宣传图、Logo和导航图标全部本地化。 |
| 形状 | 山Logo、右下圆角菜单、蓝竖票据、圆点、圆角导航/大菜单重复形成可识别操作语法。 |
| 层级 | 日期地点保持常驻，照片先传递场景，实用入口其次，Featured与按日期排列新闻承担浏览与回看。 |
| 整体协调 | 官方现场的蓝橙布置与网站橙蓝识别呼应，灰米面板降密度；不同照片共享导航与控件位置。 |

## 交互巧思与本地对应

| 触发 | 原站行为与本地对应 | 设计作用 | 范围与差异 |
|---|---|---|---|
| 素材载入完成 | 32px橙色旋转标记退出，遮层与主图1200ms线性淡化。 | 让真实现场图准备完毕后平稳进入。 | 等待load，不伪造长时间百分比。 |
| 打开／关闭山形菜单 | 菜单400ms scale(.88)+rotate3d(.5,0,0,1rad)进出，页面背景1秒淡到.25。 | 放大导览层级，同时保留现场的空间背景。 | 对应原CSS；快速反向从当前状态起步。 |
| 照片或Featured自动／手动切换 | 照片3600ms间隔、800ms淡化；Featured600ms中心循环，3600ms自动，手机露出两侧邻项。 | 照片传递现场氛围，中心轨道突出活动主题且提示还有内容。 | 3组照片、4条Featured缩减内容，保留循环机制；本地增设暂停及离屏／后台停止。 |
| 超过Pickup后向上／向下滚动 | 导览条固定后按方向显隐；语言菜单400ms展开并在离开时收起。 | 长页浏览随时找回实用入口，同时减少遮挡。 | 短章节长度不同；菜单触摸横向滑动可开关。 |

## 主题与声音

**主题（fixed）：**原站无深浅色开关；橙蓝导航、米色内容和原色现场照片保持固定。 导览色贯穿照片更换与新闻，强行反色会改变节日身份。

**声音（external）：**Aftermovie链接到官方YouTube；没有独立BGM开关。 音乐现场由影像承载，用户主动进入影片听声音；首页照片浏览保持安静。

## 边界与练习

20张照片和6条Featured未全部复制，系统字体近似Poppins/日文原字体；交易与演出数据库使用官方外链。

把现场照片切换为不同地点，观察橙色header/蓝票据是否仍保持识别；再打开大菜单检验每层链接是否能被键盘找到。

[Demo](../demos/fuji-rock/index.html) · [桌面预览](../previews/fuji-rock.jpg) · [手机预览](../previews/mobile/fuji-rock.jpg) · [Prompt](../prompts/fuji-rock.md) · [素材归属与hash](../demos/fuji-rock/assets-manifest.json)
