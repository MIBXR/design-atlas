# 数字敦煌制作输入与处理

| 输入 | 固定来源 | 采集日期 |
| --- | --- | --- |
| DLC 内嵌 PNG 的脚本 | `https://login.e-dunhuang.com/static/js/pop/pop.js` | 2026-10-09 |
| 19 个单条件响应 | 仓库内 `../filter-evidence.json` 的 `sourceUrl`，每项保存为按数组顺序编号的 `0.html` 至 `18.html` | 2026-10-09 |
| 已提取的筛选成员集 | 仓库内 `../filter-evidence.json` | 2026-10-09 |

在仓库根目录执行，输入为该日的原脚本和响应文件：

```bash
node demos/cases/digital-dunhuang/source/decode-banner.mjs /path/to/pop.js /path/to/output/dlc-banner.png
node demos/cases/digital-dunhuang/source/extract-members.mjs /path/to/responses /path/to/output/members.json
```

`decode-banner.mjs` 将原脚本的 PNG data URI 解码为二进制，不缩放。`extract-members.mjs` 从各响应的 `/cave/10.0001/` 链接提取成员标识，沿用现有证据中的条件键、值与来源。原响应的采集 URL 保存在现有证据中，脚本只处理本地输入。

`../catalogue.js` 是本库自行实现的离线列表控制器，直接读取已归档的 `filter-evidence.json`，按已选条件取成员交集、更新卡片、URL 和返回状态；它不是服务端目录源码的编译产物。复用时连同 `../section.html`、`../filter-evidence.json` 与 `../catalogue.js` 使用。
