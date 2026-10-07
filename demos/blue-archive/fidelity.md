# Blue Archive 日本首页局部还原

原站 https://bluearchive.jp/；观察日期2026-10-07。桌面与390×844版本实访，滚动到官方页脚。开发来源韩国，观察地区日本。

| 真实区域 | 本地映射 | 差异 |
| --- | --- | --- |
| rgba(20,39,59,.8)深蓝导航、青色当前指示 | `.header` | 同色系与导航项；未复现的CHARACTER/FAQ等连接官方页面，不假造内容 |
| 蓝白城市背景MP4、中央Logo、右侧竖排标语 | `.hero` | 使用原文件；本地默认暂停/静音并增加播放按钮，官网默认静音循环 |
| 左下下载、右下帮助/漫画插画 | `.download`、`.promo-links` | 使用官方图像与实际官方链接；本地省略第三方支付逻辑 |
| 页脚法律链接及厂商标识 | `footer` | 保留部分链接与真实图片，补私人学习说明 |

下方 `.resources` 素材观察器与 `.study-notes` 是本地教学新增，不是原站NEWS/System页面。人物页在研究中异步CSS加载失败，因此没有写入未核验的角色页设计。手机版重新提高下载按钮尺寸并提供右侧展开菜单，明确属于本地响应式改编。

交互QA：`#menu-toggle`；`#motion-toggle` 实际改变 `#background-video.paused` 并同步aria-pressed；`[data-resource]` 更新图像、说明、外链；`details summary`可展开说明。初始无音频，未获得可声称为原站BGM的音轨；官网PV由真实外链主动打开。

所有官方资源保留原始文件名。`assets-manifest.json` 记录来源与权利。未复制第三方JavaScript、分析、登录、运营数据接口或支付流程；原CSS作为研究核验资料存档，不作为本地样式加载。
