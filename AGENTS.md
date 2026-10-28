# Web Atlas 维护

修改站点页面、组件或交互前，先阅读 [CONTRIBUTING.md 的站点设计与交互约束](CONTRIBUTING.md#站点设计与交互约束)，以现有案例库及共享样式为设计基准。新增页面与既有页面在相同宽度下共同验收。

案例与巧思的数据维护遵循 [CONTRIBUTING.md](CONTRIBUTING.md)，并同步构建和检查人类页面与 Agent 资料。Git 仅保存长期维护的源码、内容、文档和交付预览；临时验证产物留在工作区。

修改案例、巧思、素材或源码后运行 `npm run build`，再运行 `npm run check`；构建扫描全部案例、巧思和素材，同步网页、Prompt、Agent目录、完整包及案例与巧思的反向关联。构建检查必要字段和来源关联；维护检查覆盖本地引用，页面行为通过实际浏览器验收。维护标准见 [CONTRIBUTING.md](CONTRIBUTING.md)。功能分支推送后可用同一SHA发布Site与验证skill，PR是否合入按用户授权；合入默认分支之后新会话自动发现。普通新增内容无需复制到skill，数据协议变化才同步获取脚本。
