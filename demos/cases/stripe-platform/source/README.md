# Stripe 彩带制作输入与提取

固定采集日期为 2026-10-07，模块 ID、原 chunk URL 和适配范围见 `../assets/wave-provenance.json`。三个固定输入如下，下载后按原文件名放在同一目录：

- `https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/chunks/73692-415e845f6c581657.js`
- `https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/chunks/c67c952e-5362035f70172687.js`
- `https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/chunks/55369f66-92e84f6aba0a73a8.js`

几何 Worker 原 URL 为 `https://stripe.com/_workers/_next/static/chunks/waveGeometry.worker.07101200.js`，同日原文件已保存在 `../assets/wave-geometry-worker.js`。

在仓库根目录执行：

```bash
node demos/cases/stripe-platform/source/extract-wave.mjs /path/to/chunks /path/to/output/stripe-wave-renderer.js
```

入口读取 provenance 的 20 个模块，注册原工厂而不启动 Next 页面，再按原顺序导出工厂函数。几何 Worker 引用改成本地 `assets/wave-geometry-worker.js`，独立 loader 与 SingleWave 导出外壳取自已归档 `../assets/stripe-wave-renderer.js`；shader、网格和数学模块仍取自原 chunk。运行侧沿用 `../wave.js` 的尺寸配置与暂停策略。重建时输出到工作目录，Worker 沿用已归档文件。
