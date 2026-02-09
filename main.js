const isNarrow = window.matchMedia("(max-width: 768px)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
const allowMotion = !(isNarrow || prefersReducedMotion || isCoarsePointer);

/* =====================================================
   1) 3D TILT CARDS
===================================================== */
if (allowMotion){
  document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mousemove", e => {

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width/2;
      const centerY = rect.height/2;

      const rx = -(y-centerY)/12;
      const ry = (x-centerX)/12;

      const tilt = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;

      card.dataset.tilt = tilt;
      card.style.transform = tilt;

    });

    card.addEventListener("mouseleave", ()=>{
      card.dataset.tilt = "";
      card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });

  });
}


/* =====================================================
   2) SCROLL REVEAL ENGINE
===================================================== */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {

    if(entry.isIntersecting){
      entry.target.classList.add("reveal-visible");
    }

  });
}, { threshold: 0.15 });

document.querySelectorAll("section, .card, .quote").forEach(el=>{
  el.classList.add("reveal");
  observer.observe(el);
});


/* =====================================================
   3) CURSOR GLOW LIGHT
===================================================== */

if (allowMotion){
  const glow = document.createElement("div");
  glow.style.position = "fixed";
  glow.style.pointerEvents = "none";
  glow.style.width = "300px";
  glow.style.height = "300px";
  glow.style.borderRadius = "50%";
  glow.style.background =
  "radial-gradient(circle, rgba(120,180,255,0.18) 0%, transparent 60%)";
  glow.style.zIndex = "-1";

  document.body.appendChild(glow);

  document.addEventListener("mousemove", e=>{
    glow.style.left = e.clientX - 150 + "px";
    glow.style.top = e.clientY - 150 + "px";
  });
}


/* =====================================================
   4) APPLE-STYLE SECTION FADE
===================================================== */

if (allowMotion){
  window.addEventListener("scroll", () => {

    document.querySelectorAll("section").forEach(sec => {

      const rect = sec.getBoundingClientRect();
      const visible = 1 - Math.abs(rect.top / window.innerHeight);

      sec.style.opacity = Math.max(0.2, visible);
      sec.style.transform = `translateY(${rect.top * 0.08}px)`;

    });

  });
}


/* ===============================
   STABLE FLOAT SYSTEM
=============================== */

if (allowMotion){
  const cards = document.querySelectorAll(".card");

  let mx = 0;
  let my = 0;

  document.addEventListener("mousemove", e=>{
    mx = (e.clientX/window.innerWidth - 0.5);
    my = (e.clientY/window.innerHeight - 0.5);
  });

  function composeTransform(card,i){

    const tilt = card.dataset.tilt || "";
    const scroll = card.dataset.scroll || "";

    const depth = (i+1)*10;

    const floatX = mx * depth;
    const floatY = my * depth;

    card.style.transform =
      `${tilt} ${scroll} translate(${floatX}px,${floatY}px)`;
  }

  function animateFloat(){

    cards.forEach((c,i)=>composeTransform(c,i));
    requestAnimationFrame(animateFloat);

  }

  animateFloat();
}


/* ===============================
   MAGNETIC BUTTON
=============================== */

if (allowMotion){
  document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("mousemove", e=>{

      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;

      btn.style.transform =
        `translate(${x*0.2}px, ${y*0.2}px) scale(1.05)`;
    });

    btn.addEventListener("mouseleave", ()=>{
      btn.style.transform = "translate(0,0)";
    });

  });
}


/* ===== Testimonial Rotation ===== */

const quotes = document.querySelectorAll(".quote");
let qIndex = 0;

setInterval(()=>{

  quotes[qIndex].classList.remove("active");

  qIndex = (qIndex+1)%quotes.length;

  quotes[qIndex].classList.add("active");

},3000);


/* ===== Activity Feed ===== */

const msgs=[
"Someone from Mumbai just purchased",
"Creator from Delhi downloaded",
"Freelancer unlocked prompts",
"New user joined AscendLabs"
];

setInterval(()=>{
  const activity = document.getElementById("activity");
  if (activity){
    activity.innerText = msgs[Math.floor(Math.random()*msgs.length)];
  }
},4000);


/* ===================================
   CINEMATIC SCROLL ENGINE
=================================== */

if (allowMotion){
  const sections = document.querySelectorAll("section");

  let smoothY = window.scrollY;

  function cinematicScroll(){

    // momentum smoothing
    smoothY += (window.scrollY - smoothY) * 0.08;

    sections.forEach((sec,i)=>{

      const rect = sec.getBoundingClientRect();
      const center = window.innerHeight/2;

      const distance = rect.top - center;

      const visibility =
        1 - Math.min(Math.abs(distance)/600,1);

      const depthMove = distance * -0.08;

      sec.style.opacity = visibility;
      sec.style.transform =
        `translateY(${depthMove}px)`;

    });

    requestAnimationFrame(cinematicScroll);
  }

  cinematicScroll();
} else {
  document.querySelectorAll("section").forEach(sec=>{
    sec.style.opacity = "1";
    sec.style.transform = "none";
  });
}
