# Blue Archive 日本首页局部还原

原站 https://bluearchive.jp/；观察日期2026-10-07。桌面与390×844版本实访，滚动到官方页脚。开发来源韩国，观察地区日本。

| 真实区域 | 本地映射 | 差异 |
| --- | --- | --- |
| rgba(20,39,59,.8)深蓝导航、青色当前指示 | `.header` | 同色系与导航项；CHARACTER指向本地已核验的四学生舞台；FAQ等连接官方页面 |
| 蓝白城市背景MP4、中央Logo、右侧竖排标语 | `.hero` | 使用原文件；普通模式静音循环且可停，减少动态初始停止；和官网真实MP4对应 |
| 左下下载、右下帮助/漫画插画 | `.download`、`.promo-links` | 使用官方图像与实际官方链接；本地省略第三方支付逻辑 |
| 页脚法律链接及厂商标识 | `footer` | 保留部分链接与真实图片，补私人学习说明 |

下方 `.resources` 素材观察器与 `.study-notes` 是本地教学新增，不是原站NEWS/System页面。初次访问人物页时异步CSS未成功；本轮已成功实访并实现阿比多斯四学生角色舞台（见下方补审）。手机版重新提高下载按钮尺寸并提供右侧展开菜单，明确属于本地响应式改编。

交互QA：`#menu-toggle`；`#motion-toggle` 实际改变 `#background-video.paused` 并同步aria-pressed；`[data-resource]` 更新图像、说明、外链；`details summary`可展开说明。初始无音频，未获得可声称为原站BGM的音轨；官网PV由真实外链主动打开。

所有官方资源保留原始文件名。`assets-manifest.json` 记录来源与权利。未复制第三方JavaScript、分析、登录、运营数据接口或支付流程；原CSS作为研究核验资料存档，不作为本地样式加载。

## 动效补审 · 2026-10-07

本轮官方/character成功加载。实点第二张头像后swiper-wrapper为translate3d(-1413px,0,0)，transition-duration:1000ms；当前profile为Hoshino、花守ゆみり。已加入4位官方学生、学院标志、资料卡和官网背景，共14份新增公开图像；1000ms轨道是真实对应机制。仅实现阿比多斯，其他学院外链；语音未取得；手机为本地可读性重排，不声称逐像素复制。背景视频补可见性/后台暂停。

验证说明：1440×1000桌面和390×844手机均实际操作。减少动态采用本页`?motion=reduce`应用级入口测试，系统prefers-reduced-motion当时为false，没有更改系统/浏览器设置。它覆盖同一降级逻辑，但不等同于OS偏好切换实测。完整观察与验证见 [十例审计](../../research/MOTION-AUDIT-GAMES-ART-JP.md#blue-archive)。
