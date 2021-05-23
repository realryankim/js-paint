const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('color');

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
    // 선 경로 생성
    ctx.beginPath();
    // 선 시작 좌표
    ctx.moveTo(x, y);
  } else {
    // 선 끝 좌표
    ctx.lineTo(x, y);
    // 선 그리기
    ctx.stroke();
  }
};

const handleColorClick = e => {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
};

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}

Array.from(colors).forEach(color =>
  color.addEventListener('click', handleColorClick)
);
