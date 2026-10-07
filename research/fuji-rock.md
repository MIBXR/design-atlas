# Fuji Rock：现场照片与节日导览

研究日期：2026-10-07。观察版本：日本版 / 2026活动快照。国家分类：日本。

官方实例：[首页](https://www.fujirockfestival.com/)。使用临时 Edge 研究页进行了桌面、390px手机与滚动观察；源站图像URL、自然尺寸、公开CSS用于核验。源站干净IAB截图由主任务保存，避免Edge Dark Reader改变白底/品牌色。

## 直接观察与实物资产

- 现场入口、人群与演出照片直接传达真实节日环境，不用虚构插画替代。
- 窄高白字Logo与短日期在68px橙色顶栏形成紧凑的常驻识别。
- 右上山形菜单和右侧蓝色竖票据占据稳定位置，照片更换也能找到导航。
- 浅灰圆角实用导航与米色大菜单重复图标/链接关系，把复杂的现场资讯分层。

配色与布局具体值来源于原站公开CSS和实际海报比例。下载素材列表在 [assets-manifest.json](../demos/fuji-rock/assets-manifest.json)：包含来源URL、文件字节、图像尺寸与用途，CSS仅保留为研究证据，不被本地HTML加载。

## 第一方依据与理论边界

- [Fuji Rock 2026 官方结束报告](https://www.fujirockfestival.com/news/detail/fb6a67473bc9938)：首页官方新闻记录2026.07.28活动结束；本地明确是已结束年份快照。
- [IBM Layout overview](https://www.ibm.com/design/language/layout/overview/)：以层级、尺度、比例与对齐/重复解释各要素关系。这里使用分析词汇；机构的品牌颜色/Logo与IBM品牌规则无关。
- [W3C WAI Carousels Tutorial](https://www.w3.org/WAI/tutorials/carousels/)：支持用户控制、键盘和当前状态提示；本地去掉自动推进。

## 设计推断与协调

官方现场的蓝橙布置与网站橙蓝识别呼应，灰米面板降密度；不同照片共享导航与控件位置。 这是观察后的解释，不冒充设计团队口述。

- **color**：#e64219橙贯穿header/日期，#0075ba蓝用于导览/Featured/票据，#f2efeb与#e3dbd4使菜单层级清晰。
- **typography**：真实窄高Logo、短粗日期、大英文栏目、较小日文链接；不引入原站未提供的花体字。
- **layout**：68px固定顶栏、右上100px山菜单、满视口照片、右竖票据；后续横向Featured与新闻列表避免同构。
- **imagery**：真实官方现场照片的desktop/mobile版本、Featured宣传图、Logo和导航图标全部本地化。
- **shape**：山Logo、右下圆角菜单、蓝竖票据、圆点、圆角导航/大菜单重复形成可识别操作语法。
- **hierarchy**：日期地点保持常驻，照片先传递场景，实用入口其次，Featured与按日期排列新闻承担浏览与回看。
- **motion**：照片手动切换与状态播报；Featured横滚按钮，菜单展开；不自动视频/音频。
- **coherence**：官方现场的蓝橙布置与网站橙蓝识别呼应，灰米面板降密度；不同照片共享导航与控件位置。

## 局部实现与约束

固定68px橙header → 视口现场照片/右票据 → 圆角实用导航 → Featured横滚 → 米色News列表 → Content。

- 明确2026版快照学习，7月24–26日活动已结束；保留购票入口只是官网参考，不能当可购买当前活动。
- 使用真实Logo/山形标识/现场照片，品牌商标与摄影权利归SMASH等原权利人。
- 手机使用官方1200×1200图片，不单纯裁切1400×700桌面照片。
- 原站20张照片/6条特集，本地缩为3张/4条并取消自动轮播；不能声称整站完整复刻。
- 没有取得独立官网BGM；本地不自动加载视频/音频，官方回顾需明确用户动作。
- 本地不复制原站交易、广告追踪、自动加载遮罩和完整演出数据库。

完整Prompt和负面约束存于 [entry JSON](../entries/fuji-rock.json)。具体还原对照见 [fidelity.md](../demos/fuji-rock/fidelity.md)。

## 本地核验

通过 CUA 浏览器实测桌面1440×1000、手机390×844：无横向溢出、无破图；核心控件已按实际状态检查。记录见 `fuji-rock-qa.json`。预览来自实际浏览器截图；reduced-motion仅静态核验CSS/JS处理，没有模拟系统偏好或声称完整无障碍合规。所有资产清单已逐文件保存实际SHA256。

## 2026-10-07 动效补审更新

实点第二dot，源站slide style transition opacity800ms cubic-bezier(.25,1,.5,1)；菜单实开显示多列层级。top-2026.js确认为fade、speed800、autoplay、interval3600；common.js在601ms后隐藏菜单并让wrapper fade-out。已补同速三图自动淡化、手动暂停与600ms菜单/背景退场，后台/离屏停轮播。原站20图缩3图，Featured实际源站600ms循环/自动滑轨与滚动时导航上滑回显仍未全覆盖。

本轮记录优先于初版的静态/手动实现描述。原站触发、脚本证据、实际手机/键盘验证与诚实限制见 [十例动效审计](MOTION-AUDIT-GAMES-ART-JP.md#fuji-rock)。
