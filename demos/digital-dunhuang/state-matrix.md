# 数字敦煌：逐页状态与源码对照

采集日2026-10-09。源：[首页](https://www.e-dunhuang.com/index.htm)、[洞窟列表](https://www.e-dunhuang.com/section.htm)、[257西壁查看器](https://www.e-dunhuang.com/showmural/10.0001/0001/0001/0257/0001/0003/01)。本地：[首页](index.html)、[列表](section.html)、[查看器](viewer.html)。

浏览器CDP读取DOM/CSS、插件原文件及Network资源，实际点击、滚动、筛选、加减和拖动。桌面1440×900/1000；手机390×843；独立代理复核真实筛选与瓦片边界。原始截图与日志在仓库外，单一固定快照不冒充实时官方服务。

| 页/状态 | 原站实际证据 | 本地对应/边界 |
|---|---|---|
| 首页初载 | 4张影像aa/111/11/aa1；cbpFWSlider speed500/easing ease；每3000ms触发下一张，末张返回首张 | 同原图与原插件，原箭头/中心检索/导航 |
| 首页计数 | 4个`.timer`data-to30/10/4430/300，data-speed1500；index.js刷新100ms | 保留1500ms/100ms计数，实际观察过程8/3/1181/80并完成到源值；减少动态直接显示终值 |
| 空检索/Enter/非空 | 空词focus；非空开官方search.htm?q=…&type=1&page=1 | 同语义，不用本地三条数据假装官方检索 |
| 洞窟/壁画/顶部导航 | 源jQuery animate1000ms到#cc/#m/#home | 同时长与目的地；手机菜单slideToggle600ms |
| 完整内容序列 | 寻境、6经典洞窟、10经典壁画、DLC、介绍与30项页尾索引 | 全部保留，洞窟详情/其他壁画/寻境仍官方 |
| 运行时DLC | pop.js注入750×100内嵌PNG，display1150×153.325，margin-bottom20，区域高213.325 | 无损解码到本地PNG与原链接，未执行登录平台pop脚本 |
| 介绍展开 | #who show1500ms，滚动#w1000ms | 同展开与滚动；原正文/数字化图像 |
| 三种说明modal | 原copyright/cookieright/aboutme | 原可见内容，打开、明确关闭、Escape、背景关闭与焦点归还；不宣称整站隐私或法律合规审计 |
| 语言/登录/订阅 | 语言setting.html、官方登录；订阅属于真实外部服务 | 官方真实目的地；本地订阅提示去官方，不发送邮箱或假成功 |
| 列表初载 | 32项，CSS columns2/gap30，正文前有完整三维条件 | 同32项与源卡片；首页固定统计30不擅自改写 |
| 条件维度 | 遗址4、形制4、时代11；原go函数切换/替换对应URL参数 | 同19项、同维度互斥/点击取消，URL可回看 |
| 单条件证据 | 19个真实source响应取得HTML hash和结果成员集 | [filter-evidence.json](filter-evidence.json)可回读；全部status verified-server-html，不靠介绍文字猜形制 |
| 已选行/移除/折叠 | `.xz_bor`显示选中条件，`sortbox.toggle(1000)` | 同可删除已选行、1000ms折叠；返回恢复条件 |
| 北魏及组合空态 | 原站实点北魏：254、257、麦积山127；叠加榆林为0 | 本地同3条/0条，浏览器返回恢复3条；组合按公开成员集交集，未枚举全部服务端组合 |
| 查看器初载 | Leaflet1.7.1+DeepZoom2.0.0、CRS.Simple、逻辑21515×15796、1024瓦片 | 同引擎/配置、同全视口#080900画布与©数字敦煌归属 |
| 匿名缩放 | maxNativeZoom15；min9.75/max12；1440×900初fit10.927709695193426 | 同范围，非100%–300%的CSS缩放；缩到下界/放到上界按钮禁用 |
| Network瓦片 | 匿名观察level10(1张)、11(2张)、12(6张) | 本地9张原瓦片，保留水印/边缘尺寸；不取登录后的更高级别 |
| 拖动/惯性/键盘 | 原inertia:true/inertiaDeceleration10、滚轮/双击和加减 | 同真实坐标机制；实际拖动、加减、方向键和边界；减少动态关闭惯性/缩放动画 |
| 登录精度提醒 | zoom>maxZoom-1触发4000ms登录提醒 | 同触发/时长、明确官方链接；不改源上限或伪造登录 |
| 加载反馈 | 源Control.Loading挂在缩放控件、图块加载出现旋转标记 | 补原库/CSS和内嵌spinner；未复制登录后的标注/绘制业务 |
| 手机与主题/声音 | 原首页响应CSS；查看器全屏；范围内无独立BGM/主题开关 | 源首页样式、列表单列及同画布，固定浅/深区域；无额外声音 |

来源下载的“逻辑21515×15796”只是瓦片坐标系统，最高实际归档级别12，不能称本地拥有完整此尺寸高清壁画。旧首版只取1张首图、3条虚拟筛选和562×253预览、原创dialog/百分比复位，既省略首页轮播/完整序列，也没查看Network瓦片和原插件；此次删除了这些错误替代。

公开影像、嵌入图、字型与运行库的hash/出处见[素材清单](assets-manifest.json)；原站未用CSS背景banner.jpg返回HTML，记录为未取得，不使用猜测素材。原始截图和状态日志保留在仓库外`heritage-audit`与`work/fidelity/independent-audit`。

补充独立手机证据：390×844源/本地七标题与六区全部x/y/width/height差值小于0.002px，无整页横溢出；导航展开终态top58、height334.3625、width360.4与原600ms规则一致。几何JSON保留在仓库外work/fidelity/independent-audit/dunhuang-{source,local}-mobile-geometry.json。版权年份按固定快照保留2015–2026，三个说明窗唯一标题ID对应实际标题；菜单aria-expanded为本地语义补充。
