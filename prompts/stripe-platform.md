# Stripe — 彩带与金融产品矩阵 · 复用 Prompt

由 [结构化案例](../entries/stripe-platform.json) 自动生成。参考观察与具体边界见 [调研](../research/stripe-platform.md)。

## 正向 Prompt

制作基于【官网URL】和【观察日期】的Stripe金融平台局部学习页。采用本地Söhne、海军蓝文字、紫色4px圆角主按钮和1266px细框线内容区；首屏是48px连续段落式定位，背景运行官方SingleWave折叠网格、shader和light palette。使用已归档的20个渲染模块、Three.js r178 MIT许可、本地Worker与纹理；home相机配置为wide gj/medium P1/small y7，speed=4e-5、timeOffset=17500，不改写成任意CSS波形。提供暂停/恢复，菜单或对话框打开、离屏、后台时暂停；reduce或GPU失败显示官方fallback。产品矩阵保持不同浅色与图形结构：首行Payments跨两列、Billing一列同高约676px，使用真实终端图和本地支付DOM。终端文本在mask内以translateY(0/-100/-200%)向上换场景，checkout同步商户、商品和金额；5秒周期和.75秒过渡为近似，轮换由时间触发。客户标识连续左移，35秒周期为近似。Products指针进入展开，点击、键盘、Escape及外部点击同步ARIA；.18秒菜单过渡和140ms离开延迟为本地适配。产品详情可选择业务模型，四个客户tab更新介绍，金额与注册反馈明确为本地示例。手机产品单列、窄屏裁切遵从已归档样式，所有弹窗可关闭，保留自然滚动、焦点和减少动态。记录资产及渲染适配来源；容器裁切、标题混色、其余金融演示和后端不称完整等价。

## 负向约束

不要虚构品牌或素材；不要复制通用Hero+三卡片模板；不要用抽象blob替代真实产品界面；不要接管滚轮；不要把历史文章说成当前观察；不要伪装真实账户、支付或AI执行。

## 制作约束

- 2026-10-07首页与2017设计文章分别作为实例和历史理论。
- SingleWave保留原shader、palette和home三档相机；官方fallback用于减少动态或GPU不可用。
- 产品卡跨度随内容变化；终端与checkout状态同步，自动轮换和hover分别表达。
- 界面金额为示例，金融指标为观察日快照；账户、销售和支付不接入。
- 自然滚动；手机单列；菜单、tab和弹窗具键盘状态。
- 渲染容器裁切、标题混色和帧率存在环境差异；部分客户字标以文字呈现。

## 检查方法

以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。

[查看 Demo](../demos/stripe-platform/index.html) · [返回参考库](../index.html#style/stripe-platform)
