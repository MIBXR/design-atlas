# Stripe — 彩带与金融产品矩阵 · 复用 Prompt

由 [结构化案例](../entries/stripe-platform.json) 自动生成。参考观察与具体边界见 [调研](../research/stripe-platform.md)。

## 正向 Prompt

制作一页基于【品牌官网URL】和【观察日期】的Stripe式金融平台局部学习复现。先读取首屏、产品矩阵与客户案例的真实截图，禁止把历史设计文章当当前CSS事实。使用已核验的Söhne本地字体、小圆角紫色主按钮、海军蓝文字和细边框。六类产品保持不同浅色背景与真实支付终端/界面层次，不能改成同一套通用白卡。产品卡可打开详情并切换业务模型；客户案例可切换，导航分类可展开。移动端单列、按钮有焦点反馈、对话框Esc关闭，自然滚动并尊重reduced motion。把素材URL、尺寸、版权及未还原区域写入清单和fidelity文件。用于【目标产品】时保留信息层级，重新核验业务结构。

动效补正：付款卡首行占两列、与Billing同高约676px；终端三种场景文字在固定高度mask内translateY(0/-100/-200%)，checkout同步在ROASTERY/SHOWFLIX/Bloom情境切换。采用视口内局部自动循环，金额本地演示不提交交易；5秒循环和.75秒ease-out是approximation，记录没有精确测得的源时序。Products使用mouseenter幂等打开菜单，click/Esc/外部点击处理关闭并同步ARIA。客户行连续水平marquee，减弱动画静止。原站single-wave canvas未移植时保留原fallback图片，明确列入unimplemented。不要全卡片悬浮或整页统一reveal。

动效落地补充：首屏波带已从官方公开 chunk 提取20个 SingleWave / Three.js r178 渲染模块，保留原折叠网格、vertex/fragment shader、配色纹理及 wide gj / medium P1 / small y7 配置（speed=4e-5，timeOffset=17500）。独立本地 loader 替代 Next/React运行时；Worker URL 指向本地文件。没有复制账户、统计、完整站点组件。新增本地暂停按钮；菜单/对话框打开及视口外/文档隐藏时暂停，reduce或GPU不可用时显示官方fallback。轮播/支付UI与源时序分开记录，不把这条缎带变成任意CSS摆动。 非必要时不要重新画波形、改变shader、统一加reveal。renderer模块来源和适配必须写在assets/wave-provenance.json，Worker/palette全部本地化，GPU失败不得留下空首屏；同时保留原始素材文件hash及Three.js r178 MIT许可证。

## 负向约束

不要虚构品牌或素材；不要复制通用Hero+三卡片模板；不要用抽象blob替代真实产品界面；不要接管滚轮；不要把历史文章说成当前观察；不要伪装真实账户、支付或AI执行。

## 制作约束

- 以2026-10-07官网版本为基准，2017设计文章仅作历史理论。
- 下载素材及字标保留原比例，不把品牌资产用于新商标。
- 金融指标为官网日期快照，界面金额为本地样例。
- 自然滚动；移动端卡片单列，菜单和弹窗可键盘关闭。
- 原站彩带是canvas渲染，静态wave.webp仅是官方fallback；不能给静图添加任意抖动并宣称原站等价。付款自动状态与hover是不同触发。
- SingleWave为官方渲染代码隔离复用；页面容器高度、标题层与浏览器GPU可能使裁切/帧率与原站不同。保留官方fallback，不声称整站shader完全等价。

## 检查方法

以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。

[查看 Demo](../demos/stripe-platform/index.html) · [返回参考库](../index.html#style/stripe-platform)
