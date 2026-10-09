# 从零读懂一个「高级感」个人作品集网页

> 导师笔记 · 面向零基础 → 进阶
> 项目：`my-portfolio`（Zed Li Jiale 个人作品集）
> 涉及文件：`index.html` / `style.css` / `main.js`

---

## 📖 目录

**基础篇**
- [0. 开篇：先搞懂「三大件」是怎么配合的](#0-开篇先搞懂三大件是怎么配合的)
- [1. index.html —— 页面的骨架](#1-indexhtml--页面的骨架)
- [2. style.css —— 让页面变好看的魔法书](#2-stylecss--让页面变好看的魔法书)
- [3. main.js —— 让页面「活」过来的 4 个功能](#3-mainjs--让页面活过来的-4-个功能)
- [4. 高级精美网页的 9 大核心技法](#4-高级精美网页的-9-大核心技法可复用到任何项目)
- [5. 代码体检 —— 发现的问题与优化建议](#5-代码体检--我在你代码里发现的问题与优化建议)
- [6. 零基础学习路径 & 练习建议](#6-零基础学习路径--练习建议)
- [7. 速查表（Cheat Sheet）](#7-速查表cheat-sheet)

**进阶篇（老程序员私藏）**
- [8. 老程序员的「工作流」：工具链 / 快捷键 / DevTools / Git / 部署](#8-老程序员的工作流工具链--快捷键--devtools--git--部署)
- [9. 老程序员的 CSS 实战技巧（25 条）](#9-老程序员的-css-实战技巧25-条)
- [10. 老程序员的 JS 实战技巧](#10-老程序员的-js-实战技巧)
- [11. 调试 · 性能 · 无障碍](#11-调试--性能--无障碍从业余到专业的三道关)
- [12. 让网页「一眼高级」的 20 个操作手法](#12-让网页一眼高级的-20-个操作手法)
- [13. 独门配方库（可直接复制粘贴）](#13-独门配方库可直接复制粘贴)
- [14. 结语](#14-结语)

---

## 0. 开篇：先搞懂「三大件」是怎么配合的

很多人一开始学前端会懵：为什么要有 3 个文件？它们到底谁管谁？

把网页想象成**一个人**：

| 文件 | 相当于 | 负责什么 | 类比 |
| --- | --- | --- | --- |
| `index.html` | **骨架 / 身体** | 内容与结构：标题、段落、按钮、图片放在哪 | 人的骨头和器官 |
| `style.css` | **皮肤 / 衣服 / 妆容** | 颜色、大小、位置、动画、好看 | 长相和穿搭 |
| `main.js` | **大脑 / 神经** | 交互行为：点击、滚动、鼠标跟随、动态变化 | 会对外界做反应 |

**一句话总结协作方式：**
> HTML 先把「有哪些东西」摆好 → CSS 决定「长什么样、放哪里」→ JS 让页面「动起来、会回应你」。

**它们靠什么连起来？**
- HTML 用 `<link rel="stylesheet" href="style.css">` 叫来 CSS。
- HTML 用 `<script src="main.js"></script>` 叫来 JS。
- CSS 和 JS 通过 **HTML 里的 `class`（类名）和 `id`** 精准找到要操作的元素。

所以记住这个「暗号系统」：
- `class="focus-card"` → CSS 里写 `.focus-card { }`，JS 里写 `querySelector('.focus-card')`（点代表 class）
- `id="hero"` → CSS 里写 `#hero { }`，JS 里写 `querySelector('#hero')`（井号代表 id）

**打开这个项目的正确姿势：**
直接双击 `index.html` 用浏览器打开就能看。想改代码，用 VS Code 打开整个 `my-portfolio` 文件夹，推荐装 **Live Server** 插件，右键 `index.html` → Open with Live Server，改完保存浏览器自动刷新。

---

## 1. index.html —— 页面的骨架

### 1.1 文档的标准开头（第 1~9 行）

```html
<!DOCTYPE html>                              <!-- 声明：这是 HTML5 文档 -->
<html lang="zh-CN">                          <!-- 根标签；lang 告诉浏览器是中文 -->
<head>
  <meta charset="UTF-8" />                   <!-- 字符编码，防止中文乱码 -->
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0" />  <!-- 手机端适配的关键 -->
  <title>Zed Li Jiale - Portfolio</title>    <!-- 浏览器标签页上的文字 -->
  <link rel="stylesheet" href="style.css" /> <!-- 引入 CSS -->
</head>
<body>
```

**必须理解的 3 个点：**
1. `<!DOCTYPE html>` 永远放第一行，少了它浏览器会进入「怪异模式」，样式会乱。
2. `<meta charset="UTF-8">` **中文网页必备**，否则会变成乱码。
3. `<meta name="viewport" ...>` **移动端适配的生命线**。没有它，手机打开会显示成缩小版桌面网页，字小到看不见。

`<head>` 里放的是「给浏览器看的幕后信息」，`<body>` 里放的才是「给用户看的内容」。

### 1.2 背景装饰层（第 10~12 行）

```html
<div class="bg-glow"></div>   <!-- 深空星云光晕 -->
<div class="bg-dust"></div>   <!-- 太空尘埃颗粒 -->
<div class="bg-glow"></div>   <!-- ⚠️ 重复了，见第 5.4 节代码体检 -->
```

这三个 `<div>` 是**空盒子**，本身没有任何内容，作用是当「画布」用。它们的样式全部由 CSS 画出来（渐变、动画），并且 `position: fixed` 固定铺满全屏、`pointer-events: none` 让鼠标能穿透（不会挡住你点击按钮）。

> **思维升级**：高手做背景，很少用真实图片，而是用 **CSS 渐变 + 动画**画出「星空 / 星云 / 光晕」。好处是：体积几乎为 0、能无限缩放不糊、还能动。

### 1.3 顶部导航栏 `<header class="navbar">`（第 14~27 行）

```html
<header class="navbar">
  <div class="logo">
    <span class="logo-box">Z</span> ZED / LI JIALE
  </div>
  <nav class="nav-links">
    <a href="#hero" class="active">首页</a>
    <a href="#experience">个人经历</a>
    ...
  </nav>
  <a href="#contact" class="contact-btn">联系我</a>
</header>
```

知识点：
- `<header>` / `<nav>` 是**语义化标签**，意思是「这是页头」「这是导航」。用人话给标签命名，代码更易读、更利于搜索引擎（SEO）和无障碍访问。
- `href="#hero"` 是**锚点链接**：井号 + 某个元素的 `id`，点击后会跳到那个 id 的元素。这里配合 JS 实现了「平滑滚动」。
- `class="active"` 是给「首页」加的**高亮状态类**，CSS 里 `.nav-links a.active` 把它变白色。
- `class="contact-btn"` 是右侧的胶囊按钮，它身上挂着一个「鼠标跟随泛光」的黑科技（第 2.9 节 + 第 3.4 节详解）。

### 1.4 Hero 首屏大区 `<section id="hero">`（第 30~69 行）

「Hero」是设计术语，指**打开网站第一眼看到的整个全屏区域**，是全场最重要、最需要抓眼球的地方。

它包含 4 层信息，层次非常清晰：

```html
<p class="hero-tag">CHEMICAL ENGINEERING · PORTFOLIO 2026</p>  <!-- ① 小标签：定位/身份 -->
<h1 class="hero-title">                                         <!-- ② 主标题：最大字号 -->
  <span class="white">把工艺做精</span><br>
  <span class="grey">把创新融入流程</span>
</h1>
<p class="hero-subtitle">化学工程与工艺 · 工艺流程设计与优化实践者</p> <!-- ③ 副标题 -->
<p class="hero-desc">我将化工原理与工程思维带进工艺设计……</p>      <!-- ④ 描述段落 -->
```

**为什么主标题要拆成两个 `<span>`？**
因为要做出「上层白色实心、下层灰色」的高级双色排版。`<br>` 是换行。`<span>` 是「行内小容器」，专门用来给**一句话里的某几个字单独上色**。

**按钮区：**
```html
<div class="hero-actions">
  <a href="#works" class="btn-primary">查看代表作品 ↗</a>   <!-- 白色实心主按钮 -->
  <a href="#contact" class="btn-secondary">联系我</a>        <!-- 透明描边次按钮 -->
</div>
```
> **设计法则**：一个区域里如果有两个按钮，一定要分清**主次**——主按钮（实心高对比）引导最重要的动作，次按钮（透明描边）作陪衬。两个都做得一样抢眼，用户反而不知道点哪个。

**数据统计区 `stats-grid`：**
```html
<div class="stats-grid">
  <div class="stat-item">
    <h3>3.408 <span class="small">/ 5.0</span></h3>
    <p>本科绩点</p>
    <small>本科阶段</small>
  </div>
  ...
</div>
```
用「大数字 + 小单位 + 说明文字」三段式展示成绩。数字用 `.small` 缩小，形成**大小对比**，这是排版高级感的来源之一。

**右侧人物图：**
```html
<div class="hero-image">
  <img src="images/avatar.png" alt="Zed">
</div>
```
- `alt` 是图片加载失败时显示的替代文字，也是给盲人读屏软件听的，**必写**。
- 注意图片路径是 `images/avatar.png`，意味着要在项目里建一个 `images` 文件夹并放入 `avatar.png`。（你当前项目里这个图片缺失，见第 5.1 节）

### 1.5 能力卡片区 `<section id="skills">`（第 72~89 行）

```html
<p class="section-tag">CAREER FOCUS / 求职方向</p>
<h2 class="section-title">化工工艺工程师</h2>
<p class="section-desc">我的目标是成为能够推进化工工艺落地的工程师……</p>

<div class="focus-grid">
  <a href="#detail-01" class="focus-card">
    <span class="num">01</span>
    <h4>化工原理与工艺理解</h4>
    <p>单元操作 · 反应动力学 · 传递过程</p>
  </a>
  ... 一共 08 张卡片
</div>
```

**这是全站最值得学的结构，注意 3 点：**

1. **统一的「区块标题三件套」**，每个大区块都用它，形成节奏感：
   ```html
   <p class="section-tag">小标签（英文）</p>   <!-- 蓝色小字，制造高级感 -->
   <h2 class="section-title">主标题</h2>        <!-- 大标题 -->
   <p class="section-desc">一段描述</p>          <!-- 灰色说明 -->
   ```
   > `section-tag` 常用于放英文大写，配 `letter-spacing`（字间距）拉开，是「科技感 / 高级感」的经典套路。

2. **卡片本身就是链接**：`<a href="#detail-01" class="focus-card">` —— 点击卡片跳转到下方对应的详情。这比单纯装饰的卡片更有「可用性」。

3. **编号系统 `01 / 02 … 08`**：用 `class="num"` 显示蓝色编号。编号能带来「目录感 / 系统感」，是作品集提升专业度的便宜好方法。

### 1.6 能力详情区 `<section id="skill-details">`（第 92~179 行）

```html
<div class="detail-list">
  <div id="detail-01" class="detail-item">
    <div class="detail-header">
      <span class="detail-num">01</span>
      <h3>化工原理与工艺理解</h3>
    </div>
    <div class="detail-body">
      <p>具备扎实的化工原理基础……</p>
    </div>
  </div>
  ... 一直到 detail-08
</div>
```

- 这里用 `id="detail-01" … id="detail-08"` 与上方卡片的 `href="#detail-01"` **一一对应**，形成「卡片 → 详情」的跳转闭环。
- 结构分层清晰：`detail-item`（整条）→ `detail-header`（编号+标题）→ `detail-body`（正文）。
- 关键 CSS 是 `scroll-margin-top: 100px;`（见第 2 章），作用是**跳转时给顶部导航栏留出空间**，否则标题会被固定导航栏盖住——这是新手最容易踩的坑之一。

### 1.7 经历时间线 `<section id="experience">`（第 182~216 行）

```html
<section id="experience" class="section-container">
  <p class="section-tag">02 / EXPERIENCE</p>
  <h2 class="bg-text">EXPERIENCE</h2>       <!-- 超大的背景水印字 -->

  <div class="timeline">
    <div class="timeline-item">
      <div class="time">2023.09 — 至今</div>
      <div class="content">
        <h3>湖北工业大学</h3>
        <p>机械设计制造及其自动化本科；绩点 3.408 / 5.0，专业排名第 2。</p>
      </div>
    </div>
    ... 一共 4 条
  </div>
</section>
```

**两个亮点：**
1. **`bg-text` 背景水印大字**：一个 `color: rgba(255,255,255,0.03)` 的 8rem 巨字当背景，只留 3% 的白，几乎透明却让版面不空洞。这是极简高级风的常用手法。
2. **左时间 / 右内容的双栏时间线**：左侧放时间（蓝色强调色），右侧放事件。用 Flex 布局实现，底部一条淡分隔线。

最后一行：`<script src="main.js"></script>` 放在 `</body>` 前——这样浏览器先渲染出页面再执行脚本，用户体验更好。

---

## 2. style.css —— 让页面变好看的魔法书

CSS 的核心思想只有一句话：**「选中元素 → 给它一堆属性」**。

```css
选择器 {
  属性: 值;
}
```

### 2.1 CSS 变量（第 2~9 行）—— 全站「调色板」

```css
:root {
  --bg: #0a0a0a;            /* 深邃黑背景色 */
  --bg-card: #141414;       /* 卡片背景色，稍微亮一点点 */
  --text-main: #ffffff;     /* 主文字：纯白 */
  --text-sub: #a1a1a6;      /* 次要文字：灰色 */
  --accent: #5aa9e6;        /* 点缀色：科技蓝 */
  --border: rgba(255,255,255,0.08);  /* 几乎看不见的淡边框 */
}
```

**为什么要用变量？**
`:root` 代表整个网页的根，在里面定义的 `--xxx` 就是**全局变量**。之后任何地方都能用 `var(--accent)` 取用。

好处：想换主题色？**只改这一行就行**，全站 100 处用到处一瞬间全变。这是专业项目的标配写法。

**这套配色为什么高级？**
- 背景 `#0a0a0a` 不是纯黑，是「深邃黑」，比纯黑更有层次。
- 文字分三级：纯白（强调）→ 灰 `#a1a1a6`（正文）→ 更淡的边框。
- 全站**只有一种彩色**（科技蓝 `#5aa9e6`）作点缀。
> **黄金法则**：暗色主题 + 单一强调色 + 大量留白 = 高级感。颜色越克制越高级，新手常犯的错是「五颜六色」。

### 2.2 全局重置（第 11~21 行）

```css
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: var(--bg);
  color: var(--text-main);
  line-height: 1.6;
  overflow-x: hidden;
}

a { text-decoration: none; color: inherit; }
```

- `* { margin:0; padding:0 }`：浏览器默认给元素加了边距，先全部清零，避免「所见非所得」。
- `box-sizing: border-box`：**非常重要**。它让元素的宽度包含 padding 和 border，布局尺寸计算才符合直觉。
- `font-family` 是一串**字体回退链**：优先 Inter，没有就用系统字体，中文再回退到苹方 / 微软雅黑。
- `line-height: 1.6`：行高 1.6 倍，正文更好读。
- `overflow-x: hidden`：禁止横向滚动条（后面那些超大的发光元素容易撑出横向滚动）。
- `a { color: inherit }`：链接默认是蓝色带下划线，这里让它继承父级颜色、去掉下划线。

### 2.3 导航栏 + 毛玻璃（第 24~35 行）

```css
.navbar {
  position: fixed;                 /* 固定在屏幕顶部，滚动也不动 */
  top: 0; left: 0; right: 0;       /* 横向铺满 */
  display: flex;
  justify-content: space-between;  /* 左 中 右 分散对齐 */
  align-items: center;             /* 垂直居中 */
  padding: 1.2rem 4rem;
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(12px);     /* ⭐ 魔法代码：毛玻璃 */
  border-bottom: 1px solid var(--border);
  z-index: 1000;                   /* 层级最高，盖在内容上面 */
}
```

**必须吃透的 4 个概念：**

1. **`position: fixed`** — 让元素脱离文档流，固定在视口某处。导航栏、回到顶部按钮都用它。
2. **`display: flex`（弹性布局）** — 现代 CSS 排版核心。
   - `justify-content: space-between`：主轴（横向）两端分散对齐 → 实现「logo 左、导航中、按钮右」。
   - `align-items: center`：交叉轴（纵向）居中。
3. **毛玻璃 `backdrop-filter: blur(12px)`** — 它让**元素背后的内容**变模糊，配合半透明背景 `rgba(...,0.7)`，就产生了 iOS 风格的「磨砂玻璃」。记住：**必须同时有半透明背景 + blur**，只写 blur 效果很弱。
4. **`z-index` 层级** — 数字越大越靠上。导航栏设 1000 保证永远在最上层。
   > 注意：`z-index` 只对「已经定位（position 非 static）」的元素生效。

### 2.4 Hero 排版（第 85~136 行）

```css
.hero-section {
  position: relative;
  min-height: 100vh;     /* 至少占满一屏高度（vh = 视口高度的 1%） */
  display: flex;
  align-items: center;   /* 内容垂直居中 */
  padding: 8rem 4rem 4rem;   /* 上方 8rem 给固定导航栏让位 */
  overflow: hidden;
}

.hero-title {
  font-size: 5rem;       /* 1rem ≈ 16px，5rem = 80px，超大标题 */
  line-height: 1.1;      /* 大标题行高要压缩，1.1 倍，更紧凑有力 */
  letter-spacing: -2px;  /* ⭐ 负字间距：字与字靠紧，是高级标题的秘诀 */
  margin-bottom: 1.5rem;
}
.hero-title .white { color: #fff; font-weight: 800; }
.hero-title .grey  { color: #666; font-weight: 300; }  /* 灰 + 细 = 退到背景 */
```

**高级排版三招（划重点）：**
- **超大字号 + 收紧行高 + 负字间距** → 标题有「厚重感、杂志感」。
- **粗细对比**：上半句 `font-weight:800` 极粗，下半句 `300` 极细，视觉张力就出来了。
- **颜色对比**：白 → 灰，形成主次。

**人物图片定位：**
```css
.hero-image {
  position: absolute;   /* 相对 .hero-section 定位 */
  bottom: 0; right: 5%; /* 贴着底部、靠右 */
  width: 500px;
  z-index: 1;           /* 在文字下面 */
}
.hero-content { max-width: 800px; z-index: 2; }  /* 文字盖在图上 */
```

> **父子定位铁律**：子元素 `position:absolute` 时，是相对最近的一个「`position` 不为 `static` 的父元素」定位的。所以 `.hero-section` 必须写 `position: relative` 当基准。

### 2.5 区块通用容器与卡片网格（第 139~171 行）

```css
.section-container {
  padding: 6rem 4rem;
  max-width: 1400px;   /* 内容最宽 1400，防止大屏上太散 */
  margin: 0 auto;      /* 左右 auto = 水平居中 */
  position: relative;
}

.focus-grid {
  display: grid;                          /* ⭐ 网格布局 */
  grid-template-columns: repeat(4, 1fr);  /* 4 等分列，1fr = 一份 */
  gap: 1px;                               /* 缝隙只有 1px */
  background: var(--border);              /* 缝隙露出底色 → 形成细线 */
  border: 1px solid var(--border);
}
```

**这是本文件最巧妙的一段，务必理解：**
- **Flex 是「一维」布局**（一行或一列），**Grid 是「二维」布局**（行 + 列同时控制）。4 列卡片墙用 Grid 最合适。
- `repeat(4, 1fr)` = 复制 4 次「1 份」，4 列等宽。
- **细缝分隔线技巧**：`gap: 1px` 让卡片间留 1px 缝，`background` 设为淡边框色 → 缝隙里透出的就是线！比给每张卡片画 border 更干净，是专业写法。

**卡片毛玻璃 + 过渡：**
```css
.focus-card {
  position: relative;
  background: rgba(20, 20, 20, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);   /* 兼容 Safari（苹果浏览器） */
  border: 1px solid rgba(255,255,255,0.08);
  padding: 2rem;
  transition: all 0.3s ease;             /* ⭐ 所有属性 0.3 秒平滑过渡 */
  z-index: 2;
}
.focus-card:hover {
  background: rgba(20, 20, 20, 0.5);
  border-color: rgba(255,255,255,0.2);   /* 悬停时边框提亮 */
}
```
`transition` 是「平滑动画」的关键：它让「悬停变色」不是瞬间跳变，而是 0.3 秒渐变，质感立刻高级。

### 2.6 时间线（第 174~193 行）

```css
.bg-text {
  font-size: 8rem;
  color: rgba(255,255,255,0.03); /* 3% 白 = 几乎透明的水印 */
  position: absolute;
  top: 0; left: 0;
  z-index: -1;                   /* 藏在内容后面 */
  font-weight: 800;
  letter-spacing: 5px;
  pointer-events: none;          /* 水印不挡鼠标点击 */
}

.timeline-item {
  display: flex;
  gap: 4rem;                     /* 左右两栏间距 4rem */
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--border);  /* 每行下方一条淡线 */
}
.timeline-item .time { width: 150px; color: var(--accent); font-weight: 600; }
```
用 `border-bottom` 做分隔线，比用 `<hr>` 更可控、更好看。

### 2.7 深空背景：星云 + 尘埃动画（第 255~298 行）

这是全站最有「电影感」的部分。

**① 星云光晕（两个超大径向渐变 + 缓慢漂移）：**
```css
.bg-glow {
  position: fixed;
  inset: 0;                      /* inset:0 = top/right/bottom/left 全 0，铺满屏幕 */
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 20% 30%, rgba(90,169,230,0.15), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(138,43,226,0.10), transparent 50%);
  animation: floatNebula 25s infinite alternate ease-in-out;
}

@keyframes floatNebula {
  0%   { transform: scale(1)    translate(0, 0); }
  50%  { transform: scale(1.1)  translate(-3%, 4%); }
  100% { transform: scale(1.05) translate(5%, -2%); }
}
```
- `radial-gradient(circle at 20% 30%, 颜色A, transparent 50%)` = 以 (20%,30%) 为圆心，从颜色 A 向外渐隐到透明，形成一团「光晕 / 星云」。叠两层不同颜色、不同位置的光，层次就丰富了。
- `@keyframes` 定义**关键帧动画**：0% 起点 → 50% 中间 → 100% 终点，浏览器会自动补间。
- `animation: floatNebula 25s infinite alternate ease-in-out` = 用 floatNebula 这个动画，25 秒一轮，无限循环，来回播（alternate），缓入缓出。**25 秒很慢**，所以看起来像星云在缓慢呼吸。

**② 太空尘埃（多个小圆点 + 循环平移）：**
```css
.bg-dust {
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.8), transparent),
    radial-gradient(2px 2px at 40% 70%, rgba(255,255,255,0.4), transparent),
    ... /* 共 6 个不同大小的小亮点 */
  background-size: 300px 300px, 400px 400px, ...;  /* 每个点平铺的格子大小 */
  animation: driftDust 40s linear infinite;
  opacity: 0.6;
}

@keyframes driftDust {
  0%   { background-position: 0 0, 0 0, ...; }
  100% { background-position: -300px 300px, -400px 400px, ...; }
}
```
- `radial-gradient(1px 1px at ...)` 画一个 1×1 像素的白点 = 一颗尘埃。
- `background-size` 让这个点**平铺复制**成一片星空。
- 动画把 `background-position` 从 (0,0) 平移到 (-300px,300px)，由于平移量正好等于每个格子的 `background-size`，看起来就是**无缝滚动**的星空。
- `40s linear infinite`：40 秒一轮、匀速、无限，缓慢得像宇宙。

> **可复用的「动态背景」公式 = `position:fixed` 铺满 + 径向渐变画形状 + `@keyframes` 缓慢移动 + `pointer-events:none` 不挡交互。**

### 2.8 统计区的高级分隔线（第 299~351 行）

```css
.stat-item { position: relative; }

/* 除最后一个外，每项右侧画一条竖线 */
.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -2rem;
  top: 5%;
  height: 90%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(90,169,230,0.6), transparent);
  box-shadow: 0 0 8px rgba(90,169,230,0.3);
}

/* 整个统计区底部一条横线 */
.stats-grid::after {
  content: '';
  position: absolute;
  bottom: -3rem;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(90,169,230,0.6), transparent);
  box-shadow: 0 0 8px rgba(90,169,230,0.3);
}
```

**三个关键知识点：**
1. **`::before` / `::after` 伪元素**：不用在 HTML 里加任何标签，就能用 CSS「凭空造」一个装饰元素。必须写 `content: ''` 才会出现。
2. **`:not(:last-child)` 选择器**：选中「除了最后一个之外」的所有元素 → 只给前面的项加分隔线，最后一项不加，非常优雅。
3. **渐变发光线条**：`linear-gradient(to right, transparent, 蓝色, transparent)` = 两端透明、中间发光的线，配 `box-shadow` 微光。这比一条生硬的实线高级太多，是「科技感」的标配。

### 2.9 鼠标跟随泛光（第 379~396 行）

```css
.focus-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    120px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(90, 169, 230, 0.15),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
}
.focus-card:hover::before { opacity: 1; }

/* 让文字浮在光晕上方 */
.focus-card h4, .focus-card p, .focus-card .num { position: relative; z-index: 1; }
```

**原理拆解：**
- 用伪元素在卡片上盖一层「蓝色光斑」，光斑的圆心位置是两个 **CSS 变量** `--mouse-x / --mouse-y`。
- CSS 变量是谁给的？**JS 给的**（见第 3 章）。鼠标移动时 JS 实时更新这两个变量的值。
- 光斑默认 `opacity:0` 隐藏，鼠标悬停才显形。
- 必须 `overflow: hidden`（在 `.focus-card` 上）让光斑不跑出卡片框外。
- `pointer-events: none` 保证光斑层不挡住鼠标操作。

> 这是「暗色高级卡片」的灵魂效果，GitHub、Vercel 等网站首页卡片都在用。

### 2.10 滚动淡入动画（第 246~254 行）

```css
.fade-in {
  opacity: 0;
  transform: translateY(40px);   /* 初始位置：往下偏移 40px */
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-in.show {
  opacity: 1;
  transform: translateY(0);      /* 回到原位，透明变不透明 */
}
```
`.fade-in` 是「隐形 + 下沉」的初始态，JS 在元素进入视口时给它加上 `.show`，于是「淡入 + 上浮」。JS 部分见下一章。

### 2.11 响应式适配（第 196~207、457~468 行）

```css
@media (max-width: 900px) {
  .navbar { padding: 1rem 1.5rem; }
  .nav-links { display: none; }                 /* 手机端先隐藏导航（可换汉堡菜单） */
  .hero-section { padding: 6rem 1.5rem 2rem; flex-direction: column; text-align: center; }
  .hero-title { font-size: 2.5rem; }            /* 大标题缩小 */
  .hero-image { position: static; width: 100%; margin-top: 2rem; }  /* 图不再绝对定位 */
  .stats-grid { flex-direction: column; gap: 2rem; }
  .focus-grid { grid-template-columns: 1fr; }   /* 4 列改 1 列 */
  .timeline-item { flex-direction: column; gap: 0.5rem; }
  .bg-text { font-size: 3rem; }
  .section-container { padding: 4rem 1.5rem; }
}
```

- `@media (max-width: 900px)` = **媒体查询**：当屏幕宽度 ≤ 900px（手机/平板）时，才应用花括号里的样式。
- `flex-direction: column` 把横向布局改成竖向堆叠 → 手机上不再挤成一行。
- `grid-template-columns: 1fr` 把 4 列卡片墙变成单列。
- 核心思想：**桌面端和手机端可以完全用两套布局，只写一份 HTML。**

---

## 3. main.js —— 让页面「活」过来的 4 个功能

`main.js` 只有 84 行，但实现了 4 个高级交互。学 JS 时不要被语法吓到，先理解**「它想干嘛」**。

### 3.1 滚动时导航栏背景加深（第 2~13 行）

```js
const navbar = document.querySelector('.navbar');   // 找到导航栏
if (navbar) {                                        // 找到了才执行（防止报错）
  window.addEventListener('scroll', () => {          // 监听「滚动」事件
    if (window.scrollY > 50) {                       // 往下滚超过 50px
      navbar.style.background = 'rgba(10, 10, 10, 0.95)';   // 背景变深
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)'; // 加阴影
    } else {                                         // 回到顶部附近
      navbar.style.background = 'rgba(10, 10, 10, 0.7)';    // 恢复半透明
      navbar.style.boxShadow = 'none';                       // 去掉阴影
    }
  });
}
```

**逐行理解：**
- `document.querySelector('.navbar')` = **在页面里找第一个 class 为 navbar 的元素**。这就是 JS 和 HTML 连接的桥梁。
- `if (navbar)` = 防御性写法：万一没找到（比如以后删了导航栏），不要让它报错。
- `addEventListener('scroll', 回调函数)` = **监听事件**：「当用户滚动时，执行这个函数」。这是 JS 交互的通用套路 —— `元素.addEventListener('事件名', 要做的事)`。
- `window.scrollY` = 当前垂直滚动了多少像素。
- `navbar.style.xxx = ...` = **用 JS 直接改内联样式**（等于在 HTML 标签上写 `style="..."`）。

> **设计意图**：页面刚打开时导航栏较透明（好看）；一旦滚动，内容跑到它后面，就加深成近黑并加阴影，保证文字始终清晰。这叫「智能吸顶导航」。

### 3.2 锚点平滑跳转（第 16~26 行）

```js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;                  // 只是 # 就跳过
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();                           // ⭐ 阻止浏览器的瞬间跳转
      target.scrollIntoView({ behavior: 'smooth' }); // 改成平滑滚动
    }
  });
});
```

**理解要点：**
- `querySelectorAll` = 找**所有**符合条件的元素（返回一个列表，可以 `forEach` 遍历）。`a[href^="#"]` 是**属性选择器**：所有 `href` 以 `#` 开头的 `<a>`。
- `function (e)` 里的 `e` 是**事件对象**，携带这次点击的所有信息。
- `this` 指向「被点击的那个链接」。`this.getAttribute('href')` 拿到它的跳转目标。
- `e.preventDefault()` = **阻止默认行为**。`<a href="#x">` 默认是「瞬间跳过去」，我们要阻止它，改成自己控制的平滑滚动。
- `scrollIntoView({ behavior: 'smooth' })` = 让目标元素平滑滚入视野。

> **为什么不全靠 CSS `scroll-behavior: smooth`？** 因为用 JS 能更精细地控制（比如以后加偏移、加动画结束回调）。两种做法都对，这里是 JS 版。

### 3.3 滚动淡入效果（第 29~43 行）—— 本文件最干货的一段

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {                 // 元素进入视口了
      entry.target.classList.add('show');       // 加上 show 类 → 触发 CSS 淡入
      observer.unobserve(entry.target);         // 停止观察它（只播一次）
    }
  });
}, { threshold: 0.1 });                          // 元素露出 10% 就触发

const fadeElements = document.querySelectorAll('.focus-card, .timeline-item, .stat-item');
fadeElements.forEach(el => {
  el.classList.add('fade-in');                   // 先加上「隐形」初始类
  observer.observe(el);                          // 开始观察它
});
```

**这是现代前端做「滚动动画」的标准方案，务必吃透：**

- **`IntersectionObserver`（交叉观察器）**：浏览器提供的高性能 API，专门用来「观察元素是否进入了可视区域」。比你手写 `window.onscroll + getBoundingClientRect` 强太多 —— **性能好、代码少**。
- **`entries`**：一批被观察元素的状态变化记录，每条 `entry` 里：
  - `entry.target` = 被观察的那个元素
  - `entry.isIntersecting` = 布尔值，是否进入视口（`true` / `false`）
- **`{ threshold: 0.1 }`**：阈值。0.1 = 元素露出 10% 时就触发。设 0 是「刚碰到边就触发」，设 1 是「完全进入才触发」。
- **`observer.unobserve(...)`**：触发过就取消观察。因为「淡入」只需要播一次，避免上下滚动时反复闪。
- **`classList.add('fade-in')`**：给元素加类名，配合 CSS 的 `.fade-in` / `.fade-in.show` 完成动画。**JS 只负责「发号施令」（切换类名），动画效果交给 CSS** —— 这是前端最佳实践：**行为与样式分离**。

> 整套流程串起来：JS 给元素加 `.fade-in`（隐形状态）→ 用户滚动到它 → 观察器发现「它进入视口了」→ JS 再加 `.show` → CSS 的 `transition` 让「透明→不透明、下沉→归位」平滑过渡 0.8 秒 = 淡入上浮效果。

### 3.4 鼠标跟随泛光（第 45~84 行）—— 全站最炫的部分

```js
const bgGlow = document.querySelector('.bg-glow');
const cards = document.querySelectorAll('.focus-card, .contact-btn');

document.addEventListener('mousemove', (e) => {
  // 1. 更新全局背景光的位置（让星云跟着鼠标微微移动）
  if (bgGlow) {
    bgGlow.style.setProperty('--global-x', `${e.clientX}px`);
    bgGlow.style.setProperty('--global-y', `${e.clientY}px`);
  }

  // 2. 更新每张卡片的光晕
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();   // 卡片在屏幕上的位置和尺寸
    const x = e.clientX - rect.left;             // 鼠标相对卡片的 x 坐标
    const y = e.clientY - rect.top;              // 鼠标相对卡片的 y 坐标

    // 计算鼠标到卡片边框的最近距离
    const distX = Math.min(x, rect.width - x);
    const distY = Math.min(y, rect.height - y);
    const edgeDist = Math.min(distX, distY);     // 离边框还有多少像素

    if (edgeDist < 150) {                        // 鼠标在卡片 150px 范围内
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      // 越靠近边框越亮：0(贴边,最亮) ~ 1(150px 开外,不亮)
      const intensity = Math.max(0, 1 - edgeDist / 150);
      card.style.setProperty('--edge-intensity', intensity.toFixed(2));
    } else {
      card.style.setProperty('--edge-intensity', 0);  // 太远就熄灭
    }
  });
});
```

**这段的 3 个核心知识点：**

1. **`document.addEventListener('mousemove', ...)`** = 监听整个文档上的「鼠标移动」，鼠标一动就触发（触发极其频繁，所以代码要尽量轻量）。

2. **`e.clientX / e.clientY`** = 鼠标相对**浏览器视口左上角**的坐标。
   `card.getBoundingClientRect()` = 拿到卡片相对**视口**的位置（`left, top`）和宽高（`width, height`）。
   用 `e.clientX - rect.left` 就把「鼠标的屏幕坐标」换算成了「**鼠标在卡片内部的相对坐标**」—— 这正是 CSS 里 `radial-gradient(at x y)` 需要的坐标。

3. **`element.style.setProperty('--变量名', 值)`** = 用 JS 给元素设置 **CSS 自定义属性（变量）**。
   > 这是「JS 和 CSS 握手」的关键技巧！JS 不直接画光斑，只负责不断更新坐标变量，**具体怎么画由 CSS 的 `radial-gradient` 完成**。职责分离、性能好、代码优雅。

**那段 `edgeDist` 数学在算什么？**
- `distX = min(x, width - x)`：鼠标离左边界和右边界的距离，取较小的那个 → 鼠标到「左右最近边框」的距离。
- `distY` 同理，是到上下最近边框的距离。
- `edgeDist = min(distX, distY)`：综合起来 = **鼠标离最近的那条边框有多少像素**。
- `intensity = 1 - edgeDist / 150`：线性映射。贴边时 `edgeDist=0` → `intensity=1`（最亮）；距离 150px 时 → `0`（不亮）。
- `Math.max(0, ...)` 兜底，防止出现负数。
- `toFixed(2)` 把数字保留两位小数再转成字符串。

> 这个「越靠边越亮」的效果（业界叫**边缘光 / glowing border**）是「高级感」的顶级技巧。注意：`--global-x / --global-y / --edge-intensity` 目前在 CSS 里还没被实际使用（CSS 里主力用的是 `--mouse-x / --mouse-y`），说明这份代码还在迭代中。你可以把它们接上，做出更炫的效果（见第 6 章的练习）。

---

## 4. 高级精美网页的 9 大核心技法（可复用到任何项目）

这一章是**心法**。把上面三个文件里的「招式」抽象成 9 个可以套用到任何网站的公式。以后你做别的网页，照着这张清单做，就自然有高级感。

| # | 技法 | 关键代码 | 效果 |
| --- | --- | --- | --- |
| 1 | **克制的暗色配色** | `--bg:#0a0a0a` + 单一强调色 | 高级、专业、耐看 |
| 2 | **毛玻璃质感** | `background:rgba(...)` + `backdrop-filter:blur()` | 通透、有层次 |
| 3 | **鼠标跟随光晕** | JS 传 `--mouse-x/y` + `radial-gradient` | 卡片「活」了 |
| 4 | **滚动淡入** | `IntersectionObserver` + `.fade-in.show` | 内容优雅登场 |
| 5 | **动态深空背景** | `fixed` + 径向渐变 + `@keyframes` | 电影感 |
| 6 | **渐变发光细线** | `linear-gradient(transparent, 色, transparent)` | 科技感分隔 |
| 7 | **超大标题排版** | 大字号 + 负字间距 + 粗细对比 | 杂志感 |
| 8 | **Grid 卡片墙** | `display:grid` + `gap:1px` + 底色 | 干净的网格 |
| 9 | **响应式** | `@media (max-width:900px)` | 手机也好看 |

**技法 1｜克制的暗色配色**
- 背景别用纯黑 `#000`，用 `#0a0a0a`~`#111` 这种「近黑」，更有层次。
- 全站只选 **1 个**强调色，其余全是黑 / 白 / 灰。
- 文字分三级：白（重点）、灰（正文）、更灰（辅助说明）。
- ⚠️ 新手最常犯的错：颜色太多、太艳。**克制 = 高级**。

**技法 2｜毛玻璃（Glassmorphism）**
```css
background: rgba(20, 20, 20, 0.3);      /* 半透明底色（必须） */
backdrop-filter: blur(16px);            /* 背后内容模糊（必须） */
border: 1px solid rgba(255,255,255,0.08); /* 极淡的描边，模拟玻璃边缘 */
```
> 两者缺一不可。只写 `blur` 没半透明底 → 效果不明显；只写半透明底没 `blur` → 只是普通透明块。

**技法 3｜鼠标跟随光晕（Glow/Spotlight）**
三步走：
1. HTML 里放一个元素，CSS 给它 `position:relative; overflow:hidden;`。
2. CSS 用 `::before` 画一个 `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), 颜色, transparent)` 的光斑，默认 `opacity:0`。
3. JS 监听 `mousemove`，算出鼠标在该元素内的坐标，`setProperty('--mouse-x', x+'px')` 写进去；`hover` 时把 `opacity` 变 1。

**技法 4｜滚动淡入**
```js
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.要淡入的类').forEach(el => { el.classList.add('fade-in'); io.observe(el); });
```
> 记住这条铁律：**JS 只切 class，动画写 CSS**。

**技法 5｜动态深空背景**
```css
.bg {
  position: fixed; inset: 0; pointer-events: none;   /* 铺满 + 不挡点击 */
  background:
    radial-gradient(circle at 20% 30%, rgba(90,169,230,.15), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(138,43,226,.10), transparent 50%);
  animation: floatNebula 25s infinite alternate ease-in-out;
}
```
> 要点：**速度一定要慢**（20s 以上）。快 = 廉价，慢 = 高级。

**技法 6｜渐变发光细线**
```css
.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(90,169,230,.6), transparent);
  box-shadow: 0 0 8px rgba(90,169,230,.3);
}
```
用于板块之间的分隔、卡片底部装饰。比纯色实线精致 100 倍。

**技法 7｜超大标题排版**
```css
.title {
  font-size: clamp(2.5rem, 8vw, 5rem);  /* 字号随屏幕自适应，比写死更聪明 */
  line-height: 1.05;                    /* 大标题行高收紧 */
  letter-spacing: -0.02em;              /* 负字间距，字挤在一起更有力 */
  font-weight: 800;
}
.title .muted { color: #666; font-weight: 300; } /* 双色 + 粗细对比 */
```
> `clamp(最小值, 理想值, 最大值)` 是响应式字号的现代写法，一行顶三行媒体查询。

**技法 8｜Grid 卡片墙（缝线技巧）**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); /* 自动列数 + 自动换行 */
  gap: 1px;
  background: rgba(255,255,255,.08);   /* 缝隙颜色 = 分隔线 */
  border: 1px solid rgba(255,255,255,.08);
}
.card { background: #0a0a0a; padding: 2rem; }  /* 卡片实色盖住，只留缝 */
```
> `auto-fit + minmax(260px, 1fr)` 是**响应式网格最实用的写法**：屏幕宽就多列，窄就少列，**完全不用媒体查询**。

**技法 9｜响应式（移动优先思维）**
```css
/* 默认写桌面/通用样式，再用媒体查询在窄屏覆盖 */
@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
  .row  { flex-direction: column; }
}
```
再加上 `<meta name="viewport" content="width=device-width, initial-scale=1.0">`（HTML 里），移动端就稳了。

---

## 5. 代码体检 —— 我在你代码里发现的问题与优化建议

作为导师，我不只夸，还要指出「坑」。这些都是真实可验证的问题，按严重程度排序。

### 5.1 🔴 图片缺失：`images/avatar.png` 不存在

HTML 第 67 行引用了 `images/avatar.png`，但项目里的 `images` 文件夹是空的。
**后果**：头像不显示，只显示 `alt="Zed"` 的破图图标。
**修复**：把你的照片命名为 `avatar.png` 放进 `d:\my-portfolio\images\` 文件夹；如果文件夹不存在，就新建一个。

### 5.2 🟠 内容前后不一致（对求职作品集是减分项）

| 位置 | 出现的内容 |
| --- | --- |
| Hero 区、能力区 | 「化学工程与工艺」「化工工艺工程师」 |
| 经历区（190 行） | 「机械设计制造及其自动化本科」 |

同一份作品集里，专业方向一会儿是「化工」、一会儿是「机械」，面试官/HR 会怀疑你在套模板。
**修复**：全局统一成你真实的专业。如果本科是机械、目标是化工工艺，那 Hero 文案也要体现「机械背景 → 化工方向」的转专业叙事，而不是直接写「化工」。

### 5.3 🟠 CSS 重复定义（后者覆盖前者，容易改不动）

`style.css` 里 `.contact-btn` 定义了 **两次**（第 47~82 行 和 第 209~243 行），`.focus-card` 也定义了 **两次**（第 152~171 行 和 第 355~376 行）。
**后果**：CSS 的规则是「后来者覆盖前面」，所以你改第一个 `.contact-btn` 会发现没反应 —— 因为被后面那个覆盖了。这会让新手非常困惑。
**修复**：把重复的两块合并成一块，删掉被覆盖的冗余代码。这是个很好的练习（见第 6 章）。

### 5.4 🟠 HTML 里 `.bg-glow` 重复了两次

第 10 行和第 12 行各有一个 `<div class="bg-glow"></div>`，但它们是**完全重叠**的（都是 `position:fixed; inset:0`），视觉上没有任何区别，纯属多余。
**另外**：JS 里 `querySelector('.bg-glow')` 只会选中**第一个**，第二个拿不到鼠标坐标。
**修复**：删掉第 12 行那个多余的 `<div class="bg-glow"></div>`。

### 5.5 🟡 JS 里有「死代码」：变量算了但没用上

- `--global-x / --global-y`：JS 每次鼠标移动都算并写入了，但 CSS 里**没有任何地方用它们**（`.bg-glow` 用的是固定渐变位置）。
- `--edge-intensity`：同上，算了但 CSS 没用。

**这说明代码是逐步叠加写出来的，还没收尾。有两个选择：**
- **方案 A（推荐，能变更好看）**：把它用起来，让背景星云跟着鼠标动。
- **方案 B（省性能）**：删掉这段计算，减少无谓的运算（`mousemove` 触发频率极高，能省则省）。

方案 A 的具体写法（加在 `style.css` 的 `.bg-glow` 里，覆盖原来的 background）：
```css
.bg-glow {
  background:
    radial-gradient(600px circle at var(--global-x, 20%) var(--global-y, 30%),
      rgba(90,169,230,0.15), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(138,43,226,0.10), transparent 50%);
}
```

### 5.6 🟡 导航栏「高亮」不会跟随滚动变化

HTML 里写死了 `<a href="#hero" class="active">首页</a>`，`.active` 永远是「首页」。
**现象**：就算你滚到「个人经历」，导航里高亮的还是「首页」。
**修复思路**：用 `IntersectionObserver` 观察各个 section，谁进入视口就把 `.active` 移到对应的导航链接上。这是个很棒的进阶练习。

### 5.7 🟡 小细节

- HTML 第 1 行 `<!DOCTYPE html>` 后面有多余空格（无伤大雅，但可清理）。
- 项目缺少 `favicon.ico`（浏览器标签页图标），目前标签页是默认图标。可在 `<head>` 加：
  ```html
  <link rel="icon" href="images/favicon.png" />
  ```
- `main.js` 里 `.focus-card` 在 `querySelectorAll` 中出现了两次（3.3 节和 3.4 节各查一次）。功能没问题，但可以合并成一次查询，略微提升性能。

---

## 6. 零基础学习路径 & 练习建议

### 6.1 推荐的学习顺序（别跳步）

1. **HTML 基础**：标签、属性、结构、语义化。
   → 能照着这个 `index.html` 说清每一行在干嘛，就算过关。
2. **CSS 基础**：选择器、盒模型、颜色、字体、`padding/margin`。
3. **CSS 布局（重点）**：`display:flex` → `display:grid` → `position`。
   → 这三个是 90% 排版的答案，务必练熟。
4. **CSS 进阶**：伪元素 `::before/::after`、`transition`、`@keyframes`、渐变、`backdrop-filter`。
5. **JS 基础**：变量、函数、`if`、数组、对象、`querySelector`、`addEventListener`。
6. **JS 进阶**：`IntersectionObserver`、`classList`、`style.setProperty`、DOM 操作。
7. **响应式**：`@media`、`clamp()`、`auto-fit`。

> **学习心法**：不要「看教材式」地学，要**「改这个项目」式**地学。每学一个知识点，就回到 `my-portfolio` 里找它用在哪、然后动手改一改。看 10 遍不如改 1 遍。

### 6.2 由易到难的 8 个练习（建议按顺序做）

| 难度 | 练习 | 涉及知识点 |
| --- | --- | --- |
| ⭐ | 改主题色：把强调色从科技蓝换成你喜欢的色 | CSS 变量 |
| ⭐ | 补上 `images/avatar.png`，让头像显示出来 | 文件路径 |
| ⭐⭐ | 把「能力卡片」从 8 张改成 6 张（同时删掉对应详情） | HTML 结构 |
| ⭐⭐ | 给导航栏加「回到顶部」按钮 | `position:fixed` |
| ⭐⭐ | 合并 CSS 里重复的 `.contact-btn` / `.focus-card` | 代码规范 |
| ⭐⭐⭐ | 让背景星云跟着鼠标移动（用上 `--global-x/y`） | JS + CSS 变量 |
| ⭐⭐⭐ | 让导航栏高亮跟随滚动自动切换 `.active` | `IntersectionObserver` |
| ⭐⭐⭐⭐ | 做一个手机端汉堡菜单（点击展开/收起导航） | JS 状态切换 + CSS |

**示例：练习「背景星云跟随鼠标」的完整答案**

在 `style.css` 找到 `.bg-glow`，把 `background` 那两行替换为：
```css
  background:
    radial-gradient(600px circle at var(--global-x, 20%) var(--global-y, 30%),
      rgba(90, 169, 230, 0.15), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(138, 43, 226, 0.10), transparent 50%);
```
保存刷新，移动鼠标，星云就会跟着你飘。**为什么之前没效果？** 因为原 CSS 里 `at 20% 30%` 是写死的百分比；改成 `var(--global-x)` 后，就接上了 JS 一直在传的实时坐标。

### 6.3 常用工具 & 资源（免费）

- **VS Code + Live Server 插件**：写代码 + 自动刷新预览（必装）。
- **Chrome DevTools（F12）**：右键元素 → 检查，能实时改样式、看布局、调颜色，是前端的「显微镜」。**学会它 = 效率翻倍。**
- **MDN Web Docs**（developer.mozilla.org）：CSS/JS 的权威中文文档，遇到不认识的属性直接搜。
- **Google Fonts**：免费商用字体，给页面换成 `Inter`、`Manrope` 等现代无衬线字体，气质立刻提升。
- **Coolors / realtimecolors**：配色灵感工具。
- **Codepen**：看别人写的效果，拆解学习。

### 6.4 一份「高级感网页」的检查清单 ✅

做任何新页面前，照着打勾：
- [ ] 暗色背景用近黑（`#0a0a0a`），不是纯黑
- [ ] 全站只有 1 个强调色
- [ ] 文字有 3 个层次（白/灰/更灰）
- [ ] 大标题用了大字号 + 负字间距 + 粗细对比
- [ ] 卡片/导航用了毛玻璃（`backdrop-filter`）
- [ ] 卡片有 hover 过渡动画（`transition`）
- [ ] 有鼠标跟随光晕
- [ ] 内容滚动时有淡入效果
- [ ] 背景有缓慢动画（≥20s 一次循环）
- [ ] 分隔线用了渐变发光，不是纯色实线
- [ ] 响应式：手机宽度 375px 下不破版
- [ ] 所有图片都有 `alt`
- [ ] 没有重复、冗余的 CSS

---

## 7. 速查表（Cheat Sheet）

### 7.1 三个文件的分工

| 文件 | 作用 | 关键语法 |
| --- | --- | --- |
| `index.html` | 结构 | `<标签 class="名" id="名">内容</标签>` |
| `style.css` | 样式 | `.类名 { 属性: 值; }` |
| `main.js` | 行为 | `document.querySelector('.类名').addEventListener('事件', fn)` |

### 7.2 项目结构

```
my-portfolio/
├── index.html     ← 页面骨架
├── style.css      ← 全部样式
├── main.js        ← 全部交互
├── notes.md       ← 本笔记
└── images/        ← 图片放这里
    └── avatar.png ← 你的头像（当前缺失，需补上）
```

### 7.3 本项目用到的所有 CSS 属性一览

| 类别 | 属性 | 作用 |
| --- | --- | --- |
| 布局 | `display: flex` / `justify-content` / `align-items` | 一维排列与对齐 |
| 布局 | `display: grid` / `grid-template-columns` / `gap` | 二维网格 |
| 定位 | `position: fixed / absolute / relative` + `top/left` | 固定、绝对、相对定位 |
| 定位 | `inset: 0` | 四边贴 0（铺满父级） |
| 定位 | `z-index` | 层级先后 |
| 视觉 | `background: rgba()` | 半透明底色 |
| 视觉 | `backdrop-filter: blur()` | 毛玻璃 |
| 视觉 | `radial-gradient()` | 径向渐变（光晕/圆点） |
| 视觉 | `linear-gradient()` | 线性渐变（分隔线） |
| 视觉 | `border` / `border-radius` | 边框与圆角 |
| 视觉 | `box-shadow` | 阴影/发光 |
| 文字 | `font-size` / `font-weight` / `line-height` | 字号、粗细、行高 |
| 文字 | `letter-spacing` | 字间距（负值=紧凑） |
| 动画 | `transition` | 状态间平滑过渡 |
| 动画 | `@keyframes` + `animation` | 循环/关键帧动画 |
| 交互 | `:hover` / `:not(:last-child)` | 伪类选择器 |
| 装饰 | `::before` / `::after` + `content` | 伪元素凭空造装饰 |
| 响应 | `@media (max-width: 900px)` | 媒体查询 |
| 响应 | `clamp(最小, 理想, 最大)` | 自适应尺寸 |
| 其他 | `overflow: hidden` / `pointer-events: none` | 裁剪 / 鼠标穿透 |

### 7.4 本项目用到的所有 JS API 一览

| API | 作用 |
| --- | --- |
| `document.querySelector('.x')` | 找第一个匹配元素 |
| `document.querySelectorAll('.x')` | 找所有匹配元素（返回列表，可 `forEach`） |
| `element.addEventListener('事件', 函数)` | 监听事件（`scroll` / `click` / `mousemove`） |
| `element.classList.add('类名')` | 加类名（触发 CSS 动画） |
| `element.style.setProperty('--变量', 值)` | 设置 CSS 变量 |
| `element.style.属性 = 值` | 直接改内联样式 |
| `window.scrollY` | 当前垂直滚动距离 |
| `event.clientX / clientY` | 鼠标视口坐标 |
| `element.getBoundingClientRect()` | 元素的位置和尺寸 |
| `event.preventDefault()` | 阻止默认行为 |
| `element.scrollIntoView({behavior:'smooth'})` | 平滑滚动到元素 |
| `new IntersectionObserver(fn, 选项)` | 观察元素是否进入视口 |
| `observer.observe(el)` / `unobserve(el)` | 开始 / 停止观察 |

### 7.5 「JS 与 CSS 握手」的核心套路（背下来）

```js
// JS 侧：算出数值 → 写成 CSS 变量
el.style.setProperty('--x', value + 'px');

// CSS 侧：读这个变量 → 决定怎么画
.box::before { background: radial-gradient(120px at var(--x, 50%), rgba(...), transparent); }
```
> 记住：**JS 负责「计算与状态」，CSS 负责「呈现与动画」。** 分工清楚，代码才优雅、性能才好。

### 7.6 一句话总结每个高级效果

| 效果 | 一句话原理 |
| --- | --- |
| 毛玻璃 | 半透明底 + 背景模糊 |
| 鼠标光晕 | JS 传坐标，CSS 用径向渐变画光斑 |
| 滚动淡入 | IntersectionObserver 加 `show` 类，CSS transition 收尾 |
| 星云背景 | 两个大径向渐变 + 超慢 keyframes 漂移 |
| 星空尘埃 | 多个 1px 径向渐变平铺 + 循环平移背景 |
| 发光分隔线 | 两端透明的线性渐变 + 微弱 box-shadow |
| 卡片细缝网格 | Grid `gap:1px` + 容器底色透出来 |
| 双色大标题 | 两个 span，一白一灰 + 粗细对比 + 负字间距 |
| 响应式 | `@media` 覆盖 + `clamp()` + `auto-fit` |

---

## 8. 老程序员的「工作流」：工具链 / 快捷键 / DevTools / Git / 部署

> 前 7 章教你「写出好看的页面」，从这一章开始教你「像职业选手一样干活」。
> 记住一句话：**业余选手拼天赋，职业选手拼工作流。**

### 8.1 编辑器：VS Code 必装插件

| 插件 | 作用 | 为什么老鸟必装 |
| --- | --- | --- |
| **Live Server** | 保存即刷新预览 | 省掉手动 F5，改一像素看一眼 |
| **Prettier** | 代码自动格式化 | 统一缩进/引号/换行，团队协作不吵架 |
| **ESLint** | JS 语法与风格检查 | 在运行前就发现低级错误 |
| **Error Lens** | 错误直接显示在行尾 | 不用把鼠标移到波浪线上 |
| **Auto Rename Tag** | 改开头标签自动改结尾 | HTML 手写必备，防漏改 |
| **Path Intellisense** | 路径自动补全 | 图片/文件路径不再写错 |
| **Color Highlight** | 色值旁边显示色块 | 一眼看出 `#5aa9e6` 是什么颜色 |
| **GitLens** | 显示每行是谁改的 | 排查「这行谁写的」神器 |
| **Indent Rainbow** | 缩进彩虹色 | 层级一眼看清，防缩进错乱 |

**一条重要习惯**：在项目根目录建一个 `.vscode/settings.json`，把「保存时自动格式化」打开，从此再也不用管缩进：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2
}
```

### 8.2 键盘就是生产力：必背快捷键

**VS Code 篇（Windows）**

| 快捷键 | 作用 | 场景 |
| --- | --- | --- |
| `Ctrl + P` | 快速打开文件 | 不想在文件树里点半天 |
| `Ctrl + Shift + P` | 命令面板 | 「万能入口」，忘了快捷键就搜 |
| `Ctrl + D` | 选中下一个相同的词（可连按） | 批量改名，比查找替换快 10 倍 |
| `Ctrl + Shift + L` | 选中**所有**相同的词 | 一次改完全部 |
| `Alt + 单击` | 多光标 | 同时编辑多个位置 |
| `Shift + Alt + ↑/↓` | 复制当前行 | 写重复结构 |
| `Alt + ↑/↓` | 上下移动当前行 | 调整顺序不用剪切粘贴 |
| `Ctrl + /` | 注释/取消注释 | 快速屏蔽代码 |
| `Alt + Z` | 自动换行开关 | 看长句代码 |
| `Ctrl + `` ` `` | 打开内置终端 | 不用切窗口 |
| `F2` | 重命名符号 | 改名会自动改所有引用 |

**浏览器篇**

| 快捷键 | 作用 |
| --- | --- |
| `F12` / `Ctrl + Shift + I` | 打开 DevTools |
| `Ctrl + Shift + C` | 检查元素（进入选择模式） |
| `Ctrl + Shift + M` | 切换手机模拟视图 |
| `Ctrl + Shift + R` | **强制刷新**（忽略缓存）——改 CSS 不生效时先按它 |

### 8.3 Emmet：一行写出整块 HTML

在 `.html` 文件里敲缩写再按 `Tab`，会自动展开。老鸟写 HTML 几乎不用手打标签：

```text
!                      → 生成完整 HTML5 骨架
div.card               → <div class="card"></div>
ul>li*5                → 生成 5 个 li
a.btn{点击我}           → <a href="" class="btn">点击我</a>
.wrapper>.item*3       → wrapper 里包 3 个 item
p*2>lorem              → 生成两段填充文字（做原型超好用）
div>h3{标题}+p{内容}     → 一次性生成标题+段落
```

在 CSS 里同样能用：`m10` → `margin: 10px;`，`p20-30` → `padding: 20px 30px;`，`df` → `display: flex;`。

### 8.4 浏览器 DevTools 才是主战场

新手只会 `console.log`，老鸟把 DevTools 当 IDE 用。

**① Elements 面板（改样式）**
- 右键元素 → **检查**，直接在右侧改 CSS，实时看效果。
- 勾选 `:hov` → 可以**强制元素进入 `:hover` / `:focus` 状态**，专门调悬停样式（不用手动悬停！）。
- 看 **Computed（已计算）** 标签，能查到某个属性最终从哪条规则来的——排查「我设了颜色怎么没生效」的唯一正解。

**② 选中元素后，Console 里能用 `$0`**
```js
$0                      // 当前在 Elements 里选中的那个元素
$0.style.background = 'red'   // 直接改它
$$('.focus-card')       // 等价于 querySelectorAll，返回数组
$0.getBoundingClientRect()    // 看它的位置尺寸
```

**③ Console 不止 log**
```js
console.table(users);            // 用表格看数组/对象，比 log 清楚 100 倍
console.group('用户信息');        // 分组
console.log('name', 'Zed');
console.groupEnd();
console.time('render');          // 计时开始
// ...耗时代码
console.timeEnd('render');       // 输出耗时
console.warn('警告'); console.error('错误');  // 带颜色和图标
```

**④ 性能与无用代码**
- `Ctrl + Shift + P` 输入 **Coverage** → 录制后能看到「哪些 CSS/JS 根本没被用到」，删冗余代码的利器。
- **Lighthouse** 标签 → 一键生成性能 / 无障碍 / SEO 报告（分数 + 优化建议全给你）。
- **Rendering** 面板（更多工具里）→ 打开 `Paint flashing` 能看到哪里在疯狂重绘，定位卡顿元凶。

### 8.5 命名规范与代码组织

**BEM 命名法**（大项目最常用）：
```css
.card {}
.card__title {}        /* __ 表示「卡片里的标题」（元素） */
.card--featured {}     /* -- 表示「重点样式」的变体（修饰符） */
```
好处：光看类名就知道它属于谁，CSS 不会互相打架。

**老鸟的代码组织习惯：**
1. `style.css` 顶部先写 `:root` 变量和全局重置，再按「导航 → Hero → 区块 → 页脚」的**页面顺序**写，和 HTML 结构对应。
2. 每一块开头写 `/* ===== 3. Hero 区 ===== */` 注释，`Ctrl + F` 就能跳。
3. 一个类只干一件事，不要写 `.red-big-title` 这种「外貌命名」（改样式时名字就骗人了），要写 `.section-title` 这种「语义命名」。
4. 重复 3 次以上的东西，抽成变量或公共类——这就是 **DRY 原则**（Don't Repeat Yourself）。

### 8.6 Git：老程序员的「后悔药」

```bash
git status                 # 看改了哪些文件（最常用）
git diff                   # 看具体每一行改了什么
git add .                  # 暂存所有改动
git commit -m "fix: 修复导航栏滚动不生效"   # 提交
git log --oneline --graph  # 看提交历史（图形化）
git restore style.css      # 后悔：丢弃某个文件的改动
git stash                  # 临时收起改动，切分支干活
```

**提交信息规范（Conventional Commits）——面试官会看你的 Git 记录：**
| 前缀 | 含义 |
| --- | --- |
| `feat:` | 新功能 |
| `fix:` | 修 bug |
| `style:` | 只改样式/格式 |
| `refactor:` | 重构（不改功能） |
| `perf:` | 性能优化 |
| `docs:` | 文档 |
| `chore:` | 杂项（配置、依赖） |

**老鸟习惯：小步提交。** 别攒一天再 `git commit -m "update"`。每完成一个**能跑通的小功能**就提交一次，出问题能精准回滚。

### 8.7 部署上线（3 分钟免费发布）

| 方式 | 步骤 | 适合 |
| --- | --- | --- |
| **GitHub Pages** | 推到 GitHub → Settings → Pages → Source 选 `main` 分支 → 得到 `xxx.github.io/仓库名` | 静态作品集，免费永久 |
| **Vercel / Netlify** | 注册 → 拖拽文件夹 → 秒出网址 | 最快，支持自动部署 |
| **本地预览** | `npx serve` 或 VS Code Live Server | 开发阶段 |

> **作品集的终点是「有一个能发给 HR 的网址」**，不是躺在你硬盘里的文件夹。做完就部署，这一步价值巨大。

---

## 9. 老程序员的 CSS 实战技巧（25 条）

> 这一章全是「知道了就再也回不去」的实用招数，每条都能直接抄进你的项目。

### 9.1 布局类（省掉一半代码）

**① `gap` 取代一堆 margin**
```css
/* 老写法：要处理「第一个/最后一个不该有 margin」 */
.item { margin-right: 16px; }

/* 新写法：一个属性搞定，首尾不留缝 */
.row { display: flex; gap: 16px; }
```
`gap` 在 Flex 和 Grid 里都能用，是排版最干净的间距方案。

**② `position: sticky` 粘性定位（比 fixed 好用）**
```css
.sidebar { position: sticky; top: 100px; }   /* 滚动到一定位置就「粘住」，但不会脱离文档流 */
```
页内目录、侧边栏、表头固定都用它，不会像 `fixed` 那样需要额外留白。

**③ `inset: 0` 铺满父元素**
```css
.overlay { position: absolute; inset: 0; }   /* 等于 top/right/bottom/left 全 0 */
```

**④ 用 `aspect-ratio` 固定比例（防图片变形）**
```css
.thumb { aspect-ratio: 16 / 9; }   /* 不管宽度多少，永远 16:9 */
```

**⑤ 图片不变形的唯一正解**
```css
img { width: 100%; height: 100%; object-fit: cover; }
/* cover=裁剪填满（不变形）  contain=完整显示（可能留白） */
```

**⑥ `min-height: 100vh` 的坑与解法**
```css
/* 手机浏览器地址栏会导致 100vh 溢出，用 dvh 更准 */
.hero { min-height: 100dvh; }
```

### 9.2 选择器类（写得更少，管得更多）

**⑦ `:is()` / `:where()` 简化重复选择器**
```css
/* 老写法 */
.card h3, .card h4, .card h5 { color: #fff; }
/* 新写法 */
.card :is(h3, h4, h5) { color: #fff; }
```

**⑧ `:has()` 父级选择器（现代 CSS 的大杀器）**
```css
/* 只要卡片里有图片，就给它加内边距 */
.card:has(img) { padding: 0; }
/* 表单里输入框有内容时，把 label 变蓝 */
.field:has(input:not(:placeholder-shown)) label { color: var(--accent); }
```

**⑨ `:not(:last-child)` 只给中间项加分隔**
```css
.item:not(:last-child)::after { content: ''; /* 画分隔线 */ }
```

**⑩ `:focus-visible` 只在键盘操作时显示聚焦框**
```css
button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
/* 鼠标点击不显示难看的蓝框，键盘 Tab 时才显示 —— 无障碍与美观兼得 */
```

### 9.3 视觉类（直接提升质感）

**⑪ 多层阴影，比单层高级得多**
```css
.card {
  box-shadow:
    0 1px 2px rgba(0,0,0,0.3),      /* 贴身细节阴影 */
    0 8px 24px rgba(0,0,0,0.4),     /* 中景阴影 */
    0 24px 64px rgba(0,0,0,0.3);    /* 远景氛围阴影 */
}
```
单层阴影是「贴纸」，三层阴影才是「漂浮」。

**⑫ 渐变描边（比实线边框高级 10 倍）**
```css
.card {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--bg-card), var(--bg-card)) padding-box,
    linear-gradient(135deg, rgba(90,169,230,.8), rgba(255,255,255,.1)) border-box;
}
```

**⑬ 文字渐变（标题专用）**
```css
.title {
  background: linear-gradient(90deg, #fff, #5aa9e6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;               /* 关键：文字透明，露出背景渐变 */
}
```

**⑭ `mix-blend-mode` 混合模式**
```css
.overlay { mix-blend-mode: overlay; }     /* 叠加、screen、multiply 都很常用 */
```

**⑮ `filter` 一行做特效**
```css
img { filter: grayscale(1) brightness(0.8); }        /* 灰度+压暗 */
img:hover { filter: none; }                          /* 悬停恢复彩色 */
.glow { filter: drop-shadow(0 0 12px rgba(90,169,230,.6)); }  /* PNG 图标发光 */
```

**⑯ `currentColor`：让图标自动跟随文字颜色**
```css
.btn { color: #5aa9e6; }
.btn svg { fill: currentColor; }     /* 改 .btn 的颜色，图标自动跟着变 */
```

**⑰ 噪点/颗粒纹理（高级感的秘密武器）**
```css
body::after {
  content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```
很多「看着很贵」的网站，就是偷偷加了一层几乎看不见的噪点。

### 9.4 文字排版类

**⑱ `clamp()` 做流体字号（一行顶三行媒体查询）**
```css
h1 { font-size: clamp(2rem, 6vw, 5rem); }   /* 最小2rem，理想6vw，最大5rem */
```

**⑲ 限制每行字数，阅读体验立刻提升**
```css
p { max-width: 65ch; }         /* 一行约 65 个字符是最舒服的阅读宽度 */
```

**⑳ `text-wrap: balance` 让标题换行更均匀**
```css
h2 { text-wrap: balance; }     /* 避免标题最后一个字孤零零掉到第二行 */
```

**㉑ 单行/多行省略号**
```css
.ellipsis { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }  /* 单行 */
.clamp-2 {
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden;            /* 最多两行，超出省略 */
}
```

**㉒ 中文排版细节**
```css
p {
  text-align: justify;            /* 两端对齐（中文尤其好看） */
  line-height: 1.8;               /* 中文行高比英文要更大，1.6~1.8 */
  word-break: break-word;         /* 防止长英文/链接撑破容器 */
  letter-spacing: 0.02em;         /* 中文正文加一点点字距更透气 */
}
```

**㉓ 数字对齐用 `tabular-nums`（做数据面板必用）**
```css
.stat h3 { font-variant-numeric: tabular-nums; }  /* 每个数字等宽，数字变化时不跳动 */
```

### 9.5 动效与性能类

**㉔ 只用 `transform` 和 `opacity` 做动画**
```css
/* ✅ 高性能：只触发合成层，不重排不重绘 */
.card:hover { transform: translateY(-6px); opacity: 0.95; }

/* ❌ 低性能：会导致整页重排，动画卡顿 */
.card:hover { top: -6px; width: 320px; margin-top: -6px; }
```
**记住：动画只碰 `transform` / `opacity` / `filter`。**

**㉕ 用 `@supports` 做渐进增强 + 尊重用户的「减少动效」偏好**
```css
/* 浏览器支持毛玻璃才用，不支持就退回纯色 */
@supports (backdrop-filter: blur(10px)) {
  .navbar { backdrop-filter: blur(12px); background: rgba(10,10,10,.7); }
}

/* 用户系统开了「减少动态效果」，就把动画关掉 */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

**额外一条：自定义滚动条（细节控必做）**
```css
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15); border-radius: 999px;
  border: 2px solid var(--bg);
}
::-webkit-scrollbar-thumb:hover { background: rgba(90,169,230,0.6); }
```

---

## 10. 老程序员的 JS 实战技巧

> 你的 `main.js` 已经用了 `querySelector`、`addEventListener`、`IntersectionObserver`。
> 这一章补上让代码更「稳、快、省」的实战招数。

### 10.1 性能篇（你的项目马上能用）

**① 事件委托：一个监听管一百个元素**
```js
// ❌ 老写法：给 100 个卡片各绑一个监听，浪费内存
document.querySelectorAll('.focus-card').forEach(card => {
  card.addEventListener('click', handleClick);
});

// ✅ 老鸟写法：只用 1 个监听，靠「冒泡」统一处理
document.querySelector('.focus-grid').addEventListener('click', (e) => {
  const card = e.target.closest('.focus-card');   // 找到被点的卡片
  if (!card) return;
  handleClick(card);
});
```
> `e.target.closest(选择器)` 会向上找最近的匹配祖先，是事件委托的核心。

**② `mousemove` / `scroll` 必须节流（你项目里的隐患）**
```js
// 危险：鼠标一动就执行，一秒可能触发 200 次，容易掉帧
document.addEventListener('mousemove', heavyWork);

// 安全：用 requestAnimationFrame 限制到「每帧最多一次」
let ticking = false;
document.addEventListener('mousemove', (e) => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    heavyWork(e);      // 真正的计算放这里
    ticking = false;
  });
});
```
**防抖 vs 节流（面试常考）：**
```js
// 防抖 debounce：停下不动 300ms 后才执行（搜索框输入）
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// 节流 throttle：每 100ms 最多执行一次（滚动监听）
function throttle(fn, gap = 100) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= gap) { last = now; fn(...args); }
  };
}
```

**③ 批量读、批量写，避免「布局抖动」**
```js
// ❌ 读一次写一次，浏览器被迫反复重排（layout thrashing）
cards.forEach(c => {
  const h = c.offsetHeight;      // 读（触发布局计算）
  c.style.height = h + 10 + 'px'; // 写（又触发）
});

// ✅ 先全部读，再全部写
const heights = [...cards].map(c => c.offsetHeight);  // 只读
cards.forEach((c, i) => { c.style.height = heights[i] + 10 + 'px' });  // 只写
```

### 10.2 写法篇（更短、更安全）

**④ 可选链 `?.` 和空值合并 `??`**
```js
// 老写法：层层判断
if (user && user.profile && user.profile.name) { ... }

// 新写法
const name = user?.profile?.name ?? '匿名';   // ?? = 只有 null/undefined 才用默认值
```

**⑤ `dataset` 在 HTML 和 JS 之间传数据**
```html
<button class="tab" data-target="works">作品</button>
```
```js
btn.addEventListener('click', () => {
  const id = btn.dataset.target;        // 拿到 "works"
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
});
```

**⑥ `classList` 的完整用法**
```js
el.classList.add('show');
el.classList.remove('show');
el.classList.toggle('show');            // 有就删，没有就加
el.classList.toggle('dark', isDark);    // 第二个参数为 true 才加（更可控）
el.classList.contains('show');          // 判断是否存在 → true/false
```

**⑦ `matchMedia`：用 JS 响应屏幕宽度**
```js
const mq = window.matchMedia('(max-width: 900px)');
function handle(e) { console.log(e.matches ? '手机布局' : '桌面布局'); }
mq.addEventListener('change', handle);
handle(mq);   // 初始化时先跑一次
```

**⑧ 尊重用户的「减少动效」设置**
```js
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
```
> 这是**无障碍**的标配，老鸟都会写；只懂皮毛的人不会。

**⑨ 加载脚本的正确姿势**
```html
<!-- 放在 </body> 前（你现在的做法，没问题） -->
<script src="main.js"></script>

<!-- 或放 <head> 但加 defer：不阻塞渲染，DOM 就绪后按顺序执行 -->
<script src="main.js" defer></script>

<!-- 如果是自己写的多文件 JS，用 module 才有作用域隔离 -->
<script type="module" src="main.js"></script>
```

**⑩ 用 `forEach` 的索引参数做「交错入场」**
```js
document.querySelectorAll('.focus-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;   // 做出「逐个入场」的错落感
});
```
> 这叫 **stagger（交错动画）**，是高级网页最常见的入场手法之一。

### 10.3 交互增强篇（把作品集做「贵」）

**⑪ 用 `IntersectionObserver` 的 `rootMargin` 提前触发**
```js
new IntersectionObserver(callback, {
  rootMargin: '0px 0px -100px 0px',   // 元素还没完全露出来就提前 100px 触发
  threshold: 0.1
});
```

**⑫ 滚动进度条**
```js
const bar = document.querySelector('.progress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.transform = `scaleX(${window.scrollY / max})`;   // 用 transform 更流畅
});
```
> ⚠️ 上面是「简化版」，真实项目请用第 13 章 **配方 2** 的 rAF 节流版本（否则滚动时每像素都在改样式）。

**⑬ 主题切换 + 记忆（localStorage）**
```js
const root = document.documentElement;
// 读取上次的选择（关键：要和 <head> 里的内联脚本配合，避免闪白）
const saved = localStorage.getItem('theme');
if (saved) root.dataset.theme = saved;

document.querySelector('.theme-btn').addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
});
```
配合 CSS：
```css
:root { --bg: #0a0a0a; --text: #fff; }
:root[data-theme="light"] { --bg: #f7f7f8; --text: #111; }
body { background: var(--bg); color: var(--text); }
```

**⑭ 平滑回到顶部**
```js
document.querySelector('.to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

**⑮ 数字滚动计数动画（作品集数字区神器）**
```js
function countUp(el, target, duration = 1500) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);          // easeOutCubic，越到后面越慢
    el.textContent = Math.floor(eased * target);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
countUp(document.querySelector('.stat-num'), 3408);
```

### 10.4 避坑篇（新人最容易翻车的地方）

| 坑 | 现象 | 解法 |
| --- | --- | --- |
| 脚本写在 `<head>` 里且没 `defer` | 报错 `Cannot read properties of null` | 移到 `</body>` 前，或加 `defer` |
| 用 `=` 而不是 `===` 判断 | 出现诡异 bug | 一律用 `===`（严格相等） |
| `var` 造成变量提升混乱 | 循环里变量值不对 | 一律用 `const`，需要改就用 `let` |
| `forEach` 里用 `await` | 不按顺序执行 | 用 `for...of` 循环 |
| 忘记 `e.preventDefault()` | 页面跳走 / 表单刷新 | 明确阻止默认行为 |
| 在循环里反复查 DOM | 慢 | 查询提到循环外 |
| 直接改 `innerHTML` 拼接用户输入 | **XSS 安全漏洞** | 用 `textContent`，或用 `createElement` |

> **安全提醒**：作品集里如果有留言/搜索功能，**永远不要**把用户输入直接塞进 `innerHTML`。用 `textContent` 才安全。

---

## 11. 调试 · 性能 · 无障碍（从业余到专业的三道关）

> 前三章讲「怎么写得快」，这一章讲「怎么写得对、写得快（运行快）、写得人人能用」。
> **这三关，是面试官和真实项目最看重的，也是新手和职业选手最大的差距。**

### 11.1 调试：像侦探一样找 bug

**① 最快的布局调试法**
```css
/* 临时加在 CSS 里，看所有元素的盒子边界（用 outline 不占空间，不会挤乱布局） */
* { outline: 1px solid rgba(255, 0, 0, 0.5); }
```
> 为什么不用 `border`？因为 `border` 会改变元素实际尺寸，反而把布局挤乱；`outline` 不占空间。

**② 排查「样式不生效」的标准三步**
1. 按 `F12` → 选中元素 → 看 **Styles** 面板里你的规则有没有被**划掉**（划掉 = 被更高优先级的规则覆盖了）。
2. 看 **Computed** 面板，找到那个属性的最终值，鼠标悬停能看到**是哪个文件、哪一行**给的。
3. 常见元凶：CSS 里**后面重复定义了同名类**（你这项目里 `.contact-btn` / `.focus-card` 就是这个问题，见第 5.3 节）。

**③ 用 `debugger` 断点代替到处 log**
```js
function heavyLogic(data) {
  debugger;      // 代码执行到这里会「暂停」，你可以逐行看每个变量的值
  // ...
}
```
也可以在 DevTools 的 **Sources** 面板里，点行号左侧打红点断点，比 log 高效得多。

**④ 条件断点（循环里只停我要的那次）**
在 Sources 面板打红点 → 右键断点 → `Edit breakpoint` → 输入条件如 `i === 5`，只在第 6 次循环时暂停。

**⑤ 打印对象时看到「旧值」怎么办**
```js
// ❌ 控制台显示的是对象引用，展开时值可能已经变了
console.log(obj);
// ✅ 打印快照副本
console.log(structuredClone(obj));   // 或 JSON.parse(JSON.stringify(obj))
```

**⑥ 一段通用排查清单**
- 控制台有红色报错吗？（先修报错，再谈样式）
- 元素真的存在于 DOM 吗？（`$0` 检查）
- JS 选择器拼写对吗？（`.focus-card` vs `focus-card`）
- 事件真的触发了吗？（`addEventListener` 里先 `console.log('clicked')`）
- 是缓存问题吗？（`Ctrl + Shift + R` 强制刷新）

### 11.2 性能：让页面「丝滑」

**① 图片优化（占比最大的一环）**
```html
<!-- 懒加载：滚到附近才加载，首屏快很多 -->
<img src="avatar.png" alt="Zed" loading="lazy" width="500" height="600">

<!-- 不同屏幕用不同尺寸的图（省流量 + 更清晰） -->
<img
  src="avatar-800.jpg"
  srcset="avatar-400.jpg 400w, avatar-800.jpg 800w, avatar-1600.jpg 1600w"
  sizes="(max-width: 900px) 100vw, 500px"
  alt="Zed">
```
- **格式**：优先 `WebP` / `AVIF`（比 JPG 小 30%~50%），用 `<picture>` 做兼容回退。
- **尺寸**：别拿 3000px 的大图缩到 500px 显示，按需裁好再上传。
- **必写 `width`/`height`**：能防止图片加载时布局跳动（CLS 指标）。

**② 字体优化**
```css
@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2');   /* woff2 体积最小 */
  font-display: swap;    /* 关键：字体没加载完先用系统字体显示，避免「白屏无字」 */
  unicode-range: U+4E00-9FFF;   /* 只加载需要的字符范围，中文站必用 */
}
```
```html
<!-- 提前预加载关键字体，减少等待 -->
<link rel="preload" href="myfont.woff2" as="font" type="font/woff2" crossorigin>
```
> **最省事的做法**：直接用系统字体栈（`-apple-system, "PingFang SC", "Microsoft YaHei"`），零下载、零等待。你的项目现在就是这么做的 👍

**③ CSS / JS 优化清单**
| 项 | 做法 |
| --- | --- |
| 动画 | 只用 `transform` / `opacity`，不要动 `top`/`width`/`margin` |
| 滚动/鼠标监听 | 节流（见 10.1 ②） |
| 长列表 | `content-visibility: auto;` 跳过屏外渲染 |
| 无用的 CSS | 用 DevTools 的 **Coverage** 面板找出来删掉 |
| 加载方式 | 脚本加 `defer`；图片加 `loading="lazy"` |
| 重排重绘 | 别在循环里频繁读写 DOM 尺寸 |
| `will-change` | 只在动画开始前加，**用完要删**，滥用反而更卡 |

**④ 打开 DevTools 的 Rendering 面板看真相**
- `Paint flashing`：绿色闪的地方就是正在重绘的区域，闪得越多越慢。
- `Layout Shift Regions`：蓝色闪烁代表布局在跳动（体验差）。
- FPS meter：看帧率是否稳定 60fps。

**⑤ 用 Lighthouse 打分**
DevTools → Lighthouse → 勾选 Performance / Accessibility / Best Practices / SEO → Analyze。
**目标：每项 90+**。报告会逐条告诉你哪里扣分、怎么改，等于一个免费的性能顾问。

### 11.3 无障碍（a11y）：让所有人都能用

> 这不是「加分项」，是**专业底线**。而且做好了 SEO 也会更好。

| 要做的事 | 怎么做 |
| --- | --- |
| 用语义标签 | 用 `<nav>` `<header>` `<main>` `<button>`，别全用 `<div>` |
| 图片写 `alt` | `<img src="x.png" alt="简介">`；纯装饰图写 `alt=""` |
| 按钮用 `<button>` | 别用 `<div onclick>`（键盘 Tab 到不了、读屏软件不认识） |
| 表单要有 `label` | `<label for="email">邮箱</label><input id="email">` |
| 键盘可达 | 所有交互都能用 `Tab` 走到、`Enter`/`Space` 触发 |
| 聚焦可见 | 用 `:focus-visible` 给出清晰的聚焦样式，**不要 `outline: none` 一刀切** |
| 颜色对比度 | 正文对比度至少 **4.5:1**（W3C 标准），别用浅灰配深灰 |
| 图标按钮加标签 | `<button aria-label="关闭">✕</button>` |
| 声明语言 | `<html lang="zh-CN">`（你已做对 👍） |
| 尊重减少动效 | `@media (prefers-reduced-motion: reduce)` |
| 跳过导航链接 | 页面顶部加 `<a href="#main" class="skip-link">跳到主内容</a>`，键盘用户能跳过导航直达正文 |

**检查工具**：DevTools → Lighthouse → Accessibility；或装浏览器扩展 **axe DevTools**，一键扫出所有无障碍问题。

**一个简单的对比度检查法**：把页面截图转成灰度，如果文字和背景还能分得清，对比度基本就是合格的。

---

## 12. 让网页「一眼高级」的 20 个操作手法

> 前面讲的是「技术」，这一章讲「审美」。
> 高级感不是玄学，它是**一堆可执行的具体操作**。下面 20 条，做 80% 就能超过 95% 的同行。

### 12.1 结构层：先搭好骨架

**① 用 8pt 间距系统（最重要的一条）**
所有间距只用这几个值：`4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128`（px，或对应的 rem）。
```css
:root {
  --space-1: 4px;  --space-2: 8px;   --space-3: 16px;  --space-4: 24px;
  --space-5: 32px; --space-6: 48px;  --space-7: 64px;  --space-8: 96px;
}
```
> **为什么？** 因为这些数字之间有固定的倍数节奏，排出来的页面「哪哪都对」。

**② 字号阶梯（Type Scale），别随意定字号**
```css
:root {
  --fs-xs: 0.75rem;   /* 12px 辅助 */
  --fs-sm: 0.875rem;  /* 14px 小字 */
  --fs-base: 1rem;    /* 16px 正文 */
  --fs-lg: 1.25rem;   /* 20px 小标题 */
  --fs-xl: 1.5rem;    /* 24px 标题 */
  --fs-2xl: 2rem;     /* 32px */
  --fs-3xl: 3rem;     /* 48px */
  --fs-4xl: 5rem;     /* 80px 主标题 */
}
```
规矩：每级相差 1.25~1.5 倍，不要出现 17px、23px 这种「随手写的数」。

**③ 拉开粗细与颜色对比（对比 = 高级）**
标题 `800` 粗 + 纯白，副标题 `300` 细 + 灰色 60%，正文 `400` + 灰 70%。
> 新手最容易犯的错：**所有文字都一样粗细、一样颜色**，页面就「平」了。

**④ 留白（白空间）要敢给**
- 区块之间至少 `6rem`（96px）的间距。
- 卡片内部 `2rem` 起步。
- **不要怕空**。拥挤 = 廉价，留白 = 昂贵。

**⑤ 限制内容宽度、对齐到网格**
```css
.container { max-width: 1200px; margin-inline: auto; padding-inline: 2rem; }
p { max-width: 65ch; }
.title, .desc, .btn { /* 全部左对齐到同一条竖线 */ }
```
> 页面里所有元素应该**对齐到少数几条隐形的线**。左对齐是最安全的选择。

### 12.2 视觉层：让它「有质感」

**⑥ 全站只用 1 个强调色**
你的项目用了科技蓝 `#5aa9e6`，非常好。再加第二个颜色前，先问自己「真的需要吗」。
> **强调色只用在 10% 的地方**：小标签、编号、关键数字、悬停状态。剩下 90% 全是黑/白/灰。

**⑦ 暗色主题：别用纯黑，用「近黑」**
```css
--bg: #0a0a0a;        /* ✅ 深邃黑，有层次 */
--bg: #000000;        /* ❌ 纯黑，OLED 上像黑洞，且没有层次 */
```
配合多层「渐变叠加」做背景，而不是一张纯色。

**⑧ 微妙渐变（不要明显的彩虹渐变）**
```css
background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0));
```
> 好渐变的标准是：**几乎看不出来，但去掉就觉得少了点什么。**

**⑨ 光晕 / Glow（科技感的来源）**
```css
box-shadow: 0 0 40px rgba(90, 169, 230, 0.15);   /* 越大越柔越高级 */
```

**⑩ 玻璃拟态（半透明 + 模糊）**
```css
background: rgba(20, 20, 20, 0.4);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

**⑪ 渐变描边 + 内发光**
```css
.card {
  position: relative;
  border-radius: 16px;
  background: rgba(20,20,20,0.6);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);  /* 顶部一条内高光 = 玻璃反光感 */
}
```

**⑫ 圆角要有「统一语言」**
要么全用 `8px`（偏硬朗），要么全用 `16px`（偏柔和），要么全用 `999px`（胶囊）。
> **千万别出现**：这个卡片 4px、那个按钮 12px、另一个 20px —— 一眼杂牌。

**⑬ 加一层「噪点 / 颗粒」**
见第 9.3 节 ⑰。这一个 3KB 的效果，能让页面的质感凭空上一个台阶。

**⑭ 图片处理三件套**
```css
img {
  border-radius: 12px;                       /* 圆角 */
  border: 1px solid rgba(255,255,255,0.08);  /* 细边框，区分于背景 */
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
}
```
再加一点 **渐变叠加** 或 **底部渐隐**（`mask-image`），高级感立刻出来。

### 12.3 动效层：让它「会呼吸」

**⑮ 用正确的缓动曲线（这条最被忽视，也最提质感）**
```css
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* 出场：快进慢出，最常用 */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹一下，可爱 */
}
.card { transition: transform 0.4s var(--ease-out); }
```
> ❌ 别整天用 `ease` / `linear`。✅ 改用 `cubic-bezier(0.16, 1, 0.3, 1)`，同样的动画立刻「贵」起来。

**⑯ 时长要短：150~400ms**
- 悬停反馈：`150~200ms`
- 卡片浮起：`250~350ms`
- 入场淡入：`400~600ms`
> 超过 `600ms` 用户就嫌慢了。低于 `100ms` 又感觉不到。

**⑰ 交错入场（Stagger）**
```css
.focus-card {
  transition: opacity .7s var(--ease-out), transform .7s var(--ease-out);
  transition-delay: var(--delay, 0ms);   /* 每个卡片不同的延迟 */
}
```
配合第 10.2 节 ⑩ 的 JS 给每张卡片写入 `--delay`，它们就会「依次」出现，而不是「一起」出现。
（完整可用的写法直接看第 13 章 **配方 12**。）
> 这一个细节，是「专业作品集」和「学生作业」的分水岭。

**⑱ 微交互反馈（让人爱上点你的按钮）**
```css
.btn { transition: transform 0.2s var(--ease-out), box-shadow 0.2s; }
.btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(90,169,230,.3); }
.btn:active { transform: translateY(0) scale(0.98); }   /* 按下时「陷进去」 */
```
**这三种状态都要有：** `hover`（悬停）/ `active`（按下）/ `focus-visible`（键盘聚焦）。

**⑲ 滚动时「有反应」**
- 内容淡入（你已有 👍）
- 导航栏背景加深（你已有 👍）
- 滚动进度条（第 10.3 节）
- 视差（`background-attachment: fixed` 或 `transform: translateY` 配合滚动）

**⑳ 首屏第一秒就要抓住人**
- 主标题要有「一句话价值主张」（你是谁 + 做什么）。
- 数字/成绩要显眼（你已有 👍）。
- 别让首屏出现加载空白，可用**骨架屏（skeleton）**占位。

### 12.4 一页纸速记口诀

> **间距离散化、字号阶梯化、色彩克制化、留白大胆化、圆角统一化、动效曲线化、强调只 10%。**

再加一句最实用的自查：**把你的页面截图，和 Dribbble / Awwwards 上的优秀作品放一起看**——差在哪，一眼就能看出来。

---

## 13. 独门配方库（可直接复制粘贴）

> 这一章是「菜谱」。每个配方都是**完整可用**的，复制进你的项目就能跑。
> 建议做法：**一次只加一个**，加完看效果、调变量，再加下一个。

### 配方 1：渐变描边 + 光晕卡片

```html
<div class="gcard">
  <h3>机械设计</h3>
  <p>结构仿真与轻量化优化</p>
</div>
```

```css
.gcard {
  position: relative;
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.01));
  transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s;
}

/* 用 mask 做「渐变描边」：只保留 1px 的边框区域 */
.gcard::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(90,169,230,.65), rgba(255,255,255,.06) 45%, transparent 75%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}

.gcard:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 60px rgba(0,0,0,.45), 0 0 40px rgba(90,169,230,.15);
}
```
> **原理**：`mask` 用「内容盒」和「整个盒子」两份遮罩相减，只剩边框那一圈可见。

### 配方 2：滚动进度条

```html
<div class="read-progress" aria-hidden="true"></div>
```
```css
.read-progress {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 3px;
  background: linear-gradient(90deg, #5aa9e6, #a78bfa);
  transform: scaleX(0);
  transform-origin: 0 50%;       /* 关键：从左边开始伸长 */
  z-index: 9999;
  pointer-events: none;
}
```
```js
const bar = document.querySelector('.read-progress');
let ticking = false;

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  bar.style.transform = `scaleX(${Math.min(ratio, 1)})`;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateProgress);
  }
}, { passive: true });
```
> **为什么用 `transform: scaleX` 而不是 `width`？** 缩放只触发合成，不引发重排，滚动时不会卡。
> `{ passive: true }` 告诉浏览器「这个监听不会 `preventDefault`」，滚动更顺。

### 配方 3：回到顶部按钮

```html
<button class="to-top" aria-label="回到顶部">↑</button>
```
```css
.to-top {
  position: fixed;
  right: 24px; bottom: 24px;
  width: 48px; height: 48px;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 50%;
  background: rgba(20,20,20,.6);
  backdrop-filter: blur(12px);
  color: #fff; font-size: 20px; cursor: pointer;
  opacity: 0; visibility: hidden; transform: translateY(12px);
  transition: opacity .3s, transform .3s var(--ease-out), visibility .3s;
}
.to-top.is-visible { opacity: 1; visibility: visible; transform: translateY(0); }
.to-top:hover { border-color: rgba(90,169,230,.6); box-shadow: 0 0 24px rgba(90,169,230,.35); }
```
```js
const toTop = document.querySelector('.to-top');

