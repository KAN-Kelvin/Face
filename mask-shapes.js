let shapes = [];
let colors = ["#279BD0", "#45A154", "#C93047", "#F2E822", "#717DB5", "#F46E0B"];
let lastUpdateTime = 0;
const updateInterval = 1000;

let grid_cols = 20;
let grid_rows = 20;

function setupShapes(pg) {
  setInterval(() => {
    generateShapes(pg);
  }, 500);
}

function generateShapes(pg) {
  shapes = [];
  pg.clear();

  let cellWidth = pg.width / grid_cols;
  let cellHeight = pg.height / grid_rows;
  let shapeSize = min(cellWidth, cellHeight);

  for (let i = 0; i < grid_cols; i++) {
    for (let j = 0; j < grid_rows; j++) {
      let shape = {
        x: i * cellWidth,
        y: j * cellHeight,
        size: shapeSize,
        type: random(["circle", "square", "triangle"]),
        color: random(colors),
        rotation: random(TWO_PI),
      };
      shapes.push(shape);
    }
  }

  drawShapes(pg);
}

function drawShapes(pg) {
  for (let shape of shapes) {
    pg.push();
    pg.translate(shape.x, shape.y);
    pg.rotate(shape.rotation);
    pg.fill(shape.color);
    pg.noStroke();

    switch (shape.type) {
      case "circle":
        pg.ellipse(0, 0, shape.size, shape.size);
        break;
      case "square":
        pg.rectMode(CENTER);
        pg.rect(0, 0, shape.size, shape.size);
        break;
      case "triangle":
        let h = shape.size * 0.866;
        pg.triangle(0, -h / 2, -shape.size / 2, h / 2, shape.size / 2, h / 2);
        break;
    }

    pg.pop();
  }
}
