let video;

// For correct aspect ratio drawing
let drawX = 0, drawY = 0, drawW = 0, drawH = 0;

function setup() {
  const container = document.getElementById("canvas-container");
  const w = container ? container.offsetWidth : 960;
  const h = container ? container.offsetHeight : 540;

  const c = createCanvas(w, h);
  if (container) c.parent("canvas-container");

  // Webcam
  video = createCapture({ video: true, audio: false }, () => {
    console.log("✅ webcam started");
  });
  video.hide();

  textFont("system-ui");

  // Screenshot key (S)
  window.addEventListener("keydown", (e) => {
    if (e.key === "s" || e.key === "S") saveCanvas(`screenshot_${Date.now()}`, "png");
  });
}

function windowResized() {
  const container = document.getElementById("canvas-container");
  if (!container) return;
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

function draw() {
  background(0);

  if (!video || video.width === 0 || video.height === 0) {
    fill(255);
    textSize(14);
    text("camera initializing…", 16, 16);
    return;
  }

  drawVideoContain();

  // Simple overlay label (optional)
  fill(0, 0, 0, 140);
  noStroke();
  rectMode(CORNER);
  rect(12, 12, 170, 34, 10);

  fill(255);
  textSize(13);
  textAlign(LEFT, CENTER);
  text("Webcam Live ✅", 24, 29);
}

function drawVideoContain() {
  const canvasAspect = width / height;
  const videoAspect = video.width / video.height;

  if (videoAspect > canvasAspect) {
    drawW = width;
    drawH = width / videoAspect;
  } else {
    drawH = height;
    drawW = height * videoAspect;
  }

  drawX = (width - drawW) / 2;
  drawY = (height - drawH) / 2;

  image(video, drawX, drawY, drawW, drawH);
}
