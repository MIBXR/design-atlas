# Notion — 插画与真实工作空间 · 局部还原说明

参考URL：[https://www.notion.com/](https://www.notion.com/)

版本：2026-10-07公开营销页。implementation: reference-study。

## 观察依据

现有2026-10-07官方首屏截图显示居中94px左右巨字、Think浅蓝胶囊、蓝色行动和围绕Ramp HQ的手绘人物。匿名官网HTML核验产品视频、移动端图片、capture/find/automate三组真实素材及NotionInter字体。新一轮Edge导航出现ERR_CONNECTION_CLOSED，因此不把失败页称为实访完成；布局依据同日已有官方截图、HTML和第一方正文。

## 局部还原范围

| 原站观察/机制 | 本地映射 | 差异/边界 |
|---|---|---|
| 巨字与动词高亮 | 94px标题、浅蓝胶囊、官网字体 | 动词采用点击切换，未重建全部自动动画 |
| 人文产品展示 | 官方hero视频/poster和mobile图 | 视频静音，可暂停 |
| 三种工作能力 | 官网capture/find/automate图片 + 本地示例弹窗 | 真实功能图片、模拟文档数据分开 |

## 交互对照

- 首屏动词可切换Think/Work/Build，产品视频可播放/暂停。
- Product/AI/Resources导航展开；主要按钮引导本地工作空间。
- 知识、问答与任务代理打开本地操作示例；工作空间三个文档栏目切换内容。

所有账户/订阅/服务端操作均止于本地弹窗或示例反馈；官网入口由用户自行访问。原站机制的具体点击结果未逐一完成端到端验证，不能称整站功能克隆。

## 差异

首屏核心构图和素材保持真实。后续功能文案为概述，部分功能背景与文档示例为局部迁移，不称整站像素级复制；未还原所有客户墙、真实搜索和agent执行。

手机根据观察或合理响应式适配；所有页面自然滚动并包含prefers-reduced-motion，视频有暂停。浏览器最终像素QA由主任务统一执行，本文件不把静态检查称为完整视觉验收。

## 资产

详见[assets-manifest.json](assets-manifest.json)。图片、视频、字体、商标原样或按比例显示。素材归品牌与原作者，仅本地私人学习，不代表授权、合作或正式网站。


## 2026-10-07 动效复审（当前实现）

动作词按官方脚本Think/Ship/Create/Build/Jam/Scale每2500ms轮换；胶囊label宽度300ms cubic-bezier(.86,0,.07,1)。官方10.967秒视频自然循环，滚出视口仍播放，按钮真实暂停。无通用reveal。

证据：Edge实访首屏、Product点击、滚动两列bento及Pause→Play；公开脚本取得6词2500ms、源CSS宽度300ms与ease-in-out-quint。

边界：原站动作胶囊是自动label轮换而非只点击的三词选择；视频不是scroll-scrub，也不应因下滚任意暂停。动态标题不持续aria-live广播。

详情和实操记录见 [产品动效审计](../../research/MOTION-AUDIT-PRODUCTS.md)。本地增加 darkreader-lock meta 保护官方配色，这是本地适配，不作为原站观察。
