// regenerate button
let regenerateButton;

// risograph layers
let pinkLayer;
let blueLayer;
let blackLayer;
let yellowLayer;

// movie variables
let currentMovie;
let currentTitle;
let permanentTitle;
let currentTagline;
let currentLayout;
let currentMenuDetail;

// font variables
let jenniferFont;
let readyOrNotFont;
let menuFont;

// movie mode array
let movieModes = [
  {
    name: "Jennifer's Body",
    backgroundColor: [255, 240, 245],
    offsetX: 40,
    offsetY: 20,
  },
  {
    name: "Ready or Not",
    backgroundColor: [245, 235, 220],
    offsetX: 20,
    offsetY: 35,
  },
  {
    name: "The Menu",
    backgroundColor: [235, 235, 230],
    offsetX: 10,
    offsetY: 10,
  },
];

// title generator
let titles = {
  "Jennifer's Body": [
    "KILLING BOYS, NOT PEOPLE",
    "HELL'S CHEERLEADER",
    "PROM NIGHT MASSACRE",
    "SHE BIT BACK",
  ],
  "Ready or Not": [
    "THE FINAL BRIDE",
    "TIL DEATH",
    "HERE COMES THE BRIDE",
    "THE HUNT BEGINS",
  ],
  "The Menu": [
    "CHEF'S SPECIAL",
    "FINAL COURSE",
    "RESERVATION ONLY",
    "EAT THE RICH",
  ],
};

// tagline generator
let taglines = {
  "Jennifer's Body": [
    "HELL IS A HIGH SCHOOL GIRL",
    "SHE'S DONE PLAYING NICE",
    "TEENAGE NIGHTMARE ENERGY",
  ],

  "Ready or Not": [
    "MARRIAGE IS MURDER",
    "THE FAMILY HUNT BEGINS",
    "SURVIVE THE NIGHT",
  ],

  "The Menu": [
    "A PERFECTLY CURATED DISASTER",
    "DINNER IS SERVED",
    "ONE LAST COURSE",
  ],
};
// details used ONLY IN THE MENU
let menuDetails = [
  "COURSE 01",
  "CHEF'S SELECTION",
  "RESERVATION CONFIRMED",
  "TASTING MENU",
  "LOCALLY SOURCED",
  "FINAL SERVICE",
  "CHEF JULIAN SLOWIK",
  "PLEASE ENJOY RESPONSIBLY",
];

// poster layout types
let layouts = ["centered", "diagonal", "lower-heavy"];
// loads custom fonts
function preload() {
  jenniferFont = loadFont("fonts/BebasNeue-Regular.ttf");
  readyOrNotFont = loadFont("fonts/CormorantGaramond.ttf");
  menuFont = loadFont("fonts/Oswald.ttf");
}

function setup() {
  createCanvas(windowHeight * 0.66, windowHeight);
  noLoop();

  generatePoster();
  //creates html button to regenerate poster
  regenerateButton = createButton("GENERATE NEW POSTER");
  regenerateButton.position(20, 20);
  regenerateButton.mousePressed(() => {
    // clears previous risograph layers
    clearRiso();
    generatePoster();
  });
}
// CURRENTLY UNUSED; POSTER GENERATES IN SETUP
function draw() {}

