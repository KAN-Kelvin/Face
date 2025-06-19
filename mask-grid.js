// 全局变量
let cs, rs; // 网格列数和行数
let scale = 10; // 每个格子的大小（像素）
let time = 0; // 时间变量，用于噪声动画
let plt = []; // 固定的颜色调色板（鲜艳HSB颜色）

/**
 * 初始化函数：用于设置颜色模式、初始化网格参数和颜色数组
 * @param {p5.Graphics} pg - 可以是主画布，也可以是 createGraphics 创建的图层
 */
function setupGrid(pg) {
  cs = floor(pg.width / scale); // 根据宽度和格子大小计算列数
  rs = floor(pg.height / scale); // 根据高度和格子大小计算行数
  time = 0; // 初始化时间变量

  pg.noStroke(); // 不绘制边框
  pg.colorMode(HSB, 360, 100, 100); // 使用HSB色彩模式

  // 初始化鲜艳的固定调色板
  plt = [
    pg.color("#279BD0"), // 蓝色
    pg.color("#45A154"), // 绿色
    pg.color("#C93047"), // 红色
    pg.color("#F2E822"), // 黄色
    pg.color("#717DB5"), // 紫蓝色
    pg.color("#F46E0B"), // 橙色
  ];
}

/**
 * 绘制函数：根据 Perlin 噪声填充网格颜色
 * @param {p5.Graphics} pg - 可以是主画布或图形缓冲层
 */
function drawGrid(pg) {
  time += 0.01; // 时间推进，用于动画效果
  pg.background(0); // 清除背景，使用黑色（或可自定义）

  for (let y = 0; y < rs; y++) {
    for (let x = 0; x < cs; x++) {
      let nx = x * 0.05; // X 方向的噪声输入
      let ny = y * 0.05; // Y 方向的噪声输入
      let n = noise(nx, ny, time); // 获取 0~1 的噪声值

      // 将噪声值映射为颜色索引（整数）
      let index = floor(map(n, 0, 1, 0, palette.length));
      index = constrain(index, 0, palette.length - 1); // 限制范围

      pg.fill(palette[index]); // 设置颜色
      pg.rect(x * scale, y * scale, scale, scale); // 绘制矩形格子
    }
  }
}
