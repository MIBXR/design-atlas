# 产品网页动效审计 · 2026-10-07

范围：Apple、Stripe、Linear、Notion、Claude、Qoder 六个既有公开品牌案例。检查不是“页面有 MP4 / Observer 即算完成”，而是对照触发、状态、方向和时序。研究使用专属 Edge 临时 tab，未修改浏览器设置；颜色受既有 Dark Reader 影响的源截图只用于结构/动效证据。早先清洁 `*-source.jpg` 保留。root 另用干净 IAB 补充 Qoder 公开路径只读状态。

- **observed**：本次真实浏览器动作或状态采样；**source-verified**：匿名读取第一方公开 HTML/CSS/JS，不代替实操；**approximation**：本地明确有差异的局部机制；**unavailable**：本次无法现场复验。
- 公共客户端脚本只读，没有执行下载脚本、读取账户数据、改远程 DOM 或模拟事件制造“观察”。hover 使用真实指针从空白区域进入控件；tab/scroll 使用真实按钮和滚轮。
- 当前本地测试入口 `http://127.0.0.1:4173/demos/<id>/`，实际记录见 [MOTION-QA-PRODUCTS.json](MOTION-QA-PRODUCTS.json)。下列所有时间都注明来源；不把推定周期写为源站实测周期。

## Apple · apple-product