// generates poster; moved from setup
function generatePoster() {
  // clears previous risograph layers
  clearRiso();

  // randomizes current poster settings
  currentMovie = random(movieModes);
  permanentTitle = currentMovie.name;
  currentTitle = random(titles[currentMovie.name]);
  currentTagline = random(taglines[currentMovie.name]);
  currentLayout = random(layouts);
  currentMenuDetail = random(menuDetails);

  // paper background color
  background(
    currentMovie.backgroundColor[0],
    currentMovie.backgroundColor[1],
    currentMovie.backgroundColor[2],
  );

  // creates risograph ink layers
  pinkLayer = new Riso("fluorescentpink");
  blueLayer = new Riso("blue");
  blackLayer = new Riso("black");
  yellowLayer = new Riso("yellow");
  // stronger pink dominance for Jennifer's Body

  if (currentMovie.name === "Jennifer's Body") {
    currentMovie.offsetX = 55;
    currentMovie.offsetY = 10;
  }
  // implments halftone function
  if (currentMovie.name === "Jennifer's Body") {
    createHalftoneTexture(blueLayer);
  } else if (currentMovie.name === "Ready or Not") {
    createHalftoneTexture(pinkLayer);
  } else if (currentMovie.name === "The Menu") {
    createHalftoneTexture(blueLayer);
  }

  // implments grain texture function
  if (currentMovie.name === "Jennifer's Body") {
    createGrain(pinkLayer, 4600);
    createGrain(blueLayer, 2200);
    createGrain(yellowLayer, 500);
  } else if (currentMovie.name === "Ready or Not") {
    createGrain(pinkLayer, 1400);
    createGrain(blueLayer, 3200);
    createGrain(blackLayer, 700);
  } else if (currentMovie.name === "The Menu") {
    createGrain(blueLayer, 700);
    createGrain(yellowLayer, 250);
  }
  // default composition position
  let shapeX = width / 2;
  let shapeY = height / 2;

  let shapeSize = width * 0.58;
  let shapeType = "circle";
  // procedural layout variations
  if (currentLayout === "diagonal") {
    shapeX = -width * 0.18;
    shapeY = height * 0.28;
  } else if (currentLayout === "lower-heavy") {
    shapeY = height * 0.78;
  }

  // movie-specific composition sizing
  if (currentMovie.name === "Jennifer's Body") {
    // oversized cropped ink field
    shapeSize = random([width * 0.72, width * 0.95]);
  } else if (currentMovie.name === "Ready or Not") {
    shapeSize = width * 0.48;

    // towering cropped composition
    shapeY = height * 0.22;
  } else if (currentMovie.name === "The Menu") {
    shapeSize = width * 0.38;

    // cropped editorial composition
    shapeX = width * 0.82;
  }
  // movie-specific shapes
  if (currentMovie.name === "Jennifer's Body") {
    shapeType = "blob";
  } else if (currentMovie.name === "Ready or Not") {
    shapeType = "oval";
  } else if (currentMovie.name === "The Menu") {
    shapeType = "plate";
  }

  // slight print rotation
  let rotationAmount = random(-3, 3);
  // pink layer
  pinkLayer.fill(255, 170);
  pinkLayer.noStroke();
  pinkLayer.push();
  pinkLayer.translate(shapeX, shapeY);
  pinkLayer.rotate(radians(rotationAmount));
  // distorted print blob
  if (shapeType === "blob") {
    pinkLayer.beginShape();
    for (let a = 0; a < TWO_PI; a += 0.25) {
      let r = shapeSize * random(0.36, 0.56);
      // subtle print warping
      r += sin(a * 2) * 18;
      // uneven edge texture
      r += random(-12, 12);
      let x = cos(a) * r;
      let y = sin(a) * r;
      pinkLayer.vertex(x, y);
    }
    pinkLayer.endShape(CLOSE);
    // stretched print oval
  } else if (shapeType === "oval") {
    pinkLayer.beginShape();
    for (let a = 0; a < TWO_PI; a += 0.25) {
      let xRadius = shapeSize * 0.32;
      let yRadius = shapeSize * 0.58;
      // uneven distortion
      xRadius += random(-8, 8);
      let x = cos(a) * xRadius;
      let y = sin(a) * yRadius;
      pinkLayer.vertex(x, y);
    }
    pinkLayer.endShape(CLOSE);
    // plated concentric forms
  } else if (shapeType === "plate") {
    for (let i = 1; i <= 5; i++) {
      pinkLayer.noFill();
      pinkLayer.stroke(255, 120);
      pinkLayer.strokeWeight(2);
      pinkLayer.arc(
        0,
        0,
        shapeSize * (i * 0.28),
        shapeSize * (i * 0.28),
        random(0, PI),
        random(PI, TWO_PI),
      );
    }
  }
  pinkLayer.pop();
  // blue layer
  blueLayer.fill(255, 170);
  blueLayer.noStroke();

  // slightly offset shape
  blueLayer.push();

  blueLayer.translate(
    shapeX + currentMovie.offsetX,
    shapeY + currentMovie.offsetY,
  );

  blueLayer.rotate(radians(rotationAmount + random(-1, 1)));

  // distorted print blob
  if (shapeType === "blob") {
    blueLayer.beginShape();
    for (let a = 0; a < TWO_PI; a += 0.25) {
      let r = shapeSize * random(0.36, 0.56);
      // subtle print warping
      r += sin(a * 2) * 18;
      // uneven edge texture
      r += random(-12, 12);
      let x = cos(a) * r;
      let y = sin(a) * r;
      blueLayer.vertex(x, y);
    }
    blueLayer.endShape(CLOSE);
    // stretched print oval
  } else if (shapeType === "oval") {
    blueLayer.beginShape();
    for (let a = 0; a < TWO_PI; a += 0.25) {
      let xRadius = shapeSize * 0.32;
      let yRadius = shapeSize * 0.58;
      // uneven distortion
      xRadius += random(-8, 8);
      let x = cos(a) * xRadius;
      let y = sin(a) * yRadius;
      blueLayer.vertex(x, y);
    }
    blueLayer.endShape(CLOSE);
    // plated concentric forms
  } else if (shapeType === "plate") {
    for (let i = 1; i <= 3; i++) {
      blueLayer.noFill();
      blueLayer.stroke(255, 120);
      blueLayer.strokeWeight(2);
      blueLayer.arc(
        0,
        0,
        shapeSize * (i * 0.28),
        shapeSize * (i * 0.28),
        random(0, PI),
        random(PI, TWO_PI),
      );
    }
  }
  blueLayer.pop();

  // movie symbols
  if (currentMovie.name === "Jennifer's Body") {
    // layered heart details
    drawHeart(
      pinkLayer,
      shapeX - width * 0.32,
      shapeY + height * 0.12,
      width * 0.12,
    );

    drawHeart(
      pinkLayer,
      shapeX + width * 0.18,
      shapeY + height * 0.2,
      width * 0.08,
    );

    drawHeart(
      yellowLayer,
      shapeX - width * 0.08,
      shapeY + height * 0.28,
      width * 0.06,
    );
    // extra collage hearts
    drawHeart(
      yellowLayer,
      shapeX + width * 0.28,
      shapeY + height * 0.08,
      width * 0.045,
    );

    drawHeart(
      pinkLayer,
      shapeX - width * 0.18,
      shapeY + height * 0.34,
      width * 0.05,
    );

    drawHeart(
      yellowLayer,
      shapeX + width * 0.12,
      shapeY + height * 0.38,
      width * 0.035,
    );
    for (let i = 0; i < 3; i++) {
      drawStar(
        yellowLayer,
        random([
          random(width * 0.05, width * 0.3),
          random(width * 0.55, width * 0.92),
        ]),
        random([random(0, height * 0.25), random(height * 0.75, height)]),
        random(6, 14),
      );
    }

    // fake scrapbook tape strips
    drawTapeStrip(
      yellowLayer,
      width * 0.12,
      height * 0.18,
      width * 0.28,
      height * 0.035,
      -7,
    );
    drawTapeStrip(
      pinkLayer,
      width * 0.62,
      height * 0.68,
      width * 0.24,
      height * 0.03,
      9,
    );

    // messy notebook underline
    drawMessyUnderline(blackLayer, width * 0.34, height * 0.49, width * 0.5);
  } else if (currentMovie.name === "Ready or Not") {
    drawKnife(blueLayer, width * 0.92, shapeY - height * 0.16, width * 0.18);
    // bloodier print details
    drawBloodDrops(pinkLayer, width * 0.16, height * 0.22, 5);
    drawBloodDrops(pinkLayer, width * 0.78, height * 0.34, 4);
    drawBloodTrail(pinkLayer, width * 0.68, height * 0.18);
    for (let i = 0; i < 2; i++) {
      drawCandle(
        blackLayer,
        random([
          random(width * 0.08, width * 0.22),
          random(width * 0.78, width * 0.92),
        ]),
        random(height * 0.72, height * 0.92),
        random(20, 50),
      );
    }
  } else if (currentMovie.name === "The Menu") {
    for (let y = height * 0.35; y < height; y += 180) {
      drawMenuLines(yellowLayer, y + random(-8, 8));
    }

    // cleaner menu-card frame
    drawMenuFrame(blackLayer);
  }
  // border systems
  if (currentMovie.name === "Jennifer's Body") {
    drawBorder(pinkLayer, 8);
  } else if (currentMovie.name === "Ready or Not") {
    drawBorder(blueLayer, 4);
  } else if (currentMovie.name === "The Menu") {
    drawBorder(blueLayer, 2);
  }

  // print registration marks
  drawRegistrationMarks(blackLayer);

  // TYPOGRAPHY SYSTEM
  let textX = width * 0.48;
  // default alignment
  blackLayer.textAlign(CENTER);
  // currentMovie
  if (currentMovie.name === "Jennifer's Body") {
    blackLayer.textFont(jenniferFont);
    blackLayer.textAlign(CENTER);
  } else if (currentMovie.name === "Ready or Not") {
    blackLayer.textFont(readyOrNotFont);
    blackLayer.textAlign(CENTER);
  } else if (currentMovie.name === "The Menu") {
    blackLayer.textFont(menuFont);
    blackLayer.textAlign(LEFT);
    textX = width * 0.12;
  }
  blackLayer.push();
  // movie title
  blackLayer.fill(255);
  blackLayer.textStyle(BOLD);

  if (currentMovie.name === "Jennifer's Body") {
    blackLayer.textSize(width * 0.15);
  } else if (currentMovie.name === "Ready or Not") {
    blackLayer.textSize(width * 0.13);
  } else if (currentMovie.name === "The Menu") {
    blackLayer.textSize(width * 0.11);
  }

  blackLayer.text(permanentTitle, textX, height * 0.07);
  // title text
  blackLayer.textStyle(BOLD);
  // title size by movie
  if (currentMovie.name === "Jennifer's Body") {
    blackLayer.textSize(width * 0.095);
  } else if (currentMovie.name === "Ready or Not") {
    blackLayer.textSize(width * 0.088);
  } else if (currentMovie.name === "The Menu") {
    blackLayer.textSize(width * 0.078);
  }

  // main title
  blackLayer.fill(255);
  // puts title in a better spot
  if (currentMovie.name === "Jennifer's Body") {
    // more rotates to give more of a chaotic, notebook vibe
    blackLayer.push();

    blackLayer.translate(width * 0.58, height * 0.32);
    blackLayer.rotate(radians(-8));
    blackLayer.text(currentTitle, 0, 0);

    blackLayer.pop();
  } else if (currentMovie.name === "Ready or Not") {
    blackLayer.text(currentTitle, width * 0.42, height * 0.32);
  } else if (currentMovie.name === "The Menu") {
    blackLayer.text(currentTitle, width * 0.12, height * 0.32);
  }

  // tagline
  blackLayer.fill(255);
  blackLayer.textStyle(BOLD);

  // tagline size
  if (currentMovie.name === "Jennifer's Body") {
    blackLayer.textSize(width * 0.046);
  } else if (currentMovie.name === "Ready or Not") {
    blackLayer.textSize(width * 0.042);
  } else if (currentMovie.name === "The Menu") {
    blackLayer.textSize(width * 0.036);
  }
  // tagline placement
  if (currentMovie.name === "Jennifer's Body") {
    drawTextBacking(
      yellowLayer,
      width * 0.3,
      height * 0.425,
      width * 0.58,
      height * 0.065,
      -2,
    );
    blackLayer.text(currentTagline, width * 0.58, height * 0.47);
  } else if (currentMovie.name === "Ready or Not") {
    drawTextBacking(
      pinkLayer,
      width * 0.17,
      height * 0.425,
      width * 0.52,
      height * 0.065,
      1,
    );
    blackLayer.text(currentTagline, width * 0.42, height * 0.47);
  } else if (currentMovie.name === "The Menu") {
    drawTextBacking(
      yellowLayer,
      width * 0.1,
      height * 0.425,
      width * 0.52,
      height * 0.06,
      0,
    );
    blackLayer.text(currentTagline, width * 0.12, height * 0.47);
  }
  blackLayer.pop();

  // menu details
  if (currentMovie.name === "The Menu") {
    // text rendering
    blackLayer.fill(255);
    blackLayer.textSize(width * 0.034);
    blackLayer.textStyle(BOLD);

    blackLayer.text(currentMenuDetail, width * 0.12, height * 0.38);
    // divider rendering
    yellowLayer.stroke(255);
    yellowLayer.strokeWeight(1);

    yellowLayer.line(width * 0.12, height * 0.4, width * 0.75, height * 0.4);

    // reservation detail
    blackLayer.fill(255);
    blackLayer.textStyle(BOLD);
    blackLayer.textSize(width * 0.04);
    blackLayer.text("TABLE 12", width * 0.12, height * 0.9);
  }
  // handwritten note detail
  if (currentMovie.name === "Jennifer's Body") {
    blackLayer.fill(255);
    blackLayer.textSize(width * 0.04);
    blackLayer.textStyle(ITALIC);
    blackLayer.text("XOXO", width * 0.82, height * 0.88);
    blackLayer.text("CALL ME", width * 0.18, height * 0.82);
  }
  // print mess
  drawSmudge(blueLayer);
  drawSmudge(pinkLayer);

  drawScanLines(blackLayer);

  //display riso
  drawRiso();

  console.log(currentMovie.name);
}

