let cols = 18;
let rows = 18;
let t = 0;

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
  // bright background so page is never just black
  background(220, 20, 20);

  let tileW = width / cols;
  let tileH = height / rows;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      // normalized coords
      let u = (x - cols / 2 + 0.5) / (cols / 2);
      let v = (y - rows / 2 + 0.5) / (rows / 2);

      // radial symmetry
      let distCenter = sqrt(u * u + v * v);
      let angle = atan2(v, u);

      // smooth, non-linear motion driver using noise + sine
      let n = noise(u * 1.5 + 10, v * 1.5 + 10, t * 0.4);
      let wave = sin(distCenter * 10 - t * 4 + n * TWO_PI);

      // size “breathes” with the wave
      let size = map(wave, -1, 1, tileW * 0.3, tileW * 1.0);

      // HSB color variation
      let hue = (degrees(angle) + 180 + n * 120 + t * 120) % 360;
      let sat = map(distCenter, 0, 1.2, 90, 50);
      let bri = map(wave, -1, 1, 50, 100);

      fill(hue, sat, bri, 95);

      let cx = (x + 0.5) * tileW;
      let cy = (y + 0.5) * tileH;

      push();
      translate(cx, cy);

      // complex, non-linear wobble
      let wobX =
        sin(t * 2 + u * PI * 3) * tileW * 0.15 +
        cos(t * 1.2 + v * PI * 2) * tileW * 0.08;

      let wobY =
        cos(t * 1.7 + v * PI * 4) * tileH * 0.15 +
        sin(t * 2.3 + u * PI * 2) * tileH * 0.08;

      translate(wobX, wobY);

      rotate(angle + wave * 0.7);

      rect(0, 0, size, size * 0.35, size * 0.25);

      pop();
    }
  }

  t += 0.01;
}
