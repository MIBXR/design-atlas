# Stripe — 彩带与金融产品矩阵 · 局部还原说明

参考URL：[https://stripe.com/](https://stripe.com/)

版本：2026-10-07公开营销页。implementation: reference-study。

## 观察依据

CUA实访英文首屏：白底原始设计被浏览器Dark Reader改为深色，存在data-darkreader标记；因此颜色采用早先保存的官网浅色截图及官网素材，而不复制扩展变色。主标题计算字号48px。源码/素材核验得到Söhne、wave-fallback-desktop、终端和收款背景。首屏及六类产品、全球规模、企业客户四个区域为还原范围。

## 语言版本差异

库中源截图记录中文导航和中文营销文案；本地实现使用同日官网英文版的文案与英文 Söhne 字体。布局和官方图像参考同一主页结构，未将中文截图作为英文文本换行的逐像素证据。

## 局部还原范围

| 原站观察/机制 | 本地映射 | 差异/边界 |
|---|---|---|
| 首屏彩带 | 官方原始folded mesh / shader / palette / 三档home presets，本地独立运行 | 同源渲染，容器裁切/标题层为局部还原；reduce/GPU失败才使用官方fallback |
| 产品矩阵 | 六类产品、小圆角、真实终端与支付背景 | 其余界面由本地HTML绘制，金额为示例 |
| 企业案例 | 四项可切换介绍 | 原站内容仅局部摘要，未复制全部品牌故事 |

## 交互对照

- 主导航点击展开 Products/Solutions/Developers/Resources 分类面板。
- 六个产品卡片打开详情，业务模型选择改变本地预览状态。
- Hertz/URBN/Instacart/Le Monde 切换客户介绍；注册与销售按钮打开本地说明弹窗。

所有账户/订阅/服务端操作均止于本地弹窗或示例反馈；官网入口由用户自行访问。原站机制的具体点击结果未逐一完成端到端验证，不能称整站功能克隆。

## 差异

原站彩带实时渲染已隔离复用；完整推荐器、新闻轮播未实现。客户字样中部分用文字代替专门字标；产品小界面为结构复现，非每个组件像素级复制。注册、登录、销售不连接服务器。

手机根据观察或合理响应式适配；所有页面自然滚动并包含prefers-reduced-motion，视频有暂停。浏览器最终像素QA由主任务统一执行，本文件不把静态检查称为完整视觉验收。

## 资产

详见[assets-manifest.json](assets-manifest.json)。图片、视频、字体、商标原样或按比例显示。素材归品牌与原作者，仅本地私人学习，不代表授权、合作或正式网站。


## 2026-10-07 动效复审（当前实现）

Products导航真实mouseenter展开；客户标识循环横移；Payments终端文字在mask内向上滚动，checkout同步换商户/商品。每轮5秒/.75秒为局部近似。官方彩带已使用原始WebGL渲染代码，静态fallback仅用于reduce/GPU失败。

证据：实访导航pointer进入、产品矩阵与masked terminal transform 0/-100/-200%，首行Payment810×676/Billing400×676；官方样式只读核验。

边界：原站彩带canvas渲染已用官方代码隔离；本地容器、文字混色和最终裁切不声称完整等价。付款自动状态与hover是不同触发。

详情和实操记录见 [产品动效审计](../../research/MOTION-AUDIT-PRODUCTS.md)。本地增加 darkreader-lock meta 保护官方配色，这是本地适配，不作为原站观察。


## 首屏波带追加实现 · 2026-10-07

首屏波带已从官方公开 chunk 提取20个 SingleWave / Three.js r178 渲染模块，保留原折叠网格、vertex/fragment shader、配色纹理及 wide gj / medium P1 / small y7 配置（speed=4e-5，timeOffset=17500）。独立本地 loader 替代 Next/React运行时；Worker URL 指向本地文件。没有复制账户、统计、完整站点组件。新增本地暂停按钮；菜单/对话框打开及视口外/文档隐藏时暂停，reduce或GPU不可用时显示官方fallback。轮播/支付UI与源时序分开记录，不把这条缎带变成任意CSS摆动。

- 代码与全部源URL：[wave-provenance.json](assets/wave-provenance.json)。Three.js版本178，MIT许可证随资产保存。官方React的wave组件未复制，仅使用原始控制器和纯渲染工具。
- 源码配置明确为home的gj/P1/y7，不是其他Billing/Issuing或新版另一配色的EK预设。原控制器自适应三档断点640/1264，introTimeRamp以每帧+.016推进；性能管理为原始模块。
- DOM记录本地实际运行：canvas 1738×983、fallback opacity=0；frame7/time35621.848→frame32/time58699.472；Pause后状态paused，同一time不变。实际GPU/工具采样帧率不能代表原站精确帧率。
- 页面宽高与标题仍为此前局部还原，所以同源几何的最终裁切和标题混色不是完整像素等价。canvas指针透传给页面，未迁移未实测的光带指针shader交互。暂停按钮是本地可访问性补充。

移动端复验：390×844、canvas375×542、status running/fallback opacity0、无横向溢出/破图；按照官网CSS在639px以下隐藏主标题的解释文案。暂停时仅在paused值改变时调用原控制器setter，避免重复暂停抹去时间戳造成恢复跳帧。

GPU失败回退实测：使用原控制器公开的__disableWebGL查询分支，status=fallback、canvas visibility=hidden、官方fallback opacity=1、暂停按钮hidden。reduce→normal恢复暂停控件已作代码复核，不宣称系统偏好实测。
