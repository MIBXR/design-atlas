# Fuji Rock：现场照片与节日导览：对应范围

参考日期：**2026-10-07**。[官方页面](https://www.fujirockfestival.com/)。这是局部页面研究，以下时序分别标明官网依据与本地近似。

| 区域 | 原站依据 | 最终本地对应 |
|---|---|---|
| 主视觉照片 | top-2026.js为fade、speed800、interval3600，曲线cubic-bezier(.25,1,.5,1)；原站20张。 | 三组官方desktop/mobile配对照片保持3600ms/800ms曲线；箭头/圆点/键盘同步，手动后暂停，可恢复；离屏、后台及减少动态停自动。 |
| 大菜单 | 多列图标层级；common.js有601ms后隐藏菜单及wrapper退场。 | 600ms ease菜单进退与背景opacity .08/12px退场为本地近似；打开后正文/footer inert，Escape关闭回到按钮。 |
| Featured | 原站六条，600ms循环水平轨道，3600ms自动间隔。 | 四条真实宣传图原生横滚和有界按钮，不实现源站完整循环/自动轨道。 |

## 构成与边界

没有20张全部照片、六条完整Featured、导航上滑回显、加载遮罩、交易与演出数据库。未取得独立BGM；Aftermovie为官方YouTube外链，用户主动观看。系统字体近似原站Poppins/日文字体。

68px固定顶栏、右上100px山菜单、满视口照片、右竖票据；后续横向Featured与新闻列表避免同构。。真实窄高Logo、短粗日期、大英文栏目、较小日文链接；不引入原站未提供的花体字。。官方现场的蓝橙布置与网站橙蓝识别呼应，灰米面板降密度；不同照片共享导航与控件位置。

官方媒体与美术的来源、处理、尺寸、字节及hash见[资产清单](assets-manifest.json)，权利仍归对应品牌、创作者与原权利人；学习使用不等于所有素材有通用开放许可。本地曲线、裁切和可用性补充不冒称官方原始机制。

[设计研究](../../research/fuji-rock.md) · [完整Prompt](../../prompts/fuji-rock.md) · [桌面预览](../../previews/fuji-rock.jpg) · [手机预览](../../previews/mobile/fuji-rock.jpg) · [Demo源码](index.html)