window.addEventListener('scroll', () => {
  toTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
}, { passive: true });

toTop.addEventListener('click', () => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
});
```
> 注意用 `opacity + visibility` 控制显隐（而不是 `display: none`），否则 `transition` 不生效。

### 配方 4：数字滚动计数

```html
<div class="stat">
  <h3 class="stat-num" data-target="3408">0</h3>
  <p>累计设计工时</p>
</div>
```
```js
function countUp(el, duration = 1600) {
  const target = Number(el.dataset.target);
  const start = performance.now();

  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);          // easeOutCubic
    el.textContent = Math.round(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// 进入视口时才触发（滚到才动，体验最好）
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    countUp(entry.target);
    io.unobserve(entry.target);        // 只跑一次
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach((el) => io.observe(el));
```
> `.toLocaleString()` 会把 `3408` 显示成 `3,408`，一下就专业了。

### 配方 5：打字机效果

```html
<h1 class="typewriter" data-text="我是一名机械设计工程师"></h1>
```
```css
.typewriter { display: inline-block; }
.typewriter::after {
  content: '';
  display: inline-block;
  width: 2px; height: 1em;
  margin-left: 4px;
  background: currentColor;
  vertical-align: -0.12em;
  animation: caret .9s steps(1) infinite;
}
@keyframes caret { 50% { opacity: 0; } }
```
```js
const el = document.querySelector('.typewriter');
const text = el.dataset.text;
let i = 0;

function type() {
  el.textContent = text.slice(0, ++i);
  if (i < text.length) setTimeout(type, 90);
}
type();
```
> `steps(1)` 让光标「闪」而不是「渐变」，才有真实的终端感。
> 想更细腻可以配合 `prefers-reduced-motion`：若用户开了减少动效，直接 `el.textContent = text`。

---

### 配方 6：鼠标跟随光晕（rAF 优化版）

> 你的项目里已有 `.bg-glow` 跟随鼠标，但它是**每动一次就改一次**。这里给出更流畅的写法。
> （先看第 5.4 节：你原来的 `--global-x` / `--global-y` / `--edge-intensity` 是**没被用到**的死变量。）

```html
<div class="bg-glow" aria-hidden="true"></div>
```
```css
.bg-glow {
  position: fixed;
  top: 0; left: 0;
  width: 700px; height: 700px;
  margin: -350px 0 0 -350px;          /* 让圆心对准鼠标 */
  border-radius: 50%;
  background: radial-gradient(circle, rgba(90,169,230,.18), transparent 65%);
  filter: blur(40px);
  pointer-events: none;               /* 关键：别挡住点击 */
  z-index: 0;
  transform: translate3d(-9999px, -9999px, 0);   /* 初始藏在屏幕外 */
  transition: opacity .6s;
  will-change: transform;
}
```
```js
const glow = document.querySelector('.bg-glow');
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let gx = mx, gy = my;
let ticking = false;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(render);
});

