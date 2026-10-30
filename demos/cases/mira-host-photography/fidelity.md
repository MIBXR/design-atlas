# Mira Høst：复刻范围与本地化清单

归档日期：2026-10-27。来源为 [garden-skills 固定提交中的摄影示范页](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/demo/web-design-demo/demo2-with-skill.html)，提交 `2b9a89340b70f632d31c0f1c69fce94a7912423e`，文件 `demo/web-design-demo/demo2-with-skill.html`。

## 当前实现

主文件从该提交 Git blob 读取，保持来源 HTML、内联 CSS、JavaScript、英文文案、注释与 LF 字节，仅将下表资源 URL 替换成本地路径。来源的 `lang="zh-CN"`、CSS 肖像占位、虚构履历与摄影署名、`#` 占位链接、小字号、文字箭头和减少动态策略均按原样保留。页面代码附来源 MIT 许可，字体与摄影按独立许可记录。

Mira Høst 是 [来源 README 第 441 行](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L441) 明确说明的虚构角色；页面中的人物、出版与展览经历不能视作真实事实。原始生成提示词来自 README 第 436 行。来源的林月作品集内容不同，README 未明确其为无技能版本，不作为基线。

## 触发与状态

完整模块／状态矩阵见 [研究文档](../../../docs/cases/mira-host-photography.md#模块状态矩阵)。主 Demo 保留以下源码机制：首图完成加载后的淡入与 24 秒交替推镜；标题分词进入；固定顶栏和侧边标记的差值混合；专题的粘性说明与非对称图组；六行作品目录的悬停位移和缩略图；人物介绍、三列合作方式、随笔、墨色联系区和页脚；一次性滚动显现；1100／900／540px 断点及来源的减少动态分支。

机制参数来自固定提交源码；以下浏览器结果来自主负责人本轮实际运行，与源码判断分别记录。未启用真实邮箱或外部业务，未发送信息。

## 已验证的运行状态

测试使用无头 Edge `155.0.4283.62`、默认图形后端，CSS 视口 `1440×1000`／`390×844`，DPR 1、语言 `zh-CN`、浅色环境。来源通过同一静态服务器直接服务只读来源目录，本地版独立打开。原始证据 `geometry-results.json`、`runtime-results.json`、`ui-results.json` 与截图保存在本轮交付目录，不作为仓库内文档链接。

| 核对项 | 来源与本地的实际结果 | 判定边界 |
| --- | --- | --- |
| 桌面几何与字体 | 1440px 时文档均为 `1440×8503`；首屏及六章节位置／高度逐项一致；主标题均为 Instrument Serif `132.48px / 124.531px` | 当前视口与已测元素通过，不代替全部中间宽度测量 |
| 手机几何与字体 | 390px 时文档均为 `390×10769`；首屏及六章节位置／高度逐项一致；主标题均为 Instrument Serif `50.7px / 47.658px` | 两宽均无横向溢出；窄屏重排的已测几何通过 |
| 摄影资源 | 两宽的全部 14 张图均完整加载，逐项自然尺寸相同 | 资源就绪通过；慢网与失败恢复未实测 |
| 章节到达与显现 | 六个章节均实际走查，显现容器计数依次为 `3／2／3／2／3／3`，两侧全部已进入 `in` | 章节可到达且显现完成；所有交错帧、返回时不重播未逐帧验收 |
| 目录悬停与离开 | 标签置前且几何稳定后，两侧均实际匹配 `:hover`；缩略图透明度 `0→1→0`，进入时缩放 `.94→1` | 当前目录行的进入／完成／离开通过；快速反向、键盘等价预览未实测 |
| 导航与窄屏目录 | 稳定后的锚点顶部均为 `0`；390px 目录缩略图均为 `display:none`；顶栏混合模式均为 `difference` | 当前导航和计算样式通过；所有深浅背景交接中间帧未逐一验收 |
| 减少动态初态 | 390px 两侧均命中减少动态；首图动画为 `none`，16 个显现容器全部 `in`，标题动画时长为 `0.001s` | 初始偏好分支通过；运行中切换、真实触摸与辅助技术未实测 |
| 站内与独立入口 | 双宽案例库筛选均显示两项示范作品，详情标题／分类／嵌入 Demo 正确；独立 Demo 和详情双宽截图、两份 JPEG 预览均已生成 | 已测入口无横向溢出；占位详情与外部业务仍按源码边界保留 |
| 错误记录 | 最终控制台错误、404、页面异常均为 0 | 限于本轮实际访问路径和资源请求 |

`shots/compare-mira-1440.png` 的左侧为来源、右侧为本地，主负责人目视确认画面一致。比较在相同随机种子、`2000ms` 时钟与截图停用 CSS 动画的条件下取景；功能走查恢复时钟。详尽模块判定见研究矩阵。

## 逐项资源替换

下表行号对应固定提交原文件。字体样式表是来源相同 Google Fonts 请求的响应，只改字库地址；字体族、字重、正斜体、`font-display` 与 `unicode-range` 均保留。图片保留完整请求的原始响应字节，不转码、重裁或调色；同图不同宽度分别保存。

| 原文件行号 | 原值 | 新值 | 原因 |
| --- | --- | --- | --- |
| 9 | `https://fonts.gstatic.com` | `.` | 字体从当前同源加载，预连接目标随之本地化；保留标签。 |
| 8 | `https://fonts.googleapis.com` | `.` | 字体从当前同源加载，预连接目标随之本地化；保留标签。 |
| 10 | `https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500&display=swap` | `assets/fonts.css` | 以下载的同请求 Google Fonts 样式表替换外链，仅其字库 URL 改为本地路径。 |
| 1253 | `https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?auto=format&fit=crop&w=2400&q=85` | `assets/photo-1518562180175-34a163b1a9a6-w2400-q85.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1367 | `https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=85` | `assets/photo-1500534314209-a25ddb2bd429-w1600-q85.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1371 | `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85` | `assets/photo-1464822759023-fed622ff2c3b-w1000-q85.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1375 | `https://images.unsplash.com/photo-1485470733090-0aae1788d5af?auto=format&fit=crop&w=1000&q=85` | `assets/photo-1485470733090-0aae1788d5af-w1000-q85.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1379 | `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=85` | `assets/photo-1506905925346-21bda4d32df4-w1600-q85.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1417 | `https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?auto=format&fit=crop&w=600&q=80` | `assets/photo-1518562180175-34a163b1a9a6-w600-q80.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1425 | `https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=600&q=80` | `assets/photo-1486870591958-9b9d0d1dda99-w600-q80.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1433 | `https://images.unsplash.com/photo-1495312040802-a929cd14a6ab?auto=format&fit=crop&w=600&q=80` | `assets/photo-1495312040802-a929cd14a6ab-w600-q80.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1441 | `https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=600&q=80` | `assets/photo-1418065460487-3e41a6c84dc5-w600-q80.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1449 | `https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80` | `assets/photo-1454496522488-7a8e488e8606-w600-q80.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1457 | `https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80` | `assets/photo-1469474968028-56623f02e42e-w600-q80.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1609 | `https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=900&q=80` | `assets/photo-1486870591958-9b9d0d1dda99-w900-q80.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1621 | `https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80` | `assets/photo-1454496522488-7a8e488e8606-w900-q80.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |
| 1633 | `https://images.unsplash.com/photo-1495312040802-a929cd14a6ab?auto=format&fit=crop&w=900&q=80` | `assets/photo-1495312040802-a929cd14a6ab-w900-q80.jpg` | 摄影图本地化，保留来源的宽度、质量及裁切参数。 |

字体样式表中的全部字库替换如下；同一文件被多个字重声明引用时，行号逐个列出。

| 来源字体样式表行号 | 原值 | 新值（相对 assets/fonts.css） | 原因 |
| --- | --- | --- | --- |
| 7 | `https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjgn7MsNo.woff2` | `fonts/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjgn7MsNo.woff2` | 字体样式表中的字库 URL 本地化。 |
| 16 | `https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2` | `fonts/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2` | 字体样式表中的字库 URL 本地化。 |
| 25 | `https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zsTjmbI.woff2` | `fonts/jizBRFtNs2ka5fXjeivQ4LroWlx-6zsTjmbI.woff2` | 字体样式表中的字库 URL 本地化。 |
| 34 | `https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2` | `fonts/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2` | 字体样式表中的字库 URL 本地化。 |
| 43、70、97 | `https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPb54C-s0.woff2` | `fonts/V8mDoQDjQSkFtoMM3T6r8E7mPb54C-s0.woff2` | 字体样式表中的字库 URL 本地化。 |
| 52、79、106 | `https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPb94C-s0.woff2` | `fonts/V8mDoQDjQSkFtoMM3T6r8E7mPb94C-s0.woff2` | 字体样式表中的字库 URL 本地化。 |
| 61、88、115 | `https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.woff2` | `fonts/V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.woff2` | 字体样式表中的字库 URL 本地化。 |

## 许可与验证边界

代码 MIT 许可原文为 `LICENSE`；Instrument Serif 和 Space Grotesk 的 OFL 1.1 许可原文分别为 `fonts/InstrumentSerif-OFL.txt` 和 `fonts/SpaceGrotesk-OFL.txt`。照片按 Unsplash License 记录，逐项来源、用途、尺寸、字节数和归属核查结果见 [素材清单](assets-manifest.json)。

动画参数与来源一致。

两张照片的官方照片页已确认 Urban Vintage、Jay Mantri 归属；其余八张照片的照片页和作者明确为“未查到”。不根据虚构摄影署名或第三方同图上传推定真实作者。占位肖像、`#` 目录／随笔／社交链接以及虚构联系信息均保留来源形态，没有真实业务验收。

## 模块对照结果

定位均相对来源 `demo2-with-skill.html`；本地对应为同名选择器，主文件为 [本地 Demo](index.html)。源码说明与浏览器实测分开记录；实测条件和证据范围见下节。

| 模块／状态 | 本地对应 | 证据与判定 |
| --- | --- | --- |
| 首屏加载与开场 | 同名元素，资源 URL 本地化 | 双宽首图完整加载、自然尺寸及主标题计算字体一致；1440px 同条件首屏对照视觉一致。慢网、冷／热缓存交接及完整推镜周期未实测 |
| 顶栏与竖排标记 | 同名元素 | 六个章节均实际到达；两侧顶栏计算混合模式均为 `difference`，稳定后的锚点顶部为 `0`。键盘与所有背景交接中间帧未实测 |
| 重点系列 | 同名元素，四图原 URL 参数分别下载 | 1440／390px 章节位置与高度一致；三个显现容器均已进入 `in`，四图完整加载。粘性全程与图版缩放中间帧未单独验收 |
| 六组作品目录 | 同名六行与占位链接 | 两侧均有六行；前台稳定状态下悬停缩略图透明度 `0→1→0`、进入时缩放 `.94→1`；390px 缩略图均为 `display:none`。键盘等价预览与快速反向中间态未实测 |
| 作者介绍 | 同名元素，保留虚构原文 | 实际到达，三个显现容器均已进入 `in`；双宽章节位置与高度一致。占位肖像没有替换为真人照片 |
| 三种合作方式 | 同名三列 | 实际到达，两个显现容器均已进入 `in`；双宽章节位置与高度一致。逐列过渡中间帧未实测 |
| 三篇随笔 | 同名三项与本地图片 | 实际到达，三个显现容器均已进入 `in`；封面均完整加载，双宽章节几何一致。封面缩放与占位链接行为未逐项验收 |
| 联系与页脚 | 同名元素 | 联系区实际到达，三个显现容器均已进入 `in`，双宽章节几何一致。页脚各链接、邮箱和外部业务未实测，未发送信息 |
| 一次性滚动显现 | 同名 CSS 和脚本 | 六章节共 16 个显现容器在走查后均已进入 `in`；两侧计数一致。返回时不重播与所有交错帧未逐帧验收 |
| 减少动态 | 同名 CSS 和脚本 | 390px 两侧偏好均命中：首图 `animation-name:none`、16 个显现容器全部 `in`、标题动画时长 `0.001s`。偏好运行中切换与辅助技术未实测 |

[许可原文索引](LICENSES.md)。
