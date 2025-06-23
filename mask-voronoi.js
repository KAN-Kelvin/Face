// Filename: voronoiModule.js

// === Voronoi 模块变量 / Variabili del modulo Voronoi ===
let vCols = []; // 调色板 colors / Tavolozza dei colori
let vSeeds = []; // Voronoi 核心点 / Siti
let vZones = []; // Voronoi 区域多边形 / Celle
let seedCount = 6; // 核心点数量 / Numero di siti
let refreshDelay = 2000; // 刷新间隔 / Intervallo aggiornamento (ms)
let lastRefresh = 0; // 上次更新时间 / Ultimo aggiornamento

/**
 * 初始化 Voronoi 模块 / Inizializzazione del modulo Voronoi
 * @param {p5.Graphics} pg
 */
function setupVoronoi(pg) {
  pg.noStroke();
  pg.colorMode(pg.RGB);

  // 设置颜色 / Colori predefiniti
  vCols = [
    pg.color("#279BD0"), // 蓝 / Blu
    pg.color("#45A154"), // 绿 / Verde
    pg.color("#C93047"), // 红 / Rosso
    pg.color("#F2E822"), // 黄 / Giallo
    pg.color("#717DB5"), // 紫蓝 / Viola-blu
    pg.color("#F46E0B"), // 橙 / Arancione
  ];

  makeSeeds(pg); // 创建核心点 / Genera siti
  makeZones(pg); // 创建多边形区域 / Genera celle
}

/**
 * 每帧绘制 Voronoi 图 / Disegna ogni frame il pattern Voronoi
 * @param {p5.Graphics} pg
 */
function drawVoronoi(pg) {
  if (millis() - lastRefresh > refreshDelay) {
    makeSeeds(pg);
    makeZones(pg);
    lastRefresh = millis();
  }
  showZones(pg);
}

// === 内部函数 / Funzioni interne ===

function makeSeeds(pg) {
  vSeeds = [];
  for (let i = 0; i < seedCount; i++) {
    vSeeds.push(createVector(random(pg.width), random(pg.height)));
  }
}

function makeZones(pg) {
  vZones = [];
  let step = 10;
  let seedMap = Array(seedCount)
    .fill()
    .map(() => []);

  for (let x = 0; x < pg.width; x += step) {
    for (let y = 0; y < pg.height; y += step) {
      let nearest = 0;
      let minD = dist(x, y, vSeeds[0].x, vSeeds[0].y);
      for (let i = 1; i < vSeeds.length; i++) {
        let d = dist(x, y, vSeeds[i].x, vSeeds[i].y);
        if (d < minD) {
          minD = d;
          nearest = i;
        }
      }
      seedMap[nearest].push(createVector(x, y));
    }
  }

  for (let i = 0; i < seedMap.length; i++) {
    let pts = seedMap[i];
    if (pts.length > 2) {
      let hull = calcHull(pts);
      vZones.push({ pts: hull, col: vCols[i] });
    }
  }
}

function showZones(pg) {
  pg.background(255);
  for (let zone of vZones) {
    pg.fill(zone.col);
    pg.beginShape();
    for (let pt of zone.pts) {
      pg.vertex(pt.x, pt.y);
    }
    pg.endShape(pg.CLOSE);
  }
}

function calcHull(pts) {
  pts.sort((a, b) => a.x - b.x || a.y - b.y);
  let lower = [];
  for (let p of pts) {
    while (
      lower.length >= 2 &&
      vCross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    ) {
      lower.pop();
    }
    lower.push(p);
  }
  let upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    let p = pts[i];
    while (
      upper.length >= 2 &&
      vCross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    ) {
      upper.pop();
    }
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

function vCross(a, b, o) {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}
