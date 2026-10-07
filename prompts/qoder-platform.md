# Qoder — 绿色工作台与多形态平台 · 复用 Prompt

由 [结构化案例](../entries/qoder-platform.json) 自动生成。参考观察与具体边界见 [调研](../research/qoder-platform.md)。

## 正向 Prompt

请忠实研究2026-10-07 https://qoder.cn/ 中国站首页，使用实际本地官方Qoder CN黑色PNG字标（1632×344原图显示约123×26px），不放国际版promotion或Qwen标签。页面顶部淡灰绿背景，66px导航，左侧双行36px标题在约110px处开始，胶囊下载按钮靠左，产品说明在右下对齐。桌面约332px起满幅#80c777强绿背景，无圆角或左右外框；工作台应用UI占宽约84.5%，白色主区与浅灰侧栏、有真实任务输入/模式切换/工作区按钮的本地反馈。五平台资料使用已下载官方素材，但须在fidelity说明这些后续区域仅局部内容与机制研究，不宣称是CN版逐像素复制。390px标题/说明堆叠，满幅绿色底景保留，侧栏收束，横向tabs只在自身容器滚动。下载按钮打开明确本地平台选择预览并链接官方CN站，不模拟实际安装和后端执行。支持键盘tabs与Escape关闭，prefers-reduced-motion关闭平滑滚动与过渡。版权和研究注记只放页末。

动效补正：以qoder.cn公开ProductShowcase组件为准，五平台按tab点击/点控选择，源Swiper speed400、autoplay delay20000、pauseOnMouseEnter true、mobile allowTouchMove；本地自然滚动内采用400ms横向旧面板退出与新面板进入，20秒auto且pointer进入暂停，手机支持左右滑动，reduced-motion直接切换并停止auto。不要用另一个四项纵向hover组件的150ms/10秒。Hero公开路径时间13.824s/16.64s linear flow和4.8s/6.4s breathe、焦点3.8s；本地SVG几何是approximation必须注明。模式和任务仍为本地模拟；本次Edge源演示操作被审批拦截，不能伪称操作验证成功。

## 负向约束

不要虚构品牌或素材；不要复制通用Hero+三卡片模板；不要用抽象blob替代真实产品界面；不要接管滚轮；不要把历史文章说成当前观察；不要伪装真实账户、支付或AI执行。

## 制作约束

- country用于中文/中国参考分组，不作为司法注册地断言。
- 真实Qoder标识与平台图本地保存，不自行画替代logo。
- 任务与智能体只做固定本地预览，不声称调用模型。
- 手机核心界面重新排版，隐藏原桌面次级侧栏。
- 首屏观察是2026-10-07中文版本；活动和平台能力为日期快照。
- 五平台ProductShowcase是400ms/20秒Swiper，不能误套四项FeatureSection的150ms纵向出入/10秒hover循环；源演示按钮操作被自动审批拒绝，本次不宣称click结果实访。

## 检查方法

以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。

[查看 Demo](../demos/qoder-platform/index.html) · [返回参考库](../index.html#style/qoder-platform)