// halftone texture function
function createHalftoneTexture(layer) {
  layer.fill(255);
  layer.noStroke();

  // nested loops create grid
  for (let x = 0; x < width; x += 24) {
    for (let y = 0; y < height; y += 28) {
      // random dot size
      let size = random(1, 4);
      layer.ellipse(x, y, size, size);
    }
  }
}
// heart symbol
function drawHeart(layer, x, y, size) {
  layer.push();
  layer.translate(x, y);
  layer.noFill();

  layer.stroke(255);

  layer.strokeWeight(2);

  layer.circle(-size / 4, 0, size / 2);
  layer.circle(size / 4, 0, size / 2);

  layer.triangle(-size / 2, 0, size / 2, 0, 0, size);
  layer.pop();
}
// star doodles
function drawStar(layer, x, y, size) {
  layer.push();
  layer.translate(x, y);
  layer.stroke(255);
  layer.strokeWeight(2);

  // vertical line
  layer.line(0, -size, 0, size);

  // horizontal line
  layer.line(-size, 0, size, 0);

  // diagonal line
  layer.line(-size * 0.6, -size * 0.6, size * 0.6, size * 0.6);

  // opposite diagonal
  layer.line(size * 0.6, -size * 0.6, -size * 0.6, size * 0.6);
  layer.pop();
}
// knife symbol
function drawKnife(layer, x, y, size) {
  layer.push();
  layer.translate(x, y);
  layer.fill(255);
  layer.noStroke();

  //blade
  layer.rect(0, 0, size / 5, size);

  // handle
  layer.rect(-size / 6, size, size / 2, size / 4);
  layer.pop();
}
// candle
function drawCandle(layer, x, y, size) {
  layer.push();
  layer.translate(x, y);
  layer.fill(255);

  // body
  layer.rect(0, 0, size * 0.3, size);
  // yellow flame
  yellowLayer.fill(255);
  yellowLayer.noStroke();

  yellowLayer.triangle(
    x + size * 0.15,
    y - size * 0.3,
    x,
    y,
    x + size * 0.3,
    y,
  );

  layer.pop();
}
// menu dividers
function drawMenuLines(layer, y) {
  layer.stroke(255);
  layer.strokeWeight(1);
  layer.line(width * 0.2, y, width * 0.8, y);
}

