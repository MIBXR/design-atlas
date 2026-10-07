# Stripe：局部还原范围

参考：[Stripe首页](https://stripe.com/)，2026-10-07。本地使用同日英文正文；源对照截图为中文，文本换行不作逐像素比较。

| 区域 | 本地保留 | 近似／未覆盖 |
|---|---|---|
| 首屏波带 | 原folded mesh、shader、light palette与home gj/P1/y7；20个渲染模块、Three.js r178 | 独立loader和本地Worker适配；容器裁切、标题混色和GPU帧率不同 |
| 导航 | Products指针进入展开，click/keyboard/Escape及外部关闭 | .18秒过渡与140ms关闭延迟为近似 |
| 产品矩阵 | Payments跨两列/Billing一列同高；真实终端图、mask文字与checkout同步 | 5秒/.75秒近似；其余金融界面为简化DOM，部分原canvas未复制 |
| 客户区 | 标识左移、四个客户介绍tab | 35秒周期近似，部分字标为文本；故事摘要缩写 |

波带暂停控件与菜单/弹窗、离屏、后台暂停为本地适配；reduce或GPU失败使用官方静帧。控制器仅在paused值变化时更新，保留恢复时间连续性。639px以下标题解释文案依源CSS隐藏；手机产品单列。产品模型、金额、注册和销售反馈为本地示例；真实交易、完整推荐器和新闻未覆盖。

[设计与交互依据](../../research/stripe-platform.md) · [渲染出处与适配](assets/wave-provenance.json) · [资产来源](assets-manifest.json)。Three.js MIT许可随文件保留；其他品牌与媒体权利归原作者。
