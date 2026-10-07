# Apple：产品即主角

核验日期：2026-10-07。目标是迁移设计方法，不做商标、素材或文案复刻。

## 直接观察

[Apple iPhone 分类页](https://www.apple.com/iphone/) 的首屏截图保存于 screenshots/apple-product-source.png：极大分类标题、可辨识硬件导航和宽大产品面板。正文按使用收益展开，而不在首屏罗列全部技术参数。

[当前 iPhone Pro 产品页](https://www.apple.com/iphone-18-pro/) 的正文显示 Highlights→Design→Cameras→Performance 等章节，设计部分有颜色输入，升级部分有机型比较选择器。官网可能持续更新；此记录仅对应核验当日。截图来自分类页，产品页仅做文本核验，未把其动效效果当作已视觉观察。

## 理论与推断

[HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion) 说明动效应有明确目的、简短且可以选择关闭。HIG面向Apple平台应用；用于网页是本库的迁移选择，并非Apple官网必须遵循的规范。

设计推断：大尺寸本体+逐章证据构成“先感知、后理解、再决策”；局部配置器减少用户在选择和产品之间来回寻找的成本。

## 实现映射

|依据|本地实现|检验方式|
|---|---|---|
|硬件本体主视觉|原创SONO耳机SVG：头梁、衬垫、调节臂、耳罩与高光|首屏可辨识真实产品构造|
|颜色输入|陶土/石墨/苔绿三个按钮|颜色、名称、pressed状态同步|
|逐章特写|深色声学图、舒适度与规格章节|每节只承担一个主张|
|有目的动效|仅配置与模式的短反馈|减少动效下功能完整|

## 约束与边界

不使用苹果照片与标志。SONO、数值和性能均为虚构。SVG是适合示范的材质近似，不代替真实产品摄影。布局需要有高质量产品视觉支持，图片匮乏时不应机械套用。颜色选择也提供文本，原生滚动不被劫持。

对应代码：../demos/apple-product/index.html。复用Prompt和tokens见 ../entries/apple-product.json。
