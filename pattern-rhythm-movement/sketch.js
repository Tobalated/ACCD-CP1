let cols = 18;
let rows = 18;
let t = 0;

let textureImg;
let pulseSound;
let soundStarted = false;

function preload() {
  // Optional image (background texture)
  textureImg = loadImage("assets/texture.png", () => {}, () => {
    textureImg = null;
  });

  // Optional sound (ambient pulse)
  pulseSound = loadSound("assets/pulse.mp3", () => {}, () => {
    pulseSound = null;
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // HSB background
  background(220, 20, 20);

  // Draw soft texture over entire canvas
  if (textureImg) {
    push();
    tint(0, 0, 30, 20);   // low brightness, low opacity
    image(textureImg, 0, 0, width, height);
    pop();
  }

  let tileW = width / cols;
  let tileH = height / rows;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      // Normalized coords
      let u = (x - cols / 2 + 0.5) / (cols / 2);
      let v = (y - rows / 2 + 0.5) / (rows / 2);

      // Symmetry variables
      let distCenter = sqrt(u*u + v*v);
      let angle = atan2(v, u);

      // TRY: noise + wave motion
      let n = noise(u * 1.5 + 10, v * 1.5 + 10, t * 0.25);
      let wave = sin(distCenter * 10 - t * 4 + n * TWO_PI);

      // TRY: size variation
      let size = map(wave, -1, 1, tileW * 0.25, tileW * 1.1);

      // TRY: dynamic HSB color
      let hue = (degrees(angle) + 180 + n * 150 + t * 180) % 360;
      let sat = map(distCenter, 0, 1.2, 95, 40);
      let bri = map(wave, -1, 1, 40, 100);

      fill(hue, sat, bri, 90);

      let cx = (x + 0.5) * tileW;
      let cy = (y + 0.5) * tileH;

      push();
      translate(cx, cy);

      // TRY: non-linear wobble (layered sin/cos)
      let wobX =
        sin(t * 3 + u * PI * 4) * tileW * 0.18 +
        cos(t * 1.5 + v * PI * 2) * tileW * 0.12;

      let wobY =
        cos(t * 2 + v * PI * 4) * tileH * 0.18 +
        sin(t * 2.8 + u * PI * 3) * tileH * 0.12;

      translate(wobX, wobY);

      // Rotation for flow
      rotate(angle + wave * 0.6);

      rect(0, 0, size,
