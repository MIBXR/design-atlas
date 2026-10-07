# 条目约定

每个条目先完成真实来源调研，再实现可运行 demo。参考库不宣称像素级复刻；使用原创示例品牌与自绘素材，学习布局、层级与交互机制。

- `entries/<id>.json`：结构化检索数据，UTF-8。
- `research/<id>.md`：来源、直接观察、理论依据、推断、约束及 demo 映射。
- `demos/<id>/index.html`：独立静态入口，可带本目录 CSS/JS/SVG。不依赖 CDN、联网图片或构建步骤。
- `previews/<id>.jpg`：由实际浏览器生成的 1440 × 1000 首屏截图，使用 .jpg。
- demo 使用语义 HTML、可聚焦按钮、移动端布局和 `prefers-reduced-motion`。不要劫持滚轮或制造空链接。演示文字明确是虚构品牌。

JSON 字段：`id`（kebab-case）、`order`（整数）、`title`（中文）、`subtitle`、`category`（产品 / 游戏/IP / 经典风格）、`tags`（数组）、`summary`、`accent`（hex）、`background`（hex）、`principles`（3-5 字符串）、`productFocus`（字符串）、`interaction`（3-5 字符串）、`theme`（字符串）、`constraints`（4-6 字符串）、`useCases`（数组）、`avoid`（数组）、`tokens`（对象：palette 数组、type 字符串、layout 字符串、motion 字符串）、`sources`（对象数组，每项含 title/url/type/note；type 为 实例 / 理论 / 规范）、`prompt`（完整中文字符串）、`negativePrompt`（字符串）、`demo`（如 demos/apple-product/index.html）、`preview`（如 previews/apple-product.png）、`research`（如 research/apple-product.md）、`exercise`（一条改造任务）。

每项至少一个真实官网案例和一个理论或规范来源。记录核验日期 2026-10-07；区分已观察到的事实和设计推断。引用采用近旁链接，简短转述，不大段复制文案。经典风格若找不到完全符合的官网，注明是局部对应或理论迁移。

新增条目还需 `composition` 对象：color、typography、layout、imagery、shape、hierarchy、motion、coherence 八项；记录本地demo的要素映射及协调逻辑。可通过 fundamentals.html?style=<id> 进入交互实验。
