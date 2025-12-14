const canvas = document.getElementById('frame');
const ctx = canvas.getContext('2d');
// basic canvas setup
// guiding lines
ctx.beginPath();
ctx.moveTo(256, 0);
ctx.lineTo(256, 512);
ctx.moveTo(0, 256);
ctx.lineTo(512, 256);
ctx.setLineDash([0, 0]);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(512, 512);
ctx.moveTo(512, 0);
ctx.lineTo(0, 512);
ctx.setLineDash([5, 5]);
ctx.stroke();
// reset styles
ctx.setLineDash([0, 0]);
