const canvas = document.getElementById('userCanvas');
const ctx = canvas.getContext('2d');
// canvas styles
ctx.lineWidth = 6;
ctx.lineCap = 'round';

// follow mouse
function drawByUser() {
  ctx.beginPath();
  canvas.onmousedown = (e) => {
    ctx.moveTo(e.offsetX, e.offsetY);
  };
  canvas.onmousemove = (e) => {
    if (e.buttons === 1) {
      console.log(`(${e.offsetX}, ${e.offsetY})`);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  };
}
drawByUser();