// tape pieces
function drawTapeStrip(layer, x, y, w, h, angle) {
  layer.push();
  layer.translate(x, y);
  layer.rotate(radians(angle));
  layer.noStroke();
  layer.fill(255, 95);
  layer.rect(0, 0, w, h);

  // rough tape edges
  layer.stroke(255, 130);
  layer.strokeWeight(1);
  for (let i = 0; i < 5; i++) {
    layer.line(random(0, w), random(0, h), random(0, w), random(0, h));
  }
  layer.pop();
}

// text backing
function drawTextBacking(layer, x, y, w, h, angle) {
  layer.push();
  layer.translate(x, y);
  layer.rotate(radians(angle));
  layer.noStroke();
  layer.fill(255, 135);
  layer.rect(0, 0, w, h);
  layer.pop();
}

// messy underlines
function drawMessyUnderline(layer, x, y, w) {
  layer.stroke(255);
  layer.strokeWeight(2);

  for (let i = 0; i < 3; i++) {
    layer.line(x, y + random(-3, 3), x + w, y + random(-3, 3));
  }
}

// blood details
function drawBloodDrops(layer, x, y, amount) {
  layer.noStroke();
  layer.fill(255, 180);

  for (let i = 0; i < amount; i++) {
    let dropX = x + random(-25, 25);
    let dropY = y + random(-15, 35);
    let dropSize = random(8, 22);

    layer.circle(dropX, dropY, dropSize);
    layer.triangle(
      dropX - dropSize * 0.35,
      dropY,
      dropX + dropSize * 0.35,
      dropY,
      dropX,
      dropY + dropSize * 1.2,
    );
  }
}

