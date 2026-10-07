# 巴黎爱乐厅 · 音乐展与音乐会详情 — 局部还原说明

参考URL：[https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music](https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music)
版本：2026-10-07；法语展览与音乐会详情

## 原站观察

实访展览详情、saison26/27和Juke-box contemporain，再打开当前George Benjamin详情。确认Juke-box2026-09-19页面标记事件已过，不用于当前可预约场次；George Benjamin真实日期23Oct2026。展览点击Horaires与Tarifs，核验常规开放时段及15/11/9/6欧分级，折叠正文见源DOM。桌面票务面板跨主图下边缘；主图右下有Feelings/Périmètre署名。Edge安装Dark Reader导致白底/字标色彩受影响，拒非必要cookie后保存无遮挡截图；Root IAB此域连接关闭，未得到正常截图，所以未伪造清洁图。原始CSS bg-white=rgb255255255、bg-navy=rgb0,27,59、bg-lipstick=rgb190,36,79已直接读取，作为实现颜色证据。390px实访首捕出现短暂缩放布局，确认innerWidth390和viewport meta后本地按内容不溢出要求实现适配，不能声称手机逐像素一致。

## 局部还原范围与交互

| 观察 | 实现 |
|---|---|
| 原站：中心下垂字标 + 深蓝上条 + 白色主导航 | 本地：真实sprite#logo-pp-vertical与两导航层；小屏收束中轴 |
| 原站：上浮票务、日期、Horaires/Tarifs/Accessibility按钮 | 本地：sticky侧栏与details；复制核验时段/价格摘要，真实预订仍进入官网 |
| 原站：展览现场图片和音乐会节目/阵容 | 本地：两官方照片手动图库；真实George Benjamin图、日期和节目单 |
| 规范：Disclosure键盘与展开状态 | 本地：原生details/summary由浏览器提供状态与Enter/Space行为；不声称整站全面符合WCAG |

可操作内容：

- 时段、Tarifs与无障碍详情为原生折叠内容，可键盘展开。
- 展览图库前后按钮切换两张官方现场摄影并更新计数。
- 音乐会Programme & distribution展开真实节目单；主菜单定位展览/音乐会/交通，返回顶部按钮使用原生滚动。

## 差异与限制

以展览详情为主，另把真实音乐会详情局部整合为一个案例的相关内容，原官网这两项是独立URL。未复制长文、所有合作方、第三方视频、newsletter、账户和售票后台。大写标题使用官方 Philharmonique；该展示字体缺少普通小写字形，正文改用 Arial，和原站 Source Sans Pro 有字体差异。展览照片手动图库、音乐会静态人物图是本地学习调整；原音乐会多图自动轮播未复制。源截图存在DarkReader影响，原配色取第一方CSS，不把截图黑底作为原设计。

真实图片与品牌字体保持来源记录，没有iframe嵌入整站。本地不代表机构官方服务，票务/到访/会员等真实业务操作用清晰外链打开官网。

## 验证证据

[qa.json](qa.json) · [桌面预览](../../previews/philharmonie-music.jpg) · [手机预览](../../previews/mobile/philharmonie-music.jpg) · [资产清单](assets-manifest.json)。

## 2026-10-07 动效复核

2026-10-07 root IAB二次实访原生侧栏Horaires折叠；原站两张展览照片顺序穿插正文。撤掉先前自加图片轮播，恢复两个顺序摄影块，保留侧栏与日程details，并补原站Playlist入口。未添加未观察到的背景循环或飞入。

### 本轮音乐会动态复核（取代此前静态摄影处理）

2026-10-07再次实访官方George Benjamin详情，观察Slick三人摄影轨道及Previous/Next/Pause按钮；点击Next时computed transform为水平位移，transition 0.5s。三图分别为George Benjamin © Matthew Lloyd、Ayano Kamei © Capucine De Chocqueuse、John Stulz © Franck Ferville。本地已补三图横轨与暂停；自动间隔未取到，采用6秒并明确近似。公开JS下载部分TLS失败；未声称读取完整原站方法。相关音乐会在本Demo正文中以较小组件呈现，并不等同原站独立详情页整幅主图。
