# 当前项分级强调与中性悬停 · 复用 Prompt

[结构化条目](../../entries/patterns/current-item-emphasis-tiers.json)

把导航当前项分成两级：顶栏与手机全站导航用 --accent-3 实心底、--accent-3-ink 字；侧栏、手机本页目录及本文目录用 --accent-4 柔和底、--accent-2 字和 650 字重。非当前导航悬停使用 surface-2 底加 ink 正文色，无主题色描边；当前项悬停维持当前样式。每个位置同步 aria-current，焦点轮廓用 --accent-1。通用按钮悬停仍可用柔和主题底，卡片与正文链接沿用自己的反馈。Web 当前项圆角 4px，Motion 顶栏 999px 胶囊；减少动态即时更新状态。

## 制作约束

- 实心底配 --accent-3-ink，柔和底配 --accent-2 与 650 字重。
- 非当前导航悬停使用次级面与正文色；按钮、卡片和正文链接保留各自反馈。
