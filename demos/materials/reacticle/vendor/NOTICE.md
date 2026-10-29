# Reacticle 第三方来源与许可

## Reacticle 与文章

来源：[ConardLi/reacticle](https://github.com/ConardLi/reacticle/tree/dcfc4baf386bbc220cd1aa6274bed3b741108465)，固定提交 `dcfc4baf386bbc220cd1aa6274bed3b741108465`，版本 0.2.6。报告与库源码来自此提交，主题绑定来自 `apps/site/src/data/gallery.tsx`。组件、报告与主题 CSS 按原样编译，原文及署名保留。

原始 [package.json](reacticle-package.json) 声明 `license: MIT` 和作者 ConardLi；**该提交的仓库内没有 LICENSE 文件**。本条目依据作者的软件包声明记录 MIT，未补造作者未随仓库提供的独立许可文件。说明见 [许可声明记录](reacticle-MIT-declaration.txt)。本库用于个人非商业学习。

## 打包的运行依赖

- react 18.3.1：MIT，原始许可见 [LICENSE-react.txt](LICENSE-react.txt)。
- react-dom 18.3.1：MIT，原始许可见 [LICENSE-react-dom.txt](LICENSE-react-dom.txt)。
- scheduler 0.23.2：MIT，原始许可见 [LICENSE-scheduler.txt](LICENSE-scheduler.txt)。
- katex 0.17.0：MIT，原始许可见 [LICENSE-katex.txt](LICENSE-katex.txt)。
- prismjs 1.30.0：MIT，原始许可见 [LICENSE-prismjs.txt](LICENSE-prismjs.txt)。

KaTeX 公式字体的 name 表内声明 SIL Open Font License 1.1。各 TTF 原始嵌入声明（含 Design Science、Khan Academy 版权与保留字体名）及 OFL 全文合并保存在 [LICENSE-katex-fonts-OFL.txt](../fonts/LICENSE-katex-fonts-OFL.txt)，未修改字体文件。字体来自随 KaTeX 0.17.0 分发的 `dist/fonts/`；软件 MIT 与字体 OFL 分别保留。

## 本地化字体

字体声明精确沿用原站 `apps/site/index.html` 的 [Google Fonts CSS 请求](https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=JetBrains+Mono:wght@400;500;600;700&family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..700,0..100,0..1&family=Hanken+Grotesk:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&family=Josefin+Sans:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap)，保留原始 [CSS 快照](../source/vendor/fonts/google-fonts-original.css)。本地 [fonts.css](../fonts/fonts.css) 只将 76 个外链字体 URL 替换为同目录字体文件；字族、字重、样式、unicode-range 与字体文件字节保留。字体仅涉及拉丁文、希腊文、西里尔文等原请求子集，中文继续使用原主题的系统字体回退。

- `newsreader`：[OFL-newsreader.txt](../fonts/OFL-newsreader.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/OFL.txt)。
- `ibmplexsans`：[OFL-ibmplexsans.txt](../fonts/OFL-ibmplexsans.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexsans/OFL.txt)。
- `ibmplexmono`：[OFL-ibmplexmono.txt](../fonts/OFL-ibmplexmono.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt)。
- `sourceserif4`：[OFL-sourceserif4.txt](../fonts/OFL-sourceserif4.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/sourceserif4/OFL.txt)。
- `jetbrainsmono`：[OFL-jetbrainsmono.txt](../fonts/OFL-jetbrainsmono.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/OFL.txt)。
- `fraunces`：[OFL-fraunces.txt](../fonts/OFL-fraunces.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces/OFL.txt)。
- `hankengrotesk`：[OFL-hankengrotesk.txt](../fonts/OFL-hankengrotesk.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/hankengrotesk/OFL.txt)。
- `quicksand`：[OFL-quicksand.txt](../fonts/OFL-quicksand.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/quicksand/OFL.txt)。
- `nunito`：[OFL-nunito.txt](../fonts/OFL-nunito.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/nunito/OFL.txt)。
- `playfairdisplay`：[OFL-playfairdisplay.txt](../fonts/OFL-playfairdisplay.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/playfairdisplay/OFL.txt)。
- `josefinsans`：[OFL-josefinsans.txt](../fonts/OFL-josefinsans.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/josefinsans/OFL.txt)。
- `poppins`：[OFL-poppins.txt](../fonts/OFL-poppins.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/OFL.txt)。
- `spacegrotesk`：[OFL-spacegrotesk.txt](../fonts/OFL-spacegrotesk.txt)，[原始许可](https://raw.githubusercontent.com/google/fonts/main/ofl/spacegrotesk/OFL.txt)。

主题风格中文概括参考 [garden-skills 固定提交](https://github.com/ConardLi/garden-skills/tree/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/beautiful-article/theme-profiles)，提交 `2b9a89340b70f632d31c0f1c69fce94a7912423e`；此处为中文概括，skill 原文由本库相应快照条目独立保留。
