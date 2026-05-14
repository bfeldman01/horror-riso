// risograph layers
let pinkLayer;
let blueLayer;

// movie variables
let currentMovie;
let currentTitle;
let currentTagline;
let currentLayout;

// font variables
let jenniferFont;
let readyOrNotFont;
let menuFont;

// movie mode array
let movieModes = [
  {
    name: "Jennifer's Body",
    backgroundColor: [255, 240, 245],
    offsetX: 25,
    offsetY: 10,
  },

  {
    name: "Ready or Not",
    backgroundColor: [245, 235, 220],
    offsetX: 10,
    offsetY: 20,
  },

  {
    name: "The Menu",
    backgroundColor: [235, 235, 230],
    offsetX: 5,
    offsetY: 5,
  },
];

// title generator
let titles = {
  "Jennifer's Body": [
    "BITCH EATER",
    "HELLCHEERLEADER",
    "PROM NIGHT MASSACRE",
    "SHE BIT BACK",
  ],
  "Ready or Not": [
    "THE FINAL BRIDE",
    "TIL DEATH",
    "BLOOD MONEY",
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

// poster layout types
let layouts = ["centered", "diagonal", "lower-heavy"];
// loads custom fonts
function preload() {
  jenniferFont = loadFont("fonts/BebasNeue-Regular.ttf");
  readyOrNotFont = loadFont("fonts/CormorantGaramond.ttf");
  menuFont = loadFont("fonts/Oswald.ttf");
}

function setup() {
  createCanvas(800, 1200);

  // randomizes current poster settings
  currentMovie = random(movieModes);
  currentTitle = random(titles[currentMovie.name]);
  currentTagline = random(taglines[currentMovie.name]);
  currentLayout = random(layouts);

  // paper background color
  background(
    currentMovie.backgroundColor[0],
    currentMovie.backgroundColor[1],
    currentMovie.backgroundColor[2],
  );

  // creates risograph ink layers
  pinkLayer = new Riso("fluorescentpink");
  blueLayer = new Riso("blue");

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
    createGrain(pinkLayer, 5000);
    createGrain(blueLayer, 3500);
  } else if (currentMovie.name === "Ready or Not") {
    createGrain(pinkLayer, 2500);
    createGrain(blueLayer, 5000);
  } else if (currentMovie.name === "The Menu") {
    createGrain(blueLayer, 1200);
  }
  // default composition position
  let shapeX = width / 2;
  let shapeY = height / 2;
  // procedural layout variations
  if (currentLayout === "diagonal") {
    shapeX = width * 0.35;
    shapeY = height * 0.4;
  } else if (currentLayout === "lower-heavy") {
    shapeY = height * 0.65;
  }
  // slight print rotation
  let rotationAmount = random(-3, 3);
  // pink layer
  pinkLayer.fill(255);
  pinkLayer.noStroke();

  pinkLayer.push();

  pinkLayer.translate(shapeX, shapeY);

  pinkLayer.rotate(radians(rotationAmount));

  pinkLayer.ellipse(0, 0, 300, 300);

  pinkLayer.pop();
  // blue layer
  blueLayer.fill(255);
  blueLayer.noStroke();

  // slightly offset shape
  blueLayer.push();

  blueLayer.translate(
    shapeX + currentMovie.offsetX,
    shapeY + currentMovie.offsetY,
  );

  blueLayer.rotate(radians(rotationAmount + random(-1, 1)));

  blueLayer.ellipse(0, 0, 300, 300);

  blueLayer.pop();

  // movie symbols
  if (currentMovie.name === "Jennifer's Body") {
    drawHeart(pinkLayer, shapeX - 200, shapeY - 150, 120);
  } else if (currentMovie.name === "Ready or Not") {
    drawKnife(blueLayer, shapeX + 180, shapeY - 100, 180);
  } else if (currentMovie.name === "The Menu") {
    drawPlate(blueLayer, shapeX, shapeY - 180, 220);
  }
  // border systems
  if (currentMovie.name === "Jennifer's Body") {
    drawBorder(pinkLayer, 8);
  } else if (currentMovie.name === "Ready or Not") {
    drawBorder(blueLayer, 4);
  } else if (currentMovie.name === "The Menu") {
    drawBorder(blueLayer, 2);
  }

  // TYPOGROPHAY
  // title text
  fill(20);
  textAlign(CENTER);
  textStyle(BOLD);
  if (currentMovie.name === "Jennifer's Body") {
    textSize(82);
  } else if (currentMovie.name === "Ready or Not") {
    textSize(68);
  } else if (currentMovie.name === "The Menu") {
    textSize(54);
  }

  if (currentMovie.name === "Jennifer's Body") {
    textFont(jenniferFont);
  } else if (currentMovie.name === "Ready or Not") {
    textFont(readyOrNotFont);
  } else if (currentMovie.name === "The Menu") {
    textFont(menuFont);
  }

  // offset print shadow
  fill(255, 40);
  text(currentTitle, width / 2 + 6, 156);

  // main title
  fill(20);

  text(currentTitle, width / 2, 150);

  // tagline creation
  fill(20);
  textSize(24);
  textStyle(NORMAL);
  text(currentTagline, width / 2, 210);

  //display riso
  drawRiso();

  console.log(currentMovie.name);
  noLoop();
}
// CURRENTLY UNUSED; POSTER GENERATES IN SETUP
function draw() {}

// halftone texture function
function createHalftoneTexture(layer) {
  layer.fill(255);
  layer.noStroke();

  // nested loops create grid
  for (let x = 0; x < width; x += 15) {
    for (let y = 0; y < height; y += 20) {
      // random dot size
      let size = random(2, 8);
      layer.ellipse(x, y, size, size);
    }
  }
}
// heart symbol
function drawHeart(layer, x, y, size) {
  layer.push();
  layer.translate(x, y);
  layer.fill(255);
  layer.noStroke();

  layer.circle(-size / 4, 0, size / 2);
  layer.circle(size / 4, 0, size / 2);

  layer.triangle(-size / 2, 0, size / 2, 0, 0, size);
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
//risograph border
function drawBorder(layer, thickness) {
  layer.noFill();
  layer.stroke(255);
  layer.strokeWeight(thickness);
  layer.rect(40, 40, width - 80, height - 80);
}
