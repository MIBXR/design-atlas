# 莱茵生命：官方影像的网页转译

采集日期：2026-10-09。主要源是官方特别映像 [《莱茵生命：访问》](https://www.bilibili.com/video/BV1rr4y1b7sz/)，由明日方舟官方账号（UID 161775300）于 2022-04-26 发布。补充网页源是 [2023 明日方舟四周年官方专题](https://ak.hypergryph.com/special/4th-anniversary/index.html) 的“孤星”活动章节。作品日期与本次访问日期分别记录。

本案例为 **官方影像的网页转译／教学改编**，`studyScope: visual-adaptation`。没有将二创站当官方来源，也没有声称存在一个与本地 Demo 对应的“莱茵生命官方品牌站”。影片中的构成可以是 observed，点击、展开及手机滚动方案必须是 adapted。

## 影像与网页观察

浏览器实际打开官方播放器并观看。检索工具直接读取 PV 页曾返回 HTTP 412；检索结果与浏览器作者信息确认官方身份，视觉机制以实际画面为依据。时间为约数，不作逐帧测量：

| 片段 | 观察事实 | 可迁移解释 |
| --- | --- | --- |
| 约 8–12 秒 | 米白终端上出现 ACCESS PERMISSION REQUIRED，随后黑色莱茵标记、IDENTITY CONFIRMED 与 JOYCE 等身份字样 | 机构语汇和低噪声终端文字形成秩序；原片是叙事，不能因此增加真实网页认证 |
| 约 29–34 秒 | 半透明米白档案在共同基线排成阵列，其中一个向外抽出，画面出现 CONFIDENTIAL | 重复形状建立系统，偏移形成焦点；选择触发在网页中需重新设计 |
| 约一分钟 | CMPT CTRL 等黑白科室缩写形成中心与外围矩阵，包含 ENG、ECO、STRU、DEF 等代码和小号机构说明，局部橙色节点 | 大代码与小释义可分工；中心大小是画面关系，不能扩写组织权级 |
| 约 1:32 | 黑白人员档案与小面积明亮黄绿节点 | 黄绿是局部记录信号，不足以把整个莱茵视觉概括为白底黄绿 |

四周年专题实际有首页、干员、时装、活动、家具、罗德岛通讯等入口；活动章节可见机械空间背景、两枚预告播放入口、LONE TRAIL／孤星标题、公告及多色横线。它是可观察的真实宣传网页，但不是影片档案阵列的网页版本；本地仅把它作为官方来源比较卡和背景图来源。

莱茵本次选取的是米白、透明档案、黑色机构缩写与橙色小焦点。[终末地](endfield-industrial.md) 的白底亮黄记录模块和 [原版方舟](arknights-world.md) 的黑灰青色全屏档案分别有自己的结构，不用同一“方舟风格”标签覆盖所有差异。

## 网页转译

五份“材料样本、能量记录、生态观察、工程笔记、档案目录”是原创教学内容，R/L 也是本地标记。容器、圆形记录图形和矩阵由 CSS 近似构成，不复制原影片或官方标志。官方 PV 封面和孤星背景以原字节保留，仅放在来源卡；它们不能替代对原片的观察证据。

本地选择状态同时更新容器边界/抽出、编号、标题和教学正文；前后按钮及方向键复用同一状态。展开正文使用原生按钮与 `aria-expanded`。科室按钮只切换构成解释，不扩写游戏设定。手机档案行采用原生横向滚动，页面正常纵向阅读。

[W3C Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) 支持展开按钮与正文关联；[Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) 支持颜色之外的边界、编号、文字和程序状态。[Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) 是 AAA 设计依据：本地减少动态去掉非必要抽出/平滑滚动，仍保留静态选中，不声称原作满足网页规范。

## 可独立提取

- [样本阵列的抽出选择](../patterns/specimen-pullout-selection.json)：adapted；影片视觉的网页转译，选择触发不归于原作。
- [机构缩写的中心矩阵](../patterns/department-code-matrix.json)：observed；代码尺度与释义构成来自影片，点击说明另归 adapted。
- [单一信号色集中强调](../patterns/restrained-signal-color.json)：复用，增加本地转译来源；不按品牌重复建立米白橙色巧思。

## 边界与验收

原作是影片，没有待复制的对应网页按钮、手机手势或真实登录流程。片中身份提示没有被当作认证界面；完整科室结构、影片声音与官方专题的视频/手机操作未完整验证。外部官方播放器保留原片及声音控制，本地不含音轨或自动播放。

主负责人实际检查本地 1440px 与 390px：资源正常、无横向溢出；档案前后循环 5→1、ECO 科室选择、手机展开、键盘和减少动态下静态选择通过。完整来源、触发和近似范围见 [fidelity.md](../demos/rhine-lab/fidelity.md) 与 [素材清单](../demos/rhine-lab/assets-manifest.json)。
