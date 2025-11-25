// sketch.js

let startTime;
let secondMotionDelay = 4000; // ms before second shape starts real motion
let stars = [];

function setup() {
  const cnv = createCanvas(800, 500);
  cnv.parent("sketch-holder"); // Attach canvas to div in HTML
  angleMode(RADIANS);

  startTime = millis();

  // Random starfield for a more organic scene
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      noiseSeed: random(1000)
    });
  }
}

function draw() {
  background(5, 7, 20);
  drawStars();
  drawCentralSystemAndPlanet(); // trig-based repeated motion
  drawDelayedRectangle();       // time-based delayed motion
  drawOrganicBlob();           // Perlin-noise organic shape
}

// ---------- BACKGROUND STARS (random + noise twinkle) ----------
function drawStars() {
  noStroke();
  let t = millis() * 0.0005;

  for (let s of stars) {
    let brightness = map(noise(s.noiseSeed, t), 0, 1, 150, 255);
    fill(brightness);
    circle(s.x, s.y, s.size);

    // slight drift to the left for extra life
    s.x -= 0.05;
    if (s.x < 0) s.x = width;
  }
}

// ---------- SHAPE 1: PLANET ORBITING WITH TRIG ----------
function drawCentralSystemAndPlanet() {
  push();
  translate(width / 2, height / 2);

  // central "sun"
  noStroke();
  fill(255, 200, 80);
  ellipse(0, 0, 80, 80);

  let t = millis() / 1000.0;

  // Use trig for orbit motion
  let orbitRadius = 150;
  let angle = t * 0.8; // base angular speed

  // Slightly distort orbit to make it feel more organic
  let planetX = orbitRadius * cos(angle);
  let planetY = orbitRadius * sin(angle * 1.2);

  // Desynchronized pulsation of size (different freq from orbit)
  let sizePulse = map(sin(t * 2.3), -1, 1, 0.7, 1.3);

  fill(90, 190, 255);
  ellipse(planetX, planetY, 40 * sizePulse, 40 * sizePulse);

  pop();
}

// ---------- SHAPE 2: DELAYED RECTANGLE MOTION USING TIME ----------
function drawDelayedRectangle() {
  let elapsed = millis() - startTime;
  let baseX = width * 0.75;
  rectMode(CENTER);

  if (elapsed < secondMotionDelay) {
    // "Waiting" phase: subtle wobble so it's not totally static
    let progress = elapsed / secondMotionDelay;
    let wobble = sin(progress * TWO_PI * 2.0) * 10;

    fill(80, 80, 130);
    rect(baseX, height * 0.8 + wobble, 40, 80, 10);
  } else {
    // Active phase: vertical oscillation based on trig
    let t2 = (elapsed - secondMotionDelay) / 1000.0;

    // Different frequency + phase shift to de-synchronize from planet
    let y = map(sin(t2 * 2.0 + PI / 3), -1, 1, height * 0.2, height * 0.85);

    fill(255, 100, 160);
    rect(baseX, y, 40, 80, 10);
  }
}

// ---------- ORGANIC BLOB USING PERLIN NOISE ----------
function drawOrganicBlob() {
  push();
  translate(width * 0.25, height * 0.7);

  let t = millis() / 1000.0;
  stroke(180, 220, 255, 140);
  noFill();
  strokeWeight(2);

  beginShape();
  let noiseScale = 0.8;
  let radiusBase = 45;

  // Use Perlin noise along the radius to get a blobby organic form
  for (let a = 0; a < TWO_PI; a += TWO_PI / 80) {
    let xOff = cos(a) * noiseScale + t * 0.2;
    let yOff = sin(a) * noiseScale + t * 0.2;
    let n = noise(xOff, yOff);

    let r = radiusBase + n * 35; // radius modulated by noise
    let x = r * cos(a);
    let y = r * sin(a);
    curveVertex(x, y);
  }
  endShape(CLOSE);

  pop();
}
