window.DESIGN_ATLAS = [
  {
    "id": "apple-product",
    "order": 1,
    "title": "Apple · 产品即主角",
    "subtitle": "Product as the hero",
    "category": "产品",
    "tags": [
      "Apple",
      "极简",
      "工业设计",
      "产品叙事",
      "配置器"
    ],
    "summary": "通过单一产品主视觉、极短主张、分章节特写和紧邻产品的选择器，把材质、体验与购买决策串成一条清晰路径。",
    "accent": "#b56b46",
    "background": "#f5f5f7",
    "principles": [
      "每屏围绕一个产品收益组织信息，硬件本体先于装饰。",
      "宽留白与大字形成节奏，细节说明在后续章节逐步展开。",
      "材质、轮廓与部件特写承担证明角色，文案不抢视觉主位。",
      "选择器与当前选择的实物反馈保持空间邻近。"
    ],
    "productFocus": "本体轮廓先建立辨识度；后续用声学结构、舒适度和续航章节解释主张，最后以规格比较支持决策。",
    "interaction": [
      "颜色按钮即时更新耳机外壳与颜色名称，并保留文字选择状态。",
      "聆听模式切换改变声波展示和解释文案。",
      "锚点导航保留浏览器原生滚动，不劫持滚轮。"
    ],
    "theme": "白色展厅与低饱和暖金属：克制、精确、有触感。深色声学章节负责制造叙事停顿。",
    "constraints": [
      "产品图形必须有可辨识的部件与材质，不能用抽象球体替代。",
      "视觉每节只有一个中心主张；正文不超过易读行宽。",
      "颜色不能独自承担状态，提供名称与aria-pressed。",
      "小屏缩小产品、纵向排列，不把宽屏裁切强加给手机。",
      "短反馈动效可关闭，静止时也完整可读。"
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
        "#f5f5f7",
        "#1d1d1f",
        "#b56b46",
        "#527364"
      ],
      "type": "系统无衬线；主标题 56–88px，正文 17–21px，紧凑字距。",
      "layout": "居中展厅首屏，宽幅产品图；后续全宽章节与三列规格。",
      "motion": "150–250ms 颜色/透明度反馈；prefers-reduced-motion 下关闭过渡。"
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
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构高端头戴耳机品牌 SONO 制作一页可运行的产品宣传 demo，学习 Apple 的产品中心叙事，而不复制标志、照片与文案。白色展厅首屏采用居中大标题、极短副标题及大比例原创耳机 SVG，SVG 必须包含头梁、左右耳罩、金属调节臂、衬垫与高光。提供三个具名颜色按钮，切换必须真实改变产品外壳、选中样式和文本。后续分成声学结构、全天舒适、规格决策三个章节，每节有一个明确收益和对应证据图形。声学章节用深色背景和可操作聆听模式切换。系统字体、宽留白、少量蓝色操作提示；手机端用纵向布局并保留所有控件。语义 HTML、可见焦点、aria-pressed、减少动效支持。不要依赖 CDN 或联网素材。所有产品规格标为虚构演示。\n\n要素协调要求：白色留白、短标题、圆润硬件和轻反馈都围绕“安静、舒适”展开；产品配色变化不会改变正文层级。",
    "negativePrompt": "不要复制苹果商标或原图；不要全屏自动视频、滚轮劫持、无功能购买按钮、泛用渐变球体、大量阴影卡片。",
    "exercise": "将 SONO 耳机替换为一款台灯：保留产品叙事逻辑，改造颜色切换为色温切换，并为光线收益补充证据。",
    "demo": "demos/apple-product/index.html",
    "preview": "previews/apple-product.jpg",
    "research": "research/apple-product.md",
    "composition": {
      "color": "白灰承担环境，陶土/石墨/苔绿集中在耳机本体；少量蓝色标记行动。",
      "typography": "系统无衬线；主标题 56–88px，正文 17–21px，紧凑字距。",
      "layout": "居中展厅首屏，宽幅产品图；后续全宽章节与三列规格。",
      "imagery": "大型原创耳机与声学剖面作为产品证据。",
      "shape": "圆弧、软垫与柔和阴影延续硬件的柔软触感。",
      "hierarchy": "短主张 → 产品外观 → 体验章节 → 规格，先体验后细节。",
      "motion": "150–250ms 颜色/透明度反馈；prefers-reduced-motion 下关闭过渡。",
      "coherence": "白色留白、短标题、圆润硬件和轻反馈都围绕“安静、舒适”展开；产品配色变化不会改变正文层级。"
    }
  },
  {
    "id": "stripe-platform",
    "order": 2,
    "title": "Stripe · 复杂平台的轻盈叙事",
    "subtitle": "Complex systems, clear surfaces",
    "category": "产品",
    "tags": [
      "Stripe",
      "平台",
      "渐变",
      "网格",
      "产品演示",
      "收益计算"
    ],
    "summary": "以细网格约束充满能量的色彩，用实际业务模型与产品界面，把复杂基础设施转译成看得懂、可操作的结果。",
    "accent": "#635bff",
    "background": "#f7fafc",
    "principles": [
      "先讲业务结果，再呈现组成这些结果的工具。",
      "装饰色彩集中在视觉舞台，业务内容保持高对比。",
      "产品演示包含交易、收款和数据状态，避免空壳界面。",
      "模块组合关系与业务模型同时呈现，帮助理解平台性。"
    ],
    "productFocus": "通过平台业务选择器展示不同资金流；订单输入器用可检查的计算式把抽象增长变成量化场景。",
    "interaction": [
      "业务模型按钮切换资金流、解释文字与收款界面。",
      "月订单量滑块即时更新月收入、平台费用与净入账。",
      "架构锚点连接首屏承诺、模块解说和计算验证。"
    ],
    "theme": "金融科技的精确与流动：深海蓝文字、紫色操作、少量橙粉彩带与细结构线。",
    "constraints": [
      "当前官网视觉与历史文章分开记录，不能把2017案例当作2026首页。",
      "渐变只作框架与动势，正文须有稳定底色。",
      "收益计算公开单价、费率和演示身份，避免让虚构指标看似事实。",
      "业务按钮必须真实改变演示内容。",
      "小屏让金融流程顺序堆叠，表格与数值保持可读。"
    ],
    "useCases": [
      "支付基础设施",
      "开发者平台",
      "多模块SaaS",
      "商业运营工具"
    ],
    "avoid": [
      "只有彩色渐变而无产品证明",
      "未声明的真实财务承诺",
      "背景动效干扰阅读"
    ],
    "tokens": {
      "palette": [
        "#0a2540",
        "#635bff",
        "#f7fafc",
        "#ff987a",
        "#91e4e0"
      ],
      "type": "系统无衬线；大标题 56–78px，业务界面 12–15px，数字等宽。",
      "layout": "四等分细结构线；首屏左文右资金流；两栏主体，三列能力模块。",
      "motion": "业务切换 180ms；动态图形不持续自动播放；减少动效时静态更新。"
    },
    "sources": [
      {
        "title": "Stripe 官方首页",
        "url": "https://stripe.com/",
        "type": "实例",
        "note": "2026-10-07 文字与截图核验；正文业务模型、大标题、纤维状彩带与细网格。"
      },
      {
        "title": "Connect: behind the front-end experience",
        "url": "https://stripe.com/blog/connect-front-end-experience",
        "type": "理论",
        "note": "2017-06-19 第一方设计说明：复杂能力轻简呈现、Grid、产品情境、可见时启动动效。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构支付平台 TIDAL 制作金融科技宣传页，提取 Stripe 的清晰业务叙事与细网格结构，不复制品牌。使用深蓝标题、白色主底、紫色操作与边缘原创彩带，首屏左侧业务承诺，右侧为真实可读的支付仪表板与资金流，展示订单、支付确认、分账与净入账。提供“在线商店 / 创作者平台 / 订阅业务”三个按钮，切换时仪表板产品、资金流节点和描述同步变化。第二节展示支付、计费、风控三个模块如何组成业务。第三节为月度收益计算器：滑块输入订单数，明确单价 ¥128、平台费率2.9%和每单 ¥1 固定费的虚构模型，实时输出收入、费用和净额；说明仅为设计演示。手机端按逻辑顺序堆叠，焦点清楚、数值可访问、减少动效。自绘 SVG 与原生 JS，无CDN。\n\n要素协调要求：有表现力的色带由细网格和稳定两栏收住；演示界面、数字与行动色共同解释“收入如何流动”。",
    "negativePrompt": "不要只有装饰渐变、假截图、无效CTA、伪造客户标志、未标明模型的金融承诺、强制长滚动动画。",
    "exercise": "给计算器增加退货率输入，同时保证三项输出的关系能被用户解释。",
    "demo": "demos/stripe-platform/index.html",
    "preview": "previews/stripe-platform.jpg",
    "research": "research/stripe-platform.md",
    "composition": {
      "color": "淡蓝灰作为背景，紫色用于操作；彩色带提供品牌能量但不抢正文。",
      "typography": "系统无衬线；大标题 56–78px，业务界面 12–15px，数字等宽。",
      "layout": "四等分细结构线；首屏左文右资金流；两栏主体，三列能力模块。",
      "imagery": "收益曲线、资金界面与业务模型让抽象能力可见。",
      "shape": "细结构线与轻卡片阴影使数据、界面和图形共享精度感。",
      "hierarchy": "业务结果标题 → 产品UI → 能力结构 → 可计算模型。",
      "motion": "业务切换 180ms；动态图形不持续自动播放；减少动效时静态更新。",
      "coherence": "有表现力的色带由细网格和稳定两栏收住；演示界面、数字与行动色共同解释“收入如何流动”。"
    }
  },
  {
    "id": "linear-workflow",
    "order": 3,
    "title": "Linear · 克制的工作流精度",
    "subtitle": "Precision with low visual noise",
    "category": "产品",
    "tags": [
      "Linear",
      "深色",
      "工作流",
      "高信息密度",
      "精度"
    ],
    "summary": "以低饱和深灰、明确的任务层级和真实工作界面表达效率；导航和边框退后，当前任务成为视觉焦点。",
    "accent": "#8b87ef",
    "background": "#101112",
    "principles": [
      "以任务对象与流程呈现产品，而非堆砌功能形容词。",
      "辅助导航降低视觉权重，主任务保持清楚对比。",
      "信息密度来自对齐、节奏与一致控件，不能靠缩小文字。",
      "轻边框只解释必要分组，避免每个元素都加框。"
    ],
    "productFocus": "完整呈现任务标题、状态、负责人和验收条件，让用户实际推动任务并观察项目进度变化。",
    "interaction": [
      "点击任务打开其详情，详情栏与任务列表对应。",
      "推进状态按钮让任务从待办到进行中再到完成，并更新进度。",
      "筛选切换所有任务与未完成任务；空结果有明确提示。"
    ],
    "theme": "接近黑色的工作空间、柔和暖灰与少量淡紫强调：安静、专注、可靠。",
    "constraints": [
      "深色正文必须足够清晰，不能照搬官网氛围遮罩到可操作UI。",
      "任务状态同时有文字与符号，不单靠色彩。",
      "每个任务操作维持稳定位置，不能乱跳。",
      "小屏将侧栏隐藏为上下文标题，任务详情纵向展开。",
      "细边框和阴影服从结构，禁用泛滥紫色光晕。"
    ],
    "useCases": [
      "项目管理",
      "开发者工具",
      "研发协作",
      "工作流产品"
    ],
    "avoid": [
      "满屏霓虹",
      "只有假看板没有任务语义",
      "过低对比的小字"
    ],
    "tokens": {
      "palette": [
        "#101112",
        "#1a1b1e",
        "#e7e7ea",
        "#8b87ef",
        "#91929a"
      ],
      "type": "系统无衬线；大标题 52–72px；工作界面 13–15px，任务正文 16px。",
      "layout": "左对齐首屏；宽幅可操作三栏工作界面；路线图和原则分节。",
      "motion": "120–180ms 状态反馈；禁止持续漂浮，减少动效时禁用过渡。"
    },
    "sources": [
      {
        "title": "Linear 官方首页",
        "url": "https://linear.app/",
        "type": "实例",
        "note": "2026-10-07 核验；左对齐主张、真实产品界面、Intake/Plan/Build工作阶段。"
      },
      {
        "title": "How we redesigned the Linear UI (part II)",
        "url": "https://linear.app/now/how-we-redesigned-the-linear-ui",
        "type": "理论",
        "note": "2024-03-28 第一方：减少噪音、保持对齐、增加层级与导航密度。"
      },
      {
        "title": "A calmer interface for a product in motion",
        "url": "https://linear.app/now/behind-the-latest-design-refresh",
        "type": "理论",
        "note": "2026-03-12 第一方：导航退后、弱化边框、暖灰低饱和。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构研发协作工具 VECTOR 创建一页深色工作流宣传 demo，参考 Linear 的精度、安静层级和真实任务对象，不复制标志。首屏左对齐大标题和简短主张，下面是可操作工作界面：低权重项目侧栏、任务列表、选中任务详情。建立至少四个具有编号、负责人、状态和验收标准的真实演示任务。点击任务更新详情；推进按钮使待办→进行中→完成，并更新完成百分比与计数；提供只看未完成筛选和空状态。后续用明确路线图与三条产品原则证明产品用途。配色接近黑色和暖灰，紫色仅用于选中或核心操作，正文对比清楚，边框微弱但结构准确。手机端列表和详情纵向，隐藏非必要侧栏，所有按钮可键盘操作，aria-live反馈，减少动效。无需联网资源。\n\n要素协调要求：导航与边框退后，任务标题、状态和下一步保持突出；字体、密度与低饱和颜色共同支持专注。",
    "negativePrompt": "不要用霓虹光晕替代结构，不要不可读的暗灰字，不要空白假面板、无状态同步、复杂自动轮播或无效免费注册。",
    "exercise": "加入“阻塞”任务状态，设计能同时表达阻塞原因与项目进度的界面。",
    "demo": "demos/linear-workflow/index.html",
    "preview": "previews/linear-workflow.jpg",
    "research": "research/linear-workflow.md",
    "composition": {
      "color": "深灰背景分层，浅色正文和少量淡紫用于当前任务与操作。",
      "typography": "系统无衬线；大标题 52–72px；工作界面 13–15px，任务正文 16px。",
      "layout": "左对齐首屏；宽幅可操作三栏工作界面；路线图和原则分节。",
      "imagery": "真实可操作任务列表和详情作为主要图像。",
      "shape": "弱化边框、少量圆角、紧密列表共同降低视觉噪声。",
      "hierarchy": "左对齐主张 → 工作区 → 功能解释 → 试用操作。",
      "motion": "120–180ms 状态反馈；禁止持续漂浮，减少动效时禁用过渡。",
      "coherence": "导航与边框退后，任务标题、状态和下一步保持突出；字体、密度与低饱和颜色共同支持专注。"
    }
  },
  {
    "id": "notion-editorial",
    "order": 4,
    "title": "Notion · 有人情味的模块化工作台",
    "subtitle": "Human stories, modular thinking",
    "category": "产品",
    "tags": [
      "Notion",
      "编辑式",
      "手绘",
      "模块化",
      "文档"
    ],
    "summary": "以大字主张和有故事的手绘图解降低抽象工具的距离感，再用真实文档模块与舒适阅读节奏证明灵活性。",
    "accent": "#1677df",
    "background": "#fffdf9",
    "principles": [
      "人物与工具共同构成故事，插画解释思考而非纯装饰。",
      "大字标题与紧凑行动区帮助用户理解用途。",
      "模块化概念用可切换文档内容与块类型具体化。",
      "段落留出呼吸，连续列表紧密分组，保持阅读节奏。"
    ],
    "productFocus": "通过团队手册、项目计划、创作笔记三种文档模块呈现同一工具的不同用途；清单勾选让页面真正像工具。",
    "interaction": [
      "文档标签切换标题、页面图标与完整模块内容。",
      "检查清单可勾选并即时更新完成提示。",
      "原生details展示阅读问题答案；行动锚点进入工作台。"
    ],
    "theme": "奶白纸张、墨黑手绘、淡蓝强调与一小块明黄：聪明、温暖、可亲近。",
    "constraints": [
      "手绘线条允许轻微不规则，文字和交互必须规整清晰。",
      "插画不得复制Notion现有人物，需要原创情境。",
      "内容块保持语义与节奏，不能把每行都做成独立卡片。",
      "选中文档有文字与背景提示；勾选器使用原生input。",
      "移动端工具列换行，插画压缩，文档维持可读行宽。"
    ],
    "useCases": [
      "知识管理",
      "文档协作",
      "个人创作工具",
      "教育产品"
    ],
    "avoid": [
      "把手绘当作随机涂鸦",
      "全文同一间距",
      "照搬品牌人物与图标"
    ],
    "tokens": {
      "palette": [
        "#fffdf9",
        "#20201e",
        "#1677df",
        "#e8f2fc",
        "#ffd851"
      ],
      "type": "标题系统无衬线搭配少量Georgia手记；大标题60–84px，文档正文16px。",
      "layout": "标题与原创插画并列；下方完整文档工作台；编辑式FAQ收尾。",
      "motion": "标签反馈150ms，文档无夸张缩放；减少动效时静态切换。"
    },
    "sources": [
      {
        "title": "Notion 官方首页",
        "url": "https://www.notion.com/",
        "type": "实例",
        "note": "2026-10-07 文字与截图核验：大字、浅蓝动作词、手绘角色与真实工作台。"
      },
      {
        "title": "The thinking behind our latest brand campaign",
        "url": "https://www.notion.com/blog/the-thinking-behind-our-latest-brand-campaign",
        "type": "理论",
        "note": "2024-07-10 第一方：插画驱动叙事、角色近景、营销原色。"
      },
      {
        "title": "Updating the design of Notion pages",
        "url": "https://www.notion.com/blog/updating-the-design-of-notion-pages",
        "type": "理论",
        "note": "2026-03-18 第一方：标准化间距与相邻列表块紧密分组。"
      },
      {
        "title": "Notion brand usage guidelines",
        "url": "https://notion.notion.site/Notion-s-brand-usage-guidelines-How-to-use-Notion-s-brand-in-your-marketing-30a5510bc5644475a28844e427008bee",
        "type": "规范",
        "note": "原创品牌居主位，不能将Notion写入自己的产品名；本demo使用虚构品牌。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构模块化知识工具 MARGIN 制作一页有人情味的编辑式宣传 demo，提取 Notion 的大字主张、手绘叙事与文档节奏。奶白底与墨黑文字，浅蓝用于动作提示，明黄只点亮插画。首屏左侧大标题“给想法，一个生长的地方”，右侧自绘黑线插画：桌前创作者、笔记、植物和逐步连接的纸片，必须是有因果关系的原创情境。第二节建立可操作文档工作台，用按钮切换团队手册、项目计划、创作笔记三份文档；每份有标题、段落、清单和小表格。清单用原生复选框并同步完成计数。段落间距舒展、相邻清单紧密，不给每行加卡片。第三节展示三个阅读/协作原则，最后原生details FAQ。小屏上下排列，工作台按钮可换行，语义结构、焦点可见、减少动效、无CDN或远程素材。\n\n要素协调要求：宽松段落和紧密清单形成阅读节奏；手绘人物提供亲近感，正文与模块使用稳定对齐保持实用。",
    "negativePrompt": "不要复制Notion人物，不要随机涂鸦、浮夸渐变、无效注册按钮、巨型空白文档、全页面统一大卡片。",
    "exercise": "新增“课堂笔记”文档类型，保留相邻列表节奏并为知识回顾增加可用交互。",
    "demo": "demos/notion-editorial/index.html",
    "preview": "previews/notion-editorial.jpg",
    "research": "research/notion-editorial.md",
    "composition": {
      "color": "暖白与黑字承担阅读，蓝色标记行动，少量原色用于图解。",
      "typography": "标题系统无衬线搭配少量Georgia手记；大标题60–84px，文档正文16px。",
      "layout": "标题与原创插画并列；下方完整文档工作台；编辑式FAQ收尾。",
      "imagery": "原创手绘工作人物连接人的故事，文档模块证明工具能力。",
      "shape": "细边框、轻图标与模块化白面板保持文档的开放感。",
      "hierarchy": "工作主张 → 人物图解 → 可切换文档 → 使用问答。",
      "motion": "标签反馈150ms，文档无夸张缩放；减少动效时静态切换。",
      "coherence": "宽松段落和紧密清单形成阅读节奏；手绘人物提供亲近感，正文与模块使用稳定对齐保持实用。"
    }
  },
  {
    "id": "zelda-world",
    "order": 5,
    "title": "世界观 · 沉浸探索",
    "subtitle": "ZELDA / WORLD AS THE HERO",
    "category": "游戏/IP",
    "tags": [
      "塞尔达",
      "章节叙事",
      "世界观",
      "场景探索"
    ],
    "summary": "先让人进入世界，再用章节与可探索场景解释它的独特玩法。",
    "accent": "#d1c797",
    "background": "#163c3f",
    "principles": [
      "让世界场景成为视觉主角，标题以留白和尺度建立焦点。",
      "将抽象卖点拆成世界、探索方式、行动入口三个叙事阶段。",
      "使用前后景层级建立空间；界面控件保持稳定、低干扰。"
    ],
    "productFocus": "原创群岛场景先展示探索氛围，地区切换把天空、森林与遗迹的差异转化为可见内容，后续再解释探索机制。",
    "interaction": [
      "地区按钮同步切换场景、色调、地标与说明。",
      "章节导航跳转到真实内容区，保留浏览器自然滚动。",
      "行动按钮生成本地出发清单，不伪装成真实游戏下载。"
    ],
    "theme": "宁静、未知、古老文明；青绿夜色与暖金文字形成探索感。",
    "constraints": [
      "世界素材必须承担叙事，不能以无意义粒子替代。",
      "标题、正文与行动按钮须和景色保持足够对比。",
      "不劫持滚轮、不自动播放声音。",
      "手机采用自然文档顺序，场景可以缩放但文字不能缩成图片。",
      "减少动态效果时取消过渡，场景信息仍完整。"
    ],
    "useCases": [
      "开放世界游戏",
      "幻想文学与IP",
      "旅行目的地"
    ],
    "avoid": [
      "数据密集后台",
      "高频交易操作"
    ],
    "tokens": {
      "palette": [
        "#163c3f",
        "#27605b",
        "#d1c797",
        "#f4f0df"
      ],
      "type": "Georgia 衬线英文 + 系统中文；标题宽松，正文稳定",
      "layout": "首屏横向世界舞台；后续章节锚点与地图式内容",
      "motion": "用户触发的 450ms 场景过渡，reduced-motion 归零"
    },
    "sources": [
      {
        "title": "Nintendo · Tears of the Kingdom WORLD",
        "url": "https://www.nintendo.com/jp/zelda/totk/world/index.html",
        "type": "实例",
        "note": "实际浏览核验声音入口、三个世界章节、大幅游戏场景；截图在调研目录。"
      },
      {
        "title": "Nintendo · Ask the Developer Part 1",
        "url": "https://www.nintendo.com/us/whatsnew/ask-the-developer-vol-9-the-legend-of-zelda-tears-of-the-kingdom-part-1/",
        "type": "理论",
        "note": "世界延续与新探索的游戏设计叙述；迁移到网页叙事属于设计推断。"
      },
      {
        "title": "W3C · Animation from Interactions",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
        "type": "规范",
        "note": "非必要交互动效应可关闭。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为【游戏/IP名称】制作一个以世界探索为中心的宣传网页。先确定三个真实地区及各自玩法差异，以高质量自有场景素材或原创SVG呈现远景、中景、前景；不要仅放抽象渐变。首屏使用大幅场景、低干扰导航、两行衬线标题、简短世界设定和一个明确探索按钮。提供三个地区按钮，点击时同步更新环境色、地标、地区名、玩法描述与aria-pressed。页面随后依次展示世界地图、三种探索机制、出发清单。使用青绿、暖金、象牙白的有限调色板，正文置于稳定底色，不把文案烘焙成图片。保留原生滚动，章节锚点可直接跳转；按钮命中区至少44px，键盘可以完成操作；手机改为单列并保留场景尺度。所有视觉资产本地化，禁用自动音频和自动轮播；prefers-reduced-motion时关闭场景过渡。输出独立HTML/CSS/JS与素材目录，并标明演示内容是虚构。\n\n要素协调要求：空间层级、宽松衬线标题、青绿夜色与低干扰导航共同营造未知感；地区切换必须改变叙事内容。",
    "negativePrompt": "不要使用官方角色或纹章，不要无限粒子，不要滚轮劫持，不要自动播放音频，不要把正文放在细节繁多的图上，不要只有首屏而无玩法说明。",
    "demo": "demos/zelda-world/index.html",
    "preview": "previews/zelda-world.jpg",
    "research": "research/zelda-world.md",
    "exercise": "替换为三个真实旅行地点，让地区切换同步解释各地的一项独特体验。",
    "composition": {
      "color": "青绿拉开景深，暖金提示地区与行动，象牙白用于标题。",
      "typography": "Georgia 衬线英文 + 系统中文；标题宽松，正文稳定",
      "layout": "首屏横向世界舞台；后续章节锚点与地图式内容",
      "imagery": "原创浮岛、瀑布、遗迹与地图承担世界叙事。",
      "shape": "远山叠层、圆形天体与细线目录统一为宁静探索语汇。",
      "hierarchy": "世界首屏 → 地区差异 → 探索机制 → 出发清单。",
      "motion": "用户触发的 450ms 场景过渡，reduced-motion 归零",
      "coherence": "空间层级、宽松衬线标题、青绿夜色与低干扰导航共同营造未知感；地区切换必须改变叙事内容。"
    }
  },
  {
    "id": "persona-kinetic",
    "order": 6,
    "title": "角色 IP · 动势拼贴",
    "subtitle": "PERSONA / CHARACTER-LED COLLAGE",
    "category": "游戏/IP",
    "tags": [
      "Persona 5 Royal",
      "角色",
      "斜切",
      "拼贴"
    ],
    "summary": "用角色、切片与斜向节奏传达人格，让内容与世界观共享同一种视觉语言。",
    "accent": "#e52336",
    "background": "#e52336",
    "principles": [
      "角色插画比通用功能卡更直接表达IP人格。",
      "黑白红加少量金色建立强对比，斜切碎片形成视觉动势。",
      "碎片围绕一个主要焦点组织；正文与操作区保持清楚的阅读轴。",
      "首屏、角色介绍与后续玩法章节共享图形语汇。"
    ],
    "productFocus": "原创三名城市调查员的身份、技能与故事成为主线，手动选择角色后能立即看到内容变化；流程章节解释实际行动。",
    "interaction": [
      "手动角色选择更新人物、标签、简介和编号，当前选择有状态。",
      "章节锚点按角色→玩法→招募的顺序浏览。",
      "招募按钮生成本地角色卡，有明确结果反馈。"
    ],
    "theme": "都市、叛逆、速度感；红黑白大块拼贴，少量金色强调身份。当前Royal官网首屏偏金黑，demo主要迁移角色区构成。",
    "constraints": [
      "不得复制现有IP角色、字标或官方剪影。",
      "背景可以斜切，正文和点击命中区不随之倾斜。",
      "只有一个主要视觉焦点，避免所有元素都旋转。",
      "不使用频闪、自动轮播或失控的光标特效。",
      "手机收敛偏移，维持合理的文字行长。",
      "减少动态效果偏好下关闭进入与切换过渡。"
    ],
    "useCases": [
      "角色IP",
      "音乐与青年文化",
      "游戏发布"
    ],
    "avoid": [
      "严肃企业文档",
      "高密度操作界面"
    ],
    "tokens": {
      "palette": [
        "#e52336",
        "#151515",
        "#fff5dc",
        "#dfc787"
      ],
      "type": "Arial Black 大标题 + 系统中文；正文不倾斜",
      "layout": "斜切海报首屏，角色展示舞台，横向流程条",
      "motion": "250ms 用户触发切换，支持减少动态效果"
    },
    "sources": [
      {
        "title": "ATLUS · Persona 5 Royal",
        "url": "https://persona.atlus.com/p5r/",
        "type": "实例",
        "note": "实际浏览首屏与角色区，金黑首屏、红金斜切角色标签及切换控件已核验。"
      },
      {
        "title": "MoMA · Collage",
        "url": "https://www.moma.org/collection/terms/collage",
        "type": "理论",
        "note": "碎片安排与整体构成的理论迁移，非官网作者意图声明。"
      },
      {
        "title": "W3C · Animation from Interactions",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
        "type": "规范",
        "note": "用户应能减少非必要交互动效。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为【原创角色IP】制作一张有都市动势的宣传网页。先根据三位角色的性格、技能、服装和故事设计原创角色插画，不复制已知IP剪影。首屏以一位人物和大号斜切标题为焦点；背景用红、黑、象牙白切片和少量金色，加入受控半调网点。标题可倾斜，正文、导航与按钮须保持水平和稳定命中区。信息依次是IP宣言、三名角色选择、三个玩法步骤、生成本地角色卡。角色选择必须同步更新插画、人物名、编号、技能和简介，并有aria-pressed或完整tab语义。手机改为单列，收敛偏移与倾斜，不让字超出视口。保留自然滚动，不自动轮播、不闪烁、不播放声音。用户触发过渡控制在250ms，prefers-reduced-motion下关闭。全部素材与代码本地化，正文使用HTML文字，虚构内容明确标注。输出独立可运行的HTML/CSS/JS。\n\n要素协调要求：大号切片字、斜向构图和人物轮廓共同表达行动力；正文保持水平，为强烈视觉建立阅读秩序。",
    "negativePrompt": "不要粘贴Persona官方角色和Logo，不要把整个页面都旋转，不要小字金色叠红底，不要频闪，不要无效按钮，不要以一排普通SaaS卡片替代角色舞台。",
    "demo": "demos/persona-kinetic/index.html",
    "preview": "previews/persona-kinetic.jpg",
    "research": "research/persona-kinetic.md",
    "exercise": "为同一虚构IP设计一个克制的角色详情页，保留人格与图形语言，同时提升长文阅读体验。",
    "composition": {
      "color": "红色提供动势，黑白保证强对比，少量金色强化身份标签。",
      "typography": "Arial Black 大标题 + 系统中文；正文不倾斜",
      "layout": "斜切海报首屏，角色展示舞台，横向流程条",
      "imagery": "原创人物与身份牌是核心，半调点与切片退居背景。",
      "shape": "斜切标签与爆裂星形延续都市拼贴，正文和命中区保持水平。",
      "hierarchy": "宣言与人物 → 角色选择 → 行动步骤 → 身份卡。",
      "motion": "250ms 用户触发切换，支持减少动态效果",
      "coherence": "大号切片字、斜向构图和人物轮廓共同表达行动力；正文保持水平，为强烈视觉建立阅读秩序。"
    }
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
  }
];
