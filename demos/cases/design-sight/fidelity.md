# 21_21 DESIGN SIGHT：海报与四列档案：复现范围

[案例条目](../../../entries/cases/design-sight.json) · [研究](../../../docs/cases/design-sight.md) · [Prompt](../../../prompts/cases/design-sight.md)

| 机制 | 本地差异与依据 |
| --- | --- |
| 首次加载完成 | 依据公开common.js和CSS；不是定时假进度。 |
| 海报自动切换 | 本地另加暂停与后台／离屏停止。 |
| 手机打开菜单／关闭 | 手机结构和时长由公开responsive.css/common.js核对。 |
| 手机展开栏目／页面回顶 | 减少动态即时操作，桌面保留完整列。 |
| 悬停档案与分类 | 样式依据原站公开CSS。 |

原站桌面全程与菜单已验证。原站手机DevTools视口调用重试后仍被保存权限拦截，手机行为由公开响应式脚本/CSS确认并在本地实测，不宣称原站手机操作已经通过。

## 复刻未使用的原站素材

- `source/assets/tour_architecture-thumb-500x333-8287.jpg`
