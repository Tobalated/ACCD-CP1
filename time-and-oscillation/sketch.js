// CHRISTMAS TREE MOTION RHYTHM – p5.js
// Press keys 1–6 to switch internal sketch "iterations"

let iterationStage = 6;  // default to final scene
let ornaments = [];
let lights = [];
let snowflakes = [];
let startTime;
let dropDelay = 4000;

// SETUP ---------------------------------------------------------------
function setup() {
  // When using this with index.html, this will attach to #sketch-holder
  const cnv = createCanvas(800, 500);
  cnv.parent("sketch-holder");

  angleMode(RADIANS);
  startTime = millis();

  // Ornaments with different swing properties
  ornaments = [
    { x: 400, y: 260, amp: 15, freq: 1.2, phase: 0 },
    { x: 360, y: 310, amp: 10, freq: 1.6, phase: PI / 2 },
    { x: 440, y: 310, amp: 20, freq: 1.1, phase: PI / 3 },
    { x: 380, y: 360, amp: 12, freq: 1.8, phase: PI / 5 },
    { x: 420, y: 360, amp: 18, freq: 0.8, phase: PI / 7 }
  ];

  // Garland lights across the tree
  for (let i = 0; i < 18; i++) {
    lights.push({
      x: 400 + random(-120, 120),
      y: 230 + random(30, 180),
      noiseOffset: random(1000)
    });
  }

  // Snowflakes
  for (let i = 0; i < 70; i++) {
    snowflakes.push({
      x: random(width),
      y: random(-height, 0),
      speed: random(1, 3),
      driftOffset: random(1000)
    });
  }
}

// DRAW ---------------------------------------------------------------
function draw() {
  background(10, 15, 40);

  // Snow is visible in all stages to keep scene cohesive
  drawSnowfall();

  switch (iterationStage) {
    case 1:
      iteration1_basicTree();
      break;
    case 2:
      iteration2_treeAndStaticOrnaments();
      break;
    case 3:
      iteration3_pendulumOrnaments();
      break;
    case 4:
      iteration4_withTimedDrop();
      break;
    case 5:
      iteration5_withLights();
      break;
    case 6:
    default:
      iteration6_finalScene();
      break;
  }

  drawHUD();
}

// ITERATION 1 – Tree only --------------------------------------------
function iteration1_basicTree() {
  drawTree();
}

// ITERATION 2 – Tree + static ornaments ------------------------------
function iteration2_treeAndStaticOrnaments() {
  drawTree();
  ornaments.forEach(o => drawOrnament(o.x, o.y));
}

// ITERATION 3 – Swinging ornaments (trig) ----------------------------
function iteration3_pendulumOrnaments() {
  drawTree();
  animateSwingingOrnaments();
}

// ITERATION 4 – Swinging + timed drop -------------------------------
function iteration4_withTimedDrop() {
  drawTree();
  animateSwingingOrnaments();
  animateDroppingOrnament();
}

// ITERATION 5 – + lights --------------------------------------------
function iteration5_withLights() {
  drawTree();
  animateSwingingOrnaments();
  animateDroppingOrnament();
  drawLights();
}

// ITERATION 6 – Final -----------------------------------------------
function iteration6_finalScene() {
  drawTree();
  animateSwingingOrnaments();
  animateDroppingOrnament();
  drawLights();
}

// TREE ---------------------------------------------------------------
function drawTree() {
  noStroke();
  // Main tree (three stacked triangles)
  fill(0, 110, 55);
  triangle(400, 80, 260, 320, 540, 320);
  triangle(400, 160, 280, 380, 520, 380);
  triangle(400, 230, 300, 440, 500, 440);

  // Trunk
  fill(90, 50, 25);
  rectMode(CENTER);
  rect(400, 480, 70, 80);

  // Star on top (optional, static)
  fill(255, 220, 120);
  drawStar(400, 60, 14, 7, 5);
}

// Simple star shape helper
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius1;
    let sy = y + sin(a) * radius1;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius2;
    sy = y + sin(a + halfAngle) * radius2;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// ORNAMENTS ----------------------------------------------------------
function drawOrnament(x, y) {
  noStroke();
  fill(255, 100, 130);
  ellipse(x, y, 26, 26);
}

// Swinging ornaments using trig
function animateSwingingOrnaments() {
  let t = millis() / 1000.0;

  ornaments.forEach(o => {
    let swing = sin(t * o.freq + o.phase) * o.amp;
    drawOrnament(o.x + swing, o.y);
  });
}

// TIMED DROPPING ORNAMENT --------------------------------------------
function animateDroppingOrnament() {
  let elapsed = millis() - startTime;

  let base = ornaments[0];
  let x = base.x;
  let y = base.y;

  // before delay, the ornament is just part of swinging system
  if (elapsed < dropDelay) {
    // In earlier stages you might call drawOrnament here, but
    // in the final piece it feels fine to let swinging handle it.
    return;
  }

  let fallTime = (elapsed - dropDelay) / 1000.0;

  // Straight downward fall + bounce
  let dropY = y + fallTime * 180;
  dropY -= abs(sin(fallTime * 6)) * (40 / (fallTime + 1));

  drawOrnament(x, dropY);
}

// LIGHTS (Perlin noise flicker) --------------------------------------
function drawLights() {
  let t = millis() * 0.001;
  noStroke();

  lights.forEach(l => {
    let brightness = map(noise(t + l.noiseOffset), 0, 1, 160, 255);
    fill(brightness, brightness * 0.7, 200);
    ellipse(l.x, l.y, 9);
  });
}

// SNOW ---------------------------------------------------------------
function drawSnowfall() {
  let t = millis() / 1000.0;
  noStroke();
  fill(255);

  snowflakes.forEach(s => {
    s.y += s.speed;
    s.x += (noise(s.driftOffset + t) - 0.5) * 2.0;

    if (s.y > height) {
      s.y = random(-200, -20);
      s.x = random(width);
    }

    ellipse(s.x, s.y, 4);
  });
}

// HUD + KEY CONTROL ---------------------------------------------------
function drawHUD() {
  noStroke();
  fill(0, 140);
  rect(10, 10, 230, 60, 10);

  fill(230);
  textSize(12);
  text(
    "Iteration: " + iterationStage +
    " (press keys 1–6)\n" +
    "1: tree  2: +static ornaments\n" +
    "3: swinging  4: +timed drop\n" +
    "5: +lights  6: full scene",
    20, 30
  );
}

function keyPressed() {
  if (key >= '1' && key <= '6') {
    iterationStage = int(key);
  }
}
