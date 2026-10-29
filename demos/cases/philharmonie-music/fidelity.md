# 巴黎爱乐厅 · 音乐展与音乐会详情：复现范围

[案例条目](../../../entries/cases/philharmonie-music.json) · [研究](../../../docs/cases/philharmonie-music.md) · [Prompt](../../../prompts/cases/philharmonie-music.md)

| 机制 | 本地差异与依据 |
| --- | --- |
| 浏览展览／音乐会详情 | 无额外迎宾加载或全页转场。 |
| 打开主菜单和类别 | 本地缩减类别与链接，保留内容切换和返回；无伪造淡入动画。 |
| 切换音乐会摄影 | 500ms及循环来自实际Slick观察，ease和6秒周期为本地近似。 |
| 展开Horaires／Tarifs／Programme | 保留实际展开逻辑；预约链接回官方，未实现交易。 |
| 打开Playlist | 不复制cookie受控的第三方播放器，不新增自动BGM。 |

展览与音乐会合并为局部学习区域，原独立详情长度不同；第三方视频、账号与售票后端不复制。Ayano Kamei仍是官网图轨素材，但当前节目单钢琴为Chisato Taniguchi，两者不可混为当前阵容。
