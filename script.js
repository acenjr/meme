const main = document.getElementById("main");

const textBtn = document.getElementById("text-btn");

const memeCanvas = document.getElementById("meme-box");
const selfieLayer = document.createElement("canvas");
const textLayer = document.createElement("canvas");
for (let canvas of [selfieLayer, textLayer]) {
  canvas.width = memeCanvas.width;
  canvas.height = memeCanvas.height;
}

function setupModal(name) {
  const themeBtn = document.getElementById(`${name}-btn`);
  const dialog = document.getElementById(`${name}-dialog`);
  const closeBtn = document.getElementById(`${name}-close-btn`);
  function toggleModal() {
    dialog.open ? dialog.close() : dialog.showModal();
  }
  themeBtn.addEventListener("click", toggleModal);
  closeBtn.addEventListener("click", toggleModal);
}

function getThemeToggle() {
  const doc = document.documentElement;
  const toggle = document.getElementById("toggle");
  const label = document.getElementById("label");

  function toggleMode() {
    const newTheme = toggle.checked ? "dark" : "light";
    doc.setAttribute("data-theme", newTheme);
    const newLabel = toggle.checked ? "use dark mode" : "use light mode";
    label.innerHTML = newLabel;
  }

  toggle.addEventListener("change", toggleMode);
  return toggle;
}

async function getVideo(canvas) {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const video = document.createElement("video");
  video.srcObject = stream;
  if (canvas) {
    video.addEventListener("canplay", () => {
      drawPreview(video, canvas);
    });
  }

  video.play();
  return video;
}
function drawPreview(video, canvas) {
  const ctx = canvas.getContext("2d");
  setInterval(() => {
    ctx.drawImage(
      video,
      0,
      0,
      video.videoWidth,
      video.videoHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }, 16);
}
async function setupTakeSelfie() {
  const saveSelfieBtn = document.getElementById("save-selfie-btn");
  const previewCanvas = document.getElementById("preview");
  const video = await getVideo(previewCanvas);
  saveSelfieBtn.addEventListener("click", () => {
    drawVideo(video, selfieLayer);
    redraw();
    const dialog = document.getElementById("selfie-dialog");
    dialog.close();
  });
}
function drawVideo(video, canvas) {
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}
function setupAddText() {
  const saveBtn = document.getElementById("save-text-btn");
  saveBtn.addEventListener("click", () => {
    drawText(textLayer);
    redraw();
    const dialog = document.getElementById("text-dialog");
    dialog.close();
  });
}
function getTextData() {
  const inputTop = document.getElementById("text-top");
  const inputBottom = document.getElementById("text-bottom");
  const topData = {
    text: inputTop.value,
    x: 10,
    y: 90,
  };
  const bottomData = {
    text: inputBottom.value,
    x: 10,
    y: 470,
  };
  return [topData, bottomData];
}
function redraw() {
  const ctx = memeCanvas.getContext("2d");
  ctx.drawImage(selfieLayer, 0, 0);
  ctx.drawImage(textLayer, 0, 0);
}
function drawText(canvas) {
  const textData = getTextData();
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const { text, x, y } of textData) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.font = "80px Impact";
    const maxWidth = canvas.width - 10 - X;
    ctx.fillText(text, x, y, maxWidth);
    ctx.strokeText(text, x, y, maxWidth);
  }
}

getThemeToggle();
setupModal("theme");
setupModal("selfie");
setupModal("text");
setupTakeSelfie();
setupAddText();