// blood streak
function drawBloodTrail(layer, x, y) {
  layer.stroke(255, 170);
  layer.strokeWeight(4);

  for (let i = 0; i < 4; i++) {
    layer.line(
      x + random(-10, 10),
      y + i * 22,
      x + random(-20, 20),
      y + i * 22 + random(35, 70),
    );
  }
}

// menu frame
function drawMenuFrame(layer) {
  layer.noFill();
  layer.stroke(255, 120);
  layer.strokeWeight(1);

  layer.rect(width * 0.08, height * 0.13, width * 0.72, height * 0.76);
  layer.line(width * 0.12, height * 0.24, width * 0.68, height * 0.24);
  layer.line(width * 0.12, height * 0.84, width * 0.68, height * 0.84);
}
// plate symbol
function drawPlate(layer, x, y, size) {
  layer.push();

  layer.translate(x, y);

  layer.noFill();
  layer.stroke(255);
  layer.strokeWeight(3);

  layer.circle(0, 0, size);

  layer.circle(0, 0, size * 0.6);

  layer.pop();
}
// print grain texture
function createGrain(layer, amount) {
  layer.noStroke();

  for (let i = 0; i < amount; i++) {
    let x = random(width);
    let y = random(height);

    let alpha = random(20, 80);

    layer.fill(255, alpha);

    layer.circle(x, y, random(1, 3));
  }
}
// print registration marks
function drawRegistrationMarks(layer) {
  layer.stroke(255, 120);
  layer.strokeWeight(2);
  // top left
  layer.line(30, 50, 60, 50);
  layer.line(45, 35, 45, 65);

  // top right
  layer.line(width - 60, 50, width - 30, 50);
  layer.line(width - 45, 35, width - 45, 65);

  // bottom left
  layer.line(30, height - 50, 60, height - 50);
  layer.line(45, height - 65, 45, height - 35);

  // bottom right
  layer.line(width - 60, height - 50, width - 30, height - 50);

  layer.line(width - 45, height - 65, width - 45, height - 35);
}

