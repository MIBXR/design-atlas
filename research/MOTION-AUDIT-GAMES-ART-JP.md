# 游戏 IP 与日本艺术页面：动效补审

实访与实现日期：**2026-10-07**。覆盖 **10/10** 指定案例：七个游戏 IP、三个日本艺术/文化官网。使用专属 Edge 研究标签，实际操作官网按钮、角色选择、菜单和浏览动作，再核对页面已加载脚本、DOM 的 active/transform/opacity/transition-duration 与媒体状态。没有把“源码里有动画库”直接当作效果已经成功出现，也没有给所有页面统一加进入淡化。

以下时长只在有官网参数或现场状态证据时称为官方参数；自编过渡明确标为近似。官网图片、视频、BGM与角色语音保留来源和权利记录；不运行官网的统计、账号或第三方 SDK。

## 验证范围

十页都实际检查桌面 1440×1000、手机 390×844，以及主要键盘操作。手机实测文档宽 **375px**、正文约 **375.2px**（浏览器滚动条占用视口），十页均未发生横向溢出，已加载图像均有自然尺寸。刷新了 `previews/<id>.jpg`、`previews/mobile/<id>.jpg`；交互状态另外保存在 [previews/motion](../previews/motion/)。原始机器可读状态见 [motion-audit-games-art-jp.json](motion-audit-games-art-jp.json)。

系统 `prefers-reduced-motion` 当时为 false。没有改变系统/浏览器设置；用各页 **`?motion=reduce` 应用级测试入口**实际执行同一降级判断，核验静止视频、无位移替换、海报/照片不自动推进和可用手动操作。这是应用分支验证，不冒充 OS 偏好切换实测。播放被浏览器拒绝的 catch 分支保留，但本轮没有制造拒绝来声称已覆盖。

移动端尺寸、按键和菜单为本地实际验证；原站专属曲线、所有断点、持续演出全时段和全部 hover 不是完整覆盖。没有可用的独立 hover 动作时，保留声明证据及限制，不把 CSS 声明当成现场 hover 测试。

<a id="zelda-world"></a>
## 1. 塞尔达：同一舞台的世界章节