// 缓动跟随：光晕慢慢「追」鼠标，比硬跟随高级得多
function render() {
  gx += (mx - gx) * 0.08;
  gy += (my - gy) * 0.08;
  glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;

  if (Math.abs(mx - gx) > 0.5 || Math.abs(my - gy) > 0.5) {
    requestAnimationFrame(render);       // 还没追上，继续追
  } else {
    ticking = false;                     // 追上了，停下等下一次 mousemove
  }
}

// 触屏设备没有鼠标，直接隐藏
if (matchMedia('(hover: none)').matches) glow.style.display = 'none';
```
> **两个关键点**：① `requestAnimationFrame` 限帧；② `0.08` 的插值做出「延迟跟随」的高级感。

### 配方 7：骨架屏（Skeleton）

```html
<div class="skeleton" style="width:100%; height:220px; border-radius:16px;"></div>
```
```css
.skeleton {
  background: linear-gradient(90deg,
    rgba(255,255,255,.04) 25%,
    rgba(255,255,255,.10) 37%,
    rgba(255,255,255,.04) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}
@keyframes shimmer {
  from { background-position: 100% 50%; }
  to   { background-position: 0 50%; }
}
```
> 加载真实内容前，先用这个占位，页面不会「从空白突然跳出来」，体验立刻专业。

### 配方 8：图片懒加载 + 淡入

```html
<img class="lazy-img" src="avatar.jpg" alt="Zed" loading="lazy" decoding="async" width="500" height="600">
```
```css
.lazy-img {
  opacity: 0;
  transform: scale(1.03);
  transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1);
}
.lazy-img.is-loaded { opacity: 1; transform: scale(1); }
```
```js
document.querySelectorAll('.lazy-img').forEach((img) => {
  if (img.complete) {
    img.classList.add('is-loaded');        // 已经在缓存里，直接显示
  } else {
    img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
    img.addEventListener('error', () => img.classList.add('is-loaded'), { once: true });
  }
});
```
> 一定要处理 `img.complete`（缓存命中时 `load` 事件不会再触发，会导致图片永远不显示——新手最常见的坑）。

### 配方 9：深浅色主题切换（防闪白）

```html
<!-- 放在 </head> 之前，必须内联、必须同步执行，否则会「闪一下白」 -->
<script>
  (function () {
    const t = localStorage.getItem('theme');
    if (t) document.documentElement.dataset.theme = t;
  })();
