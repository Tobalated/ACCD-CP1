let video;
let poseNet;
let poses = [];

// video draw parameters (for correct aspect ratio)
let drawX = 0,
  drawY = 0,
  drawW = 0,
  drawH = 0;

function setup() {
  const container = document.getElementById("canvas-container");
  const w = container ? container.offsetWidth : windowWidth;
  const h = container ? container.offsetHeight : 540;

  const c = createCanvas(w, h);
  if (container) c.parent("canvas-container");

  // Webcam
  video = createCapture({ video: { facingMode: "user" }, audio: false }, () => {
    console.log("✅ webcam stream started");
  });
  video.hide();

  // PoseNet (ml5)
  poseNet = ml5.poseNet(video, () => {
    console.log("✅ PoseNet model loaded");
  });

  poseNet.on("pose", (results) => {
    poses = results;
  });

  textFont("system-ui");
}

function windowResized() {
  const container = document.getElementById("canvas-container");
  if (!container) return;
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

function draw() {
  background(0);

  // Always show debug text
  fill(255);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);

  // Wait until webcam is ready
  if (!video || video.width === 0 || video.height === 0) {
    text("camera initializing…", 16, 16);
    return;
  }

  // 1) Draw webcam with correct aspect ratio (contain/letterbox)
  drawVideoWithAspectContain();

  // 2) Draw pose overlays aligned to the video
  if (poses.length > 0) {
    drawSkeletonTransformed();
    drawKeypointsTransformed();
    text("✅ Pose detected", 16, 36);
  } else {
    text("No pose yet — step into frame", 16, 36);
  }

  // Little status panel
  text(
    `Video: ${video.width}x${video.height} | Canvas: ${width}x${height}`,
    16,
    56
  );
}

/* ---------- Video draw (contain) ---------- */
function drawVideoWithAspectContain() {
  const canvasAspect = width / height;
  const videoAspect = video.width / video.height;

  if (videoAspect > canvasAspect) {
    // wider than canvas
    drawW = width;
    drawH = width / videoAspect;
  } else {
    // taller than canvas
    drawH = height;
    drawW = height * videoAspect;
  }

  drawX = (width - drawW) / 2;
  drawY = (height - drawH) / 2;

  image(video, drawX, drawY, drawW, drawH);
}

/* ---------- Transform PoseNet coords to match video placement ---------- */
function transformPoint(px, py) {
  // PoseNet x,y are in video coordinate space (video.width / video.height)
  const scale = drawW / video.width;
  return {
    x: drawX + px * scale,
    y: drawY + py * scale,
  };
}

/* ---------- Draw keypoints ---------- */
function drawKeypointsTransformed() {
  const keypoints = poses[0].pose.keypoints;

  fill(0, 255, 0);
  noStroke();

  for (const kp of keypoints) {
    if (kp.confidence > 0.2) {
      const p = transformPoint(kp.position.x, kp.position.y);
      circle(p.x, p.y, 10);
    }
  }
}

/* ---------- Draw skeleton ---------- */
function drawSkeletonTransformed() {
  stroke(0, 255, 0);
  strokeWeight(2);

  const skeleton = poses[0].skeleton;
  for (const bone of skeleton) {
    const [a, b] = bone;
    const p1 = transformPoint(a.position.x, a.position.y);
    const p2 = transformPoint(b.position.x, b.position.y);
    line(p1.x, p1.y, p2.x, p2.y);
  }
}
// GLOBAL screenshot listener (focus-proof)
window.addEventListener("keydown", (e) => {
  if (e.key === "s" || e.key === "S") {
    const filename = `choreography_screenshot_${Date.now()}`;
    saveCanvas(filename, "png");
    console.log("✅ Screenshot saved:", filename);
  }
});
