# 星槎示范页：来源与本地对应

归档日期：2026-10-27。规范来源是 ConardLi/garden-skills 固定提交 `2b9a89340b70f632d31c0f1c69fce94a7912423e` 的 Git blob。来源本地 checkout 的 CRLF 属于工作树转换；交付 HTML 使用源提交的 LF 字节，只替换下面列出的外部资源 URL。

主页面来自 [demo1-with-skill.html](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/demo/web-design-demo/demo1-with-skill.html)，基线来自 [demo1.html](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/demo/web-design-demo/demo1.html)。[README 第 419、425–431 行](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L419-L431) 说明同提示词的有／无 skill 对照；基线是未使用 web-design-engineer skill 时的生成结果。README 第 427 行路径多出 demo2/，本地按实际文件归档。

主页面原文自称 STELLARIA／星海博物馆，基线自称星槎博物馆；标题、正文、虚构地址、未来事件、占位 CTA、内联样式与脚本均按来源保留。归档对象是示范源码，不将内容当作真实机构事实。模块与状态定位见 [研究矩阵](../../../docs/research/stellar-museum.md#模块与状态矩阵)。

## HTML 资源替换

| 文件与位置 | 原值 | 新值 | 原因 |
| --- | --- | --- | --- |
| `index.html` 的 preconnect | `https://fonts.googleapis.com` | `.` | 字体完整本地化，预连接保持为本地同源路径 |
| `index.html` 的 preconnect | `https://fonts.gstatic.com` | `.` | 字体完整本地化，预连接保持为本地同源路径 |
| `index.html` 的字体样式链接 | `https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap` | `fonts.css` | 按来源请求参数下载字体样式并改写字体 src，使独立 Demo 无需 Google Fonts 联网 |
| `index.html` 的 importmap `three` | `https://unpkg.com/three@0.160.0/build/three.module.js` | `./vendor/three/three.module.js` | 固定 0.160.0 模块本地运行；模块原字节与 MIT 许可随包保留 |
| `baseline.html` 的 preconnect | `https://fonts.googleapis.com` | `.` | 字体完整本地化，预连接保持为本地同源路径 |
| `baseline.html` 的 preconnect | `https://fonts.gstatic.com` | `.` | 字体完整本地化，预连接保持为本地同源路径 |
| `baseline.html` 的字体样式链接 | `https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Noto+Serif+SC:wght@400;600;900&family=JetBrains+Mono:wght@300;500&display=swap` | `baseline-fonts.css` | 按来源请求参数下载字体样式并改写字体 src，使独立 Demo 无需 Google Fonts 联网 |

两份 HTML 没有新增加载器、运行时、业务、可访问性修补或设计修改。`GARDEN-SKILLS-LICENSE.txt` 为固定提交原始 MIT 文本；`vendor/three/THREE-LICENSE.txt` 为 r160 原始 MIT 文本。字体许可位于 `assets/fonts/*-OFL.txt`。

## 字体样式内的全部 src 替换

`fonts.css` 与 `baseline-fonts.css` 依据 HTML 中的原始 Google Fonts CSS2 请求获取，使用 Windows Edge／Chromium 的现代浏览器 User-Agent。保留返回样式的字体家族、字重、normal／italic、`font-display: swap` 与 Unicode 分片；每个下载 WOFF2 均保持原字节，不裁剪或转码。以下每行列出一种 URL 对应及其在各 CSS 中的出现次数，涵盖全部替换位置。原 CSS 仅作过程证据留在交付目录，运行包保存本地化 CSS 与完整字体。

| 字体样式与出现次数 | 原值 | 新值 | 原因 |
| --- | --- | --- | --- |
| `fonts.css` × 1 | `https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjgn7MsNo.woff2` | `fonts/instrument-serif-001.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `fonts.css` × 1 | `https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2` | `fonts/instrument-serif-002.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `fonts.css` × 1 | `https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zsTjmbI.woff2` | `fonts/instrument-serif-003.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `fonts.css` × 1 | `https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2` | `fonts/instrument-serif-004.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `fonts.css` × 3；`baseline-fonts.css` × 2 | `https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbV2o-flEEny0FZhsfKu5WU4xD2OwG_TA.woff2` | `fonts/jetbrains-mono-001.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `fonts.css` × 3；`baseline-fonts.css` × 2 | `https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbV2o-flEEny0FZhsfKu5WU4xD_OwG_TA.woff2` | `fonts/jetbrains-mono-002.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `fonts.css` × 3；`baseline-fonts.css` × 2 | `https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbV2o-flEEny0FZhsfKu5WU4xD4OwG_TA.woff2` | `fonts/jetbrains-mono-003.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `fonts.css` × 3；`baseline-fonts.css` × 2 | `https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbV2o-flEEny0FZhsfKu5WU4xD0OwG_TA.woff2` | `fonts/jetbrains-mono-004.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `fonts.css` × 3；`baseline-fonts.css` × 2 | `https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbV2o-flEEny0FZhsfKu5WU4xD1OwG_TA.woff2` | `fonts/jetbrains-mono-005.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `fonts.css` × 3；`baseline-fonts.css` × 2 | `https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbV2o-flEEny0FZhsfKu5WU4xD7OwE.woff2` | `fonts/jetbrains-mono-006.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `fonts.css` × 4 | `https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPb54C-s0.woff2` | `fonts/space-grotesk-001.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `fonts.css` × 4 | `https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPb94C-s0.woff2` | `fonts/space-grotesk-002.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `fonts.css` × 4 | `https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.woff2` | `fonts/space-grotesk-003.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.4.woff2` | `fonts/noto-serif-sc-001.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.5.woff2` | `fonts/noto-serif-sc-002.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.6.woff2` | `fonts/noto-serif-sc-003.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.21.woff2` | `fonts/noto-serif-sc-004.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.22.woff2` | `fonts/noto-serif-sc-005.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.23.woff2` | `fonts/noto-serif-sc-006.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.24.woff2` | `fonts/noto-serif-sc-007.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.25.woff2` | `fonts/noto-serif-sc-008.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.26.woff2` | `fonts/noto-serif-sc-009.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.27.woff2` | `fonts/noto-serif-sc-010.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.28.woff2` | `fonts/noto-serif-sc-011.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.29.woff2` | `fonts/noto-serif-sc-012.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.30.woff2` | `fonts/noto-serif-sc-013.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.31.woff2` | `fonts/noto-serif-sc-014.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.32.woff2` | `fonts/noto-serif-sc-015.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.33.woff2` | `fonts/noto-serif-sc-016.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.34.woff2` | `fonts/noto-serif-sc-017.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.35.woff2` | `fonts/noto-serif-sc-018.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.36.woff2` | `fonts/noto-serif-sc-019.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.37.woff2` | `fonts/noto-serif-sc-020.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.38.woff2` | `fonts/noto-serif-sc-021.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.39.woff2` | `fonts/noto-serif-sc-022.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.40.woff2` | `fonts/noto-serif-sc-023.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.41.woff2` | `fonts/noto-serif-sc-024.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.42.woff2` | `fonts/noto-serif-sc-025.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.43.woff2` | `fonts/noto-serif-sc-026.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.44.woff2` | `fonts/noto-serif-sc-027.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.45.woff2` | `fonts/noto-serif-sc-028.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.46.woff2` | `fonts/noto-serif-sc-029.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.47.woff2` | `fonts/noto-serif-sc-030.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.48.woff2` | `fonts/noto-serif-sc-031.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.49.woff2` | `fonts/noto-serif-sc-032.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.50.woff2` | `fonts/noto-serif-sc-033.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.51.woff2` | `fonts/noto-serif-sc-034.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.52.woff2` | `fonts/noto-serif-sc-035.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.53.woff2` | `fonts/noto-serif-sc-036.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.54.woff2` | `fonts/noto-serif-sc-037.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.55.woff2` | `fonts/noto-serif-sc-038.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.56.woff2` | `fonts/noto-serif-sc-039.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.57.woff2` | `fonts/noto-serif-sc-040.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.58.woff2` | `fonts/noto-serif-sc-041.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.59.woff2` | `fonts/noto-serif-sc-042.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.60.woff2` | `fonts/noto-serif-sc-043.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.61.woff2` | `fonts/noto-serif-sc-044.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.62.woff2` | `fonts/noto-serif-sc-045.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.63.woff2` | `fonts/noto-serif-sc-046.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.64.woff2` | `fonts/noto-serif-sc-047.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.65.woff2` | `fonts/noto-serif-sc-048.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.66.woff2` | `fonts/noto-serif-sc-049.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.67.woff2` | `fonts/noto-serif-sc-050.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.68.woff2` | `fonts/noto-serif-sc-051.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.69.woff2` | `fonts/noto-serif-sc-052.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.70.woff2` | `fonts/noto-serif-sc-053.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.71.woff2` | `fonts/noto-serif-sc-054.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.72.woff2` | `fonts/noto-serif-sc-055.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.73.woff2` | `fonts/noto-serif-sc-056.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.74.woff2` | `fonts/noto-serif-sc-057.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.75.woff2` | `fonts/noto-serif-sc-058.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.76.woff2` | `fonts/noto-serif-sc-059.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.77.woff2` | `fonts/noto-serif-sc-060.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.78.woff2` | `fonts/noto-serif-sc-061.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.79.woff2` | `fonts/noto-serif-sc-062.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.80.woff2` | `fonts/noto-serif-sc-063.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.81.woff2` | `fonts/noto-serif-sc-064.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.82.woff2` | `fonts/noto-serif-sc-065.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.83.woff2` | `fonts/noto-serif-sc-066.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.84.woff2` | `fonts/noto-serif-sc-067.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.85.woff2` | `fonts/noto-serif-sc-068.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.86.woff2` | `fonts/noto-serif-sc-069.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.87.woff2` | `fonts/noto-serif-sc-070.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.88.woff2` | `fonts/noto-serif-sc-071.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.89.woff2` | `fonts/noto-serif-sc-072.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.90.woff2` | `fonts/noto-serif-sc-073.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.91.woff2` | `fonts/noto-serif-sc-074.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.97.woff2` | `fonts/noto-serif-sc-075.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.98.woff2` | `fonts/noto-serif-sc-076.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.99.woff2` | `fonts/noto-serif-sc-077.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.100.woff2` | `fonts/noto-serif-sc-078.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.101.woff2` | `fonts/noto-serif-sc-079.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.102.woff2` | `fonts/noto-serif-sc-080.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.103.woff2` | `fonts/noto-serif-sc-081.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.104.woff2` | `fonts/noto-serif-sc-082.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.105.woff2` | `fonts/noto-serif-sc-083.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.106.woff2` | `fonts/noto-serif-sc-084.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.107.woff2` | `fonts/noto-serif-sc-085.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.108.woff2` | `fonts/noto-serif-sc-086.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.109.woff2` | `fonts/noto-serif-sc-087.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.110.woff2` | `fonts/noto-serif-sc-088.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.111.woff2` | `fonts/noto-serif-sc-089.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.112.woff2` | `fonts/noto-serif-sc-090.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.113.woff2` | `fonts/noto-serif-sc-091.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.114.woff2` | `fonts/noto-serif-sc-092.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.115.woff2` | `fonts/noto-serif-sc-093.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.116.woff2` | `fonts/noto-serif-sc-094.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.117.woff2` | `fonts/noto-serif-sc-095.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.118.woff2` | `fonts/noto-serif-sc-096.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.119.woff2` | `fonts/noto-serif-sc-097.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7kqWWbghq.woff2` | `fonts/noto-serif-sc-098.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7kq6Wbghq.woff2` | `fonts/noto-serif-sc-099.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7kq-Wbghq.woff2` | `fonts/noto-serif-sc-100.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 3 | `https://fonts.gstatic.com/s/notoserifsc/v36/H4chBXePl9DZ0Xe7gG9cyOj7kqGWbg.woff2` | `fonts/noto-serif-sc-101.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |
| `baseline-fonts.css` × 4 | `https://fonts.gstatic.com/s/orbitron/v35/yMJRMIlzdpvBhQQL_Qq7dy0.woff2` | `fonts/orbitron-001.woff2` | 字体本地加载；保留源字体度量与 Unicode 分片 |

## 资源与许可边界

- HTML、内联 CSS／JavaScript：garden-skills 固定提交，MIT；附原始许可。
- Three.js：0.160.0 完整 ESM，1,272,972 字节；来源 unpkg 固定版本，MIT 许可取自 three.js r160，未修改模块。
- 字体：Instrument Serif、Space Grotesk、JetBrains Mono、Orbitron、Noto Serif SC，均为 SIL OFL 1.1，各附原始 OFL。Google Fonts 分片数量与字重共享按返回 CSS 保存；完整文件与字节清单见 [assets-manifest.json](assets-manifest.json)。
- 没有外部摄影、音频、视频或三维模型。星球、空间站、银河、星空、票券纹理均由来源代码生成。

## 当前行为与验证边界

来源定义的标题入场、导航回程、展厅 hover、三维可见性、编年史、票券、订阅和基线表单均原样保留。主预约与导览 CTA 是占位链接；订阅和基线预约成功仅更改前端状态，不连接服务器。主减少动态分支仍更新着色器时间、UTC 及平滑锚点；不将它描述为完全停动。主页面没有主题切换和声音。

### 浏览器实测

主负责人以默认图形后端的无头 Edge `155.0.4283.62` 实测，DPR 1、`zh-CN`、系统浅色偏好，CSS 视口为 1440×1000 和 390×844；页面自身保持固定深色。来源与本地由同一静态服务器提供。任务交付目录中的 `geometry-results.json`、`runtime-results.json`、`ui-results.json` 和 `shots/` 保留本次证据。

| 项目 | 已验证结果 | 实测边界 |
| --- | --- | --- |
| 逐节布局与字体 | 两种宽度的馆长寄语、展厅、编年史、预约章节顶部／高度均与来源完全相同；主标题两侧分别为 158.4px／60px，字体栈均为 Instrument Serif、Songti SC、serif；无横向溢出 | 其他宽度和逐文字字形没有逐项量测 |
| 三维画布与首屏 | 两侧均有六个 canvas；桌面首部两个为 1440×1000、展厅四个各 564×352，手机分别为 390×844 与 340×212；首屏并排视觉一致 | 不代表 GPU 性能、逐帧旋转或 shader 时间完全一致 |
| 导航与锚点 | 两侧均实测 `nav → nav scrolled → nav`，锚点目标顶部均为 60px | 未量测平滑滚动的完整时间曲线 |
| 展厅与编年史 | 两侧均有四展厅、八编年节点；代表展厅 padding `48→56→48px`，标题从暖白变琥珀后恢复 | 图像 scale 1.02、箭头位移 8px 来自源码；没有独立量测其时序 |
| 订阅 | 来源与本地有效邮箱提交后均显示“已订阅” | 只有前端状态，不包含后端；完整辅助技术未验证 |
| 基线预约 | 提交显示“✓ 预约成功 · 准备登舱”；等待 2600ms 后按钮恢复“确认登舱 →”，三个输入字段清空 | 源码的重置时长为 2400ms；此检查确认等待后的状态，不将 2600ms 当作实现参数 |
| 减少动态 | 390px 两侧均检测到 reduce 偏好、六个 canvas，主标题动画计算时长 `1e-06s` | 对象停止旋转、背景静态、shader／UTC 继续更新及离屏节流仍仅据源码，未量测 GPU 帧序列 |
| 站内嵌入 | 桌面／手机案例列表显示示范作品两条；本案例详情标题与 iframe 标题正确，无横向溢出 | 不推广为全部站点页面的完整交互验收 |
| 资源与异常 | 最终浏览器轮次控制台错误、404、页面异常均为 0 | 慢网、失败恢复与冷／热缓存交接未验证 |

`shots/compare-stellar-1440.png` 为仓库外的对照图，左为来源、右为本地，视觉核对一致。比较使用相同随机种子、固定浏览器时钟并推进 2000ms，截图时 `animations: disabled`；没有改写源页面或本地源码，功能走查恢复正常时钟。普通独立页面、基线、站内列表和详情也分别保存 1440／390px 截图；桌面与手机 JPEG 预览由实际浏览器生成。