</script>
```
```html
<button class="theme-btn" aria-label="切换主题">🌓</button>
```
```css
:root {
  --bg: #0a0a0a;
  --text: #f2f2f2;
  --bg-card: rgba(255,255,255,.04);
  --border: rgba(255,255,255,.10);
}
:root[data-theme="light"] {
  --bg: #f7f7f9;
  --text: #16161a;
  --bg-card: rgba(0,0,0,.03);
  --border: rgba(0,0,0,.10);
}
body {
  background: var(--bg);
  color: var(--text);
  transition: background-color .35s, color .35s;
}
```
```js
const btn = document.querySelector('.theme-btn');
btn.addEventListener('click', () => {
  const root = document.documentElement;
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
});
```
> **为什么要内联脚本？** 如果等 `main.js` 下载完再设置主题，页面会先用默认色渲染一帧，再突变——这就是著名的 **FOUC（闪白）**。

### 配方 10：自定义滚动条 + 选中文字颜色

```css
/* 滚动条 */
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,.14);
  border-radius: 999px;
  border: 2px solid var(--bg);        /* 留 2px 缝隙更精致 */
}
::-webkit-scrollbar-thumb:hover { background: rgba(90,169,230,.55); }

/* 选中文字的颜色（细节控必做） */
::selection { background: rgba(90,169,230,.35); color: #fff; }

/* 键盘 Tab 的聚焦环统一风格 */
:focus-visible { outline: 2px solid rgba(90,169,230,.8); outline-offset: 3px; border-radius: 4px; }
```

---

### 配方 11：移动端汉堡菜单（作品集必做）

> 你现在窄屏下是「把导航链接隐藏」，但**用户就没有导航了**。正确做法是给一个汉堡菜单。

```html
<header class="nav">
  <a class="logo" href="#top">Zed Li</a>

  <button class="nav-toggle" aria-label="打开菜单" aria-expanded="false" aria-controls="nav-links">
    <span></span><span></span><span></span>
  </button>

  <nav class="nav-links" id="nav-links">
    <a href="#about">About</a>
    <a href="#works">Works</a>
    <a href="#contact">Contact</a>
  </nav>
</header>
```
```css
.nav { display: flex; align-items: center; justify-content: space-between; }

.nav-toggle {
  display: none;                       /* 桌面隐藏 */
  flex-direction: column; gap: 5px;
  width: 44px; height: 44px;
  align-items: center; justify-content: center;
  background: none; border: 0; cursor: pointer;
}
.nav-toggle span {
  display: block; width: 22px; height: 2px;
  background: currentColor; border-radius: 2px;
  transition: transform .3s var(--ease-out), opacity .2s;
}

/* 打开时：上下两条线转成 ✕ */
.nav-toggle[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-toggle[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.nav-toggle[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 900px) {
  .nav-toggle { display: flex; }

  .nav-links {
    position: fixed;
    inset: 64px 0 auto 0;              /* 贴在导航栏下方铺满 */
    flex-direction: column;
    gap: 4px;
    padding: 16px 24px 24px;
    background: rgba(10,10,10,.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,.08);
    transform: translateY(-120%);      /* 默认收在上方外面 */
    transition: transform .4s var(--ease-out);
  }
  .nav-links.is-open { transform: translateY(0); }
}
```
```js
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.setAttribute('aria-label', open ? '打开菜单' : '关闭菜单');
  links.classList.toggle('is-open', !open);
});

// 点任意链接后自动关闭菜单（否则页面跳了菜单还开着）
links.addEventListener('click', (e) => {
  if (!e.target.matches('a')) return;
  toggle.setAttribute('aria-expanded', 'false');
  links.classList.remove('is-open');
});

// 按 Esc 关闭（无障碍细节）
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    toggle.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
  }
});
```
> 用 `aria-expanded` 表达状态，读屏软件能听懂；用 `transform` 做动画，不卡。

### 配方 12：卡片交错入场（完整版）

```css
.focus-card {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity .7s cubic-bezier(.16,1,.3,1) var(--delay, 0ms),
    transform .7s cubic-bezier(.16,1,.3,1) var(--delay, 0ms),
    border-color .3s, box-shadow .3s;
}
.focus-card.is-visible { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .focus-card { opacity: 1; transform: none; transition: none; }
}
```
```js
const cards = document.querySelectorAll('.focus-card');

