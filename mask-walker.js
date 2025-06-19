// 全局变量
let obj = []; // 储存点的数组
let d = 15; // 每次移动的距离
let w = 1000; // 画布尺寸
let fixedColors = []; // 固定颜色数组

// 初始化函数：传入 pg 可以是主画布也可以是 createGraphics 创建的图层
function setupWalker(pg) {
  pg.colorMode(HSB, 360, 100, 100); // 使用 HSB 色彩模式
  pg.background(0, 0, 100); // 背景设为白色
  pg.noStroke(); // 不使用描边

  // 初始化固定颜色
  fixedColors = [
    pg.color("#279BD0"), // 蓝色
    pg.color("#45A154"), // 绿色
    pg.color("#C93047"), // 红色
    pg.color("#F2E822"), // 黄色
    pg.color("#717DB5"), // 紫蓝色
    pg.color("#F46E0B"), // 橙色
  ];

  generatePoints(pg); // 初始化点
}

// 每帧绘制函数：在 pg 上绘制所有点
function drawWalker(pg) {
  for (let i = 0; i < obj.length; i++) {
    let x_next, y_next;

    // 判断当前模式，决定横向还是纵向移动
    if (obj[i].mode === 0) {
      x_next = obj[i].x + random(-1, 1) * d;
      y_next = obj[i].y;
    } else {
      x_next = obj[i].x;
      y_next = obj[i].y + random(-1, 1) * d;
    }

    pg.fill(obj[i].color); // 设置颜色
    pg.ellipse(x_next, y_next, d, d); // 画圆点

    obj[i].x = x_next; // 更新位置
    obj[i].y = y_next;

    // 有一定概率改变方向（横向或纵向）
    if (random() < 0.5) {
      obj[i].mode = random([0, 1]);
    }
  }
}

// 重置函数：用于鼠标点击或刷新时重新生成
function resetWalker(pg) {
  pg.background(0, 0, 100); // 白色背景
  generatePoints(pg); // 重新生成点
}

// 生成初始点数组
function generatePoints(pg) {
  obj = [];
  for (let i = 0; i < 100; i++) {
    obj.push({
      x: random(w), // 随机位置
      y: random(w),
      mode: random([0, 1]), // 随机方向模式（0 横向，1 纵向）
      color: randomFromFixedColors(), // 随机选取固定颜色
    });
  }
}

// 从固定颜色数组中随机选一个
function randomFromFixedColors() {
  return random(fixedColors);
}
