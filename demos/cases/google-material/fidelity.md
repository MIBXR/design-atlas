# Google Material：表现力与组件秩序：复现范围

[案例条目](../../../entries/cases/google-material.json) · [研究](../../../docs/cases/google-material.md) · [Prompt](../../../prompts/cases/google-material.md)

| 机制 | 本地差异与依据 |
| --- | --- |
| 进入首页 | 保留官方MP4；减少动态初始停播。 |
| 点击或键盘激活按钮／卡片 | 角色颜色和圆角对应原CSS；300ms点击位置涟漪为本地近似。 |
| 进入目录或二级主题 | 本地dialog与官方链接；不复制Angular文档路由。 |
| 切换主题／系统主题变化 | 行为依据公开theme service；存储键隔离于参考库。 |

正文改写，完整文档路由与外链页面不在本地。首页CTA并非物理弹簧；M3物理系统只作理论来源。
