# Claude：衬线语气与Cowork演示

观察日期：2026-10-07。参考：[公开页面](https://claude.com/)。原站内容以该日期与语言版本为准。

## 设计特点与分析

公开营销结构为奶油底、72px Anthropic Serif标题、Sans操作文字、陶土品牌符号和黑色行动。左栏主张与注册卡，右栏圆角Cowork视频；下方按个人/组织分套餐，再以FAQ展开细节。

衬线与温暖低饱和建立思考伙伴语气，真实视频解释执行能力；短注册路径与套餐分类维持行动层级。这是页面分析，没有第一方品牌策略声明依据。

## 交互机制与复现映射

| 触发与元素 | 原站观察／公开源码 | 本地实现与差异 |
|---|---|---|
| 产品视频 | 官方Cowork媒体文件约25.567秒；公开截图与HTML提供结构。源hover/scroll时序未取得。 | 静音循环，play/pause/ended/error同步按钮；减少动态暂停并允许手动播放，静止时保留首帧。 |
| 注册与套餐 | 左注册入口、Individual/Team计划与FAQ为公开结构。 | email展开/返回/模拟反馈；受众和年/月计费切换，FAQ原生details；不发送邮箱或创建账户。 |
| 窄屏导航 | 源具体断点未现场核验。 | 800px以下导航收为汉堡、700px以下英雄区纵排；800px为本地嵌入适配。 |

## 理论与约束

公开营销截图与HTML提供结构依据。WAI Tabs和Accordion分别约束套餐及FAQ。真实认证、SSO、订阅、下载、完整企业导航与FAQ未覆盖；套餐是观察日快照。

## 来源与材料

- [Claude 公开官网](https://claude.com/)（实例）：2026-10-07公开营销结构、72px衬线标题、Cowork视频与Individual/Team套餐；源hover/scroll时序未取得。
- [WAI Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)（规范）：套餐受众切换的选择态和方向键参考。
- [WAI Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)（规范）：FAQ展开、键盘和状态表达；本地采用原生details。

[原站对照](screenshots/claude-platform-source.jpg) · [Demo](../demos/claude-platform/index.html) · [完整Prompt与设计元素](../entries/claude-platform.json) · [还原范围](../demos/claude-platform/fidelity.md) · [资产来源](../demos/claude-platform/assets-manifest.json)。品牌与媒体权利归原作者。