URL：[iPhone 18 Pro](https://www.apple.com/iphone-18-pro/)，本次源状态采样约 08:09 UTC。

| 触发 / 元素 | 原站证据 | 本地缺口与修复 | 级别 / 边界 |
|---|---|---|---|
| 首屏媒体 / 下滚 | 本次 hero 视频 time=0、paused，随后 media-unloaded；hero 祖先 opacity=1，未读到向下滚动 scale | 删除此前无依据的首屏 CSS scale/fade；保留既有官方登场 MP4、末帧和手动重播 | 视频首屏完整自动序列本次 **unavailable**；不把静态回退误说成完整视频实访 |
| Highlights 进入视口 | `.all-access-pass` 从 translateY(180px) 到接近0；gallery playing、autoplay-progress改变 | 控件自下方进入；五静帧按 Camera/Battery/Colors/A20 Pro/Siri AI 排列；自动进度、pause、最后replay | 控件进入 **observed**；.65s曲线、每项5秒与静帧切换为 **approximation**，没有迁移五项专用视频 |
| 图库自动状态 | 原站 Camera→Siri AI 选中状态随时间改变，最后按钮为 Replay Highlights Gallery | 自动播放结束停止，显示重播，不再无尽循环 | 状态模型 **observed**；具体停留时长未测准 |
| 镜头段 scroll / video | `pro-camera-video-scrub`，`data-component-list=VideoScrub`；源加载窗口 a0t−250vh 至a0b+100vh；进度关键帧 a0t−100vh→a0b−100vh，progress [.01,1] | 替换 JPEG scale 为官方 `camera-system.webm`；220vh stage、sticky视窗；p=clamp((viewportHeight−stage.top)/stage.height)，video.currentTime=(.01+.99p)×duration；保持paused | 关键帧 **observed**，实际相机运动来自官方视频，未用静图假缩放 |
| 镜头段标题 fade | 源scrollY4845.6 / stage.top−11.2：video2.31s、copy opacity1；scrollY5634.4 / top−800：video4.11s、copy0 | 随同一滚动进度淡出标题，删除无源第二段分析文案 | 首尾状态 **observed**；本地p=.48→.73淡出阈值为 **approximation** |

源视频2160×1620，浏览器源duration4.983s、本地codec读到4.984s。源渲染容器scale1.40625为恒定fit；不把它当镜头缩放动画。第一次本地实际下滚3452.8→4241.6：video2.163753→3.957269s，p .428→.792，标题opacity1→0；逆向滚动也可回退帧。核心滚动机制验证通过。

第一方只读依据：[overview CSS](https://www.apple.com/v/iphone-18-pro/c/built/styles/overview.built.css)、[overview JS](https://www.apple.com/v/iphone-18-pro/c/built/scripts/overview/main.built.js)。源动作图：[apple-camera-motion-source.jpg](screenshots/apple-camera-motion-source.jpg)；本地：[apple-camera-motion.jpg](../previews/apple-camera-motion.jpg)。Design仍是官方静帧选择器，不宣称完整旋转3D引擎。减少动效采用poster/静态标题/手动图库。

## Stripe · stripe-platform

URL：[Stripe 首页](https://stripe.com/)，本次源状态采样约 08:14 UTC。

| 触发 / 元素 | 原站证据 | 本地缺口与修复 | 级别 / 边界 |
|---|---|---|---|
| 指针进入 Products | 真实指针从空白进入后 aria-expanded false→true，AX出现产品链接矩阵 | mouseenter幂等展开，保留click/keyboard；离开、Esc、外部click关闭并同步ARIA | **observed**；.18s菜单入场和140ms退出延迟为本地近似 |
| 首屏 ribbon | `.single-wave__canvas`实访两次屏幕形态变化；公开模块67103/59168/19622，home presets gj/P1/y7 | 精确提取20个第一方纯渲染模块：folded mesh、shader、light palette、响应式相机；保留官网fallback和本地暂停 | 运动 **observed**、代码/参数 **source-verified**；页面容器裁切/标题混色是局部近似，不代表整站像素等价 |
| 客户标识行 | `.logo-carousel__marquee`持续translateX，采样−989.85和−2451.05px | 双份clip marquee连续左移，减弱动画静止 | 左移 **observed**；本地35s周期及文本品牌行为 **approximation** |
| 产品矩阵进视口 | Payments约810×676、Billing400×676；付款卡不是六个等宽小卡 | 本地首行Payments占2列、约813.6×676，Billing1列同高；去掉统一卡片hover lift | 首行比例 **observed**；后四卡保持局部研究，未完整覆盖所有原canvas |
| 付款UI自主轮换 | terminal-message-values translateY(0/−100/−200%)；ROASTERY $5.46→SHOWFLIX ¥5,000，checkout商品/颜色同步改变 | 固定高度mask内竖滚终端文字，checkout商户/商品/金额同步更新；仅视口内循环 | 状态/方向 **observed**；5s和.75s缓动是 **approximation** |
| 指针进入付款卡 | card-shift/grow自定义值前后相同；时间流逝期间付款UI继续轮换 | 不把UI自动换场景绑定hover，卡片仍可点击打开本地产品说明 | hover是否还存在其它shader高光 **未确认**；没有宣称mouseenter触发付款轮换 |

本地已观测 terminal矩阵translateY−195.675px、checkout scene=1，之后继续到scene=2。本地终端与checkout是简化DOM，后台支付不接入。动画离开视口、文档隐藏或reduce时暂停，属于本地性能/可访问适配，不声称源站完全一致。第一方样式：[当前组件CSS](https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/css/0b96456ec501769a.css)。本地动效图：[stripe-payment-motion.jpg](../previews/stripe-payment-motion.jpg)。源截图可能显示中文，本地英文版本差异仍保留于fidelity。

## Linear · linear-workflow

URL：[Linear 首页](https://linear.app/)，本次实访源约 08:16 UTC。

| 触发 / 元素 | 原站证据 | 本地缺口与修复 | 级别 / 边界 |
|---|---|---|---|
| click Agent tasks | issue detail替换为Offline Mode/Core Performance/UI Refresh三列、11个任务及Working/Waiting/Error/Finished | 重建不同看板视图，替换之前仅改同一issue标题的做法 | 结构/触发 **observed**；未测得额外视图transition，采用直接切换 |
| click Agent Insights | 3389/1128/729统计、按assignee图、项目/Linear/Cursor/Codex表 | 独立统计/柱状图/六行项目表 | **observed**；图形数值分布是局部近似，表与统计为公开快照 |
| click UI Refresh | 项目overview、描述、Properties/Initiatives/Labels/Resources | 独立项目页；资源点击本地反馈 | **observed**；资源不打开远程工作空间 |
| Product hover | 空白区进入Product后真实expanded，出现Intake/Plan/AI/Build链接 | mouseenter菜单、160ms局部缩放淡入 | 展开 **observed**；不是所有章节浮入 |
| Working标签 | 当前组件CSS agentLabelSweep / agentBorderSweep，duration2s、linear；reduce关闭 | 看板Working局部shimmer，reduce关闭 | **source-verified**；不迁移到整页 |
| scroll Intake | ScrollY2551.2时Slack风格对话浮窗，消息style opacity0/1，输入区opacity .2 | 当前保留原本Triage局部示例，未把不同消息动画泛化到全页 | 源消息状态 **observed**；完整Intake自动流程与Agent浮窗 **未实现** |

本地实操Agent tasks读到11张卡，detail hidden=true；Insights六行表、project独立面板均通过。Issue收藏、状态、Run agent本地机制保留，状态符号同步修复。CSS依据：[主页组件CSS](https://static.linear.app/web/_next/static/css/Dop5ZgCE.css)。源滚动图：[linear-motion-source.jpg](screenshots/linear-motion-source.jpg)；本地看板：[linear-agent-tasks.jpg](../previews/linear-agent-tasks.jpg)。

## Notion · notion-editorial

URL：[Notion 英文公开首页](https://www.notion.com/)，实访源约 08:19 UTC。既有中文跳转提示是原公开页面地区提示，未切换账户。

| 触发 / 元素 | 原站证据 | 本地缺口与修复 | 级别 / 边界 |
|---|---|---|---|
| 首屏自动动作词 | 实访Think/Scale/Ship/Create多次变化；官方脚本顺序Think/Ship/Create/Build/Jam/Scale，setInterval2500 | 六词/配色自动轮换；保留click下一项为本地扩展 | 自动状态 **observed**，顺序/2500ms **source-verified** |
| pill label宽度 | mask内文字有短暂裁切，inline-size变量按scrollWidth测宽；CSS300ms cubic-bezier(.86,0,.07,1) | 内容测宽、固定mask、同源width缓动，字体加载后重测 | 机制与时序 **source-verified**；本地字体/胶囊周边间距仍局部范围 |
| 产品video循环 | 官方src web-homepage-hero-1920x1200_final.mp4，duration10.966667；两个时间采样、paused=false | 同一官方视频静音loop；button由真实媒体状态切换 | 播放 **observed**，未改为scroll-scrub |
| scroll越过hero | scrollY1480，video.top−902.5/bottom−121且paused=false | 继续自然播放，不因为滚出hero擅自暂停 | **observed** |
| Pause click | 原按钮Pause→Play、video paused=true | 保留真实play/pause状态、reduce默认暂停 | **observed** |
| Product菜单 | 真实click打开Features及Capture/Find/Automate；本次pointer进入未可靠展开 | 保留click，改回对应分类，不宣称hover自动展开 | click **observed**，hover **未确认** |
| 下滚bento | Capture/Find两列，Automate下一整行；自然出现，不含整页reveal | 改原三段独立横排为两列+整行，手机单列，局部箭头hover | 布局 **observed**；当前素材区域/扩展workspace仍局部复建 |

第一方脚本：[标题实现](https://www.notion.com/_next/static/chunks/1dh2_szm1xs0g.js)；[标题CSS](https://www.notion.com/_next/static/chunks/40jeqhz4ax8oh.css)。本地暂停后read paused=true / label=Play product video；不持续aria-live广播自动词，避免打断阅读。源下滚图：[notion-motion-source.jpg](screenshots/notion-motion-source.jpg)，颜色受扩展影响；本地：[notion-bento-motion.jpg](../previews/notion-bento-motion.jpg)。

## Claude · claude-platform

URL：[Claude 公开首页](https://claude.com/)，复审日期2026-10-07。

- **unavailable**：Edge入口因既有cookie重定向claude.ai，立即离开，未操作账号。root IAB也重定向claude.ai且遇Cloudflare；不能把旧清洁源截图当本次hover/scroll实操，更不能据此推定新增动画。
- **source-verified**：匿名无cookie请求claude.com取得公开HTML/CSS 200，仍有Cowork营销结构与公开视频素材。既有 `cowork.mp4` 保留，来源/哈希未改变。
- 修复是本地媒体控制根因：播放/暂停按钮监听play、pause、ended与error；prefers-reduced-motion变更时及时pause并移除autoplay。没有添加未核验的标题浮入/缩放/滚动控制。
- 本地 **observed**：25.566667s媒体ready4；手动播放读paused=false/time .931581 / label Pause video；手动暂停读paused=true / label Play video。Continue with email切换表单可见，不发送账户信息。原源站按钮hover的曲线与滚动视频处理本次仍 **unavailable**。

因此这一条是“公开素材+既有结构+本地状态修复”，不是“本次官网所有动态身份已验等价”。原Source截图留存，源访问失败没有伪装成成功。

## Qoder · qoder-platform

URL：[Qoder 中国站](https://qoder.cn/)，复审日期2026-10-07；不混用qoder.com国际版。

| 边界 / 组件 | 证据 | 本地实现 / 差异 |
|---|---|---|
| 本次Edge首屏 | 第一屏有登录入口、`Qoder product interface preview`公共演示结构；之后出现avatar及项目/任务内容 | 继续点击/读AX被自动审批拒绝：可能触及账户/私有项目。未重复、未绕过，源模式按钮click结果 **unavailable** |
| root干净IAB只读 | 登录链接/users/sign-in；公共演示无iframe；HeroMotionEmbed path flow/breathe与焦点时序 | 不触碰演示账户操作，仅按公开读到的时间制作局部SVG路径 |
| Hero路径 | 13.824s linear infinite dash-flow +4.8s ease-in-out dash-breathe；另一path16.64s linear delay−18s +6.4s breathe delay−4.8s；焦点3.8s cubic-bezier(.4,0,.2,1) | 本地同时间与局部流动/透明度呼吸；两条曲线和焦点位置是 **approximation**，不是原SVG逐点克隆 |
| 五平台ProductShowcase | 匿名无cookieSSR及脚本：tab onClick、Swiper speed400、autoplay delay20000、pauseOnMouseEnter true、mobile allowTouchMove | 400ms横向前后切换、20s局部循环、mouseenter暂停、点控、手机滑动；reduce直接切换并停auto。旧/新两面板transition为本地近似，没有复制完整无限peek carousel |
| 与四项FeatureSection区分 | 同一公开脚本另有四项纵向列表：mouseenter、10s auto，image y100%→0→−100%，duration150ms | **没有把此时序套到五平台上**；该组件未迁移 |
| 模式与task | 原源实操未完成；保留原本本地模式、task回执、协作展开 | 明确本地模拟，不声称运行在线Qoder，不自动打字“私人项目”内容 |

第一方公开脚本：[2071组件](https://qoder.cn/_next/static/chunks/2071-0dba5db130b82f90.js)。最初CSS并行请求部分连接失败，没有用失败文件当证据；脚本及SSR成功取得，具体时序来自该文件。五个平台背景仍使用已有官方SVG/移动图，软件DOM是本地局部复建。动画过程中旧panel inert/aria-hidden、移除重复ID，结束删除ghost；水平tab条scrollTo不牵动整页。既有源清洁截图保留，未覆盖。

## 验证与尚未覆盖

六条均完成本地实际操作检查与源可用性审查；**四条本次原站完成首屏+操作+滚动，Qoder源操作受审批限制，Claude源实访不可用**。两项限制不能写成“六站源交互全部等价”。

- Apple：原视频换帧/标题淡出实际验证；Gallery静帧循环及控制、配色保留，专用亮点媒体未移植。
- Stripe：第一方WebGL缎带隔离运行；支付UI、局部matrix、客户轮播、菜单状态已修复；Billing/全金融图形的完整自主演示未迁移。
- Linear：四类视图与任务/项目本地回执；原Intake聊天完整循环与浮动agent面板未迁移。
- Notion：同源6词/2500ms/300ms宽度、视频播放暂停、两列bento；外置插画和全部客户墙/后续功能未完整迁移。
- Claude：本地真实视频控件/表单；本次源hover/scroll不可用。
- Qoder：公开脚本对应的五平台400ms/20s机制；hero几何是近似，原live demo模式/任务动作未现场复验。

代码检查、移动端390×844、图片与溢出指标见QA JSON。reduce分支代码/样式已检查；浏览器未提供只读方式切换系统reduce偏好，因此不把代码检查写成真实reduce模式全程实测。现有HTML后台/注册/交易只给本地说明，不向源站提交。


最终本地QA：六页390×844没有横向溢出/破图；Stripe增加源码原有__disableWebGL分支实测，fallback opacity=1 / canvas hidden / 控件hidden。reduce偏好恢复normal时重新显示已加载renderer的暂停控件，代码复核完成。Qoder移动面板ghost查询问题已按根因修复；旧采样明确记录为superseded，当前面板hidden=true。

Claude补充：窄桌面本地适配：参考库嵌入预览约718px宽时，原有700px收起导航断点使header右侧按钮超出。已将仅导航部分的收起断点提前到800px，保留原英雄区布局和可操作汉堡菜单。这是嵌入环境适配，因本轮官网转入登录页，不能声称其断点来自现场源站观察。

本地实际复验718×844：html.clientWidth=703、scrollWidth=703、overflow=false；header nav/actions均display:none、hamburger display:block，真实click后expanded=true、菜单6链接可见。未通过系统设置修改任何偏好。
