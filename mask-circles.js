let canvas; // p5 画布对象
let paletta = []; // 调色板颜色数组
let circles = []; // 存储所有圆形对象
let spacing = 50; // 圆形之间的间距

function setup() {
  canvas = createCanvas(windowWidth, windowHeight); // 创建画布
  noStroke();
  setupcircles(); // 初始化圆形系统
}

function draw() {
  background(255);
  drawcircles(); // 每帧绘制所有圆形
}

// 🔧 初始化函数：设置颜色和网格圆形对象
function setupcircles() {
  paletta = [
    color("#279BD0"), // 蓝色
    color("#45A154"), // 绿色
    color("#C93047"), // 红色
    color("#F2E822"), // 黄色
    color("#717DB5"), // 紫蓝色
    color("#F46E0B"), // 橙色
  ];

  circles = [];

  let cols = ceil(width / spacing);
  let rows = ceil(height / spacing);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cx = x * spacing + spacing / 2;
      let cy = y * spacing + spacing / 2;
      circles.push(new Circle(cx, cy, spacing));
    }
  }
}

// 🎨 每帧绘制所有圆形
function drawcircles() {
  for (let c of circles) {
    c.update();
    c.display();
  }
}

// ⭕ 圆形类：存储位置、颜色、动态效果
class Circle {
  constructor(x, y, spacing) {
    this.x = x;
    this.y = y;
    this.baseSize = spacing * 0.9; // 基础大小略小于格子，避免重叠
    this.size = this.baseSize;
    this.colorIndex = int(random(palette.length));
    this.color = palette[this.colorIndex];
    this.alpha = 180;
  }

  // 大小和透明度随时间跳动
  update() {
    this.size =
      this.baseSize +
      sin(frameCount * 0.1 + this.x * 0.05 + this.y * 0.05) * 10;
    this.alpha =
      180 + sin(frameCount * 0.05 + this.x * 0.03 + this.y * 0.03) * 60;
  }

  // 绘制圆形
  display() {
    let col = color(this.color);
    col.setAlpha(this.alpha);
    fill(col);
    ellipse(this.x, this.y, this.size);
  }
}

// 📐 窗口大小变化时，自动重新铺满圆形
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupcircles(); // 重新初始化圆形网格
}
