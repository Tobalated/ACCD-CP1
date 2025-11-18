let textureImg;
let pulseSound;
let soundStarted = false;

function preload() {
  // OPTIONAL image
  textureImg = loadImage("assets/texture.png", () => {}, () => {
    textureImg = null;
  });

  // OPTIONAL sound
  if (typeof loadSound === "function") {
    pulseSound = loadSound("assets/pulse.mp3", () => {}, () => {
      pulseSound = null;
    });
  }
}

// P5 SKETCH: Rhythmic HSB Grid with Variation & Non-linear Motion
// Stages mapping:
//  - Stage 1–3: Pattern + HSB + tiling + symmetry (base grid)
//  - Stage 4: (separate documentation text, not in code)
//  - Stage 5: Animation, complexity, noise (TRY section)
// ------------------------------------------------------------

// GRID SETTINGS (tiling)
let cols = 18;
let rows = 18;

// TIME VARIABLE (for rhythmic animation)
let t = 0;

function setup() {
  // Full window canvas
  createCanvas(windowWidth, windowHeight);

  // HSB color mode for smooth hue/saturation/brightness control
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  noStroke();
}

// Keep canvas filling the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // --------------------------------------
  // Stage 1–3: Base composition + tiling
  // --------------------------------------
  // Dark background in HSB (almost black)
  background(220, 10, 5);

  // Draw a soft texture image over the whole canvas (if loaded)
if (textureImg) {
  push();
  tint(0, 0, 30, 20); // low brightness & low alpha in HSB
  image(textureImg, 0, 0, width, height);
  pop();
}


  // Tile size from grid
  let tileW = width / cols;
  let tileH = height / rows;

  // Iterate over grid (loops for tiling)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // NORMALIZED COORDS centered at (0,0): u, v ∈ [-1, 1]
      let u = (x - cols / 2 + 0.5) / (cols / 2); // -1 to 1 horizontally
      let v = (y - rows / 2 + 0.5) / (rows / 2); // -1 to 1 vertically

      // Radial info for symmetry
      let distCenter = sqrt(u * u + v * v); // distance from center
      let angle = atan2(v, u);              // angle around center

      // --------------------------------------
      // Stage 5 (TRY): add complexity with NOISE + WAVES
      // --------------------------------------
      // Smooth noise based on position + time
      let n = noise(u * 1.5 + 10.0, v * 1.5 + 10.0, t * 0.4);

      // Rhythmic wave moving out from the center (non-linear motion driver)
      let wave = sin(distCenter * 10.0 - t * 4.0 + n * TWO_PI);

      // Size variation: breathing / pulsing tiles
      let size = map(wave, -1, 1, tileW * 0.2, tileW * 0.9);

      // --------------------------------------
      // Stage 2–3: HSB color variation
      // --------------------------------------
      // Hue from angle + noise + time for evolving color wheel
      let baseHue = (degrees(angle) + 180 + n * 120 + t * 120) % 360;

      // Saturation & brightness change with distance & wave
      let sat = map(distCenter, 0, 1.2, 90, 40); // more saturated near center
      let bri = map(wave, -1, 1, 40, 100);       // brighter on wave peaks

      fill(baseHue, sat, bri, 95);

      // Center of each tile in pixel space
      let cx = (x + 0.5) * tileW;
      let cy = (y + 0.5) * tileH;

      // --------------------------------------
      // Stage 5: Complex, non-linear animation
      // --------------------------------------
      push();
      translate(cx, cy);

      // Non-linear wobble: layered sin/cos driven by position + time
      let wobbleX =
        sin(t * 2.0 + u * PI * 3.0) * tileW * 0.18 +
        cos(t * 1.3 + v * PI * 2.5) * tileW * 0.08;

      let wobbleY =
        cos(t * 1.6 + v * PI * 4.0) * tileH * 0.18 +
        sin(t * 2.4 + u * PI * 2.0) * tileH * 0.08;

      translate(wobbleX, wobbleY);

      // Rotation around tile center based on angle + wave (radial symmetry)
      let rot = angle + wave * 0.7;
      rotate(rot);

      // Draw the shape (rounded rectangle) – the actual visual "tile"
      let w = size;
      let h = size * 0.35;
      let r = size * 0.25;
      rect(0, 0, w, h, r);

      pop();
    }
  }

  // Advance time for animation
  t += 0.01;
  // Modulate sound with the same time variable t
if (pulseSound && soundStarted) {
  let rate = map(sin(t * 1.5), -1, 1, 0.6, 1.8);
  pulseSound.rate(rate);

  let pan = sin(t * 0.5);
  pulseSound.pan(pan);
}

}
function mousePressed() {
  if (pulseSound && !soundStarted) {
    pulseSound.loop();
    soundStarted = true;
  }
}

