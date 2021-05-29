const canvas = document.querySelector('#jsCanvas');
const context = canvas.getContext('2d');
const colors = document.getElementsByClassName('color');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const clearBtn = document.querySelector('#jsClear');
const saveBtn = document.querySelector('#jsSave');

const INITIAL_COLOR = '#2c2c2c';

canvas.width = document.getElementsByClassName('canvas')[0].offsetWidth;
canvas.height = document.getElementsByClassName('canvas')[0].offsetHeight;

// default background when the page is loaded
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

context.strokeStyle = INITIAL_COLOR;
context.fillStyle = INITIAL_COLOR;
context.lineWidth = 2.5;

let painting = false;
let filling = false;

const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  if (filling === false) {
    painting = true;
  }
};

const onMouseMove = e => {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    // 선 경로 생성
    context.beginPath();
    // 선 시작 좌표
    context.moveTo(x, y);
  } else {
    // 선 끝 좌표
    context.lineTo(x, y);
    // 선 그리기
    context.stroke();
  }
};

const handleColorClick = e => {
  const color = e.target.style.backgroundColor;
  context.strokeStyle = color;
  context.fillStyle = color;
};

const handleRangeChange = e => {
  const size = e.target.value;
  context.lineWidth = size;
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
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
};

const handleContextMenu = e => {
  e.preventDefault();
};

const clearClick = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const saveClick = () => {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'ParingJS[🎨]';
  link.click();
};

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleContextMenu);
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

if (clearBtn) {
  clearBtn.addEventListener('click', clearClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', saveClick);
}
