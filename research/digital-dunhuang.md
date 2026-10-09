# 数字敦煌：完整发现路径与真实观察尺度

归档 **2026-10-09**，[首页](https://www.e-dunhuang.com/index.htm)、[洞窟目录](https://www.e-dunhuang.com/section.htm)、[257西壁查看器](https://www.e-dunhuang.com/showmural/10.0001/0001/0001/0257/0001/0003/01)。单一快照，不并入独立云游戏或账号后台。

## 一手观察

浏览器读取 DOM、计算样式、cbpFWSlider/计数/Leaflet/DeepZoom配置和 Network 图块，实际轮换、滚动、选择时代/遗址、返回、缩放及拖动。首页四张原石窟影像每3000ms轮换、500ms切换；中心检索与导航后接寻境、六经典洞窟、十经典壁画、运行时DLC横幅、平台介绍与页尾。四项统计以1500ms/100ms到30/10/4430/300。横幅由pop.js注入750×100内嵌PNG，这种运行模块只看原始HTML会漏掉。[首页](https://www.e-dunhuang.com/index.htm)

目录实际32项，按遗址4/形制4/时代11切换条件。19个单条件服务端响应取得成员集与hash，不依据介绍文字猜形制。实点北魏得到254、257与麦积山127三条，再叠榆林零条；URL、已选范围和返回同步。首页固定统计30与目录32分别保留源值，未擅自消除源数据差异。[目录](https://www.e-dunhuang.com/section.htm)

查看器是独立Leaflet1.7.1+DeepZoom2.0.0页面。CRS.Simple、1024瓦片、逻辑21515×15796；匿名min9.75/max12，1440×900初fit10.927709695。Network实见level10一张、11两张、12六张，达到上限加号禁用，超过11出现4000ms登录提醒。真实平移/惯性与加载旋转反馈不同于对小图作CSS百分比缩放。[查看器](https://www.e-dunhuang.com/showmural/10.0001/0001/0001/0257/0001/0003/01)

## 提取与复用

“分面条件在列表前显式呈现”记录当前范围；“公开边界内的瓦片细察”连接全貌、真实图块、平移和匿名精度边界。组合取已取得单条件成员集交集是本地离线实现，不宣称枚举全部服务端组合。两项机制与既有计数、摄影主视觉、目录导航复用，文化身份由真实资料与对象组织建立。

## 复现与边界

[首页](../demos/digital-dunhuang/index.html)、[32项目录](../demos/digital-dunhuang/section.html)、[真实瓦片查看器](../demos/digital-dunhuang/viewer.html)使用原摄影、原插件与同公共缩放配置；本地9图块保留水印与尺寸，不请求登录后更高精度。21515×15796仅为逻辑坐标，不能声称本地归档完整此尺寸高清图。旧单首图/三条虚拟筛选/562×253预览/dialog方案已删除。

独立桌面对照首页前三区几何相同；计数终值、DLC及footer通过，北魏/零结果/返回与第12级六图块和禁用状态实测一致。手机按原首页响应CSS、目录单列与同画布；减少动态关闭自动运动、惯性和中间计数。二维影像视域参照[W3C Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)，真实地图键盘能力可对照[Leaflet键盘选项](https://leafletjs.com/reference-1.7.1.html#map-keyboard)，不把这些本地约束当官网合规结论。完整状态与遗漏原因见[矩阵](../demos/digital-dunhuang/state-matrix.md)，19响应见[筛选证据](../demos/digital-dunhuang/filter-evidence.json)，素材/hash见[清单](../demos/digital-dunhuang/assets-manifest.json)。
