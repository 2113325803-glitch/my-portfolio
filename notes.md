# 从零读懂一个「高级感」个人作品集网页

> 导师笔记 · 面向零基础
> 项目：`my-portfolio`（Zed Li Jiale 个人作品集）
> 涉及文件：`index.html` / `style.css` / `main.js`

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

## 8. 结语

你现在手里这个 `my-portfolio`，麻雀虽小五脏俱全：

- **结构**：语义化 HTML，5 个板块层次分明；
- **样式**：CSS 变量统一配色，Flex + Grid 布局，毛玻璃 + 渐变 + 动画；
- **交互**：滚动吸顶、平滑锚点、滚动淡入、鼠标跟随光晕，4 大高级交互。

**这三样东西就是「高级精美网页」的全部底牌。** 换个颜色、换套内容，同样的技术就能做出无数种网站。

接下来最该做的一件事：**照着第 5 章的「代码体检」，动手把问题一个个修掉。** 改代码的过程，比看十篇教程都有用。

学习路上有问题，随时回来翻这份笔记。祝你把网页做得又稳又漂亮。 🚀

— 你的导师

