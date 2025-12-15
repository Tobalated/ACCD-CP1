let video;
let poseNet;
let poses = [];
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseNet = ml5.poseNet(video, () => {
    console.log("PoseNet model loaded");
  });

  poseNet.on("pose", results => {
    poses = results;
  });

  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(5, 8, 22, 35);

  if (poses.length > 0) {
    let pose = poses[0].pose;
    let lw = pose.leftWrist;
    let rw = pose.rightWrist;

    if (lw.confidence > 0.3 && rw.confidence > 0.3) {
      let movement = dist(lw.x, lw.y, rw.x, rw.y);
      particles.forEach(p => p.react(movement));
    }
  }

  particles.forEach(p => {
    p.update();
    p.display();
  });
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.2, 1));
    this.size = random(2, 6);
  }

  react(force) {
    let m = map(force, 40, 300, 0.2, 2, true);
    this.vel.mult(m);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.limit(2);

    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  display() {
    noStroke();
    fill(159, 209, 255, 180);
    circle(this.pos.x, this.pos.y, this.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
