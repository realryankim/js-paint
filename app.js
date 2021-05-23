const canvas = document.querySelector('#jsCanvas');

let painting = false;

const stopPainting = () => {
  painting = false;
};

const onMouseMove = e => {
  const x = e.offsetX;
  const y = e.offsetY;
};

const onMouseDown = e => {
  painting = true;
};

const onMouseUp = e => {
  stopPainting();
};

canvas && canvas.addEventListener('mousemove', onMouseMove),
  canvas.addEventListener('mousedown', onMouseDown),
  canvas.addEventListener('mouseup', onMouseUp),
  canvas.addEventListener('mouseleave', stopPainting);
