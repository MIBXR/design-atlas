# Claude — 衬线语气与 Cowork 演示 · 局部还原说明

参考URL：[https://claude.com/](https://claude.com/)

版本：2026-10-07公开营销页。implementation: reference-study。

## 观察依据

CUA实访claude.com，主标题计算72px、AnthropicSerif；左栏标题/注册框/下载按钮，右栏圆角cowork-login-hero.mp4。初次 Edge 观察受 Dark Reader 影响，后续 Root 已用 IAB 保存无扩展的公开官网截图（research/screenshots/claude-platform-source.jpg），当前对照图以该清洁截图为准。本地浅底、字号和左右结构依据官网素材及原始样式。后续一次导航自动去claude.ai/login，因此立即停止该路径，不读取任何账户内容。匿名HTML核验公开营销信息及品牌SVG。

## 局部还原范围

| 原站观察/机制 | 本地映射 | 差异/边界 |
|---|---|---|
| 衬线首屏 | 真实AnthropicSerif、72px、注册卡/视频左右结构 | 原始品牌SVG与视频本地化 |
| 注册展开 | email按钮切换表单、有效邮箱后本地反馈 | 不发送、不创建账号 |
| 套餐与FAQ | 受众/账期切换、原生details | 计划信息为日期快照 |

## 交互对照

- Continue with email展开本地邮箱表单，提交只给模拟反馈。
- 官方视频默认静音，可播放暂停；reduced motion默认暂停。
- Individual/Team and Enterprise切换套餐，年/月账期更改Pro价格；FAQ原生展开。

所有账户/订阅/服务端操作均止于本地弹窗或示例反馈；官网入口由用户自行访问。原站机制的具体点击结果未逐一完成端到端验证，不能称整站功能克隆。

## 差异

没有复现服务器认证、SSO、真正下载或订阅。视频为官方本地文件；reduced-motion暂停时没有原站视频poster，保留首帧。完整企业产品导航与所有FAQ未全量复制。

手机根据观察或合理响应式适配；所有页面自然滚动并包含prefers-reduced-motion，视频有暂停。浏览器最终像素QA由主任务统一执行，本文件不把静态检查称为完整视觉验收。

## 资产

详见[assets-manifest.json](assets-manifest.json)。图片、视频、字体、商标原样或按比例显示。素材归品牌与原作者，仅本地私人学习，不代表授权、合作或正式网站。
