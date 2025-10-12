// === LOADER ===
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  setTimeout(() => loader.style.display = 'none', 600);
});

// === PARTICLES ===
const canvas = document.getElementById('particle-bg');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const numParticles = 150;
for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.6,
    speedY: (Math.random() - 0.5) * 0.6
  });
}

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    const dx = (mouseX - canvas.width / 2) * 0.00005;
    const dy = (mouseY - canvas.height / 2) * 0.00005;
    p.x += p.speedX + dx;
    p.y += p.speedY + dy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,255,255,0.4)';
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// === CURSOR ===
// Cursor follow
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', e => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

// Grow cursor on hover
document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});


// === SOCIALS ===
const socials = [
  { icon: 'fab fa-github', title: 'GitHub', href: 'https://github.com/abhiiinavpc369' },
  { icon: 'fas fa-globe', title: 'Team', href: 'https://starks.run.place' },
  { icon: 'fab fa-discord', title: 'Discord', href: 'https://discord.gg/rexcreations' }
];
const socialsEl = document.getElementById('socials');
socials.forEach(s => {
  const a = document.createElement('a');
  a.className = 'icon-pill';
  a.href = s.href;
  a.target = '_blank';
  a.innerHTML = `<i class="${s.icon}"></i><span>${s.title}</span>`;
  socialsEl.appendChild(a);
});

// === ROLE TEXT ===
const phrases = ["Web Developer", "Vibe Coder", "Vibe Guy", "Discord Bot Developer"];
let i = 0;
const role = document.getElementById('role');
function loopRoles() {
  role.style.opacity = 0;
  setTimeout(() => {
    role.textContent = phrases[i];
    role.style.opacity = 1;
    i = (i + 1) % phrases.length;
  }, 400);
}
setInterval(loopRoles, 3000);
loopRoles();

// === PROJECTS ===
const projects = [
  {
    name: "Team Website",
    description: "A website made with backend and frontend in 2 weeks.",
    link: "https://starks.run.place/",
    author: "Abhinav Ji"
  },
  {
    name: "Happy Glass Clone",
    description: "A physics-based puzzle game built in JavaScript canvas.",
    link: "#",
    author: "Abhinav Ji"
  }
];

const grid = document.getElementById('project-grid');
projects.forEach(p => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `<h3>${p.name}</h3><p>${p.description}</p>`;
  card.addEventListener('click', () => openProject(p));
  grid.appendChild(card);
});

const modal = document.getElementById('project-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalAuthor = document.getElementById('modal-author');
const modalLink = document.getElementById('modal-link');

function openProject(p) {
  modal.classList.remove('hidden');
  modalTitle.textContent = p.name || "Untitled Project";
  modalDesc.textContent = p.description || "No description available.";
  modalAuthor.textContent = p.author ? `Made by ${p.author}` : "";
  modalLink.href = p.link;
}
closeModal.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

// === CONTACT FORM ===
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = contactForm.name.value || "Anonymous";
  const email = contactForm.email.value || "No email";
  const message = contactForm.message.value || "No message";
  const subject = encodeURIComponent(`Message from ${name}`);
  const body = encodeURIComponent(`${message}\n\nEmail: ${email}`);
  window.location.href = `mailto:abhiiinav.pc@gmail.com?subject=${subject}&body=${body}`;
});
