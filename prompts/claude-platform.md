# Claude — 衬线语气与 Cowork 演示 · 复用 Prompt

由 [结构化案例](../entries/claude-platform.json) 自动生成。参考观察与具体边界见 [调研](../research/claude-platform.md)。

## 正向 Prompt

以【claude.com公开营销页URL】在【观察日期】的真实首屏为依据做局部学习复现，不读取登录账户。保持温暖奶油底、72px Anthropic Serif标题、Sans操作文字，左栏思考主张与圆角注册卡，右栏大型官方Cowork演示视频。品牌SVG不重绘，字体视频均下载本地并记录URL、尺寸与归属。邮箱按钮可展开本地表单和返回，提交只显示不会发送的预览反馈；Google/登录入口不伪装认证。视频静音循环、有暂停，reduced motion默认暂停。下方Individual和Team/Enterprise切换不同套餐布局，年/月账期改变Pro展示，FAQ用可键盘展开的details。手机先文字后视频，注册框保留宽度与层级，导航折叠菜单、焦点明确、自然滚动。将观察、分析推断与W3C交互规范分开，明确未实现的SSO/付款/服务端能力。用于【目标AI品牌】时依据其真实语气选择字体而非机械套衬线。

动效复审边界：claude.com若因cookie重定向claude.ai或Cloudflare，只记录unavailable，不读取已登录账号、也不依据猜测补hover/scroll。保留已核验官网Cowork MP4，播放按钮由play/pause/ended事件同步真实paused状态；prefers-reduced-motion变为reduce时及时pause并移除autoplay，保留手动播放。注册卡Google/email、下载、Individual/Team、计费与FAQ用已保存公开结构及本地状态反馈；后台与账户均不接入。没有观察依据时不添加入口浮入、标题缩放或滚动劫持。

## 负向约束

不要虚构品牌或素材；不要复制通用Hero+三卡片模板；不要用抽象blob替代真实产品界面；不要接管滚轮；不要把历史文章说成当前观察；不要伪装真实账户、支付或AI执行。

## 制作约束

- 公开claude.com版本为基准，不读取claude.ai已登录账户。
- 使用实际官网字标、Anthropic字体和Cowork视频。
- 初次Edge观察受扩展变色影响，已由Root IAB补清洁公开官网截图；本地配色依据该截图与官网原始样式。
- 邮箱输入只在浏览器内，不发送、不创建账户。
- 套餐为2026-10-07快照，实际价格通过官方入口查看。
- 2026-10-07动效复审无法在Edge或IAB打开未登录claude.com首页；本地媒体可操作不等于本次验证了原站所有hover/scroll时序。
- 嵌入预览适配：800px以下收起导航为汉堡，避免718px窄桌面右侧CTA溢出；此断点为本地适配，不冒称源站观察。

## 检查方法

以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。

[查看 Demo](../demos/claude-platform/index.html) · [返回参考库](../index.html#style/claude-platform)
