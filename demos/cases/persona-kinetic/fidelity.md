# Persona 5 Royal · 单次参考快照：复现范围

[案例条目](../../../entries/cases/persona-kinetic.json) · [研究](../../../docs/cases/persona-kinetic.md) · [Prompt](../../../prompts/cases/persona-kinetic.md)

Canvas2D 重写原图像与运动规则；随机抽样及 Canvas 混合近似原 PIXI 结果。暂停星光、键盘和 ?motion=reduce 为本地补充。

角色横向轨道500ms切换并停在首尾，服装有独立状态。学校生活与怪盗生活原站是分别无限循环、露出相邻画面的中心轮播；本地用两个独立500ms轨道保留箭头/横触与循环交接，保留5张学校和3张怪盗真实画面。三位人物与文案缩减，入场局部装饰、所有规格与购买栏目不在本地完整重建范围；剪纸海报、真实立绘及原始箭头保留，不能以统一卡片风代替。

## 复刻未使用的原站素材

- `source/assets/star.png`
- `source/assets/phantom.png`

体验路径：首屏星光→原生下滚时背景不同速移动→三位角色正反切换和换装→学校轮播末尾接首项→怪盗独立轮播→购买外链和footer→向上。