原站：[Nintendo 世界页](https://www.nintendo.com/jp/zelda/totk/world/index.html)；[本库说明](zelda-world.md)。本轮点击声音选择 OFF，进入场景后点击「創る」。对应缩略、video frame、标题的 active 状态同步；片段随后会自动推进。滚轮没有逐章翻页，现场 scrollY 仅约 3.2px。已加载的 [main.js](https://www.nintendo.com/jp/zelda/totk/assets/js/main.js) 中，桌面 wheel 翻章被注释；缩略点击切换、片尾推进、300ms锁定和指针静止3秒后界面隐藏可以区分。

修复：把原来的三段长文档改为**同一满屏舞台内的三章视频**，只播放选中一段，标题/缩略同步；增加方向键、水平触摸、持续暂停。短片结束换章，暂停/减少动态时不自动推进。300ms亮度及标题曲线为本地近似。

实际验证：桌面 BGM 点击后 paused=false、时间推进，再关闭；暂停画面后3段都 paused=true。键盘从第二章到第三章，URL与焦点同步。390px及减动测试从第一章到第二章，所有视频仍暂停，无溢出。未覆盖：完整HLS长度、片尾前1秒策略、3秒UI隐藏、绿环加载及Nintendo账号菜单。

<a id="persona-kinetic"></a>
## 2. Persona 5 Royal：角色整体横移与金色闪光

原站：[国际英文页](https://persona.atlus.com/p5r/?lang=en#)；[本库说明](persona-kinetic.md)。实点第一个 Next，角色从主人公到 Kasumi；slick-track 出现 translate3d(-1305px,0,0)。服装按钮使当前 chara-box 增加 on。[官方功能脚本](https://persona.atlus.com/p5r/resources/js/top.d7194e2d6bcaddee6e3c.js) 使用非循环 Slick，默认500ms。kv-canvas、bg-stars 在页面实际存在，金色闪光在[帧A](screenshots/persona-kinetic-motion-source-a.jpg)和[帧B](screenshots/persona-kinetic-motion-source-b.jpg)中改变。

修复：角色立绘、Persona与资料整体作500ms水平进退，三人子集首尾停止。新增可暂停的金色光点；**光点轨迹与7秒周期是本地近似**，并未运行PIXI。角色服装与艺术资源仍是真实官网素材。

实际验证：桌面及390px方向键选择龙司，制服更换为真实 ryuji-school 文件；减动分支不生成运动残影，角色即时更新。未覆盖：源站10人全表、第二人Kasumi、服装全部层变换与Canvas完整登场序列；本轮原站Canvas群像未完整出现，因此没有依据该失败状态推断人物轨迹。独立BGM未核验，只有官方有声PV外链。

<a id="genshin-world"></a>
## 3. 原神：整屏章节与短促角色淡化

原站：[当前国际版本页](https://genshin.hoyoverse.com/en/)；[本库说明](genshin-world.md)。实际滚动一次进入角色屏，swiper-wrapper 位移到 -939px，document.scrollY仍为0；点第二个角色后，前一个 opacity 归0并带100ms过渡，第二立绘及 Water Imp 简介出现。版本配置来自已加载的 [setups](https://act.hoyoverse.com/puzzle/hk4e/pz_5yRXZTt_wZ/setups.d850a780.js) 与官方渲染器。

修复：角色立绘使用100ms交叉淡化；桌面原生 scroll-snap **近似**源站垂直Swiper，手机为自然长文档；首屏视频离屏暂停。新增简介来自现场可见内容，第二角色名称图未单独核验，仍标“官方第二角色”。

实际验证：桌面/手机方向键切换第二角色；详情对话框实开、Escape关闭；首屏3秒MP4加载，静音且能暂停，減动时初始停止。初次快速点击早于hash滚动落定，落定后重新验证成功，不把中间态当成完成。未覆盖：锁定滚轮的完整Swiper、技能/武器页和全部版本弹层；背景片无音轨，不声称原站BGM已取得。

<a id="arknights-world"></a>
## 4. 明日方舟：纵向分块演出与干员媒体

原站：[中国大陆官网](https://ak.hypergryph.com/)；[本库说明](arknights-world.md)。实点operator导航及阿米娅，02 OPERATOR、Amiya E0、黑泽朋世资料出现；DOM可见translateY舞台和0/200/400/600/800/1000ms分块delay。[官网入口脚本](https://web.hycdn.cn/arknights/official/_next/static/chunks/main-app-fccc8d83e156badb.js)是本轮实际加载版本。

修复：立绘与资料分块纵向进入，错开200ms；500ms时长及缓动是本地近似。角色/精英更新重播局部演出，立绘不再拦截按钮；语音播放/暂停的无障碍名称跟随事件。首屏视频有独立可见性检查，避免在角色页恢复播放。

实际验证：桌面/390px键盘选择阿米娅，精英二实际使用amiya-e2.png；官网日语语音点击后 paused=false、状态为“暂停阿米娅官方日语语音”，结束/暂停恢复播放名称。减动时首屏停止、角色可即时切换。未覆盖：WebGL世界效果、E0、全部干员与源站全部场景曲线；凯尔希语音未下载，按钮明确禁用，BGM文件无公开曲名。

<a id="uma-musume"></a>
## 5. 赛马娘：有边界的玩法滑轨

原站：[Cygames 国际英文页](https://umamusume.com/)；[本库说明](uma-musume.md)。实点Gameplay Next，Splide list 为 translateX(-2000px)，**400ms cubic-bezier(.25,1,.5,1)**；起点 Previous disabled，中间两侧可用。没有据角色群像静图臆造奔跑动画。

修复：瞬时换图改成三个完整图文/立绘面板横移；首张禁用Previous、末张禁用Next，不再绕回。实际验证：桌面及手机从Training到Academy，再到Racing，当前文案/面板为第三组、Next disabled；减动时仍能选择所有组。未覆盖：官网全部人物集合带、截图放大交互及更多新闻。教学菜单和PV说明框是本地补充，无伪造BGM。

<a id="blue-archive"></a>
## 6. 蔚蓝档案：真实学院角色舞台

原站：[日本首页](https://bluearchive.jp/)及[官方角色页](https://bluearchive.jp/character)；[本库说明](blue-archive.md)。本轮角色异步页成功加载，实点第二头像，swiper-wrapper 为 translate3d(-1413px,0,0)、**transition-duration:1000ms**；Hoshino资料、CV花守ゆみり与立绘对应。[实访截图](screenshots/blue-archive-character-source.jpg)，[已加载角色样式](https://webusstatic.yo-star.com/bluearchive_jp_web/css/view-character-vue.b3742afb.css)。

修复：加入阿比多斯四位学生、左侧学院标记、中间资料卡、右侧立绘与1000ms整块横移。14份新增官方图片的尺寸、hash和URL进入manifest。普通模式恢复静音城市背景播放且可停，补后台及离屏暂停和加载时序保护。

实际验证：桌面/390px方向键到Hoshino，当前姓名、年级、生日、身高、立绘同步；减动下背景停止，四学生可访问，全部图片成功加载。未覆盖：其他学院、全部语音与原站完整路由；其他学院明确外链，语音未造按钮。手机重排为可读版本；资源观察器仍明确是教学补充。

<a id="monument-valley-game"></a>
## 7. 纪念碑谷：静音影像与缓慢画廊

原站：[一代官网](https://www.monumentvalleygame.com/mv1)；[本库说明](monument-valley-game.md)。实点Next，slick-track 显示 translate3d(-5400px,0,0)、**transform 500ms**；页面实际背景和预告均为67.988秒MP4。[官网功能脚本](https://www.monumentvalleygame.com/js/main.js)为已加载版本。

修复：单图瞬时替换改成四幅横向画廊；恢复普通模式静音背景播放、持续暂停，手动预告才启用官方声轨；背景/预告离开前台停播。实际验证：桌面/390px方向键到第二图，索引与横轨同步；减动取消位移、背景初始暂停。未覆盖：14图完整集合、部分視差和进入动画、原Humanist521字体；手机圆形菜单及奖项展开是本地易用性补充。

<a id="design-sight"></a>
## 8. 21_21：海报轮换与四类导航

原站：[21_21 DESIGN SIGHT](https://www.2121designsight.jp/)；[本库说明](design-sight.md)。实按PageDown后scrollY939.2，自动当前slide变为gallery3；已加载的内联Slick配置为**6000ms间隔、1000ms淡化**。[common.js](https://www.2121designsight.jp/assets2017/common/js/common.js)另声明栏目固定及50ms链接/Logo反馈。

修复：恢复同节奏海报轮换，增加手动暂停/恢复；选择和聚焦时停自动，离屏/后台停播；蓝色四栏目导航吸顶。实际验证：桌面及390px键盘到TYPE-XVII，图片/alt/官网详情链接同步；手动后aria-pressed暂停为true；减动不自动推进，手动切换仍有效。未覆盖：原CMS更多档案、同步栏目箭头与Vimeo联动；hover只读到官方声明，未独立现场触发。

<a id="mori-art-museum"></a>
## 9. 森美术馆：信息服务的克制反馈

原站：[日本官网](https://www.mori.art.museum/jp/)；[本库说明](mori-art-museum.md)。实点LANGUAGE显示五种语言地区入口，下滑939.2px后列表收起、机构导航保留在顶部；已加载 [common.js](https://www.mori.art.museum/jp/common/js/common.js?20261007092134)声明滚动固定导航。当前首屏为单幅Mariko Mori展览视觉，**未观察到轮播**。

修复：正文浏览时导航吸顶并换小字标，语言菜单滚动收起，返回顶部随浏览显示；补齐五个真实官方地区外链。实际验证：桌面键盘开语言/Escape关闭，下滑后小字标出现；390px菜单实际展开，Escape回到菜单按钮，无溢出。减动菜单内容正常。未覆盖：全部设施导航与交易；200ms返回顶部曲线为本地近似，没有臆加海报演出。

<a id="fuji-rock"></a>
## 10. 富士摇滚：摄影轮换与菜单退场

原站：[FUJI ROCK FESTIVAL ’26](https://www.fujirockfestival.com/)；[本库说明](fuji-rock.md)。实际第二dot显示**800ms opacity cubic-bezier(.25,1,.5,1)**；打开菜单出现多列层级。[top-2026.js](https://www.fujirockfestival.com/2026/assets/js/top-2026.js)配置3600ms自动间隔；[common.js](https://www.fujirockfestival.com/2026/assets/js/common.js)在601ms后隐藏菜单，同时让背景wrapper退场。

修复：三组真实桌面/手机配对照片按3600ms/800ms自动淡化；手动选择停自动，背景/后台停轮播。菜单600ms过渡与背景退场为本地近似，背景inert防止键盘进入遮住的内容。实际验证：桌面/390px键盘切第二图、开菜单；减动停止自动并直接开关菜单，Escape回菜单按钮，main的inert属性随关闭解除。未覆盖：官网20张照片、Featured600ms完整循环/自动滑轨和上滑回显导览。2026活动已结束；Aftermovie为官方YouTube外链，无独立BGM。

## 完整性

本轮仅修改以上十例各自demo/entry/research、必要清单与预览，未改共享目录/README/QA/scripts，未运行构建或提交Git。十例JS语法检查通过；**175份清单资产**按各例文件根解析并逐一验证字节数与SHA256，无缺失或不匹配。此前四例使用清单文件名相对assets目录，后六例使用assets/路径，两种约定均按其实际目录核验。

10/10指已完成本次现场审计与局部修复，不表示十个完整官网均已逐像素、全断点和全演出复刻。
