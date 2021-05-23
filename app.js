const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = document.getElementsByClassName('canvas')[0].offsetWidth;
canvas.height = document.getElementsByClassName('canvas')[0].offsetHeight;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

let painting = false;

const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  painting = true;
};

const onMouseMove = e => {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const onMouseDown = e => {
  painting = true;
};

canvas && canvas.addEventListener('mousemove', onMouseMove),
  canvas.addEventListener('mousedown', onMouseDown),
  canvas.addEventListener('mouseup', stopPainting),
  canvas.addEventListener('mouseleave', stopPainting);
