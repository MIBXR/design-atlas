# 文档编码与浏览器交付

## 已确认的问题

2026-10-07，用户报告 Linear 的 `demos/linear-workflow/fidelity.md` 在线显示乱码。

修复前，两次公共 HTTPS GET 均返回 `200`、`Content-Type: text/markdown`，没有 `charset`；文件也没有 UTF-8 BOM。线上文件、仓库源文件与静态构建产物均为 2,983 bytes，SHA-256 均为 `b0b7e197920e6fd841aec1437a8a82a8b3b172b8e33b68d90eb389ab71073f3b`，严格 UTF-8 解码后的中文标题正确。

因此排除了 Git 文件损坏、构建转码和传输字节损坏。响应没有提供明确的字符编码信号，直接打开 Markdown 还依赖客户端对 `text/markdown` 的处理。CUA 控制的 Edge 与内置浏览器均以 `ERR_BLOCKED_BY_CLIENT` 阻止 Markdown 直达；本地正确 `text/plain; charset=utf-8` 的直达也被阻止。因此不把自动化工具的拦截解释成用户的乱码，不声称测得用户浏览器具体采用了哪种错误编码。

## 修复方式

- 静态目录中的 `_headers` 为所有 `/*.md` 声明 `text/plain; charset=utf-8`，并设置 `nosniff`；构建必须复制该文件。通配符覆盖深层目录。配置依据：[Cloudflare Workers 静态资源响应头](https://developers.cloudflare.com/workers/static-assets/headers/)。配置是否被托管实际应用，须通过下方线上测试确认，不能只检查文件存在。
- 站内说明与调研链接统一进入 `document.html?file=...`。HTML 自身声明 UTF-8，脚本对正文的真实字节严格按 UTF-8 解码，以 `textContent` 显示源文档；保留下载原始 Markdown 和返回对应案例的入口。
- 原始 Markdown 继续保留，可供 GitHub、编辑器及下载复用；阅读页不修改源文本、不执行其中的 HTML。

## 回归检查

```sh
node scripts/check-text-delivery.mjs http://127.0.0.1:4173 --all
node scripts/check-text-delivery.mjs https://mibxr-design-atlas.mibxranime.chatgpt.site --all
```

该检查请求实际 HTTP 路径，要求状态 200、浏览器可显示的 `text/plain; charset=utf-8`、严格 UTF-8 解码和与仓库完全相同的 SHA-256。覆盖 Linear 原链接、README、调研总览和 Material Prompt。修复前原链接已实际产生 FAIL：`received text/markdown`。阅读页另外通过真实浏览器检查中文标题与正文；服务端响应断言不冒充浏览器编码观察。
