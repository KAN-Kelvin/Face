let points = [];
let numPoints = 20;
let maxDist = 200;
let speedRange = 0.5;

// === 初始化 createGraphics 缓冲图层和点位数据 ===
function setupConnections(pg) {
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.noFill();

  points = [];
  for (let i = 0; i < pointsCount; i++) {
    points.push({
      x: random(pg.width),
      y: random(pg.height),
      vx: random(-speedRange, speedRange),
      vy: random(-speedRange, speedRange),
    });
  }
}

// === 每帧在图层中绘制连线动画 ===
function drawConnections(pg) {
  pg.background(0, 0, 100); // 白色背景
  pg.strokeWeight(2);

  // 更新点的位置
  for (let p of points) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > pg.width) p.vx *= -1;
    if (p.y < 0 || p.y > pg.height) p.vy *= -1;
  }

  // 连接点对
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let p1 = points[i];
      let p2 = points[j];
      let d = dist(p1.x, p1.y, p2.x, p2.y);

      if (d < maxDist) {
        let hueVal = (frameCount + i * 2 + j * 3) % 360;
        pg.stroke(hueVal, 100, 100, map(d, 0, maxDist, 100, 10));

        let cx = (p1.x + p2.x) / 2 + sin(frameCount * 0.01 + i) * 20;
        let cy = (p1.y + p2.y) / 2 + cos(frameCount * 0.01 + j) * 20;
        pg.beginShape();
        pg.vertex(p1.x, p1.y);
        pg.quadraticVertex(cx, cy, p2.x, p2.y);
        pg.endShape();
      }
    }
  }
}