// ① 用 JS 写入序号，CSS 用 var(--delay) 依次延迟
cards.forEach((card, i) => card.style.setProperty('--delay', `${i * 90}ms`));

// ② 进入视口才播放（只播一次）
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    io.unobserve(entry.target);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

cards.forEach((card) => io.observe(card));
```
> 这一套（`opacity + translateY + 交错延迟 + IntersectionObserver`）就是**几乎所有高端网站的入场方式**。

---

### 配方 13：轻量视差滚动

```html
<section class="parallax">
  <div class="parallax__bg" data-speed="0.25"></div>
  <div class="parallax__content"><h2>让作品自己说话</h2></div>
</section>
```
```css
.parallax { position: relative; overflow: hidden; min-height: 60vh; }
.parallax__bg {
  position: absolute;
  inset: -20% 0;                        /* 上下多留一点，滚动时不露边 */
  background: center / cover no-repeat url('bg.jpg');
  will-change: transform;
}
.parallax__content { position: relative; z-index: 1; }
```
```js
const items = document.querySelectorAll('[data-speed]');
let ticking = false;

function parallax() {
  items.forEach((el) => {
    const rect = el.parentElement.getBoundingClientRect();
    const speed = Number(el.dataset.speed);
    // 元素相对视口中心的偏移量 × 速度
    const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
    el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  });
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
}, { passive: true });
parallax();
```
> ⚠️ 别用 `background-attachment: fixed` 做视差——**iOS Safari 上会直接失效**。用 `transform` 才跨平台。
> 位移幅度控制在 `0.1~0.3`，轻微位移最高级，过头就变成 2010 年的老网页。

### 配方 14：磁吸发光按钮

```html
<a class="magnet-btn" href="#contact"><span>与我合作</span></a>
```
```css
.magnet-btn {
  position: relative;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 32px;
  border-radius: 999px;
  color: #05202f; font-weight: 700; text-decoration: none;
  background: linear-gradient(135deg, #8fd0ff, #5aa9e6);
  box-shadow: 0 8px 30px rgba(90,169,230,.35);
  transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s;
  will-change: transform;
}
.magnet-btn:hover { box-shadow: 0 14px 44px rgba(90,169,230,.55); }
.magnet-btn:active { transform: scale(.97); }
```
```js
document.querySelectorAll('.magnet-btn').forEach((btn) => {
  const strength = 0.28;

  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });

  // 鼠标离开 → 弹回原位（配合 cubic-bezier 有回弹感）
  btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0, 0)'; });
});
```
> **别滥用**：整站只有 1~2 个按钮做磁吸效果才叫「高级」，到处都是就变成「不专业」。

### 配方 15（进阶）：纯 CSS 滚动驱动动画

> 2024 年后的新能力，不用一行 JS 就能做滚动动画（Chrome / Edge 已支持）。

```css
@supports (animation-timeline: scroll()) {
  @keyframes reveal {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .reveal-on-scroll {
    animation: reveal linear both;
    animation-timeline: view();          /* 跟着「元素进入视口」的进度走 */
    animation-range: entry 10% cover 35%;
  }
}
```
> 注意放在 `@supports` 里，不支持的浏览器就完全没这段动画——**页面依然正常显示，这叫渐进增强**。

### 配方使用顺序建议

1. 先做 **配方 12**（入场动画）—— 性价比最高，改动最小、改观全站。
2. 再做 **配方 2**（进度条）+ **配方 3**（回顶部）—— 覆盖面最广。
3. 然后 **配方 1**（渐变描边卡片）—— 视觉观感提升最大。
4. 最后按需加 **配方 6 / 11 / 14 / 15** —— 这些是「加分项」，别一开始就上。

> ⚠️ **最后一个忠告**：不要一次把所有效果都加上。**克制**本身就是高级感的一部分。

---

## 14. 结语

你现在手里这个 `my-portfolio`，麻雀虽小五脏俱全：

- **结构**：语义化 HTML，5 个板块层次分明；
- **样式**：CSS 变量统一配色，Flex + Grid 布局，毛玻璃 + 渐变 + 动画；
- **交互**：滚动吸顶、平滑锚点、滚动淡入、鼠标跟随光晕，4 大高级交互。

**这三样东西就是「高级精美网页」的全部底牌。** 换个颜色、换套内容，同样的技术就能做出无数种网站。

接下来最该做的一件事：**照着第 5 章的「代码体检」，动手把问题一个个修掉。** 改代码的过程，比看十篇教程都有用。

### 一份可以直接照着做的「行动清单」

**第 1 周 · 把地基打牢**
1. 修掉第 5 章的 7 个问题（缺图、重复 CSS、重复 `bg-glow`、死变量、内容不一致）。
2. 按第 8 章配好 VS Code 插件 + 保存自动格式化，把快捷键练成肌肉记忆。

**第 2 周 · 把体验补齐**
3. 用第 13 章 **配方 12** 重写入场动画（交错入场，观感立刻不同）。
4. 用第 13 章 **配方 11** 加上移动端汉堡菜单（否则手机用户没导航）。
5. 用第 10 章 ① ② 把 `mousemove` / `scroll` 监听改成 rAF 节流。

**第 3 周 · 把质感提上去**
6. 按第 12 章的自查清单过一遍：间距是否离散、字号是否有阶梯、圆角是否统一、缓动是否用了 `cubic-bezier`。
7. 用第 9 章 ⑪ ⑫ ⑰ 给卡片加三层阴影 + 渐变描边 + 噪点纹理。
8. 加上第 13 章 **配方 2**（滚动进度条）和 **配方 9**（深浅色主题）。

**第 4 周 · 把专业度做出来**
9. 跑一次 Lighthouse，把各项分数刷到 90+（第 11.2 节）。
10. 过一遍无障碍清单（第 11.3 节）：`alt`、`:focus-visible`、对比度、键盘可达。
11. 用第 8.7 节把网站部署上线，拿到一个能发给 HR 的网址。
12. 把整个过程的每一步都 `git commit`，让提交记录成为你的「学习履历」。

> **学前端最快的路径不是「看完」，而是「改完 + 部署 + 有人看」。**
> 你现在手上这份代码，已经足够撑起一个像样的作品集了 —— 差的只是那几十次「打开 DevTools 调一调」的耐心。

学习路上有问题，随时回来翻这份笔记。祝你把网页做得又稳又漂亮。 🚀

— 你的导师

