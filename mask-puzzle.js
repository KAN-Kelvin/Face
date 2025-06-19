let tileSize = 80;
let cols, rows;
let pieces = [];

// === 绘制所有拼图块 ===
function drawPuzzle(pg) {
  pg.background(0, 0, 100); // 白色背景
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].display(pg);
  }
}

// === 初始化拼图块数组 ===
function setupPuzzle(pg) {
  pg.colorMode(HSB, 360, 100, 100);
  pg.noStroke();
  cols = ceil(pg.width / tileSize);
  rows = ceil(pg.height / tileSize);
  pieces = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      pieces.push(new PuzzlePiece(x * tileSize, y * tileSize, tileSize));
    }
  }
}

// === 拼图块类 ===
class PuzzlePiece {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.hue = random(360);
  }

  display(pg) {
    pg.fill(this.hue, 80, 100);
    pg.beginShape();
    pg.vertex(this.x, this.y);
    pg.vertex(this.x + this.size, this.y);
    pg.vertex(this.x + this.size, this.y + this.size);
    pg.vertex(this.x, this.y + this.size);
    pg.endShape(CLOSE);
    this.hue = (this.hue + random(-10, 10) + 360) % 360;
  }
}
