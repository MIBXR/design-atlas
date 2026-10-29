# 塞尔达 WORLD 制作输入与处理

固定采集日期为 2026-10-07。原 HLS 清单位于仓库内 `assets/kakeru.m3u8`、`assets/tsukuru.m3u8`、`assets/tsumugu.m3u8`，原 URL 均为 `https://www.nintendo.com/jp/zelda/totk/assets/mov/world/<章节名>.m3u8`。分段 URL 为该目录下各清单记录的相对路径。

输入目录放置原清单及每章前六段 TS，在仓库根目录执行：

```bash
bash demos/cases/zelda-world/source/media.sh /path/to/input /path/to/output
```

命令从仓库已保存的清单取前六段路径，通过 concat 解复用后 copy 视频、去音轨，再取 0.1 秒 poster。ffmpeg 版本及 JPEG 编码参数未记录；视频不重新编码。处理输出独立于案例运行目录。当前短片循环长度与完整来源的差异见 `../fidelity.md`。
