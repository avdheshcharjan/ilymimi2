let hearts = [];
let lastX, lastY;
let font;
let cupid;

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceSansPro-Semibold.otf');
}

function setup() {
  // Create a canvas that fills the window
  createCanvas(windowWidth, windowHeight);
  lastX = mouseX;
  lastY = mouseY;
  textFont(font);
  textAlign(CENTER, CENTER);
  
  // Create a simple cupid shape
  cupid = createCupid();
}

function draw() {
  background(255, 240, 245); // Soft pink background
  
  // Draw decorative frame
  drawFrame();
  
  // Generate hearts on mouse/touch movement
  if (dist(mouseX, mouseY, lastX, lastY) > 5) {
    hearts.push(new Heart(mouseX, mouseY));
    lastX = mouseX;
    lastY = mouseY;
  }
  
  for (let i = hearts.length - 1; i >= 0; i--) {
    hearts[i].move();
    hearts[i].display();
    
    // Remove hearts that are off-screen
    if (hearts[i].isOffScreen()) {
      hearts.splice(i, 1);
    }
  }
  
  // Limit the number of hearts to prevent performance issues
  while (hearts.length > 100) {
    hearts.shift();
  }
  
  // Draw cupid
  image(cupid, width - 100, height - 100, 80, 80);
  
  // Draw Valentine's message
  fill(200, 0, 100);
  textSize(24);
  text("Happy Valentine's Day!", width / 2, 40);
  textSize(16);
  text("Touch the screen to create love!", width / 2, 70);
}

class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 30);
    this.speed = random(0.5, 2);
    this.color = color(random(200, 255), random(100, 200), random(150, 200), 200);
    this.angle = random(TWO_PI);
  }
  
  move() {
    this.y -= this.speed;
    this.x += sin(this.angle) * 0.5;
    this.angle += 0.05;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    fill(this.color);
    noStroke();
    beginShape();
    vertex(0, -this.size / 2);
    bezierVertex(this.size / 2, -this.size, this.size, -this.size / 4, 0, this.size / 2);
    bezierVertex(-this.size, -this.size / 4, -this.size / 2, -this.size, 0, -this.size / 2);
    endShape(CLOSE);
    pop();
  }
  
  isOffScreen() {
    return this.y < -this.size;
  }
}

function touchMoved() {
  // Prevent default behavior on touch devices
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawFrame() {
  push();
  noFill();
  stroke(200, 0, 100);
  strokeWeight(10);
  rect(5, 5, width - 10, height - 10, 20);
  pop();
}

function createCupid() {
  let cupidGraphic = createGraphics(100, 100);
  cupidGraphic.fill(255, 200, 200);
  cupidGraphic.noStroke();
  
  // Body
  cupidGraphic.ellipse(50, 60, 40, 50);
  
  // Wings
  cupidGraphic.push();
  cupidGraphic.translate(50, 60);
  cupidGraphic.rotate(-PI / 4);
  cupidGraphic.ellipse(0, 0, 50, 20);
  cupidGraphic.rotate(PI / 2);
  cupidGraphic.ellipse(0, 0, 50, 20);
  cupidGraphic.pop();
  
  // Head
  cupidGraphic.ellipse(50, 30, 30, 30);
  
  return cupidGraphic;
}