// ================= 1. 滚动时导航栏背景加深 =================
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 10, 10, 0.95)';
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.7)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// ================= 2. 锚点平滑跳转 =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ================= 3. 滚动淡入效果 =================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// 找出所有需要淡入的元素
const fadeElements = document.querySelectorAll('.focus-card, .timeline-item, .stat-item');
fadeElements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ================= 全局环境光 + 边缘发光 =================
const bgGlow = document.querySelector('.bg-glow');
const cards = document.querySelectorAll('.focus-card, .contact-btn');

document.addEventListener('mousemove', (e) => {
  // 1. 更新背景环境光的位置
  if (bgGlow) {
    bgGlow.style.setProperty('--global-x', `${e.clientX}px`);
    bgGlow.style.setProperty('--global-y', `${e.clientY}px`);
  }

  // 2. 更新每个卡片的光晕
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 计算鼠标到边框的最近距离
    const distX = Math.min(x, rect.width - x);
    const distY = Math.min(y, rect.height - y);
    const edgeDist = Math.min(distX, distY); // 距离边框的像素值

    // 如果鼠标在卡片附近（±150px内），开始计算
    if (edgeDist < 150) {
      // 将光晕坐标传给 CSS
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // 核心逻辑：距离边框越近，亮度越高（0 到 1 之间）
      // 150px 为最远距离（不亮），0px 为贴在边框上（最亮）
      const intensity = Math.max(0, 1 - edgeDist / 150);
      
      // 把亮度传给 CSS 变量
      card.style.setProperty('--edge-intensity', intensity.toFixed(2));
    } else {
      // 鼠标离得太远，亮度归零
      card.style.setProperty('--edge-intensity', 0);
    }
  });
});