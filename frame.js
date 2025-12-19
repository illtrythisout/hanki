const frameCanvas = document.getElementById('frame');
const frameCtx = frameCanvas.getContext('2d');
// basic canvas setup
// guiding lines
frameCtx.beginPath();
frameCtx.moveTo(256, 0);
frameCtx.lineTo(256, 512);
frameCtx.moveTo(0, 256);
frameCtx.lineTo(512, 256);
frameCtx.setLineDash([0, 0]);
frameCtx.stroke();
frameCtx.beginPath();
frameCtx.moveTo(0, 0);
frameCtx.lineTo(512, 512);
frameCtx.moveTo(512, 0);
frameCtx.lineTo(0, 512);
frameCtx.setLineDash([5, 5]);
frameCtx.stroke();
// reset styles
frameCtx.setLineDash([0, 0]);
