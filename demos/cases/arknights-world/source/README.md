# 明日方舟制作输入与处理

| 输入 | 固定来源 | 采集日期 |
| --- | --- | --- |
| 首页 HLS 清单 | 仓库内 `assets/home.m3u8`；原 URL：`https://web.hycdn.cn/arknights/official/home_videos/PV04_landscape.m3u8` | 2026-10-07 |
| 两段视频 | 上述 URL 同目录的 `PV04_landscape-00001.ts`、`PV04_landscape-00002.ts` | 2026-10-07 |
| WORLD 七个 JSON 模块 | `https://web.hycdn.cn/arknights/official/_next/static/chunks/app/page-a96c46ff52d96bd7.js` | 2026-10-07 |

在仓库根目录执行，输入目录放置原清单及两段 TS，原 chunk 保存为 `page-a96c46ff52d96bd7.js`：

```bash
bash demos/cases/arknights-world/source/media.sh /path/to/input /path/to/output
node demos/cases/arknights-world/source/extract-models.mjs /path/to/page-a96c46ff52d96bd7.js /path/to/output/world-models.json
```

媒体入口按清单记录，将两段 HLS 转为 1440×810、H.264 CRF26、无音轨的 MP4，再取 0.1 秒 poster；ffmpeg 版本及 JPEG 编码参数未记录。模型入口提取清单列出的七个 JSON 模块，保留点位。原清单、官方 URL 与采集日期是输入记录，TS 和原 chunk 由使用者提供；输出目录独立于案例运行目录。
