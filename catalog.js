window.DESIGN_ATLAS = [
  {
    "id": "apple-product",
    "order": 1,
    "title": "Apple · 滚动产品舞台",
    "subtitle": "iPhone 18 Pro / official page study",
    "category": "产品",
    "tags": [
      "Apple",
      "极简",
      "工业设计",
      "产品叙事",
      "配置器"
    ],
    "summary": "以官方产品动画与摄影重做黑色全宽舞台，结合悬浮章节导航、亮点图库、细节选择器，以及随滚动变化的缩放和文案交接。",
    "accent": "#0071e3",
    "background": "#000000",
    "principles": [
      "全宽产品影像建立硬件辨识度，超大章节标题组织浏览节奏。",
      "深黑舞台与深灰亮点章节交替，蓝色仅用于可行动入口。",
      "真实摄影承担产品证据，轮廓、镜头和材质不自行重绘。",
      "悬浮局部导航保持章节与行动入口可达。"
    ],
    "productFocus": "登场动画先呈现产品轮廓，亮点摄影提炼收益，细节选择器让同一舞台解释机身、镜头、尺寸与控件。",
    "interaction": [
      "原站官方视频呈现产品登场；本地滚动驱动首屏缩放和渐隐。",
      "亮点页具有手动四状态图库和显式自动播放开关。",
      "Explore 展开章节导航；细节与四种配色按钮更新真实产品图和文本。",
      "镜头章节使用 sticky 舞台、滚动缩放和两段文案透明度交接，曲线为本地近似。"
    ],
    "theme": "黑色摄影棚、金属高光、巨型标题与克制蓝色入口，共同强调 Pro 硬件的精确与质感。",
    "constraints": [
      "真实图片保持原始比例与正确裁切，避免把抽象图形当作硬件。",
      "要区分官方媒体本身的动画和本地实现的滚动曲线。",
      "全站完整3D、原站全部章节及交易流程未移植，复现范围逐项公开。",
      "颜色不能独自承担状态，同时提供配色名称和aria-pressed。",
      "减少动效时显示静态摄影并取消滚动过渡；所有正文仍可阅读。"
    ],
    "useCases": [
      "消费电子",
      "高端硬件",
      "单一旗舰产品",
      "家具与工业设计"
    ],
    "avoid": [
      "大量无关卡片",
      "营销数据代替产品证明",
      "自动轮播占用阅读时间"
    ],
    "tokens": {
      "palette": [
        "#000000",
        "#1d1d1f",
        "#f5f5f7",
        "#0071e3"
      ],
      "type": "系统无衬线；亮点标题56px，设计章节最大96px；紧凑字距。",
      "layout": "44px全局导航、52px信息带、780px全宽登场；约1100px亮点摄影、满幅细节舞台。",
      "motion": "官方登场MP4；本地scroll驱动scale/opacity、IntersectionObserver段落揭示、sticky镜头舞台。"
    },
    "sources": [
      {
        "title": "Apple iPhone 官方分类页",
        "url": "https://www.apple.com/iphone/",
        "type": "实例",
        "note": "2026-10-07 核验并存首屏截图；大字、硬件导航与产品大面板。"
      },
      {
        "title": "Apple iPhone 18 Pro 产品页",
        "url": "https://www.apple.com/iphone-18-pro/",
        "type": "实例",
        "note": "正文核验：Highlights、Design、Cameras、Performance；颜色输入与机型比较。"
      },
      {
        "title": "Apple HIG — Motion",
        "url": "https://developer.apple.com/design/human-interface-guidelines/motion",
        "type": "规范",
        "note": "有目的、简短、可关闭的动效；这是应用规范向网页的迁移。"
      }
    ],
    "prompt": "为个人学习制作 Apple iPhone 18 Pro 官方产品页的局部复现。先在 https://www.apple.com/iphone-18-pro/ 实际查看首屏、Highlights、Design 与 Cameras 的滚动状态，保存观察日期与截图。使用来源可追溯的官方产品图、Apple标识与登场视频，不自行画手机。首屏采用黑色全宽舞台、44px导航与52px信息带，产品名称放左下，蓝色胶囊行动入口放右下。滚动后显示居中的玻璃质感章节导航，Explore 可展开与关闭。亮点区域是深灰底、56px左标题、圆角约38px的摄影图库，提供四个明确状态及手动自动播放开关。Design 用最大96px的两行标题，后续左侧竖向胶囊功能钮与真实摄影更新；配色需有名称与选中状态。镜头段用sticky固定舞台，滚动改变照片scale和前后两段文案opacity，保留浏览器原生滚动。小屏保持控件可达；prefers-reduced-motion 下静态呈现。购买入口链接原站，学习说明明确区分官方媒体、近似滚动曲线及未移植的3D/交易/完整章节。每个资产记录官方URL、文件哈希和本地路径。",
    "negativePrompt": "不要用原创硬件SVG替代真实产品；不要用通用两栏hero和三张卡片概括苹果整页；不要宣称完整像素复刻；不要隐藏复现范围；不要滚轮劫持或自动有声播放。",
    "exercise": "保持黑色产品舞台，使用另一款真实产品摄影练习镜头与文案的滚动交接；先记录原站进度再调整曲线。",
    "demo": "demos/apple-product/index.html",
    "preview": "previews/apple-product.jpg",
    "research": "research/apple-product.md",
    "composition": {
      "color": "黑底展示材质，深灰划分章节；蓝色只指向行动。",
      "typography": "系统无衬线；亮点标题56px，设计章节最大96px；紧凑字距。",
      "layout": "44px全局导航、52px信息带、780px全宽登场；约1100px亮点摄影、满幅细节舞台。",
      "imagery": "官方真实产品摄影、Apple标识和登场MP4，逐项来源可查。",
      "shape": "摄影大圆角38px、导航玻璃圆角20px、功能胶囊与蓝色购买胶囊。",
      "hierarchy": "产品登场 → 核心亮点 → 可探索细节 → 镜头叙事。",
      "motion": "官方登场MP4；本地scroll驱动scale/opacity、IntersectionObserver段落揭示、sticky镜头舞台。",
      "coherence": "同一硬件在不同尺度和状态中持续出现，黑底、巨字、胶囊和蓝色入口共同建立精确的产品叙事。"
    },
    "country": "美国",
    "referenceUrl": "https://www.apple.com/iphone-18-pro/",
    "implementation": "reference-study",
    "fidelity": "demos/apple-product/fidelity.md",
    "assetManifest": "demos/apple-product/assets-manifest.json",
    "referencePreview": "research/screenshots/apple-hero-source.jpg"
  },
  {
    "id": "stripe-platform",
    "order": 2,
    "title": "Stripe — 彩带与金融产品矩阵",
    "subtitle": "Financial infrastructure, made visible",
    "category": "产品",
    "country": "美国",
    "tags": [
      "Stripe",
      "真实品牌",
      "金融科技",
      "彩带",
      "产品矩阵",
      "下拉导航"
    ],
    "summary": "按真实 Stripe 公开首页重建彩带背景、连续段落式主标题、六类产品矩阵和企业案例切换。",
    "accent": "#635bff",
    "background": "#ffffff",
    "principles": [
      "一段连续的大字号叙述同时给出平台定位与交易规模。",
      "彩带提供品牌识别，细框线与产品界面维持金融工具的秩序。",
      "用产品而非抽象图形展示收款、订阅、卡片与平台能力。",
      "同一套主色用于核心行动，低饱和背景区分不同金融产品。"
    ],
    "productFocus": "首屏从营收增长引向支付与金融能力，产品矩阵按业务模型组织；真实终端素材和界面局部让复杂基础设施可见。",
    "interaction": [
      "主导航点击展开 Products/Solutions/Developers/Resources 分类面板。",
      "六个产品卡片打开详情，业务模型选择改变本地预览状态。",
      "Hertz/URBN/Instacart/Le Monde 切换客户介绍；注册与销售按钮打开本地说明弹窗。"
    ],
    "theme": "白底、海军蓝文字、紫色行动按钮与橙粉紫官网彩带；按钮小圆角，产品卡适度圆角。",
    "constraints": [
      "以2026-10-07官网版本为基准，2017设计文章仅作历史理论。",
      "官方彩带使用静态回退图，不宣称复现原站WebGL渲染。",
      "下载素材及字标保留原比例，不把品牌资产用于新商标。",
      "金融指标为官网日期快照，界面金额为本地样例。",
      "自然滚动；移动端卡片单列，菜单和弹窗可键盘关闭。"
    ],
    "useCases": [
      "复杂平台产品官网",
      "金融工具能力介绍",
      "多产品业务入口"
    ],
    "avoid": [
      "用一个渐变blob代替实际平台功能",
      "把所有产品塞进同样的白卡",
      "复制支付表单并连接真实交易"
    ],
    "tokens": {
      "palette": [
        "#0a2540",
        "#635bff",
        "#f6f9fc",
        "#ff9151"
      ],
      "type": "官网 Söhne 本地字体；主标题48px、连续段落、紧凑行高。",
      "layout": "1266px最大宽度，首屏连续段落；六产品3列矩阵；4列指标；案例左右结构。",
      "motion": "卡片轻抬升、原生滚动；静态官网彩带；reduced-motion关闭过渡。"
    },
    "composition": {
      "color": "白底、海军蓝文字、紫色行动按钮与橙粉紫官网彩带；按钮小圆角，产品卡适度圆角。",
      "typography": "官网 Söhne 本地字体；主标题48px、连续段落、紧凑行高。",
      "layout": "1266px最大宽度，首屏连续段落；六产品3列矩阵；4列指标；案例左右结构。",
      "imagery": "官方wave.webp + Söhne与段落式48px标题；六类产品、小圆角、真实终端与支付背景；四项可切换介绍",
      "shape": "按钮4px、产品8px、对话框12px；官网彩带原比例。",
      "hierarchy": "首屏从营收增长引向支付与金融能力，产品矩阵按业务模型组织；真实终端素材和界面局部让复杂基础设施可见。",
      "motion": "卡片轻抬升、原生滚动；静态官网彩带；reduced-motion关闭过渡。",
      "coherence": "字体、色彩、素材、信息结构与Stripe公开页一致；原站彩带的实时渲染、完整推荐器、新闻轮播未实现。客户字样中部分用文字代替专门字标；产品小界面为结构复现，非每个组件像素级复制。注册、登录、销售不连接服务器。"
    },
    "sources": [
      {
        "title": "Stripe 公开首页",
        "url": "https://stripe.com/",
        "type": "实例",
        "note": "第一方web正文和CUA首屏核验；当前英文版连续主标题、彩带、六类产品与客户案例。"
      },
      {
        "title": "Connect frontend design",
        "url": "https://stripe.com/blog/connect-front-end-experience",
        "type": "理论",
        "note": "2017第一方设计文章：复杂功能保持轻盈、产品界面就地展示。历史理论，不作为当前CSS证明。"
      },
      {
        "title": "WAI Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "为客户案例和产品选择提供键盘方向键、选择状态参考；本地不是官网完整组件实现。"
      }
    ],
    "prompt": "制作一页基于【品牌官网URL】和【观察日期】的Stripe式金融平台局部学习复现。先读取首屏、产品矩阵与客户案例的真实截图，禁止把历史设计文章当当前CSS事实。首屏采用官网连续段落式48px主标题和大段留白；右上使用原比例官方彩带静态素材，明确其是WebGL动画的回退。使用已核验的Söhne本地字体、小圆角紫色主按钮、海军蓝文字和细边框。六类产品保持不同浅色背景与真实支付终端/界面层次，不能改成同一套通用白卡。产品卡可打开详情并切换业务模型；客户案例可切换，导航分类可展开。移动端单列、按钮有焦点反馈、对话框Esc关闭，自然滚动并尊重reduced motion。把素材URL、尺寸、版权及未还原区域写入清单和fidelity文件。用于【目标产品】时保留信息层级，重新核验业务结构。",
    "negativePrompt": "不要虚构品牌或素材；不要复制通用Hero+三卡片模板；不要用抽象blob替代真实产品界面；不要接管滚轮；不要把历史文章说成当前观察；不要伪装真实账户、支付或AI执行。",
    "demo": "demos/stripe-platform/index.html",
    "preview": "previews/stripe-platform.jpg",
    "research": "research/stripe-platform.md",
    "exercise": "以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。",
    "referenceUrl": "https://stripe.com/",
    "implementation": "reference-study",
    "fidelity": "demos/stripe-platform/fidelity.md",
    "assetManifest": "demos/stripe-platform/assets-manifest.json",
    "referencePreview": "research/screenshots/stripe-platform-source.png"
  },
  {
    "id": "linear-workflow",
    "order": 3,
    "title": "Linear — 深色产品开发系统",
    "subtitle": "The product development system for teams and agents",
    "category": "产品",
    "country": "美国",
    "tags": [
      "Linear",
      "真实品牌",
      "深色",
      "产品界面",
      "工作流",
      "低对比边框"
    ],
    "summary": "忠实保留 Linear 当前左对齐大标题、克制导航、三栏 issue 界面与从收件到规划的章节节奏。",
    "accent": "#a79ad6",
    "background": "#08090a",
    "principles": [
      "标题先讲产品开发系统，真实工作界面紧接着提供证据。",
      "导航与边框退到次级，任务内容获得更高对比。",
      "局部彩色只用于状态、标签和项目，避免全屏霓虹。",
      "章节按工作流程推进，产品结构与传播叙事一致。"
    ],
    "productFocus": "通过真实官网issue结构展示团队与智能体协作：侧栏、任务正文、活动评论、属性及状态，随后把收件和规划纳入同一流程。",
    "interaction": [
      "侧栏四项任务与上下箭头切换任务标题、说明和编号。",
      "状态下拉、收藏、Run agent改变本地任务状态和活动反馈。",
      "Triage三项请求可接受/退回；顶部导航与注册按钮展示分类面板和本地弹窗。"
    ],
    "theme": "接近黑的底色、温暖灰文字、低饱和项目色；细边框、中小圆角、真实官方氛围图。",
    "constraints": [
      "当前首页实访与2024/2026应用UI文章分开记载。",
      "黑色层次靠边框和亮度差，不靠蓝紫光晕覆盖所有内容。",
      "Issue界面文字保持可读；手机折叠侧栏和属性次级信息。",
      "活动、状态与任务内容必须联动，不能只有按钮变色。",
      "官方氛围图与Inter本地化，注册不连接账户。"
    ],
    "useCases": [
      "开发者工具官网",
      "复杂协作产品",
      "工作流程展示"
    ],
    "avoid": [
      "泛用霓虹SaaS模板",
      "把营销页变成满屏仪表盘",
      "滚轮接管与大段不可读的小字"
    ],
    "tokens": {
      "palette": [
        "#08090a",
        "#191a1c",
        "#f7f8f8",
        "#929298",
        "#a79ad6"
      ],
      "type": "官方 Inter variable 本地字体；桌面64px主标题、紧行高、任务22px、UI12–14px。",
      "layout": "1280px最大宽度；左标题+横向说明；235px侧栏/任务/210px属性；收件与规划两节。",
      "motion": "点击直接状态反馈，自然滚动；无自动滚动劫持。"
    },
    "composition": {
      "color": "接近黑的底色、温暖灰文字、低饱和项目色；细边框、中小圆角、真实官方氛围图。",
      "typography": "官方 Inter variable 本地字体；桌面64px主标题、紧行高、任务22px、UI12–14px。",
      "layout": "1280px最大宽度；左标题+横向说明；235px侧栏/任务/210px属性；收件与规划两节。",
      "imagery": "64px标题、灰色副文、New Loops入口；侧栏/正文/属性，官方头像和Inter；Triage与规划时间线",
      "shape": "细边框、10–15px窗口、5px行项与小圆胶囊。",
      "hierarchy": "通过真实官网issue结构展示团队与智能体协作：侧栏、任务正文、活动评论、属性及状态，随后把收件和规划纳入同一流程。",
      "motion": "点击直接状态反馈，自然滚动；无自动滚动劫持。",
      "coherence": "字体、色彩、素材、信息结构与Linear公开页一致；官网应用截图的所有图标、评论和agent实时执行未全部复制。本地核心issue结构接近，后续收件与规划使用自建示例数据；官网完整AI/automations和发布章节未覆盖。Logo保持官方原样。"
    },
    "sources": [
      {
        "title": "Linear 首页",
        "url": "https://linear.app/",
        "type": "实例",
        "note": "2026-10-07 CUA核验当前64px主标题与Faster app launch真实DOM演示。"
      },
      {
        "title": "Linear 2026 design refresh",
        "url": "https://linear.app/now/behind-the-latest-design-refresh",
        "type": "理论",
        "note": "2026-03-12第一方UI设计更新：导航退后、低饱和视觉、内容优先；这是应用UI叙述。"
      },
      {
        "title": "Linear UI redesign",
        "url": "https://linear.app/now/how-we-redesigned-the-linear-ui",
        "type": "理论",
        "note": "2024第一方应用界面改版文章，辅助理解信息层级，不作为首页组件逐项出处。"
      },
      {
        "title": "WAI Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "任务与分类选择的键盘/状态参考。"
      }
    ],
    "prompt": "基于【官网URL】在【观察日期】的Linear首页制作局部学习页面。先核验主标题、issue演示和工作流章节，保持官网64px左对齐标题、接近黑的背景、灰色副文和细分隔线，不加入泛用大渐变球。使用本地官方Inter、品牌SVG、人物头像和实际氛围图。首屏下方重建侧栏、任务正文、活动评论、属性三栏，所有字体与边框保持克制，状态颜色只承担信息功能。侧栏任务和上下箭头改变标题说明编号；状态、收藏、agent示例有可见反馈。后续至少展示收件Triage和规划时间线，各自结构不同。手机折叠侧栏与次级属性，核心任务仍可阅读操作；导航可展开、Esc关闭弹窗、焦点可见、自然滚动、reduced motion。记录从原站观察到的事实与自建数据的边界，列出未复现的服务器功能。复用于【目标开发工具】时先依据真实工作流重组任务内容。",
    "negativePrompt": "不要虚构品牌或素材；不要复制通用Hero+三卡片模板；不要用抽象blob替代真实产品界面；不要接管滚轮；不要把历史文章说成当前观察；不要伪装真实账户、支付或AI执行。",
    "demo": "demos/linear-workflow/index.html",
    "preview": "previews/linear-workflow.jpg",
    "research": "research/linear-workflow.md",
    "exercise": "以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。",
    "referenceUrl": "https://linear.app/",
    "implementation": "reference-study",
    "fidelity": "demos/linear-workflow/fidelity.md",
    "assetManifest": "demos/linear-workflow/assets-manifest.json",
    "referencePreview": "research/screenshots/linear-workflow-source.png"
  },
  {
    "id": "notion-editorial",
    "order": 4,
    "title": "Notion — 插画与真实工作空间",
    "subtitle": "Where teams and agents think together",
    "category": "产品",
    "country": "美国",
    "tags": [
      "Notion",
      "真实品牌",
      "手绘插画",
      "巨字",
      "文档",
      "产品视频"
    ],
    "summary": "复现 Notion 真实大字号居中标题、浅蓝动词胶囊、蓝色按钮、团队插画和工作空间视频，之后分节展示知识、答案与自动化。",
    "accent": "#0075e6",
    "background": "#ffffff",
    "principles": [
      "居中巨字先建立团队与AI的共同工作主题。",
      "手绘人物与产品界面一起出现，情境与工具互相解释。",
      "浅蓝动词与蓝色行动建立有限、清楚的视觉重点。",
      "功能说明使用真实文档界面，避免插画替代功能证据。"
    ],
    "productFocus": "首屏真实Ramp HQ视频让团队与agents主题具体化，随后用捕获知识、搜索答案、自动化三节展示实际功能。",
    "interaction": [
      "首屏动词可切换Think/Work/Build，产品视频可播放/暂停。",
      "Product/AI/Resources导航展开；主要按钮引导本地工作空间。",
      "知识、问答与任务代理打开本地操作示例；工作空间三个文档栏目切换内容。"
    ],
    "theme": "高白底、近黑巨字、蓝色按钮、手绘人物；功能区不同浅色底，文档界面保持轻边框。",
    "constraints": [
      "首屏必须采用真实官方插画/产品素材，不画一个泛用纸片人物代替。",
      "品牌活动文章和Notion应用排版更新的适用范围注明。",
      "使用NotionInter本地字体，字标与插画不拉伸。",
      "视频默认静音；reduced motion默认暂停。",
      "手机用官网移动端图，功能区纵向重排，操作不依赖hover。"
    ],
    "useCases": [
      "知识协作产品",
      "模块化文档工具",
      "人文感AI产品"
    ],
    "avoid": [
      "仿旧泛黄纸张代表所有Notion版本",
      "只有插画没有产品内容",
      "所有功能复用相同卡片模板"
    ],
    "tokens": {
      "palette": [
        "#101010",
        "#ffffff",
        "#0075e6",
        "#e6f3ff",
        "#fff5e5"
      ],
      "type": "本地 NotionInter regular/bold；首屏94px、动词72px、正文20px；手机45px。",
      "layout": "居中标题与1120px视频；客户字标；3个分节左右组合；底部真实文档布局。",
      "motion": "官方静音视频，显式暂停；局部直接切换，不接管滚轮。"
    },
    "composition": {
      "color": "高白底、近黑巨字、蓝色按钮、手绘人物；功能区不同浅色底，文档界面保持轻边框。",
      "typography": "本地 NotionInter regular/bold；首屏94px、动词72px、正文20px；手机45px。",
      "layout": "居中标题与1120px视频；客户字标；3个分节左右组合；底部真实文档布局。",
      "imagery": "94px标题、浅蓝胶囊、官网字体；官方hero视频/poster和mobile图；官网capture/find/automate图片 + 本地示例弹窗",
      "shape": "大圆胶囊动词、8px按钮、20px功能区；插画自然外轮廓。",
      "hierarchy": "首屏真实Ramp HQ视频让团队与agents主题具体化，随后用捕获知识、搜索答案、自动化三节展示实际功能。",
      "motion": "官方静音视频，显式暂停；局部直接切换，不接管滚轮。",
      "coherence": "字体、色彩、素材、信息结构与Notion公开页一致；首屏核心构图和素材保持真实。后续功能文案为概述，部分功能背景与文档示例为局部迁移，不称整站像素级复制；未还原所有客户墙、真实搜索和agent执行。"
    },
    "sources": [
      {
        "title": "Notion 当前首页",
        "url": "https://www.notion.com/",
        "type": "实例",
        "note": "官方web正文、匿名HTML与早先保存的干净首屏截图核验；本轮Edge连接关闭，未当作新视觉观察。"
      },
      {
        "title": "Notion brand campaign",
        "url": "https://www.notion.com/blog/the-thinking-behind-our-latest-brand-campaign",
        "type": "理论",
        "note": "2024第一方文章解释插画驱动、手势感和故事性；不等同于2026首页的全部设计说明。"
      },
      {
        "title": "Notion page design update",
        "url": "https://www.notion.com/blog/updating-the-design-of-notion-pages",
        "type": "理论",
        "note": "2026-03-18应用页面的阅读间距、列表分组；仅迁移至本地工作空间示例。"
      }
    ],
    "prompt": "以【Notion官网URL】在【观察日期】的真实公开首页为依据制作局部设计研究。保持居中巨字标题、浅蓝动词胶囊、蓝色小圆角主按钮与白色空间，优先使用官方NotionInter和原始品牌SVG。首屏必须使用已核验的官网团队插画和真实工作空间视频，视频静音并提供暂停，reduced motion时默认停在poster，手机切换官方移动图。后续按捕获上下文、寻找答案、自动化任务分别排版，使用对应官方产品图与不同浅色底，不把所有内容改成统一卡片。导航分类可展开；动词可选择；工作空间栏目和任务清单有真实本地状态；问答示例显式是模拟。保持文档段落呼吸与列表紧凑，手机可阅读、按钮可键盘操作、Esc可关闭。记录来源截图、资产尺寸、理论适用范围和服务端差异。迁移到【目标知识产品】时依据真实模块定义信息顺序。",
    "negativePrompt": "不要虚构品牌或素材；不要复制通用Hero+三卡片模板；不要用抽象blob替代真实产品界面；不要接管滚轮；不要把历史文章说成当前观察；不要伪装真实账户、支付或AI执行。",
    "demo": "demos/notion-editorial/index.html",
    "preview": "previews/notion-editorial.jpg",
    "research": "research/notion-editorial.md",
    "exercise": "以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。",
    "referenceUrl": "https://www.notion.com/",
    "implementation": "reference-study",
    "fidelity": "demos/notion-editorial/fidelity.md",
    "assetManifest": "demos/notion-editorial/assets-manifest.json",
    "referencePreview": "research/screenshots/notion-editorial-source.png"
  },
  {
    "id": "zelda-world",
    "order": 5,
    "title": "塞尔达 · 全景世界舞台",
    "subtitle": "ZELDA / CINEMATIC WORLD",
    "category": "游戏/IP",
    "country": "日本",
    "tags": [
      "塞尔达",
      "Nintendo",
      "官方视频",
      "世界章节",
      "BGM",
      "沉浸"
    ],
    "summary": "真实游戏场景占据全屏，以日文主题字、三个世界章节和克制导航，让玩法先于文字被看见。",
    "accent": "#1f9a6d",
    "background": "#0a1714",
    "principles": [
      "世界视频是信息主角，界面只提供章节方向和声音控制。",
      "三个动作主题“翔ける／創る／紡ぐ”把世界与玩法相连。",
      "文字和控制依附稳定位置，低密度让场景细节承担产品证明。"
    ],
    "productFocus": "使用 Nintendo 世界页真实 HLS 场景片段、标题和缩略图；天空、创造、未知世界成为三段连续叙事。",
    "interaction": [
      "底部缩略索引跳转三个实际世界章节，滚动更新当前章。",
      "暂停按钮控制本地实际视频播放。",
      "用户点击才播放原站 bgm.mp3，失败反馈，离开前台暂停。"
    ],
    "theme": "天空蓝、古代青绿、象牙色标题；自然、神秘与开放探索。",
    "constraints": [
      "官方资源只用于本库私人学习，原素材权利归 Nintendo。",
      "本地是局部复现，三章自然文档滚动不同于原站舞台转场。",
      "短片采用每章前6段，并未宣称复现完整视频。",
      "字幕与控制保持高对比，不用持续动效阻碍阅读。",
      "背景视频必须有持续暂停机制，音频默认关闭。"
    ],
    "useCases": [
      "开放世界游戏",
      "世界观宣传",
      "沉浸式产品故事"
    ],
    "avoid": [
      "密集参数后台",
      "高频数据操作"
    ],
    "tokens": {
      "palette": [
        "#0a1714",
        "#1f9a6d",
        "#d5edff",
        "#f6f0d7"
      ],
      "type": "官方日文标题图片 + 小字号衬线副文；控件用系统无衬线",
      "layout": "三段满屏视频舞台；标题在右侧；Logo左下；底部缩略目录",
      "motion": "实际视频循环可暂停；减少动态初始停止；章节保持原生滚动。"
    },
    "sources": [
      {
        "title": "Nintendo · Tears of the Kingdom WORLD",
        "url": "https://www.nintendo.com/jp/zelda/totk/world/index.html",
        "type": "实例",
        "note": "2026-10-07 web+浏览器核验 ON/OFF入口、全屏游戏视频、三个主题与底部世界目录。"
      },
      {
        "title": "W3C · Pause, Stop, Hide",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        "type": "规范",
        "note": "核验持续自动动态的暂停要求；本地背景视频提供可持续暂停按钮，减少动态偏好下初始停止。"
      }
    ],
    "prompt": "为【开放世界游戏】制作一个基于已核验官网的私人设计研究 demo。先记录官网实际 URL、调研日期、三个世界动作主题与声音入口，再下载有授权的官方场景、标题与字标到本地，逐项记录来源、尺寸、用途和处理方式。布局使用三段100svh场景舞台，每段真实视频覆盖全幅，标题在右侧，游戏Logo在左下，章节缩略目录稳定放置。信息顺序为世界场景、动作主题、章节导航、官方完整入口；避免用普通两栏功能卡替代视频叙事。使用古代青绿与象牙色细线控件，正文为可读取HTML。每章提供静态后备帧，视频可持续暂停，prefers-reduced-motion下初始停止；实际原站音乐仅在用户点击后播放，捕获play拒绝，页面离开前台暂停。手机收敛目录为三个等宽缩略项，正文与按钮保留可读尺寸。保留原生滚动，说明和原站转场、视频长度之间的差异。输出独立HTML/CSS/JS、assets-manifest.json、fidelity.md和真实浏览器预览。",
    "negativePrompt": "不要编造原站世界或曲名；不要以原创浮岛替代官方真实场景；不要自动播放声音；不要嵌入原站整页、追踪脚本或声称像素级完整复刻。",
    "demo": "demos/zelda-world/index.html",
    "preview": "previews/zelda-world.jpg",
    "research": "research/zelda-world.md",
    "exercise": "将三个真实场景换成另一部已授权游戏的世界章节，保持视频、标题、目录的层级并记录保真差异。",
    "composition": {
      "color": "天空蓝、古代青绿、象牙色标题；自然、神秘与开放探索。",
      "typography": "官方日文标题图片 + 小字号衬线副文；控件用系统无衬线",
      "layout": "三段满屏视频舞台；标题在右侧；Logo左下；底部缩略目录",
      "imagery": "官方 HLS 每章前6段、本地转封装 MP4、官方字标与缩略图。",
      "shape": "细线、细边框与低干扰矩形目录，避免遮盖景色。",
      "hierarchy": "场景 → 三个玩法动词 → 章节选择 → 真实官方入口。",
      "motion": "实际视频循环可暂停；减少动态初始停止；章节保持原生滚动。",
      "coherence": "游戏实景、动作主题、细线目录与原站配乐共同让体验围绕探索，而不是抽象功能卡。"
    },
    "referenceUrl": "https://www.nintendo.com/jp/zelda/totk/world/index.html",
    "implementation": "reference-study",
    "fidelity": "demos/zelda-world/fidelity.md",
    "assetManifest": "demos/zelda-world/assets-manifest.json",
    "referencePreview": "research/screenshots/zelda-world-source.jpg"
  },
  {
    "id": "persona-kinetic",
    "order": 6,
    "title": "Persona 5 Royal · 黑金角色拼贴",
    "subtitle": "P5R / GOLD CUTOUT & RED HALFTONE",
    "category": "游戏/IP",
    "country": "日本",
    "tags": [
      "Persona",
      "ATLUS",
      "真实角色",
      "黑金",
      "红色网点",
      "服装切换"
    ],
    "summary": "当前 Royal 官网以黑金群像开场，切入红金半调角色舞台；角色、Persona和服装共同承担产品人格。",
    "accent": "#d5b360",
    "background": "#11100e",
    "principles": [
      "首屏黑金群像、金色剪貼字与红色斜切衔接，不把所有页段误做同一红色。",
      "角色轮廓、Persona与身份标签组成有层次的视觉焦点。",
      "倾斜与切片用于海报和背景，正文及控件保持可读。",
      "角色选择必须替换真实角色图与独立Persona，而非只换同一插画颜色。"
    ],
    "productFocus": "官方 Royal 群像、真实主人公/龙司/杏及各自制服、怪盗服、对应Persona；昼夜两种生活以官方游戏截图连接。",
    "interaction": [
      "三角色切换同步姓名、身份、配音、真实立绘与Persona。",
      "学校制服/怪盗服两个独立素材真实切换。",
      "PV按钮进入官网脚本所用英文 YouTube 宣传片；不伪称本地BGM。"
    ],
    "theme": "黑金首屏表达 Royal；红黑网点、金框与大号切片标题表达都市怪盗风格。",
    "constraints": [
      "真实 ATLUS/SEGA 美术仅用于用户授权私人研究。",
      "只保留三名角色而非原站完整十人档案。",
      "正文不随背景倾斜，选择状态明确且键盘可操作。",
      "不自动轮播，不加入高频闪烁。",
      "原站未核验独立 BGM，PV使用实际官网英文视频链接。"
    ],
    "useCases": [
      "角色游戏",
      "青年文化IP",
      "音乐宣传"
    ],
    "avoid": [
      "长篇规范文档",
      "密集企业后台"
    ],
    "tokens": {
      "palette": [
        "#11100e",
        "#98142b",
        "#e0c483",
        "#f7e9be"
      ],
      "type": "官方剪贴标题图 + 大号无衬线身份文字；中文正文水平",
      "layout": "中心大型群像+左右独立标题；全幅红色角色舞台；倾斜昼夜画面",
      "motion": "手动角色/服装切换，无自动轮播；自然章节滚动。"
    },
    "sources": [
      {
        "title": "ATLUS · Persona 5 Royal 官方英文页",
        "url": "https://persona.atlus.com/p5r/?lang=en#",
        "type": "实例",
        "note": "浏览器核验当前金黑群像首屏、左PV、Available Now、暗红网点角色区与服装切换。"
      },
      {
        "title": "MoMA · Collage",
        "url": "https://www.moma.org/collection/terms/collage",
        "type": "理论",
        "note": "拼贴作品与术语资料，用于分析切片、群像和整体组织；并非 ATLUS 作者意图声明。"
      },
      {
        "title": "W3C · Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "键盘、明确选择状态与内容切换的交互规范参考；demo采用原生按钮/aria-pressed，并提供左右键选择。"
      }
    ],
    "prompt": "为【角色IP游戏】制作对应真实官网的私人学习局部复现，先实访当前地区/语言版本，不根据记忆把 Royal 首页误做成红色。保留首屏黑金大型群像、左侧金色剪贴标题与PV入口、右侧发行信息、中央底部品牌Logo，以及通往红色半调角色章节的斜切金边。角色区必须使用分别核验的真实角色、学校服装、怪盗服装和对应Persona图片，前景人物与后景Persona分层，左侧黑底金框档案提供姓名、身份、配音及简介，底部肖像选择、右侧服装按钮都有真实内容变化。接着用真实截图组成学校生活与怪盗生活两个倾斜画面，再提供官方平台链接。只有标题和海报容器倾斜，正文与命中区保持水平；手机收敛偏移但保留角色尺度。所有美术本地化并写资产清单，禁止复制账号/追踪脚本。PV跳转核验的官方英文视频；找不到BGM就明确事实。采用原生按钮aria-pressed和左右键选择，减少动态偏好关闭过渡。输出完整代码、fidelity.md、来源记录与桌面手机预览。",
    "negativePrompt": "不要把当前黑金首页替换为通用红色两栏；不要同一角色换色冒充三人；不要编造原曲或角色技能；不要复制整页SDK、订阅或追踪服务。",
    "demo": "demos/persona-kinetic/index.html",
    "preview": "previews/persona-kinetic.jpg",
    "research": "research/persona-kinetic.md",
    "exercise": "在不改变角色资产的情况下，重做同一章节的长文档案布局，维持红金拼贴人格并提高阅读效率。",
    "composition": {
      "color": "黑金首屏表达 Royal；红黑网点、金框与大号切片标题表达都市怪盗风格。",
      "typography": "官方剪贴标题图 + 大号无衬线身份文字；中文正文水平",
      "layout": "中心大型群像+左右独立标题；全幅红色角色舞台；倾斜昼夜画面",
      "imagery": "官方首屏群像、三位角色双服装、三张Persona立绘和真实游戏截图。",
      "shape": "斜切拼贴、金色边框、网点与剪贴字保持同一张海报的秩序。",
      "hierarchy": "Royal群像与发行信息 → 角色身份与形态 → 昼夜生活 → 官方平台入口。",
      "motion": "手动角色/服装切换，无自动轮播；自然章节滚动。",
      "coherence": "真实角色形态和Persona让视觉表达产品身份；金黑与红金按叙事阶段转换，水平正文约束强烈动势。"
    },
    "referenceUrl": "https://persona.atlus.com/p5r/?lang=en#",
    "implementation": "reference-study",
    "fidelity": "demos/persona-kinetic/fidelity.md",
    "assetManifest": "demos/persona-kinetic/assets-manifest.json",
    "referencePreview": "research/screenshots/persona-kinetic-source.jpg"
  },
  {
    "id": "hand-drawn",
    "order": 7,
    "title": "手绘：把不完美变成亲近感",
    "subtitle": "Excalidraw / Field Notes",
    "category": "经典风格",
    "tags": [
      "手绘",
      "纸张",
      "草稿",
      "协作",
      "贴纸",
      "SVG"
    ],
    "summary": "以 Excalidraw 的手绘产品表达和 Rough.js 的线条机制为依据，学习受控的不规则轮廓、纸面层次与低压力参与感；迁移为原创手帐俱乐部。",
    "accent": "#b17451",
    "background": "#f4f0e4",
    "principles": [
      "不规则轮廓只承载情绪，信息层级保持稳定",
      "手绘图要解释真实产品活动，而非四处点缀",
      "纸张、胶带、批注组成可辨识的实体隐喻",
      "少量色块强调一个值得开始的动作"
    ],
    "productFocus": "让用户理解记录生活的低门槛：先看到一本已经开始的笔记，再亲手勾选三个小步骤。",
    "interaction": [
      "三项原生复选框更新收集进度",
      "贴纸按钮切换装饰并同步 aria-pressed",
      "开始按钮自然滚动到仪式清单",
      "重置清单便于反复体验"
    ],
    "theme": "奶油纸张、深橄榄墨色、陶土铅笔与低饱和植物绿；温和、好奇、允许草稿的日常创作气质。",
    "constraints": [
      "正文使用清晰字体，手写感仅用于批注和图内短句",
      "倾斜角度限制在小范围，不能影响阅读和触达",
      "线宽与排线密度要保持统一",
      "SVG 不规则线条固定生成，避免每帧抖动",
      "复选框与按钮使用原生语义和键盘焦点",
      "小屏纸页完整缩放，不让贴纸挡住核心文案"
    ],
    "useCases": [
      "创作工具",
      "教育与社区",
      "手帐文具",
      "轻量规划产品"
    ],
    "avoid": [
      "高精度交易数据主界面",
      "需要严肃医疗可信度的关键信息",
      "长篇正文全部使用手写字体",
      "无限制的纸纹和装饰叠加"
    ],
    "tokens": {
      "palette": [
        "#f4f0e4",
        "#343e2f",
        "#b17451",
        "#a6af83",
        "#e5e8cf"
      ],
      "type": "标题 Georgia 44–72px；正文 Georgia 15–18px；元信息 Arial 9–12px",
      "layout": "双栏纸页首屏 + 非对称仪式清单 + 三种记录页；大面积留白，小角度旋转",
      "motion": "由点击触发的状态变化；无持续装饰动画；reduced motion 关闭平滑滚动"
    },
    "sources": [
      {
        "title": "Excalidraw Plus 官方网站",
        "url": "https://plus.excalidraw.com/",
        "type": "实例",
        "note": "2026-10-07 核验：官网以简单白板、协作与快速草稿组织产品信息；手绘产品表达的局部参考，不宣称官网采用本 demo 的整套纸张拼贴。"
      },
      {
        "title": "Rough.js 官方说明与绘图示例",
        "url": "https://roughjs.com/",
        "type": "理论",
        "note": "官方展示线条粗糙度、弯曲度、排线等可调机制；demo 以原创 SVG 固定曲线迁移该表达思想，不依赖库。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构手帐俱乐部 Field Notes 制作可离线运行的英文网页。参考 Excalidraw 的手绘产品表达和 Rough.js 的受控轮廓/排线机制，但使用原创名称、文案和 SVG 插画。信息顺序：生活记录价值主张→已经写过的植物与咖啡笔记→三个低门槛开始步骤→不同记录场景。首屏用深橄榄色衬线大标题和奶油纸张；右侧原创笔记本带细横线、胶带、铅笔、小角度旋转和一张可切换贴纸。手绘不是全页面凌乱：正文正常排版，线宽统一，主 CTA 明显。三项清单必须可以勾选并更新可读进度，提供清单重置；贴纸按钮需 aria-pressed。至少三节完整内容，移动端将两栏重排成单栏；保留键盘焦点与 reduced motion；全部素材本地，不使用 CDN 或他人插画。\n\n要素协调要求：纸色、植物线稿、宽松排版和手工贴纸都服务于“慢下来记录”；正文使用清楚字形，避免过度装饰。",
    "negativePrompt": "不要复制 Excalidraw 商标或官网素材；不要把全部正文写成手写字；不要随机抖动、过密纹理、过多旋转、悬空链接或只有换色的通用卡片。",
    "demo": "demos/hand-drawn/index.html",
    "preview": "previews/hand-drawn.jpg",
    "research": "research/hand-drawn.md",
    "exercise": "将手帐俱乐部改造成团队复盘工具：保留低压力草稿感，把植物笔记换为原创流程图，并让清单对应一次复盘的三个阶段。",
    "composition": {
      "color": "奶油纸色和低饱和植物绿保持柔和，黑色线稿提供可读性。",
      "typography": "标题 Georgia 44–72px；正文 Georgia 15–18px；元信息 Arial 9–12px",
      "layout": "双栏纸页首屏 + 非对称仪式清单 + 三种记录页；大面积留白，小角度旋转",
      "imagery": "自绘植物、笔记页与贴纸解释记录生活的场景。",
      "shape": "适度不规则笔触与纸页质感模拟手工；按钮仍有稳定边界。",
      "hierarchy": "生活主张 → 手帐示范 → 清单练习 → 记录入口。",
      "motion": "由点击触发的状态变化；无持续装饰动画；reduced motion 关闭平滑滚动",
      "coherence": "纸色、植物线稿、宽松排版和手工贴纸都服务于“慢下来记录”；正文使用清楚字形，避免过度装饰。"
    }
  },
  {
    "id": "isometric-3d",
    "order": 8,
    "title": "等轴 3D：让空间讲述系统",
    "subtitle": "Monument Valley / Little Terraces",
    "category": "经典风格",
    "tags": [
      "等轴",
      "3D",
      "空间叙事",
      "游戏",
      "建筑",
      "层级"
    ],
    "summary": "从 Monument Valley 官方呈现的极简建筑世界出发，以 Adobe 的等轴制图说明落实 30° 平行投影；迁移为可展开层次的原创浮岛。",
    "accent": "#a26958",
    "background": "#e8eee8",
    "principles": [
      "统一平行投影，让每个物体属于同一个空间",
      "三面明度建立体积，克制材质细节",
      "路径、水面和植物提供比例与浏览方向",
      "画面先传达世界气质，再由章节解释体验",
      "拆分图层把复杂系统变成可理解的组成关系"
    ],
    "productFocus": "让访客先感受安静、探索与建造，再通过图层切换理解花园、建筑和基础平台的关系。",
    "interaction": [
      "整岛、花园、建筑三种焦点切换",
      "展开按钮将基础、建筑、植物分层",
      "焦点状态伴随文字说明与 aria-pressed",
      "章节锚点保留正常浏览节奏"
    ],
    "theme": "鼠尾草背景、陶土平台、奶油塔楼与薄荷温室；极简、宁静、微缩世界的空间感。",
    "constraints": [
      "真正等轴投影使用平行轴和统一比例，不随意混入透视消失点",
      "左右平面约 30°，同一组坐标生成全部物体",
      "光源与三面明度方向一致",
      "场景图层必须有文字控件，不能只依赖小物体热点",
      "移动端先呈现价值主张，再呈现场景和控件",
      "reduced motion 时立即切换图层位置"
    ],
    "useCases": [
      "游戏世界宣传",
      "复杂系统介绍",
      "园区与空间项目",
      "供应链或基础设施产品"
    ],
    "avoid": [
      "需要真实透视的建筑验收图",
      "用大量重材质遮蔽系统关系",
      "场景上堆叠无法触达的小热点",
      "把固定二维 SVG 称为可旋转 3D 引擎"
    ],
    "tokens": {
      "palette": [
        "#e8eee8",
        "#234647",
        "#a26958",
        "#d9b7a6",
        "#9cb29a",
        "#f3ead6"
      ],
      "type": "Georgia 49–73px 叙事标题；Arial 12–15px 正文与 8–10px 空间标签",
      "layout": "窄叙事栏 + 大场景图；横向图层控制；章节编号列表；独立居中结尾",
      "motion": "点击后 650ms 图层偏移/透明度变化；无滚轮劫持；reduced motion 即时完成"
    },
    "sources": [
      {
        "title": "Monument Valley 系列官方网站",
        "url": "https://www.monumentvalleygame.com/",
        "type": "实例",
        "note": "2026-10-07 核验：官网系列入口存在；网页文本提取有限。参考是游戏世界的建筑视觉，不宣称官网提供本 demo 的图层交互。"
      },
      {
        "title": "ustwo games — Monument Valley 3",
        "url": "https://ustwogames.co.uk/our-games/monument-valley-3/",
        "type": "实例",
        "note": "开发商说明世界设计来自建筑和实验艺术，并强调极简、不可能几何和旋转建筑探索；用于核验视觉及体验意图。"
      },
      {
        "title": "Adobe — Isometric art",
        "url": "https://www.adobe.com/products/photoshop/isometric-art.html",
        "type": "理论",
        "note": "解释二维表现三维、30° 侧向轴与侧面明暗。demo 使用严格平行坐标生成 SVG，是风格迁移而非原游戏复刻。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构宁静世界 Little Terraces 制作本地网页，借鉴 Monument Valley 的极简建筑世界呈现，并依据 Adobe 等轴制图说明使用严格 30° 平行投影。不要复制其关卡、角色和标志。信息顺序：宁静探索的价值主张→一个原创浮岛的完整世界→三个旅程章节→回到场景的邀请。画面包含陶土基础台、奶油塔楼、薄荷温室、水池、树木和连续路径；全部用同一 x/y/z 投影函数与统一三面明度生成 SVG。左侧窄文案右侧大场景，避免通用卡片首屏。提供整岛/花园/建筑焦点按钮，和将平台、建筑、植物分层的展开按钮；状态说明和 aria-pressed 同步。至少三节内容，小屏重排，SVG 适配视口，键盘可操作，reduced motion 即时切换；无CDN、外部素材或WebGL依赖。\n\n要素协调要求：柔和调色、衬线标题和稳定投影共享安静情绪；结构展开解释层次，不能随意更换投影角度。",
    "negativePrompt": "不要混合透视消失点与等轴投影；不要复制原游戏地图；不要自动旋转、强制视差或密集热点；不要声称 SVG 是真正可旋转的实时 3D。",
    "demo": "demos/isometric-3d/index.html",
    "preview": "previews/isometric-3d.jpg",
    "research": "research/isometric-3d.md",
    "exercise": "把浮岛替换成数据平台的等轴系统图，让三种焦点分别对应计算、存储、网络，保留统一坐标与分层解释。",
    "composition": {
      "color": "柔和绿和暖土色构成同一空间，每个立方体以三面明度表达体积。",
      "typography": "Georgia 49–73px 叙事标题；Arial 12–15px 正文与 8–10px 空间标签",
      "layout": "窄叙事栏 + 大场景图；横向图层控制；章节编号列表；独立居中结尾",
      "imagery": "统一投影的原创浮岛、建筑和植被是叙事主角。",
      "shape": "平行边、统一30°方向和几何积木建立一致空间规则。",
      "hierarchy": "平衡主张 → 场景 → 图层聚焦 → 漫游理念。",
      "motion": "点击后 650ms 图层偏移/透明度变化；无滚轮劫持；reduced motion 即时完成",
      "coherence": "柔和调色、衬线标题和稳定投影共享安静情绪；结构展开解释层次，不能随意更换投影角度。"
    }
  },
  {
    "id": "line-art",
    "order": 9,
    "title": "线条：沿绘制顺序解释结构",
    "subtitle": "Vivus / Codrops / Monoline",
    "category": "经典风格",
    "tags": [
      "线条",
      "线描",
      "SVG",
      "建筑",
      "路径动画",
      "极简"
    ],
    "summary": "由 Vivus 官方示范和 Codrops 原作者实验核验线描交互，再依据 SVG stroke 机制制作原创建筑工作室页面。案例是开发者优秀示范，区别于商业品牌官网。",
    "accent": "#607ca4",
    "background": "#f7f7f2",
    "principles": [
      "把轮廓与结构作为视觉主体，填色保持克制",
      "线宽、空白和标签共同建立工程式清晰度",
      "绘制顺序体现组成逻辑，不让内容等待动画",
      "正文与装饰线分开，主信息始终可读"
    ],
    "productFocus": "用一幅完整建筑线稿直接表达工作室对比例、构造和精简的重视；方法说明解释这种态度如何成为服务。",
    "interaction": [
      "重播按钮由基础到细节绘制线稿",
      "进度滑块允许主动描绘或回看",
      "绘制过程中可拖动滑块中止动画",
      "项目类型按钮更新对应的咨询说明"
    ],
    "theme": "近白纸面、石墨线、单一蓝灰强调；理性、精确、安静的建筑草图语言。",
    "constraints": [
      "主轮廓和辅助线以有限线宽建立层级",
      "绘制路径必须是 stroke，填色块不应装作线条被描出",
      "默认状态显示完整内容，动画由用户主动启动",
      "用 pathLength 归一化长度，进度不能依赖偶然像素尺寸",
      "reduced motion 显示终态，避免内容缺失",
      "小屏保留比例和可触达控制，不能让细线承担全部信息"
    ],
    "useCases": [
      "建筑与工业设计",
      "结构化产品介绍",
      "工艺品牌",
      "开发者交互演示"
    ],
    "avoid": [
      "复杂线稿缩小成无法辨识的图标",
      "强制等待绘制结束才能看文字",
      "线宽层级超过必要范围",
      "用过度细线作为唯一可用性线索"
    ],
    "tokens": {
      "palette": [
        "#f7f7f2",
        "#252a35",
        "#607ca4",
        "#edf0ef"
      ],
      "type": "Arial 55–84px 标题与 Georgia 斜体强调；正文 12–15px；工程标签 8–9px",
      "layout": "固定窄侧栏 + 宽标题 + 通栏建筑线稿 + 横向绘制工具栏 + 双栏方法说明",
      "motion": "3200ms 用户触发顺序描绘；滑块可中断；reduced motion 显示完成状态"
    },
    "sources": [
      {
        "title": "Vivus 官方示范站",
        "url": "https://maxwellito.github.io/vivus/",
        "type": "实例",
        "note": "2026-10-07 核验：示范 delayed、sync、oneByOne 三种绘制类型，以及 replay/rewind 与参数；是开发者示范而非大厂营销页。"
      },
      {
        "title": "Codrops — SVG Drawing Animation",
        "url": "https://tympanus.net/codrops/2013/12/30/svg-drawing-animation/",
        "type": "实例",
        "note": "原作者实验比较轮廓绘制后图像出现、页面框架出现等手法；demo 只迁移绘制机制。"
      },
      {
        "title": "Jake Archibald — Animated line drawing in SVG",
        "url": "https://jakearchibald.com/2013/animated-line-drawing-svg/",
        "type": "理论",
        "note": "作者说明 dasharray/dashoffset 与路径长度驱动绘制的机制。"
      },
      {
        "title": "MDN — stroke-dashoffset",
        "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dashoffset",
        "type": "规范",
        "note": "核验 stroke-dashoffset 的偏移、可动画性和 pathLength 归一化；注意旧 Vivus README 的限制属于旧库实现，不代表当前 SVG 仅 path 支持。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构建筑工作室 Monoline 制作英文静态网站。依据 Vivus 官方线描示范、Codrops SVG Drawing Animation 原作者实验和 SVG stroke-dasharray/stroke-dashoffset 机制。素材为原创院落住宅、树、玻璃幕墙和水池线稿，不复制案例的设备插图。信息顺序：精简空间的观点→通栏建筑概念线稿→三步设计方法→可选择项目类型的咨询说明。近白背景、石墨线条、蓝灰强调，有限线宽和细工程标签；标题使用无衬线和单一衬线斜体强调，设窄侧边栏。默认展示完整线稿，重播按钮才开始从基础到细节绘制；用 pathLength 归一化每条路径，进度滑块可中断并控制图形；文本不等待动画。至少三节内容，移动端缩放和重排，键盘焦点、可读状态及 reduced motion 终态齐全；全部本地，无CDN。\n\n要素协调要求：线宽、清淡色彩、大留白和简短标题共同表达“减少噪声”；描绘动效与建筑构成顺序相呼应。",
    "negativePrompt": "不要把细线作为唯一信息；不要启动时隐藏全页等待动画；不要把填色块错误称为线描；不要复制原示范插图；不要依赖过时库限制或让动画阻塞键盘。",
    "demo": "demos/line-art/index.html",
    "preview": "previews/line-art.jpg",
    "research": "research/line-art.md",
    "exercise": "将建筑线稿改为原创机械产品分解图，让绘制顺序对应支架、外壳、接口，并保持全文始终可读。",
    "composition": {
      "color": "接近白纸的底色和灰蓝线条保持克制，强调色只用于进度。",
      "typography": "Arial 55–84px 标题与 Georgia 斜体强调；正文 12–15px；工程标签 8–9px",
      "layout": "固定窄侧栏 + 宽标题 + 通栏建筑线稿 + 横向绘制工具栏 + 双栏方法说明",
      "imagery": "建筑线稿随绘制顺序解释基础、结构与细节。",
      "shape": "统一细线和留白制造精度，不以粗阴影替代结构。",
      "hierarchy": "空间主张 → 建筑描绘 → 工作方法 → 项目类型。",
      "motion": "3200ms 用户触发顺序描绘；滑块可中断；reduced motion 显示完成状态",
      "coherence": "线宽、清淡色彩、大留白和简短标题共同表达“减少噪声”；描绘动效与建筑构成顺序相呼应。"
    }
  },
  {
    "id": "shape-morph",
    "order": 10,
    "title": "动态形状：同一单元，多种表达",
    "subtitle": "In Pieces / Form Shift",
    "category": "经典风格",
    "tags": [
      "几何",
      "形状变化",
      "碎片",
      "动态品牌",
      "SVG",
      "变形"
    ],
    "summary": "以 Bryan James 的 In Pieces 及其原作者制作文章为历史证据，研究保留几何单元的形态切换；迁移为原创设计工作室的 24 片动态身份。",
    "accent": "#e3ef85",
    "background": "#b7a2df",
    "principles": [
      "几何单元保持身份连续，变化不是无目的装饰",
      "形态切换要与内容或品牌语义同步",
      "相同顶点拓扑让变形可预测和可中断",
      "给用户状态选择与动画控制，不持续夺取注意"
    ],
    "productFocus": "用连接、扩张、聚焦三个可识别状态解释动态品牌系统：同一套部件可以服务不同表达，而非每次从头重做。",
    "interaction": [
      "三种形态按钮切换 24 个三角片的位置",
      "间距滑块将单元从连续图案分离为碎片",
      "时长滑块调整下一次变形速度",
      "变形可暂停与恢复，重置恢复初始参数",
      "状态说明随形态变化，reduced motion 即时切换"
    ],
    "theme": "紫色画布、酸黄几何、石墨底部参数区；大胆、实验、具有明确系统感的动态品牌。",
    "constraints": [
      "各状态保留同一数量三角片和同一顶点顺序",
      "动画参数变化需要明确说明何时生效",
      "每次触发从当前中间状态继续，避免突然闪回",
      "选择、暂停、参数都必须支持键盘",
      "动态视觉不能遮住标题或改变正文布局",
      "不把历史作者示范称为当前可访问官网，明确来源状态"
    ],
    "useCases": [
      "创意工作室",
      "展览与文化项目",
      "动态品牌系统",
      "需要演示变化的产品概念"
    ],
    "avoid": [
      "与内容无关的持续形变",
      "关键操作按钮也不断移动",
      "随机顶点造成难以辨识的闪烁",
      "只有单个 blob 而没有单元和语义关系"
    ],
    "tokens": {
      "palette": [
        "#b7a2df",
        "#242026",
        "#e3ef85",
        "#efece5",
        "#d4df71"
      ],
      "type": "Arial 75–126px 巨型主标题；Georgia 斜体强调；正文 12–14px；状态标签 8–10px",
      "layout": "整幅紫色海报首屏 + 中央偏右碎片标志 + 底部横向状态导航 + 浅色方法区 + 深色参数台",
      "motion": "300–2400ms smoothstep 顶点插值；默认 1200ms；当前状态可中断、暂停和恢复；reduced motion 即时完成"
    },
    "sources": [
      {
        "title": "In Pieces 历史官网",
        "url": "https://species-in-pieces.com/",
        "type": "实例",
        "note": "2026-10-07 web 读取失败；不声称完成当日官网视觉核验。案例内容由下方原作者制作文章核实，属于历史设计案例。"
      },
      {
        "title": "Bryan James — The Making Of In Pieces",
        "url": "https://www.smashingmagazine.com/2015/06/the-making-of-in-pieces/",
        "type": "理论",
        "note": "2015-06-02 作者自述：30 个三角片重组 30 种动物，将碎片与保育主题关联，并用方向、延迟与颜色切换组织动画。此处读取核验。"
      },
      {
        "title": "CSSconf EU 对 Bryan James 的访谈",
        "url": "https://blog.cssconf.eu/2015/09/24/introducing-bryan-james/",
        "type": "实例",
        "note": "原作者访谈再次说明原项目的技术实验如何与 pieces 的核心概念结合，作为历史作品旁证。"
      },
      {
        "title": "MDN — polygon()",
        "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/polygon",
        "type": "规范",
        "note": "核验多边形由有序顶点描述；本 demo 为方便暂停和参数变化使用 SVG 顶点插值，不复制原项目的 CSS clip-path 实现。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构设计工作室 Form / Shift 制作本地可运行的动态几何网站。以 In Pieces 的原作者制作文章为历史依据，提取‘保留几何单元、用变化承载主题’这一机制，不复制动物造型。将用户提到的集合形状变化具体化为 24 个相同身份三角片，在 Connect、Expand、Focus 三状态间重排为环状、星形、菱形。紫色整幅海报首屏配巨大标题和酸黄标志，底部状态按钮；随后浅色方法区和深色参数区，至少三节。信息顺序：品牌必须能变化的观点→手动切换的身份示范→系统制作步骤→间距和时长实验。SVG 每片保留三个顶点，使用 smoothstep 插值，从当前中间态继续；提供暂停/恢复、间距调整、下一次动画时长调整和重置。状态说明同步，控制使用原生按钮/滑块，键盘可操作，移动端重排；reduced motion 即时换态。全部素材原创本地，无CDN、无自动循环、无强制滚动。\n\n要素协调要求：变化发生在共同单元上；颜色、字体和网格保持稳定，因此读者能理解同一身份的不同表达。",
    "negativePrompt": "不要复制 In Pieces 动物或将其作品称为本 demo；不要随机闪烁、自动无限变形、移动文字或变化点击目标；不要在顶点拓扑不匹配时硬插值；不要把未能访问的历史官网当成当日视觉事实。",
    "demo": "demos/shape-morph/index.html",
    "preview": "previews/shape-morph.jpg",
    "research": "research/shape-morph.md",
    "exercise": "将三种形态映射为一个产品的收集、处理、输出阶段，让每次变形同步切换解释文本，并保留相同三角片。",
    "composition": {
      "color": "紫色舞台与黄绿碎片形成集中对比，正文保持黑色清晰。",
      "typography": "Arial 75–126px 巨型主标题；Georgia 斜体强调；正文 12–14px；状态标签 8–10px",
      "layout": "整幅紫色海报首屏 + 中央偏右碎片标志 + 底部横向状态导航 + 浅色方法区 + 深色参数台",
      "imagery": "同拓扑24个三角片组合出三种状态，图形本身承担变化。",
      "shape": "保留几何单元，通过位置与间距变化建立多个表情。",
      "hierarchy": "变化主张 → 三个形态 → 设计方法 → 参数操作。",
      "motion": "300–2400ms smoothstep 顶点插值；默认 1200ms；当前状态可中断、暂停和恢复；reduced motion 即时完成",
      "coherence": "变化发生在共同单元上；颜色、字体和网格保持稳定，因此读者能理解同一身份的不同表达。"
    }
  },
  {
    "id": "swiss-grid",
    "order": 11,
    "title": "瑞士设计：编辑网格",
    "subtitle": "Swissted / Müller-Brockmann → 信息优先的展览日程",
    "category": "经典风格",
    "tags": [
      "瑞士",
      "国际主义",
      "网格",
      "排版",
      "展览",
      "编辑设计"
    ],
    "summary": "用对齐、字号差和非对称留白构建清晰的信息秩序。不是一张红黑海报套在所有网页上，而是让名称、日期、类别和行动共享网格。",
    "accent": "#e3402e",
    "background": "#f2efe6",
    "principles": [
      "从内容层级建立网格，再决定视觉形状。",
      "名称、日期、编号共享对齐线；非对称仍有稳定秩序。",
      "少量无衬线字重和尺度差承担层级，不依靠组件阴影。",
      "抽象图形表达主题节奏，同时为信息保留阅读空间。"
    ],
    "productFocus": "将展览主题置于最大字级，日程成为可筛选的编辑式列表；日期、类型和收藏状态无需进入详情即可理解。",
    "interaction": [
      "分类按钮筛选日程并宣布结果数。",
      "收藏按钮将展览编号存到当前浏览器，状态可再次取消。",
      "页内导航沿常规文档滚动；无滚动劫持。",
      "键盘焦点采用高对比轮廓，筛选按钮有 aria-pressed。"
    ],
    "theme": "纸白、炭黑、信号红；严格基线、粗线分隔、左对齐标题，主题是现代城市中的字与信息。",
    "constraints": [
      "Swissted 官网明确使用 Berthold Akzidenz-Grotesk medium，并非 Helvetica；本 demo 用系统 Arial 近似结构，不声称字体等同。",
      "桌面 12 栏，移动端折为单列；文字不能为了维持海报形状被裁切。",
      "红色用于主视觉和状态，正文以黑字/纸白保持对比。",
      "字号差必须伴随语义标题层级，不能以超大字替代内容组织。",
      "几何图形只是局部节奏；不要把 Swiss 和包豪斯的形色课程混为一个流派。"
    ],
    "useCases": [
      "展览与文化机构",
      "课程日程",
      "排版作品集",
      "设计节"
    ],
    "avoid": [
      "无序的散落大字",
      "每节都是同规格圆角卡片",
      "为海报构图牺牲手机阅读"
    ],
    "tokens": {
      "palette": [
        "#f2efe6",
        "#171717",
        "#e3402e"
      ],
      "type": "Arial / Microsoft YaHei；标题 48–128px，正文 16–18px，元数据 12–14px",
      "layout": "12 栏、32px 基础间距、横向日程列表；手机为单列",
      "motion": "按钮 160ms 颜色变化；prefers-reduced-motion 禁用平滑滚动"
    },
    "sources": [
      {
        "title": "Swissted — 官方海报商店",
        "url": "https://www.swissted.com/",
        "type": "实例",
        "note": "2026-10-07 阅读：海报作品是商品主角；本例迁移其字体优先思路，不复制电商页面。"
      },
      {
        "title": "About Swissted — Mike Joyce",
        "url": "https://www.swissted.com/pages/about-us",
        "type": "理论",
        "note": "作者说明将真实演出传单改为 International Typographic Style，并明确 Akzidenz-Grotesk 不是 Helvetica。"
      },
      {
        "title": "Josef Müller-Brockmann — MoMA",
        "url": "https://www.moma.org/artists/4154-josef-muller-brockmann",
        "type": "实例",
        "note": "馆藏确认 1953–1958 音乐会海报；不是整个网页动效的证据。"
      },
      {
        "title": "IBM Carbon — 2x Grid",
        "url": "https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview",
        "type": "规范",
        "note": "阅读于 2026-10-07：对齐线、间距尺度和响应式网格指导网页迁移，非历史 Swiss 唯一规范。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构文化机构 [品牌] 制作瑞士国际主义启发的 [展览/课程] 页面。先建立标题、日期、地点、分类和行动层级，再用桌面12栏、32px间距、手机单列落地。纸白背景、炭黑正文、单一信号红；采用本地系统无衬线字体，最多两个字重。首屏是非对称的大标题和一幅原创抽象节奏图；后续用横向编号日程而非圆角卡片。提供有aria-pressed的分类筛选、结果计数和可取消的本地收藏。至少三个内容章节。保留常规滚动、可见键盘焦点、中文可读正文与reduced-motion降级。参考Swissted与Müller-Brockmann的排版逻辑，不复制商标、海报或宣称字体与原作相同。\n\n要素协调要求：标题尺度、对齐线、间距和日期位置重复形成秩序；红色只是集中强调，不能代替信息层级。",
    "negativePrompt": "不要玻璃拟态、渐变霓虹、满屏圆角卡片、横向滚动劫持、裁切中文标题；不要将Helvetica当作Swiss的唯一字体或混用包豪斯形色定律。",
    "demo": "demos/swiss-grid/index.html",
    "preview": "previews/swiss-grid.jpg",
    "research": "research/swiss-grid.md",
    "exercise": "将日程从 4 项扩展为 12 项，增加地点筛选，同时保持标题、日期和行动的对齐线。",
    "composition": {
      "color": "暖白纸面、黑色信息与少量红色海报形成清晰层级。",
      "typography": "Arial / Microsoft YaHei；标题 48–128px，正文 16–18px，元数据 12–14px",
      "layout": "12 栏、32px 基础间距、横向日程列表；手机为单列",
      "imagery": "海报图形提供节奏，日程文字与日期才是主要内容。",
      "shape": "直线、圆环和非对称版面服从信息网格；不用装饰性圆角。",
      "hierarchy": "展览主题 → 日期地点 → 分类日程 → 理念。",
      "motion": "按钮 160ms 颜色变化；prefers-reduced-motion 禁用平滑滚动",
      "coherence": "标题尺度、对齐线、间距和日期位置重复形成秩序；红色只是集中强调，不能代替信息层级。"
    }
  },
  {
    "id": "bauhaus-geometry",
    "order": 12,
    "title": "包豪斯：几何与实验",
    "subtitle": "Bauhaus Dessau / Kandinsky 课程 → 可操作的构成工坊",
    "category": "经典风格",
    "tags": [
      "包豪斯",
      "几何",
      "原色",
      "构成",
      "工坊",
      "材料"
    ],
    "summary": "以圆、三角、矩形、色彩关系和材料实验组织一个可操作的设计工坊。几何形状有构成任务，包豪斯并不等于随意贴满红黄蓝。",
    "accent": "#d93929",
    "background": "#eee8d8",
    "principles": [
      "把基础形态作为观察比例、平衡和张力的工具。",
      "视觉实验与实际操作相连：形状既是展示物，也是用户可调整的对象。",
      "有限的原色和黑色建立关系；留白承担构成的呼吸。",
      "保持艺术、材料、制作之间的联系，不将历史课程简化为固定装饰模板。"
    ],
    "productFocus": "虚构 Form/03 工坊直接让用户切换构成、调整旋转并导出自己的SVG，再介绍纸、木、金属的工作坊课程。",
    "interaction": [
      "三个构成预设改变圆、三角和矩形之间的真实位置关系。",
      "原生范围控件可用键盘旋转三角形并即时显示角度。",
      "导出按钮下载当前原创构成的SVG文件。",
      "材料课程使用原生details展开具体学习内容。"
    ],
    "theme": "温暖纸底、红黄蓝黑的平面构成；大字与巨大几何互相制衡，强调制作的过程。",
    "constraints": [
      "红方、黄三角、蓝圆是Kandinsky课程的一种历史性对应，不是科学验证的通用用户心理规则。",
      "包豪斯存在不同教师和阶段；本例聚焦基础形色课程，不宣称代表整个运动。",
      "所有几何形均为原创SVG，不复制馆藏练习。",
      "圆/三角/矩形承担平衡和张力，不能阻挡可读文字或操作区。",
      "手机将构成和控制纵向排列；范围输入、按钮和details都可键盘使用。"
    ],
    "useCases": [
      "设计教育",
      "工作坊",
      "创意工具",
      "艺术展览",
      "材料实验室"
    ],
    "avoid": [
      "把包豪斯等同瑞士编辑网格",
      "无功能的随机原色装饰",
      "将形色对应描述为普遍心理定律"
    ],
    "tokens": {
      "palette": [
        "#eee8d8",
        "#151515",
        "#d93929",
        "#e4ba2b",
        "#2458a5"
      ],
      "type": "Arial / Microsoft YaHei；紧凑大字64–120px，功能文字15–18px",
      "layout": "非对称二分构成、跨栏文字与图形；后续为材料长条",
      "motion": "构成预设220ms过渡；reduced-motion关闭过渡"
    },
    "sources": [
      {
        "title": "Bauhaus Dessau — 官方首页",
        "url": "https://bauhaus-dessau.de/en/welcome/",
        "type": "实例",
        "note": "2026-10-07阅读：展览信息结合图形、日期、场所、票务与无障碍入口；不冒称本demo复刻官网。"
      },
      {
        "title": "Bauhaus Kooperation — Kandinsky 的基础课程",
        "url": "https://bauhauskooperation.de/wissen/das-bauhaus/lehre/unterricht/unterricht-wassily-kandinsky",
        "type": "理论",
        "note": "档案说明颜色与形状课程、分析性绘画和形色对应的争议；用于基础构成的理论边界。"
      },
      {
        "title": "IBM Carbon — 2x Grid",
        "url": "https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview",
        "type": "规范",
        "note": "用关键对齐线与响应式重排保证页面可读；这一当代实现方法不是包豪斯的历史专属规则。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构品牌 [品牌] 的设计工坊制作包豪斯基础形色课程启发的网页。聚焦几何关系和实际制作，背景温暖纸色，以红、黄、蓝、炭黑为有限色板。首屏采用非对称文字/构成两区，大标题保持正常可读；右侧原创SVG包含圆、三角、矩形、线条。提供三组明确的构成预设、原生range旋转控件、实时角度文字以及下载当前SVG的导出动作。后续至少两节分别介绍材料课程与制作方法，以横向条目/details组织，避免圆角卡片堆砌。手机图文纵向重排，键盘可操作，尊重reduced-motion。明确这是Bauhaus形色课程的局部现代迁移，不能把Kandinsky的形色对应宣称为科学定律，也不要复制任何馆藏练习。\n\n要素协调要求：形色实验与排版共享比例关系；每个色块承担构成任务，不能把原色和几何物随机铺满。",
    "negativePrompt": "不要把红黄蓝随机撒满画面，不要声称包豪斯只包含圆三角方形，不要给文字加3D阴影或霓虹，不要让几何覆盖按钮；不要只换颜色却不改变构成。",
    "demo": "demos/bauhaus-geometry/index.html",
    "preview": "previews/bauhaus-geometry.jpg",
    "research": "research/bauhaus-geometry.md",
    "exercise": "加入第二组不使用原色的材料色板，检验相同几何关系是否仍能表达平衡与张力。",
    "composition": {
      "color": "红、蓝、黄色块以面积与位置建立张力，黑色文字保持稳定。",
      "typography": "Arial / Microsoft YaHei；紧凑大字64–120px，功能文字15–18px",
      "layout": "非对称二分构成、跨栏文字与图形；后续为材料长条",
      "imagery": "可操作几何画布让“构成实验”成为具体内容。",
      "shape": "圆环、方块和三角通过位置、比例及旋转表达不同构成。",
      "hierarchy": "形与功能主张 → 可操作构成 → 材料课程 → 制作理念。",
      "motion": "构成预设220ms过渡；reduced-motion关闭过渡",
      "coherence": "形色实验与排版共享比例关系；每个色块承担构成任务，不能把原色和几何物随机铺满。"
    }
  },
  {
    "id": "retro-80s",
    "order": 13,
    "title": "80年代：合成器面板",
    "subtitle": "Arturia Jup-8 V / Jupiter-8 → 手感与信号流程",
    "category": "经典风格",
    "tags": [
      "80年代",
      "复古",
      "合成器",
      "拟物",
      "音频",
      "设备面板"
    ],
    "summary": "限定为1980年代模拟合成器设备的现代复古方向：哑光深色机身、功能分区、彩色标识、读数屏和直接操作。不是对整个80年代视觉文化的概括。",
    "accent": "#f18a4b",
    "background": "#182329",
    "principles": [
      "先组织信号流程与演奏任务，再设计面板质感。",
      "物理控件的空间邻近关系解释功能，参数分区保持可见。",
      "有限橙/青/米白作功能编码，复古感来自设备逻辑而非满屏霓虹。",
      "预设降低初次使用成本，具体参数允许进一步探索。"
    ],
    "productFocus": "虚构 Nightshift 合成器以可演奏的单振荡器 Web Audio demo证明交互价值：选预设、调整滤波/包络/音量、用屏幕琴键或键盘演奏。",
    "interaction": [
      "只有主动开启声音后才初始化Web Audio；可随时关闭。",
      "三种预设确实改变波形、滤波与包络参数。",
      "原生范围输入即时改变Cutoff、Attack、Output并更新读数。",
      "屏幕琴键为可聚焦按钮；A S D F G H J K 可演奏白键，切出页面时停止声音。"
    ],
    "theme": "炭灰/海军灰哑光面板、暖白标签、橙色分区线、低亮度青色波形显示；虚构夜间音乐工作室。",
    "constraints": [
      "仅聚焦1981 Jupiter-8启发的合成器面板，不将其代表整个80年代。",
      "官方2014手册描述的是旧版Arturia界面；用于历史面板结构证据，不冒称当前软件全部细节。",
      "demo 是单振荡器简化合成器，不能宣称精确模拟Jupiter-8音色或8复音。",
      "读数、滑块、预设都有文本标签，不只用颜色表达状态。",
      "声音默认关闭；无自动播放、原歌曲或外部音频素材。",
      "窄屏分区纵向重排；控件点击区至少44px，动态波形尊重reduced-motion。"
    ],
    "useCases": [
      "音频工具",
      "乐器宣传",
      "可试玩产品",
      "音乐工作室",
      "复古设备展示"
    ],
    "avoid": [
      "用霓虹地平线解释所有80年代",
      "不可操作的假旋钮",
      "过亮扫描线遮盖文字",
      "未经操作自动播放声音"
    ],
    "tokens": {
      "palette": [
        "#182329",
        "#303c42",
        "#ede7d3",
        "#f18a4b",
        "#78bca8"
      ],
      "type": "Arial标题、Courier New参数读数；标题72–100px，标签12–14px",
      "layout": "硬件面板横向分区、预设/显示/参数/琴键；手机纵向排列",
      "motion": "按键激活与读数同步；低动态偏好保持静态波形，声音仍由用户控制"
    },
    "sources": [
      {
        "title": "Arturia — Jup-8 V 官方产品页",
        "url": "https://www.arturia.com/products/software-instruments/jup-8-v/overview",
        "type": "实例",
        "note": "2026-10-07阅读：以乐器声音、原始设备传承、直接控件和现代预设突出产品；页面说明原乐器1981年推出。"
      },
      {
        "title": "Arturia Jupiter-8V 官方手册（2014年版）",
        "url": "https://downloads.arturia.com/products/jupiter8-v/manual/Jupiter-8V_Manual_2_6_0_EN.pdf",
        "type": "规范",
        "note": "第59–60页（PDF索引58–59）说明原始界面/预设/扩展/效果分区及振荡器；本例据此组织简化信号流程。"
      },
      {
        "title": "MDN — Web Audio API",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API",
        "type": "规范",
        "note": "浏览器音频节点图与参数实现依据； demo 通过用户操作初始化AudioContext。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构音频品牌 [品牌] 制作1980年代模拟合成器设备启发的可试玩宣传页。参考Arturia Jup-8 V的实体面板逻辑，采用哑光海军灰/炭灰、暖白标字、橙色分区、青色低亮读数。首屏让真实可操作面板成为主角：预设列表、波形显示、带数值标签的Cutoff/Attack/Output原生滑块、可聚焦琴键。实现原创单振荡器Web Audio，三个预设改变波形和参数；默认静音，主动开启后才演奏，可关闭。提供A–K白键键盘演奏，失焦停止声音。后续至少两节说明信号流程与预设用途，采用设备手册式排版。手机面板分区纵向重排、每控件至少44px、避免只有颜色的状态、尊重reduced-motion。不复制商标、音色或音乐，不声称模拟Jupiter-8全部电路，也不以霓虹网格代表所有80年代。\n\n要素协调要求：等宽标签、功能分区、彩色标识和直接反馈构成同一种设备语言；装饰必须对应可操作控制。",
    "negativePrompt": "不要假旋钮、无效播放按钮、自动音频、版权曲目、巨量霓虹、反复闪烁扫描线；不要宣称8复音或精确模拟不存在的功能。",
    "demo": "demos/retro-80s/index.html",
    "preview": "previews/retro-80s.jpg",
    "research": "research/retro-80s.md",
    "exercise": "增加一个真正可编辑的8步音序器；让步骤、速率与播放状态在视觉和声音上同步。",
    "composition": {
      "color": "暗青灰模拟设备面板，橙色标记预设与分区，绿色模拟读数屏。",
      "typography": "Arial标题、Courier New参数读数；标题72–100px，标签12–14px",
      "layout": "硬件面板横向分区、预设/显示/参数/琴键；手机纵向排列",
      "imagery": "原创合成器面板、波形屏与琴键解释真实信号流程。",
      "shape": "矩形功能模块、设备边缘与机械刻度形成硬件触感。",
      "hierarchy": "声音目标 → 面板操作 → 信号流程 → 预设解释。",
      "motion": "按键激活与读数同步；低动态偏好保持静态波形，声音仍由用户控制",
      "coherence": "等宽标签、功能分区、彩色标识和直接反馈构成同一种设备语言；装饰必须对应可操作控制。"
    }
  },
  {
    "id": "pixel-world",
    "order": 14,
    "title": "像素：微型世界",
    "subtitle": "Celeste / PICO-8 / Saint11 → 地图驱动的探索页面",
    "category": "经典风格",
    "tags": [
      "像素",
      "游戏",
      "PICO-8",
      "地图",
      "探索",
      "有限色板"
    ],
    "summary": "以低分辨率、有限色板、清晰轮廓和可探索的场景建立主题。像素是有意识的图形结构，不是把照片缩小模糊后再放大。",
    "accent": "#ffccaa",
    "background": "#1d2b53",
    "principles": [
      "先定义像素尺度与色板，再绘制地形、物件和角色。",
      "轮廓、明暗与空间关系在小画布内必须可辨认。",
      "世界场景承担导航，常规文字承担说明，控制复杂度。",
      "探索操作、角色位置和地点信息保持一致，避免只有装饰的地图。"
    ],
    "productFocus": "虚构 Tiny Tides 岛屿用原创128×128地图介绍四个地点；点击地点或移动角色时更新场景信息，发现进度和旅行手账可保存。",
    "interaction": [
      "地点按钮移动角色并更新当前地点介绍。",
      "地图聚焦后用方向键/WASD移动；手机可用方向按钮。",
      "靠近地点会记录发现进度，按钮状态不只通过颜色表达。",
      "手账仅保存当前浏览器，支持清除并重新探索。"
    ],
    "theme": "深蓝海面、温暖沙滩、块状树林、小灯塔；像素图形与清晰中文旅行记录结合的轻探索体验。",
    "constraints": [
      "PICO-8的128×128/16色是这个实例的明确创作约束，不是所有像素艺术的定义。",
      "本地图使用16色原生PICO-8色板和整数像素绘制；桌面用整数倍率，窄屏优先完整显示。",
      "Canvas放大使用image-rendering:pixelated；禁止图片模糊插值。",
      "关键地点有可聚焦DOM按钮与文本说明，不只隐藏在Canvas里。",
      "长文使用可读系统字体，不能把业务信息全部压成像素小字。",
      "无角色原作素材、复杂游戏引擎或音频自动播放；降低动态偏好时取消非必要动画。"
    ],
    "useCases": [
      "独立游戏宣传",
      "互动作品集",
      "小型IP世界介绍",
      "趣味导航",
      "探索式知识页面"
    ],
    "avoid": [
      "模糊或混合不一致像素尺度",
      "只有Canvas且无键盘/文本入口",
      "把PICO-8限制推广为所有像素艺术的规则"
    ],
    "tokens": {
      "palette": [
        "#1d2b53",
        "#29adff",
        "#008751",
        "#00e436",
        "#ffccaa",
        "#fff1e8",
        "#ffa300",
        "#5f574f"
      ],
      "type": "Courier New用于英文界面；中文Microsoft YaHei，正文15–17px",
      "layout": "地图主区域 + 旅行记录侧栏；手机地图上、记录下；后续地点索引与玩法说明",
      "motion": "移动以tile步进、静态地图；reduced-motion保留即时状态更新"
    },
    "sources": [
      {
        "title": "Celeste 官方网站",
        "url": "https://www.celestegame.com/",
        "type": "实例",
        "note": "2026-10-07阅读：围绕登山旅程、游戏预告和平台入口建立明确世界与产品行动；不复制其角色或场景。"
      },
      {
        "title": "PICO-8 Fantasy Console — Lexaloffle",
        "url": "https://www.lexaloffle.com/pico-8.php",
        "type": "实例",
        "note": "官网规定128×128显示、16色、8×8精灵等约束，并说明有限设计的表达价值。"
      },
      {
        "title": "PICO-8 官方手册",
        "url": "https://www.lexaloffle.com/dl/docs/pico-8_manual.html",
        "type": "规范",
        "note": "使用其明确的整数像素/16色色板/8×8 tile模型作为本demo局部创作约束。"
      },
      {
        "title": "Saint11 — Pixel Art Tutorials",
        "url": "https://saint11.art/blog/pixel-art-tutorials/",
        "type": "理论",
        "note": "Celeste官网列出的像素美术师Pedro Medeiros的公开教程，为轮廓、有限色彩和逐像素思考提供实践参考。"
      },
      {
        "title": "MDN — image-rendering",
        "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/image-rendering",
        "type": "规范",
        "note": "说明pixelated/crisp-edges的缩放行为；本例Canvas使用pixelated保留边缘。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构小型IP [品牌] 制作地图驱动的像素风介绍页。参考PICO-8的128×128、16色、8×8tile创作约束，自绘一个可辨认轮廓的岛屿世界；禁止复制Celeste或其他游戏角色/背景。使用Canvas整数像素绘制并用image-rendering:pixelated放大，桌面尽量整数倍率，手机完整显示地图。首屏地图为主，旅行手账为辅：四个可聚焦DOM地点按钮、实时地点说明、角色位置与发现计数，方向键/WASD仅在地图聚焦时生效，手机提供四向按钮。探索记录可存当前浏览器并可清除。后续至少两節为地点索引与玩法说明；中文正文使用正常可读系统字体，英文元数据可用等宽字。没有自动音频、闪烁扫描线或滚动劫持，尊重reduced-motion。注明这是PICO-8约束的局部迁移，而不是所有像素艺术的定义。\n\n要素协调要求：低分辨率地景、有限调色与清楚状态共同形成游戏感；中文说明保留正常可读字体，不强行像素化。",
    "negativePrompt": "不要平滑缩放像素图、随机混合像素尺度、把照片马赛克当作像素美术、隐藏于Canvas的唯一导航、不可读中文小字或自动播放音效。",
    "demo": "demos/pixel-world/index.html",
    "preview": "previews/pixel-world.jpg",
    "research": "research/pixel-world.md",
    "exercise": "为岛屿添加一个夜间色板，在不增加第17种颜色的前提下保持地标与路径可辨认。",
    "composition": {
      "color": "有限16色调色板，以土色、草绿和水蓝区分离散地图区域。",
      "typography": "Courier New用于英文界面；中文Microsoft YaHei，正文15–17px",
      "layout": "地图主区域 + 旅行记录侧栏；手机地图上、记录下；后续地点索引与玩法说明",
      "imagery": "128×128原生Canvas与原创像素地点构成可探索世界。",
      "shape": "离散方格、阶梯边缘与像素按钮保持同一尺度体系。",
      "hierarchy": "世界地图 → 地点索引 → 步进操作 → 探索手账。",
      "motion": "移动以tile步进、静态地图；reduced-motion保留即时状态更新",
      "coherence": "低分辨率地景、有限调色与清楚状态共同形成游戏感；中文说明保留正常可读字体，不强行像素化。"
    }
  },
  {
    "id": "chatgpt-platform",
    "order": 15,
    "title": "ChatGPT — 三合一巨字叙事",
    "subtitle": "Chat, work and code in one place",
    "category": "产品",
    "country": "美国",
    "tags": [
      "ChatGPT",
      "OpenAI",
      "真实品牌",
      "中文巨字",
      "产品截图",
      "三能力切换"
    ],
    "summary": "按实访中文公开介绍页重建五行巨字、聊天/工作/编程切换与渐变下线，再用官方真实界面说明三类能力。",
    "accent": "#00a6d3",
    "background": "#ffffff",
    "principles": [
      "主标题本身承担功能选择，减少独立解释组件。",
      "大留白与近黑文字形成主体，色彩仅强调当前能力。",
      "三类能力用真实应用界面证明，而不是AI抽象符号。",
      "胶囊按钮与低对比导航把重心留给产品叙事。"
    ],
    "productFocus": "围绕Chat、Work、Codex三合一展开：日常对话、可交付工作成果、代码改动评审。",
    "interaction": [
      "主标题三动作与下方tabs联动，切换文案和实际产品图。",
      "产品图可放大；四种用途展开和本地示例弹窗展示不同回应，可复制。",
      "顶部功能/学习菜单可展开，登录、注册、定价与下载提供本地反馈和官方入口。"
    ],
    "theme": "白底黑字、五行巨字、局部紫青渐变与彩色底线、黑色环、圆胶囊按钮。",
    "constraints": [
      "明确公开营销页URL，不使用已登录账号界面。",
      "以中文实访版本为基准，不复用旧版prompt输入框首页。",
      "官方OpenAI Sans中文Unicode分片完整保留、本地下载。",
      "品牌结标与字标使用官网原样SVG，不重新绘制。",
      "所有回复为本地固定示例，不宣称AI实时回答。"
    ],
    "useCases": [
      "多能力AI产品介绍",
      "功能转向的品牌叙事",
      "中文字体与超大排版研究"
    ],
    "avoid": [
      "把ChatGPT首页想象为一张聊天输入框",
      "随意改造OpenAI结标",
      "所有功能只用渐变blob表现"
    ],
    "tokens": {
      "palette": [
        "#070707",
        "#ffffff",
        "#f5f5f5",
        "#c4a4f2",
        "#00a6d3"
      ],
      "type": "官方 OpenAI Sans SC 4个Unicode分片及英文字体；中文主标题89px、5行、紧行距。",
      "layout": "64px导航；居中5行巨字/黑环/CTA；3能力切换图；用途左右列表；隐私两列。",
      "motion": "能力点击直接联动，自然滚动；局部渐变保持静态，reduced motion禁用过渡。"
    },
    "composition": {
      "color": "白底黑字、五行巨字、局部紫青渐变与彩色底线、黑色环、圆胶囊按钮。",
      "typography": "官方 OpenAI Sans SC 4个Unicode分片及英文字体；中文主标题89px、5行、紧行距。",
      "layout": "64px导航；居中5行巨字/黑环/CTA；3能力切换图；用途左右列表；隐私两列。",
      "imagery": "89px/5行 + 原始字标与SC字体；点击主标题与tabs联动官方Chat/Work/Code图；四种用途列表+本地固定示例",
      "shape": "圆胶囊按钮、黑色环与直线渐变下划线、圆角界面图。",
      "hierarchy": "围绕Chat、Work、Codex三合一展开：日常对话、可交付工作成果、代码改动评审。",
      "motion": "能力点击直接联动，自然滚动；局部渐变保持静态，reduced motion禁用过渡。",
      "coherence": "字体、色彩、素材、信息结构与ChatGPT公开页一致；首屏有实访截图依据；后续结构依据第一方正文与真实公开素材，未逐屏截图所有章节。菜单、放大和本地示例是可用的局部学习机制，不声明与服务端完全一致。价格、安全文章与完整故事画廊未全量复现。"
    },
    "sources": [
      {
        "title": "ChatGPT 中文公开介绍页",
        "url": "https://chatgpt.com/zh-Hans-CN/overview/",
        "type": "实例",
        "note": "Root CUA/IAB实访保存1280x720首屏，中文5行巨字、3动作、黑环与CTA。"
      },
      {
        "title": "ChatGPT 英文介绍内容",
        "url": "https://chatgpt.com/overview/",
        "type": "实例",
        "note": "第一方正文核验Chat/Work/Codex和能力架构；与中文页面属于同日公开版本。"
      },
      {
        "title": "OpenAI Design Guidelines",
        "url": "https://openai.com/brand/",
        "type": "规范",
        "note": "字标比例、留白及品牌归属；官网解释OpenAI Sans几何与人文语气。"
      },
      {
        "title": "WAI Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "能力选择的aria-selected、方向键与键盘焦点参考。"
      }
    ],
    "prompt": "根据【ChatGPT公开介绍页URL】在【观察日期】的中文实访截图制作局部学习还原，禁止使用登录后的账号页面。保持64px轻导航、官方完整结标字标、89px左右中文五行巨字、聊天/工作/编程三个可操作词、选中词紫青渐变及彩色底线、下方黑环与黑色CTA。使用原样官方SVG和本地OpenAI Sans SC四片字体，保留每片Unicode范围，避免系统字体使断行变样。主标题选择与下方三能力tabs同步，显示对应官方真实Chat/Work/Codex界面，提供放大和键盘方向键。用途区采用展开列表与产品图的左右组合，示例弹窗使用固定本地内容并明确不调用AI。导航、下载、登录按钮必须有可见本地反馈和官网入口。手机保持清晰断行、菜单可用、焦点可见、自然滚动、reduced motion。保存素材清单与局部还原差异，复用于【目标AI产品】时重新核验真实能力与叙事顺序。",
    "negativePrompt": "不要虚构品牌或素材；不要复制通用Hero+三卡片模板；不要用抽象blob替代真实产品界面；不要接管滚轮；不要把历史文章说成当前观察；不要伪装真实账户、支付或AI执行。",
    "demo": "demos/chatgpt-platform/index.html",
    "preview": "previews/chatgpt-platform.jpg",
    "research": "research/chatgpt-platform.md",
    "exercise": "以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。",
    "referenceUrl": "https://chatgpt.com/zh-Hans-CN/overview/",
    "implementation": "reference-study",
    "fidelity": "demos/chatgpt-platform/fidelity.md",
    "assetManifest": "demos/chatgpt-platform/assets-manifest.json",
    "referencePreview": "research/screenshots/chatgpt-platform-source.jpg"
  },
  {
    "id": "claude-platform",
    "order": 16,
    "title": "Claude — 衬线语气与 Cowork 演示",
    "subtitle": "Think fast, build faster",
    "category": "产品",
    "country": "美国",
    "tags": [
      "Claude",
      "Anthropic",
      "真实品牌",
      "衬线",
      "视频",
      "套餐切换"
    ],
    "summary": "复现 Claude 公开营销页的衬线标题、左侧注册入口与右侧官方 Cowork 视频，并实现套餐和FAQ交互。",
    "accent": "#d97757",
    "background": "#f5f5ef",
    "principles": [
      "衬线大标题建立思考伙伴的语气，产品视频承接实际工作。",
      "注册框在首屏即可辨识，操作层级集中而短。",
      "温暖中性色与陶土品牌符号组合，保持低饱和。",
      "套餐切换和FAQ减少一次性信息负担。"
    ],
    "productFocus": "首屏把chat思考与Cowork执行并列，右栏完整真实产品视频直接显示功能；下方套餐按个体和组织区分。",
    "interaction": [
      "Continue with email展开本地邮箱表单，提交只给模拟反馈。",
      "官方视频默认静音，可播放暂停；reduced motion默认暂停。",
      "Individual/Team and Enterprise切换套餐，年/月账期更改Pro价格；FAQ原生展开。"
    ],
    "theme": "奶油浅底、Anthropic Serif大标题、Sans操作文字、黑色按钮、陶土色品牌符号、圆角视频。",
    "constraints": [
      "公开claude.com版本为基准，不读取claude.ai已登录账户。",
      "使用实际官网字标、Anthropic字体和Cowork视频。",
      "初次Edge观察受扩展变色影响，已由Root IAB补清洁公开官网截图；本地配色依据该截图与官网原始样式。",
      "邮箱输入只在浏览器内，不发送、不创建账户。",
      "套餐为2026-10-07快照，实际价格通过官方入口查看。"
    ],
    "useCases": [
      "思考与执行并重的AI产品",
      "人文语气软件营销",
      "首屏转化与真实演示组合"
    ],
    "avoid": [
      "衬线标题配泛用霓虹blob",
      "把第三方传闻当官网设计理论",
      "模拟Google认证或真实支付"
    ],
    "tokens": {
      "palette": [
        "#f5f5ef",
        "#141413",
        "#d97757",
        "#faf9f5",
        "#8c8c80"
      ],
      "type": "本地官网Anthropic Serif/Sans；72px主标题、24px副文、15–17px操作。",
      "layout": "1440px上限；左思考/注册卡 + 右大型Cowork视频；3列套餐；左右FAQ。",
      "motion": "官方视频静音循环并可暂停；套餐和FAQ直接切换，无滚轮劫持。"
    },
    "composition": {
      "color": "奶油浅底、Anthropic Serif大标题、Sans操作文字、黑色按钮、陶土色品牌符号、圆角视频。",
      "typography": "本地官网Anthropic Serif/Sans；72px主标题、24px副文、15–17px操作。",
      "layout": "1440px上限；左思考/注册卡 + 右大型Cowork视频；3列套餐；左右FAQ。",
      "imagery": "真实AnthropicSerif、72px、注册卡/视频左右结构；email按钮切换表单、有效邮箱后本地反馈；受众/账期切换、原生details",
      "shape": "30px注册框、17px视频、圆胶囊tabs、18px计划卡。",
      "hierarchy": "首屏把chat思考与Cowork执行并列，右栏完整真实产品视频直接显示功能；下方套餐按个体和组织区分。",
      "motion": "官方视频静音循环并可暂停；套餐和FAQ直接切换，无滚轮劫持。",
      "coherence": "字体、色彩、素材、信息结构与Claude公开页一致；没有复现服务器认证、SSO、真正下载或订阅。视频为官方本地文件；reduced-motion暂停时没有原站视频poster，保留首帧。完整企业产品导航与所有FAQ未全量复制。"
    },
    "sources": [
      {
        "title": "Claude 公开官网",
        "url": "https://claude.com/",
        "type": "实例",
        "note": "2026-10-07 CUA首屏及匿名HTML核验，Think fast/build faster、Cowork视频、Individual/Team计划。"
      },
      {
        "title": "WAI Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "套餐受众切换的选择态和方向键参考。"
      },
      {
        "title": "WAI Accordion Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/",
        "type": "规范",
        "note": "FAQ展开、键盘操作和状态表达依据；本地采用原生details。"
      }
    ],
    "prompt": "以【claude.com公开营销页URL】在【观察日期】的真实首屏为依据做局部学习复现，不读取登录账户。保持温暖奶油底、72px Anthropic Serif标题、Sans操作文字，左栏思考主张与圆角注册卡，右栏大型官方Cowork演示视频。品牌SVG不重绘，字体视频均下载本地并记录URL、尺寸与归属。邮箱按钮可展开本地表单和返回，提交只显示不会发送的预览反馈；Google/登录入口不伪装认证。视频静音循环、有暂停，reduced motion默认暂停。下方Individual和Team/Enterprise切换不同套餐布局，年/月账期改变Pro展示，FAQ用可键盘展开的details。手机先文字后视频，注册框保留宽度与层级，导航折叠菜单、焦点明确、自然滚动。将观察、分析推断与W3C交互规范分开，明确未实现的SSO/付款/服务端能力。用于【目标AI品牌】时依据其真实语气选择字体而非机械套衬线。",
    "negativePrompt": "不要虚构品牌或素材；不要复制通用Hero+三卡片模板；不要用抽象blob替代真实产品界面；不要接管滚轮；不要把历史文章说成当前观察；不要伪装真实账户、支付或AI执行。",
    "demo": "demos/claude-platform/index.html",
    "preview": "previews/claude-platform.jpg",
    "research": "research/claude-platform.md",
    "exercise": "以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。",
    "referenceUrl": "https://claude.com/",
    "implementation": "reference-study",
    "fidelity": "demos/claude-platform/fidelity.md",
    "assetManifest": "demos/claude-platform/assets-manifest.json",
    "referencePreview": "research/screenshots/claude-platform-source.jpg"
  },
  {
    "id": "qoder-platform",
    "order": 17,
    "title": "Qoder — 绿色工作台与多形态平台",
    "subtitle": "An agentic platform for everyone",
    "category": "产品",
    "country": "中国",
    "tags": [
      "Qoder",
      "真实品牌",
      "绿色",
      "智能体",
      "桌面工作台",
      "多平台"
    ],
    "summary": "以Qoder中国站公开主页为首屏参考，复现左侧双行标题、右侧说明、全幅强绿工作台背景与Qoder CN字标；后续五形态为能力机制的局部研究。",
    "accent": "#2c8061",
    "background": "#ffffff",
    "principles": [
      "主标题与说明分居两侧，产品工作台成为最主要的视觉证据。",
      "绿色大面承托真实桌面界面，品牌色与代码任务保持区分。",
      "桌面/移动/IDE/插件/CLI并列呈现不同使用入口。",
      "智能体协作以分工和流程说明，不能只用抽象节点图。"
    ],
    "productFocus": "先展示桌面工作台的任务、项目和上下文，再让用户选择五种使用形态，突出从想法到可交付成果的完整工作循环。",
    "interaction": [
      "编码/通用模式切换改变标题、提示与任务语境。",
      "输入任务并提交给出本地执行预览，侧栏入口和新工作区有反馈。",
      "五种平台tabs同步切换说明、官方图与预览；协作流程可展开；下载弹窗可选择OS。"
    ],
    "theme": "中国站淡灰绿页面、满幅强绿工作台背景、白色产品UI和绿色胶囊下载按钮。",
    "constraints": [
      "country用于中文/中国参考分组，不作为司法注册地断言。",
      "真实Qoder标识与平台图本地保存，不自行画替代logo。",
      "任务与智能体只做固定本地预览，不声称调用模型。",
      "手机核心界面重新排版，隐藏原桌面次级侧栏。",
      "首屏观察是2026-10-07中文版本；活动和平台能力为日期快照。"
    ],
    "useCases": [
      "多形态开发平台",
      "智能体工作台",
      "IDE与CLI联合宣传"
    ],
    "avoid": [
      "把所有AI工具都做成深蓝霓虹页",
      "平台tabs只改颜色不换内容",
      "把本地演示装成在线模型执行"
    ],
    "tokens": {
      "palette": [
        "#ffffff",
        "#141414",
        "#2c8061",
        "#dff5b9",
        "#f3f6ed"
      ],
      "type": "原站Instrument Sans观察，当前本地使用Arial/Microsoft YaHei回退；中文标题36px、说明16px。",
      "layout": "1680px上限；左标题/右副文；大面软件窗口；5tabs+左右产品；智能体协作/企业三项。",
      "motion": "自然滚动、直接状态变化，装饰线静态；无自动旋转或滚动劫持。"
    },
    "composition": {
      "color": "CN原站以淡灰绿顶层和满幅强绿约#80c777作工作台底景，绿色CTA与白色应用UI保持对比。",
      "typography": "原站Instrument Sans观察，当前本地使用Arial/Microsoft YaHei回退；中文标题36px、说明16px。",
      "layout": "66px导航、约110px起左侧标题/右侧说明、约332px起满幅强绿工作台；后续平台和协作区明确为局部研究。",
      "imagery": "36px标题、满幅强绿背景内桌面工作区；平台tab和官方SVG/移动截图；本地任务回执、协作展开",
      "shape": "25px下载胶囊、8px大面/窗口、细边框工作台。",
      "hierarchy": "先展示桌面工作台的任务、项目和上下文，再让用户选择五种使用形态，突出从想法到可交付成果的完整工作循环。",
      "motion": "自然滚动、直接状态变化，装饰线静态；无自动旋转或滚动劫持。",
      "coherence": "字体、色彩、素材、信息结构与Qoder公开页一致；未取得Instrument Sans字体文件，明确使用系统字体回退。官方平台SVG是背景插画，产品窗口是本地DOM局部复建；未覆盖原站完整Agent SDK、QoderWake、全部案例和企业条款。country仅为中文参考归类。"
    },
    "sources": [
      {
        "title": "Qoder 中国站官方网站",
        "url": "https://qoder.cn/",
        "type": "实例",
        "note": "2026-10-07 Root通过国际站可见Visit China Site入口实访CN站并保存干净源截图；本例首屏统一中国版：无促销/Qwen条，Qoder CN字标和满幅强绿工作台。"
      },
      {
        "title": "Qoder 产品族官方定义",
        "url": "https://docs.qoder.com/product-series/what-is-qoder",
        "type": "理论",
        "note": "第一方文档说明理解/计划/执行/验证/迭代与多形态产品族；属于产品理论，不是假称官网视觉作者意图。"
      },
      {
        "title": "WAI Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "模式与平台切换的语义、选择状态和键盘方向键参考。"
      }
    ],
    "prompt": "请忠实研究2026-10-07 https://qoder.cn/ 中国站首页，使用实际本地官方Qoder CN黑色PNG字标（1632×344原图显示约123×26px），不放国际版promotion或Qwen标签。页面顶部淡灰绿背景，66px导航，左侧双行36px标题在约110px处开始，胶囊下载按钮靠左，产品说明在右下对齐。桌面约332px起满幅#80c777强绿背景，无圆角或左右外框；工作台应用UI占宽约84.5%，白色主区与浅灰侧栏、有真实任务输入/模式切换/工作区按钮的本地反馈。五平台资料使用已下载官方素材，但须在fidelity说明这些后续区域仅局部内容与机制研究，不宣称是CN版逐像素复制。390px标题/说明堆叠，满幅绿色底景保留，侧栏收束，横向tabs只在自身容器滚动。下载按钮打开明确本地平台选择预览并链接官方CN站，不模拟实际安装和后端执行。支持键盘tabs与Escape关闭，prefers-reduced-motion关闭平滑滚动与过渡。版权和研究注记只放页末。",
    "negativePrompt": "不要虚构品牌或素材；不要复制通用Hero+三卡片模板；不要用抽象blob替代真实产品界面；不要接管滚轮；不要把历史文章说成当前观察；不要伪装真实账户、支付或AI执行。",
    "demo": "demos/qoder-platform/index.html",
    "preview": "previews/qoder-platform.jpg",
    "research": "research/qoder-platform.md",
    "exercise": "以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。",
    "referenceUrl": "https://qoder.cn/",
    "implementation": "reference-study",
    "fidelity": "demos/qoder-platform/fidelity.md",
    "assetManifest": "demos/qoder-platform/assets-manifest.json",
    "edition": "2026-10-07中国站公开主页；后续能力区域为局部机制研究",
    "referencePreview": "research/screenshots/qoder-platform-source.jpg"
  },
  {
    "id": "genshin-world",
    "order": 18,
    "title": "原神 · 版本群像与角色舞台",
    "subtitle": "GENSHIN / VERSION CAMPAIGN",
    "category": "游戏/IP",
    "country": "中国",
    "tags": [
      "原神",
      "米哈游",
      "HoYoverse",
      "版本宣传",
      "群像",
      "角色立绘"
    ],
    "summary": "当前国际官网根入口是7.1专题：深红群像、衬线巨标题，与青绿金边角色舞台形成章节色调转换。",
    "accent": "#b71936",
    "background": "#2a1027",
    "principles": [
      "先核验有效路由；旧 /en/home 与国内 /main/ 不能作为当前页面证据。",
      "首屏多人物满幅主视觉，让版本剧情与角色先于功能文案出现。",
      "深红版本氛围切换到青绿角色页，颜色对应叙事章节。",
      "角色立绘、装饰纹样、星级与圆形选择共同形成游戏界面语汇。"
    ],
    "productFocus": "使用当前官方 A Rekviem for the Underworld 主题标题、真实满幅画面、当前两张角色立绘与活动日历。",
    "interaction": [
      "背景短片可手动暂停，减少动态偏好初始停止。",
      "两张官方角色立绘实际切换，详情按钮打开可关闭对话框。",
      "日历点击放大，下载前往 HoYoPlay 官方入口。"
    ],
    "theme": "深红暗紫群像与青绿、浅金角色舞台；衬线与星芒、圆环、尖角纹样呈现幻想冒险。",
    "constraints": [
      "只复现当前7.1专题的局部区域，不将旧官方404页伪称首页。",
      "品牌美术版权归 HoYoverse/miHoYo，使用范围为用户授权私人研究。",
      "本地主视觉mp4只有3秒且无音轨，不标作原站有声PV。",
      "未完成第二角色文字资料核验时明确边界，不编造姓名或技能。",
      "手机重新排人物和文字，不缩小整张桌面海报。",
      "日历文字来自官方图片，替代文字明确用途并可放大。"
    ],
    "useCases": [
      "大型游戏版本专题",
      "角色更新",
      "IP活动"
    ],
    "avoid": [
      "后台系统",
      "纯文字教程"
    ],
    "tokens": {
      "palette": [
        "#2a1027",
        "#b71936",
        "#229a91",
        "#efd779"
      ],
      "type": "官方大幅衬线主题图，角色名用Georgia；说明用系统无衬线",
      "layout": "全幅群像专题；青绿独立人物舞台；装饰框内活动日历",
      "motion": "官方3秒静音视频可暂停；角色手动切换；对话框原生关闭与Escape。"
    },
    "sources": [
      {
        "title": "Genshin Impact · 当前国际官网根入口",
        "url": "https://genshin.hoyoverse.com/en/",
        "type": "实例",
        "note": "2026-10-07 浏览器确认当前7.1专题、深红群像、青绿角色模块和活动日历；旧 /home 实际404。"
      },
      {
        "title": "W3C · Pause, Stop, Hide",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        "type": "规范",
        "note": "核验持续自动动态的暂停要求；本地背景视频提供可持续暂停按钮，减少动态偏好下初始停止。"
      },
      {
        "title": "W3C · Modal Dialog Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
        "type": "规范",
        "note": "对话框关闭、焦点和键盘语义的参考；demo使用原生dialog。"
      }
    ],
    "prompt": "为【大型游戏版本专题】先实访当前官方有效入口，记录版本、URL和取证日期；不要把过时的/home路由和404作为首页证据。首屏用核验的官方多角色满幅主视觉、深红暗紫版本色、巨幅衬线主题字、独立圆形视频控制、尖角下载按钮与版本号，保留低密度导航。滚动进入一个明确换色的青绿金边角色舞台：右侧巨幅独立立绘，左侧角色名、星级、装饰分隔、详情入口和人物圆形选择，底部下载横条维持产品行动。最后展示官方活动日历，点击可在原生dialog中放大；人物详情同样可关闭并支持Escape。所有图片与实际短片保存本地、记录源URL和尺寸；缺少已核验角色文案时明说局部范围。视频必须可持续暂停且reduced-motion下初始停止；若短片无音轨，不伪装为有声PV，使用真实原站链接。移动端改排人物/正文，控制可触摸，保留自然滚动。输出HTML/CSS/JS、资产manifest、fidelity.md和两尺寸真实预览。",
    "negativePrompt": "不要用蓝色通用SaaS hero替代深红角色群像；不要编造当前角色名、版本或曲目；不要冒充完整官网、领奖、登录或购买流程；不要复制追踪脚本。",
    "demo": "demos/genshin-world/index.html",
    "preview": "previews/genshin-world.jpg",
    "research": "research/genshin-world.md",
    "exercise": "替换为下一次真实版本专题，将主题色、角色、日历同时更新，并记录旧版本与新版本的构成差异。",
    "composition": {
      "color": "深红暗紫群像与青绿、浅金角色舞台；衬线与星芒、圆环、尖角纹样呈现幻想冒险。",
      "typography": "官方大幅衬线主题图，角色名用Georgia；说明用系统无衬线",
      "layout": "全幅群像专题；青绿独立人物舞台；装饰框内活动日历",
      "imagery": "当前官网3秒静音主视觉视频、官方标题/Logo、两张角色立绘、官方日历。",
      "shape": "红色播放圆环、金色菱角按钮、青绿圆轨与装饰分隔组成幻想语汇。",
      "hierarchy": "版本剧情群像 → 下载与版本号 → 角色展示 → 活动日历。",
      "motion": "官方3秒静音视频可暂停；角色手动切换；对话框原生关闭与Escape。",
      "coherence": "色调随版本/角色章节转换，人物图与幻想纹样统一；信息和操作保留清晰的固定层级。"
    },
    "referenceUrl": "https://genshin.hoyoverse.com/en/",
    "implementation": "reference-study",
    "fidelity": "demos/genshin-world/fidelity.md",
    "assetManifest": "demos/genshin-world/assets-manifest.json",
    "referencePreview": "research/screenshots/genshin-world-source.jpg"
  },
  {
    "id": "arknights-world",
    "order": 19,
    "title": "明日方舟 · 工业档案与干员舞台",
    "subtitle": "ARKNIGHTS / RHODES ISLAND ARCHIVE",
    "category": "游戏/IP",
    "country": "中国",
    "tags": [
      "明日方舟",
      "鹰角网络",
      "工业",
      "网格",
      "真实干员",
      "BGM"
    ],
    "summary": "黑灰工业网格、青色索引、超大裁切字、双色人物层与档案导航，把世界观呈现成罗德岛系统。",
    "accent": "#00c4df",
    "background": "#080a0d",
    "principles": [
      "背景视频和超大裁切字建立工业舞台，导航、索引及档案沿网格秩序组织。",
      "同一人物的灰度巨背景和彩色前景产生层次，档案放在黑底阅读区。",
      "青色只承担选中、索引与声音等状态，不铺满所有元素。",
      "世界设定以术语目录组织，视觉氛围进入可查询内容。"
    ],
    "productFocus": "真实官网首屏PV背景、凯尔希/阿米娅/陈双精英阶段立绘、罗德岛阵营符号；官网实际BGM和两名干员日语语音。",
    "interaction": [
      "章节导航与滚动同步右侧索引，保留原生滚动。",
      "三干员选择、双精英阶段实际更换立绘；阿米娅/陈可手动播放官方日语语音。",
      "BGM默认关闭，点击播放/关闭；页面离开前台暂停声音。",
      "世界术语目录同步更新说明，官网下载按钮去实际官方地址。"
    ],
    "theme": "黑灰冷静工业档案，青色状态、细网格、罗德岛符号与超大裁切字；角色彩色图提供情感与焦点。",
    "constraints": [
      "官方素材只作本地私人学习，版权归鹰角网络。",
      "本地保留3名干员，原站有6名；语音覆盖阿米娅/陈，凯尔希语音按钮明确不可用。",
      "剧情介绍使用简短学习摘要，完整文本回原站。",
      "本地CSS源石替代原站WebGL粒子，并明确局部差异。",
      "BGM与角色语音不是同一类型，不混淆曲名或配音。",
      "手机重新排档案和人物，固定索引不能挡住主操作。"
    ],
    "useCases": [
      "工业科幻游戏",
      "战术角色档案",
      "世界设定库"
    ],
    "avoid": [
      "轻松生活方式品牌",
      "高密度交易表单"
    ],
    "tokens": {
      "palette": [
        "#080a0d",
        "#24282d",
        "#00c4df",
        "#eceeef"
      ],
      "type": "大号Arial Black式英文字 + 明确中文档案；小英文索引用系统无衬线",
      "layout": "满屏PV+裁切字首页；左档案/右巨立绘；固定右索引；世界术语目录",
      "motion": "实际官网视频可暂停；手动人物/阶段选择；实际BGM与角色语音默认关闭。"
    },
    "sources": [
      {
        "title": "Hypergryph · 明日方舟官方网站",
        "url": "https://ak.hypergryph.com/",
        "type": "实例",
        "note": "实访首页、OPERATOR与WORLD；核验网格、右索引、凯尔希档案、六术语以及真实 bgm.ea4286.mp3。"
      },
      {
        "title": "W3C · Pause, Stop, Hide",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        "type": "规范",
        "note": "核验持续自动动态的暂停要求；本地背景视频提供可持续暂停按钮，减少动态偏好下初始停止。"
      },
      {
        "title": "W3C · Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "键盘、明确选择状态与内容切换的交互规范参考；demo采用原生按钮/aria-pressed，并提供左右键选择。"
      }
    ],
    "prompt": "为【工业科幻角色游戏】先核验真实官网的首页、干员区与世界设定，保存实访截图与公开素材来源。首屏以官方PV静音视频覆盖全幅，左侧大青色矩形与超大裁切RHODES ISLAND文字，中下部ARKNIGHTS标识、下载纵列和细线分区；顶部双语导航、右侧固定编号索引。干员区以同一官方立绘灰度放大作背景、彩色完整人物作前景，左侧档案包括英文名、中文名、阵营符号、角色配音和黑底简介，底部方形肖像选择，右侧双精英阶段按钮必须实际更换对应图片。随后用六个真实世界术语组成目录与说明，WebGL无法复现时明确局部替代。仅用青色表示选中和状态，正文维持水平、高对比。背景音乐与角色语音须来自实际核验官方文件，默认关闭、点击播放、捕获拒绝、切换人物停止旧语音、离开前台暂停。手机人物在上档案在下、索引收窄、菜单命中区可操作。全部资产本地化，输出独立代码、来源尺寸manifest、fidelity与真实双尺寸截图。",
    "negativePrompt": "不要以普通白色卡片替代工业档案；不要同一立绘换色冒充干员；不要自动出声或伪称曲名；不要把CSS晶体说成完整WebGL；不要复制账号、支付或追踪服务。",
    "demo": "demos/arknights-world/index.html",
    "preview": "previews/arknights-world.jpg",
    "research": "research/arknights-world.md",
    "exercise": "在已授权角色素材不变时，加入一个可查询的干员职业目录，保持工业档案的网格与状态语汇。",
    "composition": {
      "color": "黑灰冷静工业档案，青色状态、细网格、罗德岛符号与超大裁切字；角色彩色图提供情感与焦点。",
      "typography": "大号Arial Black式英文字 + 明确中文档案；小英文索引用系统无衬线",
      "layout": "满屏PV+裁切字首页；左档案/右巨立绘；固定右索引；世界术语目录",
      "imagery": "官方PV04静音视频、3人两精英阶段立绘、肖像与罗德岛标识。",
      "shape": "工业网格、细线目录、方形肖像、青色索引与CSS源石晶体局部替代。",
      "hierarchy": "品牌舞台与下载 → 干员/阶段/声音档案 → 世界术语。",
      "motion": "实际官网视频可暂停；手动人物/阶段选择；实际BGM与角色语音默认关闭。",
      "coherence": "网格、裁切字、索引和档案都表达同一工业系统；灰度背景托住彩色人物，青色只表示操作状态。"
    },
    "referenceUrl": "https://ak.hypergryph.com/",
    "implementation": "reference-study",
    "fidelity": "demos/arknights-world/fidelity.md",
    "assetManifest": "demos/arknights-world/assets-manifest.json",
    "referencePreview": "research/screenshots/arknights-world-source.jpg"
  },
  {
    "id": "uma-musume",
    "order": 20,
    "title": "赛马娘：群像赛道与斜切叙事",
    "subtitle": "Umamusume 国际英文官网 · 真实局部还原",
    "category": "游戏/IP",
    "tags": [
      "日本",
      "海外手游",
      "Cygames",
      "真实还原",
      "群像",
      "斜切",
      "角色立绘",
      "玩法轮播"
    ],
    "summary": "学习赛马娘国际官网如何用大幅赛道群像建立热闹、前进的运动感，再用荧绿斜切条带、角色立绘和竖屏玩法画面连接下载与游戏体验。",
    "accent": "#a7ce36",
    "background": "#f5faed",
    "principles": [
      "角色群像以纵深和奔跑方向承载主视觉，首屏不额外叠一套营销卡片。",
      "草地绿与荧绿斜切条带重复出现，静态信息也带有向前的运动感。",
      "玩法画面与对应角色共同切换，产品能力由真实游戏截图证明。",
      "下载徽章保持平台的熟悉形状，在复杂插画上形成容易识别的操作区域。"
    ],
    "productFocus": "真实游戏 Umamusume: Pretty Derby 的跑马养成、学园交流与比赛；本地页复现国际官网主视觉、新闻条目、预告入口、三态玩法轮播。",
    "interaction": [
      "三组玩法可用前后箭头、场景按钮与方向键切换，立绘、游戏截图、标题和描述一起更新。",
      "本地 Sections 菜单提供可用的锚点导航，Escape 可关闭。",
      "About 预告信息使用原生 dialog；观看按钮连接真实官方 YouTube 预告。",
      "商店、新闻和角色入口均连接官方目的地；页面不自动播放音频。"
    ],
    "theme": "明亮赛道、彩色二次元群像、奔跑纵深和反复出现的斜切几何共同构成青春竞技主题。",
    "constraints": [
      "该页选择国际英文版 https://umamusume.com/；不能把日本门户与国际宣传页当作同一布局。",
      "本地官方角色、背景和截图仅作私人学习，权利仍归 Cygames；公开再发布需自行取得授权。",
      "复杂主视觉旁的文字与按钮必须落在稳定位置，不能压在角色脸部。",
      "三态轮播不自动翻页，保持文本、图像与当前状态同步且可键盘操作。",
      "没有获得原站 BGM，不提供假音频开关；预告是用户主动打开的官方外链。",
      "手机使用原站单独的竖版 KV，并重新安排徽章；reduced-motion 取消非必要过渡与平滑滚动。"
    ],
    "useCases": [
      "角色阵容丰富的竞技游戏",
      "二次元养成手游宣传",
      "已有高质量群像插画的产品页"
    ],
    "avoid": [
      "用通用双栏产品卡片替代官方群像构图",
      "让下载按钮遮挡角色表情",
      "声称未获取的音频是官网 BGM"
    ],
    "tokens": {
      "palette": [
        "#a7ce36",
        "#c0e640",
        "#6fb52a",
        "#ffffff",
        "#253336"
      ],
      "type": "粗重斜体无衬线标题；小号日期与普通正文分工；官方图像内文字保留原素材",
      "layout": "满宽赛道群像 → 斜切新闻 → 居中倾斜预告 → 立绘与竖屏画面轮播",
      "motion": "手动轮播即时更新；按钮轻微位移；reduced-motion 下取消过渡"
    },
    "sources": [
      {
        "title": "Umamusume: Pretty Derby 国际官方网站",
        "url": "https://umamusume.com/",
        "type": "实例",
        "note": "2026-10-07：通过 Edge 实读桌面、滚动与390px竖版KV；官网图片来自其 _app/immutable/assets 与官方parts域。"
      },
      {
        "title": "官方国际版 App Store 页面",
        "url": "https://apps.apple.com/us/app/umamusume-pretty-derby/id6480433538",
        "type": "实例",
        "note": "确认 umamusume.com 是官方国际网站，区分于日本官方门户。"
      },
      {
        "title": "W3C WAI：Carousels Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/carousels/",
        "type": "规范",
        "note": "手动控制、键盘可操作、轮播变更反馈和清楚的当前状态。"
      },
      {
        "title": "W3C：Animation from Interactions",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
        "type": "规范",
        "note": "支持减少动态偏好；此项是Level AAA的交互动效条款，未声称整站已达完整合规。"
      }
    ],
    "prompt": "为[角色竞技/养成游戏]制作一个有真实素材依据的单页。首先核验目标官方地区页面，不把日本门户和国际版页面混用。参考 Umamusume 国际英文官网：使用有授权的赛道群像作为满宽主视觉，保留奔跑方向、角色纵深与绿色场景；不要在人物脸部叠营销文字。下载区域使用三枚平台徽章，真实指向对应商店。下一节是白底的新闻条目，而非卡片墙，日期、分类、标题、箭头清晰分工。标题下用荧绿斜切带重复运动主题。预告缩略图居中并轻微倾斜，用户主动打开预告信息。玩法节用大立绘、两张竖屏真实游戏画面与斜切说明板组成三组状态，箭头、场景按钮及方向键同时更新图像和文字，不自动翻页。使用白、草地绿、荧绿与深灰，标题粗重斜体而正文保持可读。提供独立手机KV或明确标注本地裁切差异；390px所有按钮可见。所有素材存本地并记录来源、尺寸和权利，优先有授权资产。未获得原站BGM就不宣称有官网音乐；音频默认关闭，外链预告由用户主动观看。支持键盘、原生对话框、可见焦点与prefers-reduced-motion，保留完整来源和复现边界。",
    "negativePrompt": "不要生成泛用SaaS双栏hero、玻璃卡片墙或虚构官网音乐；不要复制运营接口、跟踪脚本、登录与付费流程；不要将新闻快照伪装成实时数据。",
    "demo": "demos/uma-musume/index.html",
    "preview": "previews/uma-musume.jpg",
    "research": "research/uma-musume.md",
    "exercise": "保留群像不动，把玩法轮播改成四种玩法：检查每次切换的标题、截图、立绘与状态是否一致，并记录增加信息密度后斜切背景是否影响阅读。",
    "composition": {
      "color": "草地绿来自官方赛道KV；#c0e640斜切标题带与绿色操作入口重复，白底新闻让复杂图像后出现阅读休息。",
      "typography": "官方图内标识保留；本地段落使用粗重斜体无衬线标题、普通正文和小号日期，避免所有内容同等抢眼。",
      "layout": "主视觉整幅铺开，新闻以横向条目排列，预告居中，玩法以截图与立绘叠合；不套统一hero卡片模板。",
      "imagery": "原站公开KV、三名角色立绘、六张游戏截图与预告缩略图本地保存；每项有manifest来源。",
      "shape": "向前倾斜的标题带、说明板与箭头复用斜切语言，平台下载徽章保持自己的标准轮廓。",
      "hierarchy": "赛道群像先建立游戏辨识；下载次之；新闻较安静；Gameplay每态只突出一个玩法及相关人物。",
      "motion": "按钮轻微反馈与三态手动轮播；没有自动音频，reduced-motion减少过渡。",
      "coherence": "斜切条带延续赛道纵深与角色奔跑方向；游戏截图提供玩法证据，群像负责情绪，二者各有职责。"
    },
    "country": "日本",
    "edition": "国际英文版",
    "implementation": "reference-study",
    "referenceUrl": "https://umamusume.com/",
    "referencePreview": "research/screenshots/uma-musume-source.jpg",
    "fidelity": "demos/uma-musume/fidelity.md",
    "assetManifest": "demos/uma-musume/assets-manifest.json"
  },
  {
    "id": "blue-archive",
    "order": 21,
    "title": "碧蓝档案：学园都市的天空与光",
    "subtitle": "Blue Archive 日本官方首页 · 城市映像与竖排标语",
    "category": "游戏/IP",
    "country": "韩国",
    "edition": "日本版",
    "implementation": "reference-study",
    "referenceUrl": "https://bluearchive.jp/",
    "referencePreview": "research/screenshots/blue-archive-source.jpg",
    "fidelity": "demos/blue-archive/fidelity.md",
    "assetManifest": "demos/blue-archive/assets-manifest.json",
    "tags": [
      "韩国",
      "日本版",
      "海外手游",
      "Yostar",
      "真实还原",
      "蓝白",
      "城市动画",
      "竖排"
    ],
    "summary": "学习日本版碧蓝档案首页如何用学园都市动画、青白Logo、右侧日文竖排标语和角落漫画入口建立轻盈的世界观，而让导航与下载保持明确。",
    "accent": "#00c9e5",
    "background": "#edf8fc",
    "principles": [
      "背景世界先建立氛围，居中品牌标识与右侧竖排标语保持不同角色。",
      "深蓝半透明横向导航与蓝白城市映像共享色系，同时稳定承载白色导航文字。",
      "下载在左下，漫画/帮助图像入口在右下，主视觉中心留给世界观。",
      "官方插画入口有各自的表现力，外围控件使用简洁线条维持轻量界面。"
    ],
    "productFocus": "真实游戏 Blue Archive 日本版；官方首页展示城市/教室背景、品牌与日常叙事，并把下载、漫画和帮助入口分配到画面角落。",
    "interaction": [
      "公开官方背景MP4存本地，初始暂停并消音；按钮按真实play/pause事件同步状态。",
      "手机菜单可打开、关闭与Escape退出；锚点导航可到达本地观察区。",
      "三种官方入口在本地观察器中切换，图像、标题、说明、外链同步改变。",
      "下载、官方PV、漫画、帮助与创作指南连接真实官方目的地。"
    ],
    "theme": "学园都市的蓝天、反光玻璃与日常场景；青白标识、日文竖排文字和可爱的漫画按钮共同表达青春与轻盈感。",
    "constraints": [
      "country标注韩国对应开发来源；edition标注日本版对应本次官网观察，不能混同开发国与发行地区。",
      "原站背景是公开MP4，demo保持静音且初始暂停；未获得BGM，不把背景视频冒称官网音乐。",
      "只复现核验过的首页区域；人物页异步CSS在本研究环境加载失败，不凭空补造其布局。",
      "官方素材和商标权利归相应权利方，私人学习不代表获准公开再发布。",
      "日本站390px页面中部分按钮很小，本地手机版明确作可读性改编，非逐像素移动版复刻。",
      "下部观察器和构图笔记是教学补充，不标作官网News/System原页面；所有内容无需CDN即可显示。"
    ],
    "useCases": [
      "有成熟世界观的校园手游",
      "柔和科幻IP宣传",
      "背景氛围与轻量导航共存的官网"
    ],
    "avoid": [
      "把青白学园主题写成泛用科技仪表盘",
      "所有信息都覆盖在动画最复杂的位置",
      "未核验的角色页与假BGM状态"
    ],
    "tokens": {
      "palette": [
        "#00c9e5",
        "#14273b",
        "#ffffff",
        "#a8d8ed",
        "#edf8fc"
      ],
      "type": "拉丁导航用小号大字距；日文正文保持可读；竖排标语与官方Logo来自真实图片",
      "layout": "满幅背景城市映像 + 中央Logo + 右侧竖排标语 + 左下下载 + 右下插画入口",
      "motion": "背景视频手动开始/停止；无自动音频；资源切换即时反馈；reduced-motion关闭CSS过渡"
    },
    "sources": [
      {
        "title": "Blue Archive 日本官方网站",
        "url": "https://bluearchive.jp/",
        "type": "实例",
        "note": "2026-10-07：Edge核验桌面首屏、滚动footer与390px版本；背景视频、Logo、标语、下载与漫画图片来自官方页面观察资源。"
      },
      {
        "title": "Blue Archive 日本官方创作指南",
        "url": "https://bluearchive.jp/fankit/guidelines",
        "type": "规范",
        "note": "官网页脚公开指向的IP创作规则入口；本地学习资产不因此获得再发布授权。"
      },
      {
        "title": "W3C WAI：Carousels Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/carousels/",
        "type": "规范",
        "note": "本地资源观察器参考其用户控制、键盘按钮与清楚状态的要求，不自动轮换。"
      },
      {
        "title": "W3C：Animation from Interactions",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
        "type": "规范",
        "note": "非必要动效提供用户控制，并响应减少动态偏好。"
      }
    ],
    "prompt": "为[世界观成熟的学园/轻科幻手游]制作真实官网风格学习页。先核验目标地区官方页面并记录日期，不把开发国和地区版本当作一个字段。参考 Blue Archive 日本官方首页的实际构图：用有授权的蓝天学园都市影像做满幅背景，中央放透明青白品牌Logo，右侧使用窄幅竖排日文主题标语；深蓝rgba(20,39,59,.8)横向导航横贯上方，白色小号拉丁字母适度增大字距，当前项用青色线标示。下载徽章位于左下，官方漫画与帮助入口图像位于右下，中心不要塞产品卡片和长营销文案。背景视频本地化、初始停止并静音，提供真实播放/暂停控件；未获得原站BGM时不展示假音乐按钮。页面下部可新增明确标注为本地教学的三态素材观察器，切换时同时更新图像、文字和官方外链。手机提供实际可用的菜单与合理大小的下载按钮，并把这种改编与原站移动版区分记录。保留蓝白、深蓝和少量插画彩色的职责分工；控件使用细线和轻圆角，不把所有部分变成玻璃卡片。所有素材有URL、字节尺寸、用途和权利说明，所有CTA有实际目的地，键盘焦点清楚并响应prefers-reduced-motion。",
    "negativePrompt": "不要通用双栏hero、紫色霓虹仪表盘、虚构人物页、假背景音乐或自动有声播放；不要复制原站跟踪、运营接口、登录与支付逻辑。",
    "demo": "demos/blue-archive/index.html",
    "preview": "previews/blue-archive.jpg",
    "research": "research/blue-archive.md",
    "exercise": "改变背景映像的一个静态画面，保持Logo和下载位置，观察天空、建筑和高光是否遮挡标语，再记录允许控件落点的安全区域。",
    "composition": {
      "color": "青色强调、白色Logo与天空高光、深蓝透明导航在同一蓝白体系中分工；漫画插画的彩色集中在角落。",
      "typography": "小号大字距的拉丁导航与官方日文竖排标语方向不同，中心Logo承担主辨识，正文不仿造装饰字。",
      "layout": "背景覆盖全屏；下载左下、插画入口右下，顶部横向导航；本地观察区用横向索引和素材展示补充学习。",
      "imagery": "官网城市/教室MP4、透明Logo、竖排标语和三种官方插画入口均本地保存。",
      "shape": "细线、半透明深蓝长导航、少量六边形光斑、熟悉商店徽章；插画入口不强制塞进统一卡片。",
      "hierarchy": "背景建立世界、Logo确认产品、竖排标语补充主题；下载与漫画入口形成左右分工。",
      "motion": "手动背景播放，状态取video事件；默认没有声音；切换资源时文字和目标链接一同反馈。",
      "coherence": "同一青白品牌色将天空、Logo、导航指示和控件连起来，漫画的自由彩色保留在角色叙事入口，避免互相争抢。"
    }
  },
  {
    "id": "monument-valley-game",
    "order": 22,
    "title": "纪念碑谷：电影画面与安静的品牌秩序",
    "subtitle": "Monument Valley 一代官方网站 · 真实预告、奖项与画廊",
    "category": "游戏/IP",
    "country": "英国",
    "edition": "国际英文版",
    "implementation": "reference-study",
    "referenceUrl": "https://www.monumentvalleygame.com/mv1",
    "referencePreview": "research/screenshots/monument-valley-game-source.jpg",
    "fidelity": "demos/monument-valley-game/fidelity.md",
    "assetManifest": "demos/monument-valley-game/assets-manifest.json",
    "tags": [
      "英国",
      "海外手游",
      "ustwo games",
      "真实还原",
      "几何字标",
      "全屏视频",
      "渐变",
      "画廊"
    ],
    "summary": "学习纪念碑谷一代真实官网：电影式全屏预告与居中几何字标，随后依次下载、预告、粉蓝渐变奖项、奶油色媒体区、竖屏游戏画廊与社区入口。",
    "accent": "#e76399",
    "background": "#627db3",
    "principles": [
      "官方几何字标安静居中，背景游戏影像自己描述世界，而不是添加大量解释文案。",
      "白色固定系列导航与细小页面索引维持整体秩序；内容节使用整幅色带转换节奏。",
      "真实预告、奖项事实和原始游戏截图依次承担体验、信任与作品细节。",
      "截图画廊保留游戏画面的纵向比例，不能把一切裁成通用宽卡片。"
    ],
    "productFocus": "真实 Monument Valley 一代：安静公主Ida、不可思议建筑和视觉解谜；官网通过预告与截图呈现作品，而本地复现其宣传页的区域顺序。",
    "interaction": [
      "本地官方预告手动播放，点击Play后开启原视频声音；播放、暂停与音频状态来自真实video事件。",
      "首页背景使用同一官方预告，默认静音暂停，可单独开始/停止；reduced-motion支持停止。",
      "截图画廊有前后箭头、四个索引按钮、方向键及当前编号反馈。",
      "手机系列菜单与奖项展开按钮有效；下载、社区、系列游戏和press kit均有真实官方链接。"
    ],
    "theme": "克制的几何字标、幻境建筑、粉蓝渐变、奶油色与深青画廊；页面体验接近安静的作品放映与展览。",
    "constraints": [
      "参照一代官方 /mv1 页面，不把MV2/MV3配色和营销资料拼成同一个版本。",
      "这是宣传页面局部还原，不是此前泛化的等轴浮岛demo或可玩的游戏复制。",
      "官方图像、Logo、预告和商标仅为本地私人学习，权利仍归ustwo games及相应权利方。",
      "初始不播放音频；手动Play会播放真实官网MP4及其音轨，不称为单独BGM。",
      "原站有视差、渐入、较多奖项和14张图画廊，本地缩减为6项/4图并取消视差，保留连续色带与顺序。",
      "媒体评价原文未整段复制；本地奶油色区域明确改为学习观察，手机导航改为有效菜单。"
    ],
    "useCases": [
      "有高质量游戏影像的独立游戏",
      "建筑与视觉解谜作品宣传",
      "适合安静观看的数字艺术作品"
    ],
    "avoid": [
      "以自行绘制浮岛替代真实官网证据",
      "在全屏画面中堆满CTA和卡片",
      "把官网视频的声轨声称为下载BGM"
    ],
    "tokens": {
      "palette": [
        "#fefefe",
        "#221f20",
        "#e76399",
        "#627db3",
        "#fcf2d2",
        "#1d4454",
        "#e28ec0",
        "#48418c"
      ],
      "type": "真实细线几何Logo；小号大字距导航/奖项；普通无衬线说明承担可读性",
      "layout": "全屏预告 → 深色下载带 → 预告 → 粉蓝奖项 → 奶油媒体区 → 深青纵向画廊 → 粉色社区",
      "motion": "视频手动播放；画廊手动切换；取消原站复杂视差并响应reduced-motion"
    },
    "sources": [
      {
        "title": "Monument Valley 一代官方宣传页",
        "url": "https://www.monumentvalleygame.com/mv1",
        "type": "实例",
        "note": "2026-10-07实访桌面、滚动和390px版；原CSS核验真实白色导航、粉蓝渐变和奶油色区。"
      },
      {
        "title": "ustwo games：Monument Valley作品页",
        "url": "https://ustwogames.co.uk/our-games/monument-valley/",
        "type": "实例",
        "note": "开发者介绍Ida、不可思议建筑与视觉幻象，支撑产品重点；并非用泛化等轴插画替代实际游戏。"
      },
      {
        "title": "ustwo games：联系信息",
        "url": "https://ustwogames.co.uk/contact-us/",
        "type": "实例",
        "note": "官方地址在伦敦，用于国家分类的开发工作室信息。"
      },
      {
        "title": "W3C WAI：Carousels Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/carousels/",
        "type": "规范",
        "note": "画廊保留手动控制、键盘与状态反馈。"
      },
      {
        "title": "W3C：Animation from Interactions",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
        "type": "规范",
        "note": "原站视差在本地简化，减少动态模式下取消非必要运动。"
      }
    ],
    "prompt": "为[有高质量作品影像的独立游戏/数字艺术作品]制作一个基于真实官方网站的局部学习页面。明确目标版本、官方URL和观察日期。参考 Monument Valley 一代 /mv1 官网的区域序列：全屏官方预告作为视觉背景，居中放真实几何细线品牌字标，保留安静的大留白；顶部白色固定导航横向列出系列作品，右侧用小六边形索引到下载、预告、奖项、媒体和画廊。下一段使用深色底和标准商店徽章，预告区域使用用户主动点击的播放按钮与实际video控件。奖项以粉色到蓝色渐变铺满，并使用低透明月亮背景和成对月桂；事实与年份可核验。媒体区使用奶油色背景，截图或影像与简洁文字并列。后续深青画廊保留游戏竖屏比例，用前后箭头和四个索引手动切换；社区入口落到粉色宽带。所有图片、字标和MP4本地保存并记录来源、字节/尺寸与权利。音频默认关闭，用户明确播放预告后才开启真实声轨，不把它冒称单独BGM；背景视频可暂停。手机菜单和画廊按钮可用，键盘、可见焦点、当前态和reduced-motion完整。不得用自己画的浮岛替代真实游戏官网，新增教学内容须明确标注，并记录与原站奖项数量、画廊数量、视差和字体的差异。",
    "negativePrompt": "不要泛用双栏营销hero、任意等轴浮岛、假游戏关卡、虚构BGM、自动有声播放或未经核验的奖项；不要复制媒体长段评价与官网追踪脚本。",
    "demo": "demos/monument-valley-game/index.html",
    "preview": "previews/monument-valley-game.jpg",
    "research": "research/monument-valley-game.md",
    "exercise": "把四张竖屏图加入一张横屏图，保持作品比例，检查画廊高度、按钮位置、手机阅读节奏与当前编号反馈是否仍一致。",
    "composition": {
      "color": "原CSS白色导航、#221f20下载带、#e76399→#627db3奖项渐变、#fcf2d2媒体区与粉色社区构成连续宽色带。",
      "typography": "真实细线几何Logo居中，小号大字距导航与奖项说明保持安静；正文使用可读系统字体。",
      "layout": "全屏影像先行，区域按下载/预告/奖项/媒体/画廊/社区连续展开，保留一代官网秩序。",
      "imagery": "官方预告MP4、字标SVG、月亮/月桂、四张原游戏画面和社区图片均本地保存。",
      "shape": "几何字标、微小六边形索引、月桂对称与直边色带共同建立秩序；画廊保留竖屏游戏矩形。",
      "hierarchy": "主字标和影像表达辨识；下载徽章表达行动；奖项事实和截图逐层建立作品可信度。",
      "motion": "原站的视频叙事保留为用户控制，截图手动切换；本地停止复杂视差并响应减少动态。",
      "coherence": "建筑与字标共享几何秩序；页面控件克制，连续背景色带控制观看节奏，让真实作品图像承担细节。"
    }
  },
  {
    "id": "design-sight",
    "order": 23,
    "title": "21_21 DESIGN SIGHT：海报与四列档案",
    "subtitle": "日本设计文化机构 · 当前官方海报局部还原",
    "category": "艺术/文化",
    "country": "日本",
    "edition": "日本版 / 2026-10-07主页快照",
    "implementation": "reference-study",
    "referenceUrl": "https://www.2121designsight.jp/",
    "referencePreview": "research/screenshots/design-sight-source.jpg",
    "fidelity": "demos/design-sight/fidelity.md",
    "assetManifest": "demos/design-sight/assets-manifest.json",
    "tags": [
      "日本",
      "艺术",
      "设计展览",
      "真实还原",
      "海报",
      "四列档案",
      "蓝色标识"
    ],
    "summary": "让展览海报主导首屏，蓝色机构标识与四个档案栏目管理不同展览的视觉差异；兼具作品展示与访问信息。",
    "accent": "#0090df",
    "background": "#f3f3f3",
    "principles": [
      "展览自己的海报保持完整，机构不再用营销大标题重复解释。",
      "固定白色机构导航与蓝色标识，提供稳定的回看和语言切换入口。",
      "四列分别承载机构、Gallery 1&2、Gallery 3和Documents；栏目之间对齐，栏目内部图像按原比例展开。",
      "浅灰地面与白色内容块分离层次，蓝色标题和橙色NEW承担导航与更新提示。"
    ],
    "productFocus": "设计文化机构的展览、研究档案、建筑与访问信息；首屏展览先呈现，后续分类帮助查询与回看。",
    "interaction": [
      "2张官方海报手动切换，左右箭头、编号按钮与键盘方向键均有效，切换同步官方详情链接。",
      "手机菜单可打开、关闭和Escape返回按钮。",
      "四个分类与文章入口实际指向官网，访问信息另设本地锚点。"
    ],
    "theme": "机构蓝标识、白色导览、全幅展览海报、浅灰四列档案；图像风格随展览改变，网站的组织规则持续统一。",
    "constraints": [
      "明确记录2026-10-07当前日本官网，展期及休馆是快照，不作为实时访问信息。",
      "首屏不裁成通用两列hero：使用官方1280×720海报，以16:9完整铺开。",
      "档案图片包含竖海报与横照片，保留各自比例，不强行统一卡片高度。",
      "官方Logo与展览图像只用于个人本地学习，品牌与作品权利保留。",
      "四列在760px以下变单列；菜单和轮播提供键盘、焦点与reduced-motion。",
      "本地不复制自动轮播、原CMS、加载遮罩、统计脚本和购票后端。"
    ],
    "useCases": [
      "设计展览/建筑机构",
      "海报主导的文化活动",
      "长期内容档案"
    ],
    "avoid": [
      "以统一圆角SaaS卡片覆盖展览海报",
      "强制裁齐所有档案缩略图",
      "把临时展期做成永久事实"
    ],
    "tokens": {
      "palette": [
        "#0090df",
        "#ffffff",
        "#f3f3f3",
        "#ff9900",
        "#444444"
      ],
      "type": "机构导航与栏目采用克制无衬线；展览海报原有字体作为作品图像保留",
      "layout": "固定129px白header → 16:9全幅海报 → 1195px四列档案 → 双栏访问信息",
      "motion": "手动海报切换，无自动推进；reduced-motion关闭平滑滚动"
    },
    "sources": [
      {
        "title": "21_21 DESIGN SIGHT 官方首页",
        "url": "https://www.2121designsight.jp/",
        "type": "实例",
        "note": "2026-10-07真实浏览器实访桌面/手机/滚动；资产来自当前页面DOM和公开官方CSS，原站source.jpg与本地preview可对照。"
      },
      {
        "title": "21_21 官方：名称与产品Logo设计说明",
        "url": "https://www.2121designsight.jp/designsight/",
        "type": "理论",
        "note": "第一方说明“product logo”借用日常地址牌形象，连接设计场所与日常视点；这是机构自述，不将本地推断冒充作者意图。"
      },
      {
        "title": "IBM Design Language：Layout overview",
        "url": "https://www.ibm.com/design/language/layout/overview/",
        "type": "理论",
        "note": "2026-10-07阅读：元素关系、层级、尺度、比例、对齐与重复。用于解释构图；不把IBM品牌专属规范当普遍规则。"
      },
      {
        "title": "W3C WAI：Carousels Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/carousels/",
        "type": "规范",
        "note": "2026-10-07阅读：可操作结构、手动控制、键盘和当前状态提示；本地不自动轮播。"
      }
    ],
    "prompt": "为[设计展览机构/文化档案]制作可回看的网页，先实访目标官方URL并记录展览版本、日期、桌面和手机视图。参考21_21 DESIGN SIGHT：白色固定机构header使用真实授权蓝色牌形标识，导航与语言入口克制排列；首屏让1280×720海报按16:9完整铺开，不叠加营销标题与巨大CTA。不同展览保持自己的字体、图像和配色，机构蓝色负责稳定链接与栏目识别。下方浅灰背景使用1195px内容宽度与四列结构，分别放机构信息、两个展馆和研究档案；每列内部竖海报、横建筑照片按原比例展开，不裁齐统一卡片高度。细蓝色栏目边框、蓝标题、较小日期与橙色NEW形成明确分工。实现至少两张海报手动切换，图像、alt、详情链接和当前状态同步，方向键可用，不自动推进。手机白header缩到约62px，导航折叠为有效菜单，四列自然转为单列。页尾保留访问信息与真实官网链接。所有图像/Logo本地保存并记录来源、尺寸、版权；标注展期为快照，区分官方区域与教学补充，不复制CMS、追踪、加载遮罩或门票交易。支持可见焦点、Escape与prefers-reduced-motion，并提供原站/本地对照与还原边界。",
    "negativePrompt": "不使用共同SaaS双栏hero模板，不嵌入整站iframe，不伪造官网功能或实时展期，不复制统计/交易脚本，不使用CDN和远程图像运行时依赖。",
    "demo": "demos/design-sight/index.html",
    "preview": "previews/design-sight.jpg",
    "research": "research/design-sight.md",
    "exercise": "保持海报不变，将四列间距从50px改为25px，观察栏目密度；再把所有缩略图强制裁成同尺寸，记录丢失的展览信息。",
    "composition": {
      "color": "蓝色固定机构标识和链接，浅灰承托白色档案，橙色NEW形成更新角色；展览海报拥有自己的配色。",
      "typography": "导航/分类标题稳定无衬线；海报中中英文字体作为官方原图保留，避免重排破坏作品。",
      "layout": "129px header、全幅16:9海报、4个等宽但内容不等高的竖列；手机单列。",
      "imagery": "真实方丈记与TYPE-XVII海报、建筑照片、访问地图、研究照片本地化，保留原比例。",
      "shape": "机构Logo圆角牌，栏目细蓝边，橙NEW圆；内容块主要矩形。",
      "hierarchy": "海报先建立当前展览认知，分类其次，标题/日期/说明依次降低；不是每段都有大标题。",
      "motion": "海报手动切换同步链接/alt/状态；菜单真实展开；仅锚点平滑且支持减少动态。",
      "coherence": "展览视觉彼此不同，以恒定蓝标识、留白、列宽、标题与内容关系统一成机构档案。"
    }
  },
  {
    "id": "mori-art-museum",
    "order": 24,
    "title": "森美术馆：红色机构锚点与艺术海报",
    "subtitle": "MORI ART MUSEUM 日本官网 · 2026年10月快照",
    "category": "艺术/文化",
    "country": "日本",
    "edition": "日本版 / 2026-10-07主页快照",
    "implementation": "reference-study",
    "referenceUrl": "https://www.mori.art.museum/jp/",
    "referencePreview": "research/screenshots/mori-art-museum-source.jpg",
    "fidelity": "demos/mori-art-museum/fidelity.md",
    "assetManifest": "demos/mori-art-museum/assets-manifest.json",
    "tags": [
      "日本",
      "艺术",
      "美术馆",
      "真实还原",
      "红色馆标",
      "展览海报",
      "信息层级"
    ],
    "summary": "红色方形馆标叠在宽展览海报上，红色展期带连接图像与访问信息；后续展览、推荐与新闻以稳定网格组织。",
    "accent": "#bf0d3e",
    "background": "#ffffff",
    "principles": [
      "机构Logo作为不随作品变化的视觉锚点，明确这是谁的展览。",
      "艺术海报可以充满自己的色彩与字体，外围网页保持白底和红色识别。",
      "红色展期带紧贴主视觉，观众从作品直接获得名称、日期与访问入口。",
      "新闻与展览采用相同图文对齐关系；日期、类型、标题用位置与尺度形成阅读顺序。"
    ],
    "productFocus": "当前/后续展览与实际来馆信息。2026-10-07官网处于换展闭馆期，主推即将开始的森万里子：燦燦，而非过期的Ron Mueck展。",
    "interaction": [
      "手机菜单、语言入口可切换并使用Escape关闭。",
      "新闻支持本地教学用类别筛选，同步可见项目数量与aria-pressed；明确不是官网原功能。",
      "展览、购票、来馆和新闻入口指向真实官方页面，本地不模拟支付。"
    ],
    "theme": "白色机构页面、深红方形Logo与展期带、粉色临时公告；不断更换的当代艺术海报在稳定信息框架中展示。",
    "constraints": [
      "以 /jp/ 当前快照为准：森万里子：燦燦 2026.10.31–2027.3.28；顶栏闭馆信息有时效性。",
      "大屏主图1600×640，小屏使用450×450官方专用图，不直接裁剪桌面海报。",
      "真实红方馆标：桌面240×240px、手机160×160px，在海报上方约30px开始叠置；中屏200px为本地可用性适配。",
      "Logo/艺术家作品版权归原权利人，仅作个人本地学习。",
      "使用系统字体近似导航；官网Mori专属字体没有下载，不能声称像素级一致。",
      "本地只还原首页几个区域并加教学新闻筛选；不复制多馆门户、购票账户与追踪脚本。"
    ],
    "useCases": [
      "艺术馆与多展览机构",
      "作品风格持续变化的主页",
      "需要明确来馆信息的文化服务"
    ],
    "avoid": [
      "把艺术品当通用背景装饰",
      "过期展览冒充当前主视觉",
      "以新品牌圆角卡片取代机构红色方标"
    ],
    "tokens": {
      "palette": [
        "#bf0d3e",
        "#ffffff",
        "#f8d6da",
        "#252525",
        "#d9d9d9"
      ],
      "type": "官方展览海报的中英字形保留；网页使用无衬线导航和粗体英文栏目，系统字体近似专属Mori字体",
      "layout": "临时公告/多馆辅助条 → 机构导航/叠加Logo → 2.5:1展览海报与红展期带 → 四列展览/新闻",
      "motion": "菜单开关、新闻状态筛选、原生details；reduced-motion关闭平滑滚动"
    },
    "sources": [
      {
        "title": "森美术馆 官方首页",
        "url": "https://www.mori.art.museum/jp/",
        "type": "实例",
        "note": "2026-10-07真实浏览器实访桌面/手机/滚动；资产来自当前页面DOM和公开官方CSS，原站source.jpg与本地preview可对照。"
      },
      {
        "title": "森美术馆官方：机构介绍",
        "url": "https://www.mori.art.museum/jp/about/",
        "type": "实例",
        "note": "第一方说明馆址位于东京六本木森塔、文化与现当代艺术使命；视觉意图的本地解释另标推断。"
      },
      {
        "title": "IBM Design Language：Layout overview",
        "url": "https://www.ibm.com/design/language/layout/overview/",
        "type": "理论",
        "note": "2026-10-07阅读：元素关系、层级、尺度、比例、对齐与重复。用于解释构图；不把IBM品牌专属规范当普遍规则。"
      },
      {
        "title": "W3C WAI：Carousels Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/carousels/",
        "type": "规范",
        "note": "2026-10-07阅读：可操作结构、手动控制、键盘和当前状态提示；本地不自动轮播。"
      }
    ],
    "prompt": "为[当代艺术馆/持续更换展览的文化机构]制作真实官方页面的局部学习demo，先核验当前主页主推展览、闭馆状态、日期和桌面/手机专用资产。参考森美术馆日本官网：使用白底机构导航，顶部粉色公告先说明实际来馆限制，辅助条提供真实多馆与购票入口；真实红色方形馆标按桌面240×240px、手机160×160px叠在艺术海报左上，桌面x30/y130且海报y160，Logo安全空间稳定，海报保持艺术家自己的字体和色彩。桌面海报使用2.5:1比例，手机切换官方正方形版本，不把宽图裁坏。紧贴海报的整条机构红信息带放展览标题、日期、时间与白色来馆按钮，信息顺序服务实际访问。后续以四列展览、三列推荐和四列新闻组织内容，网页栏目为粗英文名与小日文副标题，矩形图片、类型细边标签、日期与红色小方块形成固定语法，不套圆角SaaS卡片。实现手机菜单、语言展开和Escape关闭；可加入新闻类别筛选但明确它是本地教学补充，筛选同步计数和当前按钮状态。所有外链指向真实官方目的地，购票不模拟支付。系统字体近似但不声称专属字体一致；图像Logo保存本地并记录URL、尺寸、权利。标注研究日期、快照信息和未复现区域，支持390px、键盘焦点、reduced-motion及原站/本地截图对照。",
    "negativePrompt": "不使用共同SaaS双栏hero模板，不嵌入整站iframe，不伪造官网功能或实时展期，不复制统计/交易脚本，不使用CDN和远程图像运行时依赖。",
    "demo": "demos/mori-art-museum/index.html",
    "preview": "previews/mori-art-museum.jpg",
    "research": "research/mori-art-museum.md",
    "exercise": "保持艺术海报不变，只移除红色方形馆标与展期带，观察观众还是否能迅速知道机构、展名和日期；恢复后比较信息路径。",
    "composition": {
      "color": "#bf0d3e机构红贯穿Logo、展期、栏目、标签；粉色公告、白色底和艺术海报虹彩承担不同角色。",
      "typography": "海报原字形与网页系统字分工；粗英文栏目+小日文副标题，信息由字号和对齐建立顺序。",
      "layout": "桌面左叠加240px方形馆标（x30/y130），宽2.5:1海报自y160开始；手机160px馆标与官方方图，后续四列展览、三列推荐、四列新闻。",
      "imagery": "官方森万里子桌面/手机专图、其他展览海报、购票/新闻缩略图本地归档。",
      "shape": "方形馆标、矩形海报、细边类型标签与新闻红色小方块；避免泛化大圆角。",
      "hierarchy": "闭馆先告知行动限制，主视觉提供展览认知，展期带给日期/来馆，后续推荐新闻服务不同意图。",
      "motion": "本地菜单语言控件可操作，教学筛选同步列表/计数；无自动动画或音频。",
      "coherence": "统一机构红、图像比例、标题/日期关系使不同作品属于同一艺术馆，艺术图片保留表达自由。"
    }
  },
  {
    "id": "fuji-rock",
    "order": 25,
    "title": "Fuji Rock：现场照片与节日导览",
    "subtitle": "日本音乐节官网 · 2026版已结束活动快照",
    "category": "艺术/文化",
    "country": "日本",
    "edition": "日本版 / 2026活动快照",
    "implementation": "reference-study",
    "referenceUrl": "https://www.fujirockfestival.com/",
    "referencePreview": "research/screenshots/fuji-rock-source.jpg",
    "fidelity": "demos/fuji-rock/fidelity.md",
    "assetManifest": "demos/fuji-rock/assets-manifest.json",
    "tags": [
      "日本",
      "艺术",
      "音乐节",
      "真实还原",
      "2026快照",
      "照片轮播",
      "山形标识",
      "大菜单"
    ],
    "summary": "橙色固定栏与白色窄字标把现场照片串成同一音乐节；山形菜单、蓝色票据、圆角图标导览让情绪与实用信息并行。",
    "accent": "#e64219",
    "background": "#f2efeb",
    "principles": [
      "现场入口、人群与演出照片直接传达真实节日环境，不用虚构插画替代。",
      "窄高白字Logo与短日期在68px橙色顶栏形成紧凑的常驻识别。",
      "右上山形菜单和右侧蓝色竖票据占据稳定位置，照片更换也能找到导航。",
      "浅灰圆角实用导航与米色大菜单重复图标/链接关系，把复杂的现场资讯分层。"
    ],
    "productFocus": "真实苗场音乐节现场感、演出/时间表、地点/饮食/FAQ以及新闻归档。2026年活动已在7月24–26日结束，本地明确标为2026版快照。",
    "interaction": [
      "3张现场照片手动切换，圆点/左右箭头/键盘同步当前状态；不自动轮播。",
      "山形菜单展开成四列层级导航，关闭、锚点和Escape有效；独立语言菜单可切换。",
      "FEATURED横向列表可按按钮或自然横向滚动浏览。",
      "内容区提供真实官方Aftermovie链接，用户手动前往YouTube，不声称获得独立BGM。"
    ],
    "theme": "热烈橙色标识、蓝色操作色、山形图标、真实户外照片、米色圆角面板与清晰信息模块共同形成户外音乐节语言。",
    "constraints": [
      "明确2026版快照学习，7月24–26日活动已结束；保留购票入口只是官网参考，不能当可购买当前活动。",
      "使用真实Logo/山形标识/现场照片，品牌商标与摄影权利归SMASH等原权利人。",
      "手机使用官方1200×1200图片，不单纯裁切1400×700桌面照片。",
      "原站20张照片/6条特集，本地缩为3张/4条并取消自动轮播；不能声称整站完整复刻。",
      "没有取得独立官网BGM；本地不自动加载视频/音频，官方回顾需明确用户动作。",
      "本地不复制原站交易、广告追踪、自动加载遮罩和完整演出数据库。"
    ],
    "useCases": [
      "音乐节与户外活动",
      "照片主导的文化节",
      "需要大菜单管理多类现场资讯的活动"
    ],
    "avoid": [
      "用全宽营销文案盖住真实现场",
      "未标日期的过期售票CTA",
      "自画近似山Logo冒充官方标识"
    ],
    "tokens": {
      "palette": [
        "#e64219",
        "#0075ba",
        "#f2efeb",
        "#e3dbd4",
        "#011a38"
      ],
      "type": "官方窄高字标作为图片；网页用粗无衬线英文栏目与小日文说明，系统字体近似原站Poppins/日文字体",
      "layout": "固定68px橙header → 视口现场照片/右票据 → 圆角实用导航 → Featured横滚 → 米色News列表 → Content",
      "motion": "手动照片与Featured浏览；菜单开关；reduced-motion避免平滑运动"
    },
    "sources": [
      {
        "title": "Fuji Rock 官方首页",
        "url": "https://www.fujirockfestival.com/",
        "type": "实例",
        "note": "2026-10-07真实浏览器实访桌面/手机/滚动；资产来自当前页面DOM和公开官方CSS，原站source.jpg与本地preview可对照。"
      },
      {
        "title": "Fuji Rock 2026 官方结束报告",
        "url": "https://www.fujirockfestival.com/news/detail/fb6a67473bc9938",
        "type": "实例",
        "note": "首页官方新闻记录2026.07.28活动结束；本地明确是已结束年份快照。"
      },
      {
        "title": "IBM Design Language：Layout overview",
        "url": "https://www.ibm.com/design/language/layout/overview/",
        "type": "理论",
        "note": "2026-10-07阅读：元素关系、层级、尺度、比例、对齐与重复。用于解释构图；不把IBM品牌专属规范当普遍规则。"
      },
      {
        "title": "W3C WAI：Carousels Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/carousels/",
        "type": "规范",
        "note": "2026-10-07阅读：可操作结构、手动控制、键盘和当前状态提示；本地不自动轮播。"
      }
    ],
    "prompt": "为[音乐节/户外文化节]制作真实官网2026版局部学习demo，实访首页、菜单和手机照片，核对活动已结束与所有日期；不要把旧年份当正在售票。参考Fuji Rock：68px橙色固定顶栏放真实窄高白色Logo、短日期与地点，右上约100px白色山形菜单按钮下角圆弧，现场照片占满首屏剩余高度，照片自己的入口装置、人群、舞台与自然环境承担叙事，不叠加通用营销大标题。右侧蓝色竖票据保留真实官方链接并在照片后说明快照含义。至少三张官方照片使用桌面宽图和手机方图配对，手动圆点、箭头与键盘切换同步当前状态，不自动推进。下方浅灰圆角实用导航使用真实图标与短标签；山菜单打开米灰大圆角面板，四列图标加层级链接，底部语言胶囊与社交入口，Escape可关闭。FEATURED用蓝色大标题和横向方图列表，新闻用橙色标题与日期-标题-箭头的列表，结构随内容变化而非所有区域卡片套皮。保留真实官方Aftermovie外链供手动观看；未取得音轨就不声称官网BGM或自动播放。Logo、照片、图标本地保存并记录来源、尺寸与原版权，系统字体近似且说明差异，不复制交易、追踪、广告与原加载遮罩。支持390px自然布局、可见焦点、reduced-motion，并保留来源截图和还原边界。",
    "negativePrompt": "不使用共同SaaS双栏hero模板，不嵌入整站iframe，不伪造官网功能或实时展期，不复制统计/交易脚本，不使用CDN和远程图像运行时依赖。",
    "demo": "demos/fuji-rock/index.html",
    "preview": "previews/fuji-rock.jpg",
    "research": "research/fuji-rock.md",
    "exercise": "把现场照片切换为不同地点，观察橙色header/蓝票据是否仍保持识别；再打开大菜单检验每层链接是否能被键盘找到。",
    "composition": {
      "color": "#e64219橙贯穿header/日期，#0075ba蓝用于导览/Featured/票据，#f2efeb与#e3dbd4使菜单层级清晰。",
      "typography": "真实窄高Logo、短粗日期、大英文栏目、较小日文链接；不引入原站未提供的花体字。",
      "layout": "68px固定顶栏、右上100px山菜单、满视口照片、右竖票据；后续横向Featured与新闻列表避免同构。",
      "imagery": "真实官方现场照片的desktop/mobile版本、Featured宣传图、Logo和导航图标全部本地化。",
      "shape": "山Logo、右下圆角菜单、蓝竖票据、圆点、圆角导航/大菜单重复形成可识别操作语法。",
      "hierarchy": "日期地点保持常驻，照片先传递场景，实用入口其次，Featured与按日期排列新闻承担浏览与回看。",
      "motion": "照片手动切换与状态播报；Featured横滚按钮，菜单展开；不自动视频/音频。",
      "coherence": "官方现场的蓝橙布置与网站橙蓝识别呼应，灰米面板降密度；不同照片共享导航与控件位置。"
    }
  },
  {
    "id": "rijksmuseum-art",
    "order": 26,
    "title": "Rijksmuseum · 全幅摄影与巨大字标",
    "subtitle": "Dutch masterpieces, immersive museum visit",
    "category": "艺术/文化",
    "country": "荷兰",
    "tags": [
      "荷兰",
      "艺术馆",
      "全幅摄影",
      "超大字标",
      "橙色票务",
      "Rijksmuseum"
    ],
    "summary": "实访英语官方首页，复现夜巡观展全屏摄影、巨幅RIJKS MUSEUM白色字标、底缘小标题以及连续摄影专题。",
    "accent": "#db5526",
    "background": "#242424",
    "principles": [
      "以作品和观众的真实关系主导首屏，主标题留在底缘。",
      "品牌SVG跨越几乎整幅宽度；图像仍是内容主体。",
      "橙色矩形票务按钮在摄影上有明确优先级。",
      "家庭月全屏摄影后接两栏展览预告，图文密度随内容改变。"
    ],
    "productFocus": "参观体验、馆藏名作与购票入口。摄影提供作品尺度和到访情境，底缘文字补充时间/活动条件。",
    "interaction": [
      "全屏菜单打开/关闭及Escape关闭，菜单内链接定位到本地对应区域。",
      "搜索弹窗实时筛选本地三类区域并跳转。",
      "两展览预览弹窗显示对应官方照片、日期与原站链接；购票直接打开官方页面。"
    ],
    "theme": "深色摄影、白色窄体品牌字体、巨大字标与橙色矩形CTA。",
    "constraints": [
      "每个摄影专题保持约100vh，手机使用100svh避免地址栏引起布局跳动。",
      "不要把摄影裁成圆角卡片，也不要给首屏添加摘要卡片。",
      "字标使用完整官方SVG，标题与正文使用两字重Rijksmuseum字体。",
      "照片底部加局部黑色渐变支撑文字对比；不对整张照片做滤镜风格化。",
      "减弱动态模式仍能看到全部内容，滚动保持浏览器原生行为。",
      "保留私人学习署名与真实票务跳转，不模拟付款或假装门票已预订。"
    ],
    "useCases": [
      "艺术馆参观入口",
      "摄影主导的场所展示",
      "大型艺术节入口"
    ],
    "avoid": [
      "摄影不足的抽象装饰页面",
      "信息必须首屏密集呈现的后台"
    ],
    "tokens": {
      "palette": [
        "#242424",
        "#ffffff",
        "#db5526"
      ],
      "type": "官方Rijksmuseum Normal/Bold；桌面正文17px、短标题约23px。",
      "layout": "100vh全幅摄影 → 100vh家庭月 → 两列整屏摄影 → 深色实用信息。",
      "motion": "菜单开合与原生锚点；无自动轮播，reduced-motion禁用过渡和平滑滚动。"
    },
    "sources": [
      {
        "title": "Rijksmuseum official English homepage",
        "url": "https://www.rijksmuseum.nl/en",
        "type": "实例",
        "note": "2026-10-07 CUA实访桌面1440×1000和390×844；观察巨大字标、100vh照片、家庭月、两栏专题和完整菜单。"
      },
      {
        "title": "Rijksmuseum Accessibility Statement",
        "url": "https://www.rijksmuseum.nl/en/visit/accessibility/accessibility-statement",
        "type": "规范",
        "note": "官方说明网站同时服务参观/票务与在线收藏/故事，目标WCAG2.2 AA，但列举图上文字对比、菜单和自动轮播等未达项。不能宣称原站全面合规。"
      },
      {
        "title": "W3C WAI Disclosure Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
        "type": "规范",
        "note": "展开按钮控制内容可见性，按钮状态应对应展开/折叠；本地使用原生details/summary或button加aria-expanded。是实现规范，不能证明机构使用该设计理论。"
      }
    ],
    "prompt": "请以2026-10-07实访的Rijksmuseum英语首页为忠实局部研究对象，使用本地assets内官方夜巡观众照片、家庭月照片、两张预告照片、完整Rijksmuseum白色SVG字标和Normal/Bold品牌字体。桌面首节100vh：上覆导航从左侧汉堡和搜索起，右侧橙色方角票务；巨幅字标距顶约96px、左右留5.5%，底缘左放白底小状态与23px大写标题和17px正文，右放合作方标识。第二节铺满家庭月照片，第三节改为两列竖向摄影预告，最后才放实用参观信息。实现全屏导航覆盖层、Escape关闭、搜索弹窗筛选本地章节，以及展览预览弹窗；票务仅链接官网。390px手机字标一行、隐藏次要导航和赞助方，两列预告堆叠，正文不溢出。禁止自动轮播与滚动劫持；prefers-reduced-motion关闭平滑滚动和过渡。官方资产署名置页末，不把研究说明放在英雄区。",
    "negativePrompt": "不要虚构品牌，不用抽象blob代替夜巡摄影，不把每一节包装成圆角卡片，不用通用SaaS居中巨字模板。",
    "demo": "demos/rijksmuseum-art/index.html",
    "preview": "previews/rijksmuseum-art.jpg",
    "referencePreview": "research/screenshots/rijksmuseum-art-source.jpg",
    "research": "research/rijksmuseum-art.md",
    "exercise": "替换一组经过授权的场所摄影，保留文字与图像的职责分工；检查手机裁切是否保住人物与作品。",
    "composition": {
      "color": "照片本身提供丰富色彩，白色文字和橙色票务是UI的少数稳定颜色。",
      "typography": "巨大完整SVG字标与小尺度大写短标题形成尺度差，品牌正文保持窄体节奏。",
      "layout": "导航上覆摄影；首屏100vh，底缘左文右合作方；手机隐藏次要导航与合作方。",
      "imagery": "夜巡观众、家庭月、工作室与纺织照片均来自官方首页公开URL。",
      "shape": "矩形票务、方角专题、细小白底状态标记；不泛化为通用圆角卡片。",
      "hierarchy": "品牌字标建立识别，作品摄影建立情境，购票按钮和底缘标题引导下一步。",
      "motion": "自然滚动连续摄影；菜单为覆盖层。未声称原站采用滚动锁屏或滚动劫持。",
      "coherence": "统一摄影铺满、底缘文字与品牌字形；两栏预告改变内容节奏而非重复组件。"
    },
    "referenceUrl": "https://www.rijksmuseum.nl/en",
    "implementation": "reference-study",
    "fidelity": "demos/rijksmuseum-art/fidelity.md",
    "assetManifest": "demos/rijksmuseum-art/assets-manifest.json",
    "edition": "2026-10-07；英语公开官网局部"
  },
  {
    "id": "met-museum",
    "order": 27,
    "title": "The Met · 编辑式展览与馆藏陈列",
    "subtitle": "A museum homepage as an editorial exhibition shelf",
    "category": "艺术/文化",
    "country": "美国",
    "tags": [
      "美国",
      "艺术馆",
      "衬线字体",
      "编辑排版",
      "展览海报",
      "The Met"
    ],
    "summary": "以官网英文主页为基准，复现建筑摄影、Austin衬线欢迎区、四列参观信息、无卡框横向展览海报和馆藏作品陈列。",
    "accent": "#e4002b",
    "background": "#ffffff",
    "principles": [
      "大建筑照片先给地点与尺度，再在独立白底区域提供欢迎语与行动。",
      "Austin衬线大标题承载文化语气，Inter无衬线负责操作和实用信息。",
      "参观成本、交通、导览和开放状态并列而不盖在照片上。",
      "海报本身已含展览视觉，外围保持简洁、方角、图下标签。"
    ],
    "productFocus": "到访纽约实体馆、正在展览与代表馆藏。先解决实用参观问题，再让展览海报和作品自然展开选择。",
    "interaction": [
      "顶层Visit/Exhibitions/Art打开对应链接面板；手机菜单整合入口。",
      "左右按钮操作横向海报/馆藏展架，触控原生横向浏览。",
      "展览预览弹窗切换官方海报与观察时展期；搜索弹窗筛选章节，语言弹窗链接官方中文页。"
    ],
    "theme": "白底、Met红、黑灰编辑排版；建筑摄影、衬线标题与方角海报形成文化机构语气。",
    "constraints": [
      "标题用官方Austin Medium，操作文用官方Inter字体；不可用夸张科技字体替代。",
      "首屏建筑图与欢迎标题分开；桌面双CTA右对齐，手机转单列。",
      "四列实用信息在手机堆叠；展览依靠横向overflow，不让整个页面溢出。",
      "展览海报保留原视觉，不在图片上重复绘制标题或大渐变遮罩。",
      "日期和闭馆信息标注观察日，不由当前机器日期制造未核验开放状态。",
      "官方开放许可只覆盖带OA条件的藏品资源，不涵盖全部品牌、字体与主页摄影。"
    ],
    "useCases": [
      "大型博物馆门户",
      "展览信息目录",
      "出版与编辑型机构首页"
    ],
    "avoid": [
      "缺少真实作品的纯视觉着陆页",
      "需要自动滚动制造戏剧效果的产品页"
    ],
    "tokens": {
      "palette": [
        "#ffffff",
        "#292929",
        "#606060",
        "#e4002b"
      ],
      "type": "官方Austin Medium用于欢迎标题；官方Inter Latin用于正文与按钮。",
      "layout": "建筑宽幅摄影 → 白底大标题双CTA → 4列实用信息 → 横向展览/馆藏 → 会员区域。",
      "motion": "手动横向展架与原生锚点，无自动切换；reduced-motion切换为即时。"
    },
    "sources": [
      {
        "title": "The Met official English homepage",
        "url": "https://www.metmuseum.org/en",
        "type": "实例",
        "note": "2026-10-07 CUA实访；官网按浏览器语言初转中文，明确访问/en得到英语结构；Root保存干净IAB1440×1000截图。"
      },
      {
        "title": "The Met Image and Data Resources",
        "url": "https://www.metmuseum.org/policies/image-resources",
        "type": "规范",
        "note": "Open Access政策区分公众领域作品与仍受限制作品，识别OA标记。这里不将官方海报、字体或主页摄影称为CC0。"
      },
      {
        "title": "W3C WAI Disclosure Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
        "type": "规范",
        "note": "展开按钮控制内容可见性，按钮状态应对应展开/折叠；本地使用原生details/summary或button加aria-expanded。是实现规范，不能证明机构使用该设计理论。"
      }
    ],
    "prompt": "以2026-10-07的The Met英语首页为对象制作局部研究，必须使用assets内真实建筑观众摄影、四张当前展览海报、三张代表馆藏、官方Met字标、Austin Medium和Inter字体。首段为宽幅建筑照片，上覆透明渐变导航；第二段在白底安排左侧约68px Austin衬线欢迎标题与右侧红色/细边双CTA，之后四列图标加实用参观信息，明确观察日。展览区不采用卡片底色或大圆角：横向海报带下方标题、展期，下一张露出；馆藏图用较高比例和较小题注；会员区域才使用轻边框大区域。实现顶层导航展开、本地章节搜索、展览预览弹窗、手动左右浏览；到访/会员操作打开官方站点。390px改白色粘顶导航、43px标识、单列标题和信息，海报占可视宽约86%，横向滚动限定展架。保留prefers-reduced-motion即时滚动、原生dialog Escape、清晰焦点。研究说明和版权仅放页末，不占据主页欢迎区。",
    "negativePrompt": "不要深色科技SaaS模板，不用统一圆角卡片阵列，不虚构藏品或展期，不自动轮播，不把Open Access许可扩大到品牌资产。",
    "demo": "demos/met-museum/index.html",
    "preview": "previews/met-museum.jpg",
    "referencePreview": "research/screenshots/met-museum-source.jpg",
    "research": "research/met-museum.md",
    "exercise": "用另一组真实授权展览替换四张海报，仍让每张海报保有自身视觉；检测信息区在手机是否易读。",
    "composition": {
      "color": "白底黑灰字和红色操作层，图像保持展览自己的颜色。",
      "typography": "Austin衬线大标题与Inter目录型小文本产生编辑层级。",
      "layout": "建筑照片约725px高；欢迎区左右分工；展架外框为白底而不是UI卡片。",
      "imagery": "官方Sanity CDN建筑/展览海报与Met collection API藏品图，均本地化。",
      "shape": "方角海报与细边CTA，会员区域仅一个轻边框圆角区域。",
      "hierarchy": "照片定位实体空间，欢迎区提供行动，实用信息减轻到访决策，展览海报吸引浏览。",
      "motion": "横向展览保留相邻海报露出提示浏览；本地增手动左右按钮和预览弹窗。",
      "coherence": "字形分工、Met红操作与白底图下文字一致，馆藏照片与海报使用不同图像比例。"
    },
    "referenceUrl": "https://www.metmuseum.org/en",
    "implementation": "reference-study",
    "fidelity": "demos/met-museum/fidelity.md",
    "assetManifest": "demos/met-museum/assets-manifest.json",
    "edition": "2026-10-07；英语公开官网局部"
  },
  {
    "id": "philharmonie-music",
    "order": 28,
    "title": "巴黎爱乐厅 · 音乐展与音乐会详情",
    "subtitle": "Video Games & Music + Carte blanche à George Benjamin",
    "category": "艺术/文化",
    "country": "法国",
    "tags": [
      "法国",
      "音乐厅",
      "音乐展",
      "音乐会",
      "活动详情",
      "侧栏票务"
    ],
    "summary": "真实实访Video Games & Music展览详情、季节目与音乐会，复现蓝色横幅、中心品牌标识、上浮票务侧栏与活动介绍；另包含George Benjamin音乐会节目。",
    "accent": "#be244f",
    "background": "#f0f0f0",
    "principles": [
      "活动主视觉与日期先建立情境，票务侧栏与介绍承担不同任务。",
      "中心下垂品牌标识贯穿两层导航，区别于左角产品Logo。",
      "蓝色图像渐变保持白色标题可读，粉红/酒红胶囊承担预约操作。",
      "展览以现场摄影证明体验，音乐会以人物、阵容和节目单提供不同内容。"
    ],
    "productFocus": "音乐展的互动体验和访问时间，以及音乐会的日期、演出阵容与节目。右侧票务区域支持快速查阅时间/价格，正文保留观展体验和真实图片。",
    "interaction": [
      "时段、Tarifs与无障碍详情为原生折叠内容，可键盘展开。",
      "展览图库前后按钮切换两张官方现场摄影并更新计数。",
      "音乐会Programme & distribution展开真实节目单；主菜单定位展览/音乐会/交通，返回顶部按钮使用原生滚动。"
    ],
    "theme": "海军蓝、白色内容面板、酒红票务胶囊和官方Philharmonique字形，活动主视觉提供游戏色彩。",
    "constraints": [
      "使用官方Video Games & Music主图、展览摄影、George Benjamin摄影与sprite品牌标识。",
      "桌面主图625px高，左正文约2/3，右侧白色16px圆角票务面板跨越主图和内容边界。",
      "手机导航精简，票务面板进入正常流优先显示，不粘在窄屏覆盖正文。",
      "音乐会日期须来自真实详情；历史Juke-box场次不当作未来可预订事件。",
      "原站视频受第三方cookie控制，本地不嵌入YouTube或追踪脚本。",
      "只有原生滚动，无闪烁像素特效；reduce motion关闭平滑滚动。"
    ],
    "useCases": [
      "文化活动详情",
      "音乐会/音乐展门户",
      "有丰富节目单的票务介绍"
    ],
    "avoid": [
      "需要仿造售票结果的演示",
      "把展览和音乐会内容抽象成同样卡片的页面"
    ],
    "tokens": {
      "palette": [
        "#001b3b",
        "#ffffff",
        "#f0f0f0",
        "#be244f",
        "#fdafe3"
      ],
      "type": "大写标题使用官方 Philharmonique Regular/Bold；正文使用 Arial，原站 Source Sans Pro 未下载。Philharmonique 缺小写字形，不用于正文。",
      "layout": "双层导航中轴字标 → 蓝色横幅 → 2:1介绍/上浮sticky票务 → 当前音乐会 → 交通信息。",
      "motion": "图库为手动切换，native details展开；无自动影像或滚动劫持。"
    },
    "sources": [
      {
        "title": "Video Games & Music exhibition — official detail",
        "url": "https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music",
        "type": "实例",
        "note": "2026-10-07 CUA实访桌面/390px；点击Horaires/Tarifs核验内容，主图和现场摄影从当前DOM提取。展览日期Apr2–Nov1 2026。"
      },
      {
        "title": "Philharmonie saison 26/27",
        "url": "https://philharmoniedeparis.fr/fr/programmation/saison-26-27",
        "type": "实例",
        "note": "实访官方季节目，发现音乐会详情链接；不将所有季节目当作当前未结束场次。"
      },
      {
        "title": "Carte blanche à George Benjamin — official detail",
        "url": "https://philharmoniedeparis.fr/fr/activite/concert/29485-carte-blanche-george-benjamin",
        "type": "实例",
        "note": "web与CUA双核验23 Oct2026 20h00、阵容、四部节目及约2h含1intermission；正式图片源来自CDN。"
      },
      {
        "title": "W3C WAI Disclosure Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
        "type": "规范",
        "note": "展开按钮控制内容可见性，按钮状态应对应展开/折叠；本地使用原生details/summary或button加aria-expanded。是实现规范，不能证明机构使用该设计理论。"
      }
    ],
    "prompt": "以2026-10-07实访的巴黎爱乐厅Video Games & Music法语展览详情为基准，使用官方游戏手柄字母主视觉、两张Joachim Bertrand现场摄影、官方Philharmonique Regular/Bold大写标题与sprite字标；正文使用完整小写字形的Arial替代原站Source Sans Pro，禁止将大写展示字体套到正文，另将真实George Benjamin音乐会作为相关文化内容。桌面保留48px深蓝快速导航、105px白色主导航、中间174×197px下垂品牌区域；625px活动主图加下缘海军蓝渐变，左下38px大写活动名和23px日期，右侧白色16px圆角票务面板上浮约254px。正文左宽右窄约2:1，侧栏原生sticky，但禁止滚动锁屏。票务包含真实日期、预约官网链接和Horaires/Tarifs/无障碍折叠行；图库手动前后切两张原图。音乐会区用George Benjamin真人图、23Oct2026 20h00、阵容和可展开的四部节目。390px简化导航中轴字标、主图约380px，票务进入正常文档流置正文之前，图库与节目单单列。prefers-reduced-motion关闭平滑滚动，不加载追踪和第三方视频。版权与本地学习说明放页末，预约跳转官方站点。",
    "negativePrompt": "不要把音乐展做成像素游戏伪官网，不捏造演出日期，不模拟购票成功，不用同一软件产品模板排列所有文化内容，不将Dark Reader黑底当作原始品牌设计。",
    "demo": "demos/philharmonie-music/index.html",
    "preview": "previews/philharmonie-music.jpg",
    "referencePreview": "research/screenshots/philharmonie-music-source.jpg",
    "research": "research/philharmonie-music.md",
    "exercise": "再选择一场经过官方核验的音乐会，对照节目/阵容结构，保留展览与音乐会信息表达差异。",
    "composition": {
      "color": "官方CSS核验海军蓝#001b3b、白色面板、#be244f票务和#fdafe3支持入口。",
      "typography": "官方Philharmonique标题大写，正文保持分段；原站部分正文Source Sans Pro，本地该部分有字体差异。",
      "layout": "主视觉左下活动名，右侧票务面板上浮；长正文与侧栏分工，手机票务回到文档流。",
      "imagery": "真实游戏手柄字母CG主图、Joachim Bertrand展览现场、Matthew Lloyd的George Benjamin摄影。",
      "shape": "品牌标识下垂矩形、16px圆角内容/票务块、长胶囊按钮；非所有内容统一卡片。",
      "hierarchy": "大活动名和日期识别主题，预约按钮和折叠时间/价格解决到访问题，照片和节目单提供内容深度。",
      "motion": "保留菜单、折叠详情和手动图库；原站音乐会自动轮播被改为静态照片，差异明确说明。",
      "coherence": "统一中轴品牌与蓝色基础，展览用互动现场图、音乐会用阵容/节目单，跨内容类型保持不同表达。"
    },
    "referenceUrl": "https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music",
    "implementation": "reference-study",
    "fidelity": "demos/philharmonie-music/fidelity.md",
    "assetManifest": "demos/philharmonie-music/assets-manifest.json",
    "edition": "2026-10-07；法语展览与音乐会详情",
    "referencePreviewNote": "原站截图受 Dark Reader 扩展影响；本地原配色依据官方 CSS。详见复现说明。"
  }
];
