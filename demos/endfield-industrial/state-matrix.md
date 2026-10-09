# 终末地：八章状态矩阵

固定采集 **2026-10-09**，[中国大陆官网](https://endfield.hypergryph.com/)。源码观察、实现覆盖和浏览器通过分开记录；“本地实测”不自动表示源站同帧一致，也不从少量角色推广到全部35人。

| 模块 | 原来源证据 | 本地实现 | 已核验状态与剩余边界 |
|---|---|---|---|
| 首次加载 | 原黑/黄Updating、图形/CSS与完成回调 | 必要影像/字体实际完成任务比例，真实失败/重试/继续，正文与退出序列；25秒仅提示等待 | 1440×1000最终GitHub素材发布目录，禁缓存/绕SW真实冷载自动ready/hidden；隐藏目录肖像0、未进入mp4请求0。Fetch仅暂停必要立绘39.203秒时pending/86%、等待提示可见、肖像0/bin0/mp40；释放图片后其资源duration43.939秒，自动100/ready/hidden。没有把超时当失败。此前黄wipe scale 0→0.0251998→0.302011→1再opacity0.625881采帧通过；真实阻断背景图的失败/重试/继续终态已实测。比例不是网络bytes；失败处置为本地补充。 |
| PC/手机导航 | 源300ms侧栏、7桌面入口/8手机章节与滚动 | hover/focus、活动段、锚点、手机菜单/Escape/外链 | 手机open=true→选AIC后false/hash=#aic，选择角色后aria=false通过；不推广为每章快速反向、完整键盘回程通过。 |
| 35干员 | 当前模块18039有35；旧中文数组另26；175资源映射 | 35头像/立绘/肖像，窗口翻四头像，点击切角色，公开元数据 | PC1440×1000/手机390×844实见35项；艾尔黛拉中文/摘要/pressed、Ardelia//19、19/35、种族/阵营/CV更新通过。禁缓存新载Si打开→目录→艾尔黛拉drawer x0/right375.2/expanded=true，主负责人独立390验证x0/right390.4；旧左偏记录为已解决的旧布局观察，不孤立归因SW或HTTP缓存。完整35切换/快输入未逐项验收。 |
| 人物叙事 | 当前简中flat文本映射的35个operator.content.<key>.intro | 按当前35角色key保留完整官方中文简介及段落 | 静态解码来源、文本原值及SHA256逐角色核对；完整文本一致不推广为所有35人页面状态已逐项实测。 |
| 全部目录 | 原职业/属性dropdown与卡片 | AND条件、折叠/Escape/回档案 | 本地近卫8人；近卫∩电磁1人minghe，近卫∩灼热0，两不限恢复35。Fresh真实AX出现list+7 options，打开hidden=false/aria-hidden=false、焦点到选中option；Down/Up/Home/End实际移动焦点，Return选择后归trigger。面板内Escape关闭、aria-hidden=true/expanded=false并归trigger；返回Enter到#operator/directory.hidden=true/body class移除，Si保持，fresh 2040×939最终AX焦点归“全部干员”。源端本轮未可靠打开目录，组合计数/空态/键盘只判本地通过，不虚报配对或全部组合。 |
| 透明人物3D | 原3840×1080影片左右RGB/alpha，模块25221/40489负责enter结束换idle | 原70 enter/idle、alpha=R×.3+G×.59+B×.11，半宽canvas | 最终默认设置2040×939本地Si自然enter15.2s→idle2.9s通过；17s后idle.time1.770427/paused=false/ready4/loop=true/pressed=true且无错误。手机艾尔黛拉真实enter→idle、3840×1080→1920×1080canvas通过。原站本轮enter停在0且无新GPU帧，**未确认原站自然事件链路**；源码机制与本地自然链路分开。透明边缘同帧及全部35视频不作通过结论；不是人物网格。 |
| 六世界模型 | Float32 xyz无header，Y跨度1900规范化，六模型参数与4段shader | 原6bin/WebGL点云、扫描/旋转/拖动/切换及锁定 | 2040×939源/本地六模型名称和可见形态逐项、6→1→6循环、立即4→5保持4/6锁通过；180px双向拖动同向。390×844真触摸100px角+0.82/+0.90rad，本地纵滚1493.6→1618.4/sw390通过。4段shader逐字符串同源。工厂/天师扫描终1150；射线2000实例、活动峰源105/本地144为随机输出，不声称像素相等。模块tick退出0/500/1000/2000ms=-1150/-862.5/0/1150，进入0/1500/3000ms=-1350/-100/1150，旋转400/800/800ms后回基速；未逐项验证所有资源失败。 |
| 10影像 | 原10条title/date/category/cover/preview/fullVideo | 30卡循环轨道、临卡/前后/封面/10秒预览、完整片dialog | 本地1→10反向active19、10→1终态active10/scale1/preview playing/ready4，含in-flight active20；首末双向循环通过。未逐条确认10个预览/完整片自然播放及全部dialog键盘状态；长片URL依赖官方。 |
| 日历 | 原当前版本日历与portrait图 | 原影像与normal/fixed/bottom结构 | 手机横滚207.2=max/末图right374.49通过。PC源/本地normal top54.1、fixed top0、bottom终态通过；1440×1000/scroll5420.7998时heading x147.0875/y-117.0375/w1285.3125/h313.9500/bottom196.9125同值。固定快照不是实时活动。 |
| 4玩法/5AIC | 原三层slide-in400ms，delay0/250/500，文字exit/enter各500ms | 真4视频/5图、编号/说明/分页、黑→黄→媒体 | PC玩法height942.75；四对应mp4均实际播放、4→3反向/outgoing清理通过。AIC五项图/正文/页码逐项对应，4/5图natural1600×900/complete=true、outgoing0；5→1→5首末双向通过。1→2中态黑0/黄4.41%/top100%，终态2/5协议核心/02加载/outgoing0通过；源同帧时序与快输入不作通过结论。 |
| 公告 | 原10字段；clip500ms，组件Y30%600ms，delay300后卡片横移300ms | 原标题/日期/图片、桌面/手机双条分页与官方详情 | 修复后fresh禁缓存PC1→2→1、1→2→3→4→5、5→4实测通过；端点class/aria/tabIndex/pointer同步。手机1→2→3/3→2每页两条、标题与alt同步通过。此为本地操作验收，源转场同帧仍不作通过结论。 |
| 声音 | 原BGM/声音工具存在 | 默认关闭、用户打开后播放、aria/隐页策略 | 本地真实切后台8.025秒，BGM time8.031918/paused=true冻结；返回time8.605204/paused=false恢复。减少动态下用户手动BGM也实测：后台8.339秒time30.152478冻结，返回30.675366/paused=false，关闭50.881139/paused=true/aria=false。修复单独Audio对象未被DOM媒体选择器暂停的问题；减少动态不取消手动声音选择。资源字节已归档，不宣称全部语音已采或原站同序列实测。 |
| 正式业务 | 登录/下载/支付/社区/云游戏/详情目的地 | 官方入口，不复制账户后台 | 外部业务目的地不算本地功能已通过。 |
| 减少动态与离屏 | 源机制与补充策略分开 | 静态人物、暂停点云/非必要自动媒体，保留手动操作 | 最终390×844 reduced：人物idle.time0.033333/paused=true/loop=true且可见，canvas924.4375×520（native1920×1080）/sw390通过。模块动态切换视频2.24964冻结→2.3539恢复，Lore angle0稳定→.00657恢复。父监听真实后台8.025秒，Lore frame542/angle0.5491946559冻结，返回frame557/angle0.6241946恢复。自动媒体恢复排除旧人物视频，2D状态不会重新播放隐藏3D。快速2D→3D替换/切角色/离屏恢复的模块用例已实测，不推广至全部35人或所有媒体组合。 |

证据记录分别来自主负责人和独立workflow_audit/arknights_research实操；视口均在对应行标明，独立PC/手机记录为DPR1。浏览器普通截图、QA日志和源码过程档留仓库外，正式预览由最终浏览器生成。可回读模块、偏移与hash见[source-provenance.json](source-provenance.json)。

仓库外复查路径：

- work/fidelity/endfield/published-slow-entry.json、published-slow-complete.json：最终GitHub播放目录真实延迟39.203秒的等待与迟到资源自动完成；目录从初始0到展开加载、末项键盘可达及模型/媒体推迟加载另行实操。
- work/fidelity/independent-audit/endfield-loader-results.json、endfield-loader-live-sequence.json及sequence-0..7.jpg：冷载、失败重试、黄wipe/淡出采帧。
- work/fidelity/independent-audit/endfield-media-loop-results.json：30卡轨道首末双向状态；endfield-notice-results.json的fixed字段：公告最终完整五页及反向、端点语义。
- work/fidelity/independent-audit/endfield-continue-{failure,body}.jpg：阻断必要图片后继续浏览；筛选1/0/35和最终ARIA/键盘记录由独立复查保存同目录。
- work/fidelity/independent-audit/endfield-final-branches.json、endfield-directory-back-focus-final.json：继续路径、目录组合/零结果/清除、真实AX与返回入口焦点。
- work/fidelity/endfield/calendar-local-bottom.json：源/本地PC日历终态；work/fidelity/endfield/module-validation.md：最终人物影片、点云模块、动态偏好与缓存分离过程。
- work/fidelity/endfield/aic-local-{4,5,loop}.json：工业介绍五项末两项、首末双向内容与图片加载；rhine-audit/endfield-lore-visibility-restored-local.png：父监听真实后台冻结与恢复。
- rhine-audit/endfield-reduced-bgm-visibility-proof.json、endfield-reduced-bgm-return-local.png：减少动态时手动BGM后台暂停、返回恢复、关闭实测。
- rhine-audit/endfield-3d-idle-local.png、endfield-3d-mobile-reduced-local.png：最终正常循环与减少动态静态帧。normal-mobile图捕获enter.5378，并非idle证据。
- rhine-audit/endfield-pile-{source,local}-scan-rays.json及factory/trinity/enemy/spaceship/mobile配对PNG：六模型/扫描/触摸证据。

人物媒体曾在临时状态ready2/paused=false但时间停滞；完整影片字节与解码已核验。禁缓存+绕SW、仅禁缓存、仅绕SW三路径及最终默认设置均恢复正常，本轮**未孤立证明SW或HTTP缓存的因果**，不将历史停滞写成当前缺陷或确定缓存bug。

之前遗漏原因：首版仅保留祀、两肖像外链和静态工厂图，另造教学“细节”开关；未完整检查目录、原字体/CSS、70段透明影片、六bin与运行状态。主动缩减丢失源站定义性机制。本轮恢复八章与真实数据媒体；当前版本文本、业务外链和未逐项状态保留清楚边界。代码/下载完成不等于全部状态通过。
