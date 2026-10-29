# 莱茵生命制作输入与处理

固定采集日期为 2026-10-09，来源为 [官方特别映像《莱茵生命：访问》](https://www.bilibili.com/video/BV1rr4y1b7sz/)。原轨道 URL 为 `https://upos-hz-mirrorakam.akamaized.net/upgcxcode/20/70/768017020/768017020_x1-1-30102.m4s`，有效签名查询参数未归档；原轨道规格为 HEVC Main、1920×1080、25fps、318.8 秒、无音轨，见 `../assets-manifest.json` 的 originalMedia。

使用原轨道文件，在仓库根目录执行：

```bash
bash demos/cases/rhine-lab/source/clips.sh /path/to/original.m4s /path/to/output
```

命令使用已记录的 ffmpeg 7.1／libx264、preset fast、CRF18、yuv420p、faststart，不缩放、不改帧率。双环请求 12.30 秒，25fps 对齐的已归档产物为 308 帧／12.32 秒。

四张整帧的实际处理方法是已解码 video → 原尺寸 canvas → PNG，`frames.js` 是该方法的最小执行入口。在加载该固定原轨道的浏览器页面控制台执行，依次下载 22、35、48、68 秒原帧，再从 68 秒帧按 x637／y498／w62／h63 裁切节点。它读取当前 video，不下载或转码视频。裁切与完整帧的参数来自素材清单。