// photocopy scan lines
function drawScanLines(layer) {
  layer.stroke(255, 40);
  layer.strokeWeight(1);

  for (let y = 0; y < height; y += random(60, 120)) {
    layer.line(0, y + random(-3, 3), width, y + random(-3, 3));
  }
}

// edge print smudges
function drawSmudge(layer) {
  layer.noStroke();
  layer.fill(255, 35);

  for (let i = 0; i < 3; i++) {
    let x = random([random(0, 40), random(width - 40, width)]);

    let y = random(height);

    layer.ellipse(x, y, random(30, 120), random(10, 40));
  }
}

//risograph border
function drawBorder(layer, thickness) {
  layer.noFill();
  layer.stroke(255);
  layer.strokeWeight(thickness);

  let margin = width * 0.05;
  // broken border segments
  layer.line(margin, margin, width * 0.35, margin);
  layer.line(width * 0.65, margin, width - margin, margin);
  layer.line(margin, height - margin, width * 0.4, height - margin);
  layer.line(width * 0.6, height - margin, width - margin, height - margin);
  layer.line(margin, margin, margin, height * 0.4);
  layer.line(margin, height * 0.6, margin, height - margin);
  layer.line(width - margin, margin, width - margin, height * 0.35);
  layer.line(width - margin, height * 0.65, width - margin, height - margin);
}

// resize canvas with browser window
function windowResized() {
  resizeCanvas(windowHeight * 0.66, windowHeight);
  generatePoster();
}
