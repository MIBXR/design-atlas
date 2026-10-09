# 苏州博物馆：四屏状态与源码对照

固定日2026-10-09，源[中文首页](https://www.szmuseum.com/Home/Index)。本地[四屏门户](index.html)，建议桌面先看`#page3`再上下/反向回看。

重要证据边界：官网正常冷加载本次被末尾同步第三方统计资源阻塞，document.readyState持续loading、jQuery.isReady=false、四屏高0。停止加载后仍readyWait1。我们**明确调用了原jQuery.ready()，启动原页面已经注册的初始化**，没有替换源DOM、CSS或插件；下面桌面运行态来自此受控实验和原源码，不推断正常访客必然成功。原Tab为代理新建研究页，未操作用户原Site。

| 模块/状态 | 源证据/受控可观察结果 | 本地对应/边界 |
|---|---|---|
| 桌面外框 | body/html min-width1366/min-height550；indexcont左右50、top9/bottom30 | 同桌面规则；1440×900主画面1340×755 |
| 四屏几何 | 4段offsetTop0/755/1510/2265，各755；四个page1–page4锚点 | 全部保留；原fullPage1.5.3+原jQueryUI缓动，避免仅变hash而未移动 |
| 点击章节/滚轮/反向 | fullPage navigation:true、verticalCentered:false、loopBottom:true、默认700ms/easeInQuart | 真第3屏activeTop90、superTop-1510；反向、4→1循环和键盘章节链接 |
| 首屏轮播 | 2图；Owl singleItem、stopOnHover、fade、slideSpeed800、autoPlay5000 | 同原图/字标/中间题饰、2指示点与hover暂停；键盘命名为本地无障碍补充 |
| 展览轮播 | 同日7项展览，lrtk5000ms、淡入500ms、七条指标与横触摸；隐藏左右箭头URL返回HTML | 原7图/日期/展览链接与同插件；保留源隐藏箭头状态，不虚构可见按钮 |
| 第三屏结构 | 主区75%/侧区25%，9块各不等比例及窄白缝 | 全9项：资讯/云课堂/馆藏/活动/文创/数字苏博/展览/游戏/建筑美图，原图和常显名称 |
| 第三屏hover/focus | CSS img scale1.1/500ms；源脚本宽1.1倍/300ms；数字苏博同时增高 | 两层机制同在；键盘focus触发补充，停止后还原原尺寸 |
| 第四屏 | 两张场景背景、70%面积白色半透明板，开放时间与参观预约 | 原两图/白板/日期信息，官方预约与指南，未复制实时库存或后台 |
| 底栏展开/关闭 | 源indexbottom网站地图，500ms展开，浏览建议hover | 完整地图/友情链接、500ms高度、同按钮关闭；本地补Escape和焦点归还，源零高both不是可见关闭入口；页面统计不加载 |
| 机构顶部与目的地 | 搜索/留言/问卷/联系/中英、9主栏目、9图像目的地及正式链接 | 原URL保留，不发送问卷、留言或账号数据；原sourceJS动态#top侧栏在本页DOM不存在，不凭脚本字串新增 |
| resize | 源窗口resize执行location.reload() | 同桌面重载恢复正确容器高；不保留插件窗口高度导致导航错位 |
| 原手机路由 | 源移动UA跳/Wap/Home/Index，本次连接没有成功 | 明示未知；本地390同内容长页适配、九入口/两到访板重排，不称官网WAP像素复制 |
| 减少动态 | 不把官网当作合规审计 | 本地关闭自动轮播/位移与缩放过渡，手动章节/展览与内容保留 |

一手证据是原DOM、`homeindex.css?d=20190521`、其reset/innerfooter依赖、fullPage/Owl/lrtk样式与插件、jQuery及jQueryUI；源码文件头保留各作者署名。源图像URL全部检查，七项展览的编码URL与UnicodeDOM字符串已统一，不能因CORS捆绑失败就用虚构图替代。

原站/本地1440×900第三屏配对JPEG在仓库外`heritage-audit/suzhou-source-controlled-page3.jpg`和`suzhou-local-page3.jpg`；完整源9块/图片矩形与计算样式保存到`work/fidelity/independent-audit/suzhou-source-geometry.json`。它们是受控原站截图，不把冷加载阻塞隐藏。

之前遗漏原因：首版主动将四屏缩成第3/4屏，九入口缩为六项，把fullPage改成原生scroll-snap，并新增源站不存在的建筑dialog/7px深灰框线组件。没有完整读取插件依赖与时序，导致泛化教学表达替代了门户的实际机制。此次去掉这些替代，恢复四屏、全部主视觉/展览/九入口和访问结构；未取得WAP和后台仍明确保留边界。

手机适配另做真实截图复查：修正原PC绝对定位的优先级，标志、辅助链接、主导航各一行。390×843测量logo y15..63.1、辅助73.1..94.0、导航104.0..160.6，无重叠，素材broken0、页面overflow0。截图在仓库外heritage-audit/suzhou-local-mobile-final.jpg；这是同内容适配，仍不等同原WAP。
