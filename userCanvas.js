let userStrokes = [];
let currentStroke = [];

const userCanvas = document.getElementById('userCanvas');
const userCtx = userCanvas.getContext('2d');
// canvas styles
userCtx.lineWidth = 6;
userCtx.lineCap = 'round';

// follow mouse
function drawByUser() {
  userCtx.beginPath();
  userCanvas.onmousedown = (e) => {
    currentStroke = [];
    currentStroke.push([e.offsetX, e.offsetY]);
    userCtx.moveTo(e.offsetX, e.offsetY);
  };
  userCanvas.onmousemove = (e) => {
    if (e.buttons === 1) {
      currentStroke.push([e.offsetX, e.offsetY]);
      userCtx.lineTo(e.offsetX, e.offsetY);
      userCtx.stroke();
    }
  };
  userCanvas.onmouseup = () => {
    userStrokes.push(currentStroke);
  };
}
drawByUser();
