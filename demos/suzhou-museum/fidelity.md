# 苏州博物馆：复现范围与证据

固定采集日 **2026-10-09**，来源[中文首页](https://www.szmuseum.com/Home/Index)。本地保留**首页主图、展览、图像目的地、参观四屏**、机构顶部与展开页尾。桌面建议从 [第3屏](index.html#page3) 看九个目的地，再前后回看。

源站本次冷加载被末尾同步第三方统计资源阻塞，document.readyState=loading、jQuery.isReady=false、四屏高度0。停止请求后，我们明确调用原 jQuery.ready()，启动页面已注册初始化；**运行态测量来自这一受控实验**，没有替换原 DOM、CSS 或插件，不能推断普通访客冷加载必然成功。原研究标签不属于用户的 Site 页面。

| 机制 | 本地实现与核验 |
|---|---|
| 桌面外框/四屏 | 原左右50px白缘、顶部与页尾；原 fullPage1.5.3、jQueryUI缓动，4锚点、700ms/easeInQuart、loopBottom；不再用两章 scroll-snap 替代。 |
| 首屏 | 两张原建筑摄影、原字标/题饰、Owl5000ms轮换、800ms/fade、悬停暂停与两点。 |
| 展览 | 当日七项原图、日期、标题与链接；原 lrtk5000ms/500ms淡入、七指标和横向触摸。 |
| 九入口 | 原75%/25%主侧结构、不等尺度图片与窄白缝；资讯/云课堂/馆藏/活动/文创/数字苏博/展览/游戏/建筑美图完整保留。 |
| 图像放大 | 原CSS1.1倍/500ms与原脚本宽度1.1倍/300ms两层机制；数字苏博另增高。补键盘focus可达。 |
| 参观/页尾 | 原两张背景、70%白色半透明板、开放时间与预约；完整网站地图500ms展开、同按钮关闭及浏览建议；本地補Escape/焦点归还。业务目的地仍官方。 |

独立代理对照 **1440×900第3屏**：四段与九个卡片所有 x/y/width/height/offsetTop/offsetLeft，以及九张图片边界，差值均小于 **0.001px**。运行态源码参数、轮播、章节与 hover 单独记录；相同几何不等于所有动态瞬间或外链业务全面通过。原图、字型与库来源、字节、尺寸、SHA-256 见[素材清单](assets-manifest.json)。

手机原站明确跳转 /Wap/Home/Index，本次该目的地未取得可用响应。**本地390px是同内容适配，不能称官网WAP复刻**：九入口、七展览和两参观板自然堆叠，无整页横溢出。减少动态关闭自动轮播和转场，保持手动入口与内容。固定原浅色/摄影，不新增音频。

已知边界：不加载第三方统计；源隐藏左右箭头 URL 返回 HTML，不凭此虚构可见操作；源脚本里的动态侧栏目标不在该页 DOM，不凭字符串新增组件；预约、账户、商城、课堂和调查仍官方。源码库保留原作者署名，无商业授权承诺。

原站/本地同尺寸第三屏截图在仓库外 heritage-audit/suzhou-source-controlled-page3.jpg 与 suzhou-local-page3.jpg；完整几何JSON在 work/fidelity/independent-audit/suzhou-{source,local}-geometry.json。正式预览由实际浏览器生成。完整状态矩阵及之前遗漏原因见[状态矩阵](state-matrix.md)：首版误缩成两章和六入口，还增加源站没有的建筑dialog/深灰框组件，现已移除。

[研究](../../research/suzhou-museum.md) · [Demo](index.html)

手机适配另做真实截图复查：修正原PC绝对定位的优先级，标志、辅助链接、主导航各一行。390×843测量logo y15..63.1、辅助73.1..94.0、导航104.0..160.6，无重叠，素材broken0、页面overflow0。截图在仓库外heritage-audit/suzhou-local-mobile-final.jpg；这是同内容适配，仍不等同原WAP。
