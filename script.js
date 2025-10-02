// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
  }, 2000); // 2s loading
});

// Typewriter effect for role text
const roles = ["Web Developer", "Vibe Coder", "Tech Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
const roleText = document.getElementById("role-text");

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    roleText.textContent += roles[roleIndex][charIndex];
    charIndex++;
    setTimeout(typeRole, 100);
  } else {
    setTimeout(deleteRole, 1500);
  }
}
function deleteRole() {
  if (charIndex > 0) {
    roleText.textContent = roles[roleIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(deleteRole, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 200);
  }
}
typeRole();

// Smooth scroll (optional for internal links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior:'smooth'
    });
  });
});

// Hero canvas background (subtle particles)
const canvas = document.getElementById("hero-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for(let i=0;i<100;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    radius: Math.random()*2+1,
    speedX: (Math.random()-0.5)*0.5,
    speedY: (Math.random()-0.5)*0.5
  });
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fillStyle="rgba(0,255,255,0.3)";
    ctx.fill();
    p.x+=p.speedX;
    p.y+=p.speedY;
    if(p.x<0||p.x>canvas.width)p.speedX*=-1;
    if(p.y<0||p.y>canvas.height)p.speedY*=-1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
