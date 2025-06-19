// ====== Variabili globali ======
let shapes = [];
let colors = [];
let lastUpdateTime = 0;
const updateInterval = 1000; // 每秒更新一次

// ====== Setup ======
function setupGeometricPattern(pg) {
  // 定义颜色数组
  colors = [
    pg.color("#279BD0"), // 蓝色
    pg.color("#45A154"), // 绿色
    pg.color("#C93047"), // 红色
    pg.color("#F2E822"), // 黄色
    pg.color("#717DB5"), // 紫蓝色
    pg.color("#F46E0B"), // 橙色
  ];

  // 初始生成图形
  generateShapesGeometricPattern(pg);
}

// ====== Draw ======
function drawGeometricPattern(pg) {
  // 背景
  pg.background(240);

  // 判断是否需要刷新
  if (millis() - lastUpdateTime > updateInterval) {
    generateShapesGeometricPattern(pg);
    lastUpdateTime = millis();
  }

  // 绘制图形
  drawShapesGeometricPattern(pg);
}

// ====== 生成图形函数 ======
function generateShapesGeometricPattern(pg) {
  shapes = [];

  let shapeSize = 50;
  let cols = Math.ceil(pg.width / shapeSize);
  let rows = Math.ceil(pg.height / shapeSize);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let shape = {
        x: i * shapeSize + shapeSize / 2,
        y: j * shapeSize + shapeSize / 2,
        size: random(30, 70),
        type: random(["circle", "square", "triangle"]),
        color: random(colors),
        rotation: random(TWO_PI),
      };
      shapes.push(shape);
    }
  }
}

// ====== 绘制图形函数 ======
function drawShapesGeometricPattern(pg) {
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
