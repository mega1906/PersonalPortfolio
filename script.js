document.addEventListener('DOMContentLoaded', () => {
  // Nav toggle
  const menuToggle = document.getElementById('menuToggle') || document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
        navLinks.classList.remove('active');
      }
    });
  });

  // Typing animation
  const phrases = ["AI/ML Developer", "App Developer", "Tech Explorer", "Research Enthusiast"];
  const typedText = document.getElementById("typedText");
  let currentPhrase = 0, currentLetter = 0, isDeleting = false;

  function type() {
    const fullText = phrases[currentPhrase];
    typedText.textContent = isDeleting ? fullText.substring(0, currentLetter--) : fullText.substring(0, currentLetter++);
    if (!isDeleting && currentLetter === fullText.length) setTimeout(() => isDeleting = true, 1000);
    else if (isDeleting && currentLetter === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
    }
    setTimeout(type, isDeleting ? 60 : 100);
  }
  type();
});

// Project filter tabs
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const category = button.getAttribute('data-category');
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.display = category === 'all' || card.getAttribute('data-category') === category ? 'block' : 'none';
    });
  });
});

// Timeline reveal on scroll
const items = document.querySelectorAll('.timeline-content');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = '0.1s';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
items.forEach(item => observer.observe(item));

// Go to Top logic
window.onscroll = function () {
  const btn = document.getElementById("goTopBtn");
  btn.style.display = (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) ? "block" : "none";
};
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Load stored theme
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-theme');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
});
