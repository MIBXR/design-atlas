# 苏州博物馆：四屏门户、图像目的地与机构外缘

归档 **2026-10-09**，[中文首页](https://www.szmuseum.com/Home/Index)，单一固定快照。研究首页主图、展览、目的地和参观四屏及顶部/页尾；[建筑介绍](https://www.szmuseum.com/Other/MuseumIntro)用于内容背景，不把建筑理念直接冒称网页组件规范。

## 一手观察与受控启动

源站本次冷加载受末尾同步第三方统计资源阻塞：document仍loading、jQuery未ready、四屏高度0。停止加载后，明确调用页面原jQuery.ready()，启动已注册的原始初始化；测量为受控实验，不隐去冷加载失败，也没有替换源DOM/CSS/插件。读取homeindex.css?d=20190521及依赖、原fullPage/Owl/lrtk、jQueryUI，实际点击章节、悬停、查看轮播与页尾。[中文首页](https://www.szmuseum.com/Home/Index)

桌面min-width1366、左右50px白缘、四屏同高；原fullPage700ms/easeInQuart、4锚点、loopBottom。首页两张摄影配字标和题饰，Owl每5000ms/fade；展览七项各有真实图/日期/标题，lrtk每5000ms/淡入500ms。第3屏是75%/25%不等尺度结构中的九个目的地：资讯、云课堂、馆藏、活动、文创、数字苏博、展览、游戏、建筑美图。图片既有CSS1.1倍/500ms也有脚本尺寸1.1倍/300ms，数字苏博另增高，不能只以通用卡片hover代替。第4屏两张摄影叠70%面积白色半透明访问板。底部完整网站地图500ms展开。

官方建筑文说明粉墙、深灰石材边饰与自然采光，以及“中而新，苏而新”的理念。[建筑介绍](https://www.szmuseum.com/Other/MuseumIntro) 这些属于实体建筑背景；本页实际白色外缘有源CSS尺寸证据，不借文章虚构7px深灰组件。

## 提取与复用

“多尺度图像目的地目录”抽取九入口的选择结构；“机构摄影的白色外缘”抽取50px留白包围全幅机构影像的关系。它们是可观察结构的本库分析，不宣称原作者公开提出同理论。面积权重、图像缩放和章节导航复用既有条目，不按苏博品牌新开类别。

## 复现与边界

[本地四屏](../demos/suzhou-museum/index.html#page3)恢复原图、完整七展览、九入口、两参观板和原轮播/全屏插件依赖，去掉旧六入口/两屏scroll-snap与自创建筑dialog。独立1440×900第3屏对照：四屏、九卡片和九图片所有几何差值小于0.001px。此测量明确来自受控原站初始化，不能据此推广所有冷加载与外链业务通过。

源手机UA跳/Wap/Home/Index，本次未取得其可用响应；本地390为同内容长页适配，不能称WAP复刻。键盘命名、focus和减少动态为本地补充，参照[W3C非文本内容](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)、[Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)，不是官网合规审计。素材/字型/库署名与hash见[清单](../demos/suzhou-museum/assets-manifest.json)，完整状态及首版遗漏原因见[矩阵](../demos/suzhou-museum/state-matrix.md)。预约、商城、账户与调查仍明确进入官方，固定快照不冒称实时开放或库存。
