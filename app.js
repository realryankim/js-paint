const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('color');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');

const INITIAL_COLOR = '#2c2c2c';

canvas.width = document.getElementsByClassName('canvas')[0].offsetWidth;
canvas.height = document.getElementsByClassName('canvas')[0].offsetHeight;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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
  ctx.fillStyle = color;
};

const handleRangeChange = e => {
  const size = e.target.value;
  ctx.lineWidth = size;
};

const handleModeClick = () => {
  if (filling === true) {
    filling = false;
    mode.innerHTML = `Fill`;
  } else {
    filling = true;
    mode.innerHTML = `Paint`;
  }
};

const handleCanvasClick = () => {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
}

Array.from(colors).forEach(color =>
  color.addEventListener('click', handleColorClick)
);

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}
