// Canvas animation: calming animated background for hospital site
const networkCanvas = document.getElementById("network");
const ctx = networkCanvas.getContext("2d");

let width, height;
let points = [];
const totalPoints = 100;

// Optional: You can replace this background with a medical-themed abstract image
const bgImage = new Image();
bgImage.src = "download (7).jpg"
const mouse = { x: null, y: null };

// Mouse movement tracking
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Clear mouse position when leaving the canvas
window.addEventListener("mouseleave", () => {
  mouse.x = mouse.y = null;
});

// Resize canvas to full screen
function resizeCanvas() {
  width = networkCanvas.width = window.innerWidth;
  height = networkCanvas.height = window.innerHeight;
  initializePoints();
}
window.addEventListener("resize", resizeCanvas);

// Create animated points
function initializePoints() {
  points = [];
  for (let i = 0; i < totalPoints; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    });
  }
}

// Animation loop
function animate() {
  ctx.drawImage(bgImage, 0, 0, width, height);

  for (let i = 0; i < points.length; i++) {
    const p = points[i];

    // Update positions
    p.x += p.vx;
    p.y += p.vy;

    // Bounce on edge
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    // Draw point
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#2bb673"; // Healthcare-themed green
    ctx.fill();

    // Connect to nearby points
    for (let j = i + 1; j < points.length; j++) {
      const q = points[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(43, 182, 115, ${1 - dist / 100})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // Draw lines to mouse
    if (mouse.x !== null && mouse.y !== null) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 150})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

// Start animation after image loads
bgImage.onload = () => {
  resizeCanvas();
  animate();
};
