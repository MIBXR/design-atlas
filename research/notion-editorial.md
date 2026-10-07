# Notion：有人情味的模块化工作台

核验日期：2026-10-07。

## 直接观察

[Notion官网](https://www.notion.com/) 首屏保存于 screenshots/notion-editorial-source.png：大字主张、浅蓝动作词、手绘角色与真实工作空间。下方正文按记录知识、寻找答案和自动化任务组织内容。

## 第一方理论与规范

[品牌活动文章](https://www.notion.com/blog/the-thinking-behind-our-latest-brand-campaign) 说明其品牌长期以插画叙事为基础，角色近景帮助表达思考，营销开始引入明亮原色。[2026页面设计文章](https://www.notion.com/blog/updating-the-design-of-notion-pages) 用标准间距建立阅读节奏，并使相邻列表块紧密分组。前者讲品牌传播，后者讲编辑器；本库将其结合为网页的有意迁移。

[品牌使用规范](https://notion.notion.site/Notion-s-brand-usage-guidelines-How-to-use-Notion-s-brand-in-your-marketing-30a5510bc5644475a28844e427008bee) 要求自己的产品品牌居主位，并限制把Notion用于自有名称。本demo使用原创MARGIN品牌。完整Brand Guidelines页面读取失败，未将其不可见内容作为依据。

## 推断与实现映射

推断：手绘人物让抽象知识工具具有人的语境；真实文档块负责把开放性变成可理解的用途。

|依据|本地实现|检验方式|
|---|---|---|
|插画叙事|原创桌前创作者与连接纸片|情境与“想法生长”对应|
|模块化用途|手册/计划/笔记切换|文档标题、正文、清单全部同步|
|阅读节奏|宽松段落与紧凑连续清单|不是每行一个独立卡片|
|降低学习成本|原生复选框和details|键盘可用，计数有反馈|

## 约束与边界

不复制Notion人物及素材。纸张主题不是默认仿旧纹理，手绘不影响控件规范。MARGIN品牌、文档和数值均为虚构。插画和内容功能各负其责，不能只靠插画说明所有能力。

代码：../demos/notion-editorial/index.html；Prompt：../entries/notion-editorial.json。
