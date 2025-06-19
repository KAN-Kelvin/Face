/*
 * 👋 Hello! 这是一个使用 ml5.js 的 UV 映射示例
 * 演示如何将图像纹理贴图到人脸模型上。
 */

let faceMesh; // 存储 faceMesh 模型
let video; // 摄像头视频
let faces = []; // 检测到的人脸数据数组
let options = {
  // faceMesh 的配置项
  maxFaces: 3, // 最多检测 3 张脸
  refineLandmarks: false, // 不细化特征点
  flipped: true, // 图像镜像（左右翻转）
};

let uvMapImage; // 纹理图（未使用，可删除）

let triangulation; // 三角网格索引
let uvCoords; // UV 映射坐标

let maschere = []; // 纹理图数组（未使用，可扩展）
let mascheraIndex = 0; // 当前选中的纹理索引

let maschera_linee; // 主纹理图（p5.Graphics 对象）
let maschera_pattern; // 动态纹理缓冲区
let maschera_puzzle;
let maschera_connections;
let maschera_geometricpattern;

function preload() {
  // 预加载中初始化 faceMesh 模型
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // 创建 WEBGL 画布
  video = createCapture(VIDEO); // 打开摄像头
  video.size(640, 480); // 设置视频大小
  video.hide(); // 隐藏视频元素
  faceMesh.detectStart(video, gotFaces); // 启动人脸检测，并设置回调

  triangulation = faceMesh.getTriangles(); // 获取三角网格连接点
  uvCoords = faceMesh.getUVCoords(); // 获取 UV 映射坐标

  // 创建两个图形缓冲区作为纹理图
  maschera_linee = createGraphics(200, 200);
  maschera_pattern = createGraphics(200, 200); // 第二个图形缓冲区
  maschera_puzzle = createGraphics(200, 200);
  maschera_connections = createGraphics(200, 200);
  maschera_geometricpattern = createGraphics(200, 200);

  setupLinee(maschera_linee); // 初始化纹理图的绘制内容
  setupPattern(maschera_pattern);
  setupPuzzle(maschera_puzzle);
  setupConnections(maschera_connections);
  setupGeometricPattern(maschera_geometricpattern);
}

function draw() {
  background("white"); // 背景白色

  // 将绘图原点平移至左上角，并按摄像头比例缩放
  translate(-video.width / 2, -video.height / 2);
  scale(height / video.height);

  push();
  // 可以取消注释 image(video, 0, 0) 来显示视频画面
  // scale(-1, 1); // 若启用视频镜像则取消注释
  // image(video, 0, 0);
  pop();

  let m = maschera_geometricpattern;

  // maschera_linee.clear(); // 清除主纹理图内容
  // updateLinee(m); // 更新第二个纹理（暂未使用）
  // drawPattern(m);
  // drawPuzzle(m);
  // drawConnections(m);
  drawGeometricPattern(m);

  m.push();
  m.fill("black"); // 黑色填充
  m.rect(0, 0, 100, 200); // 在主纹理图上画一个黑色矩形（演示用途）
  m.pop();

  // 遍历每一张脸，进行 UV 映射绘制
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];

    // 设置贴图
    noStroke();
    texture(m); // 使用 maschera 图形作为纹理图
    textureMode(NORMAL); // 设置纹理模式为 NORMAL（UV 坐标为0~1）

    beginShape(TRIANGLES); // 开始绘制三角形网格
    for (let i = 0; i < triangulation.length; i++) {
      let indexA = triangulation[i][0]; // 三角形顶点索引
      let indexB = triangulation[i][1];
      let indexC = triangulation[i][2];
      let a = face.keypoints[indexA]; // 获取三角形三个顶点的坐标
      let b = face.keypoints[indexB];
      let c = face.keypoints[indexC];
      const uvA = { x: uvCoords[indexA][0], y: uvCoords[indexA][1] }; // 获取顶点的UV坐标
      const uvB = { x: uvCoords[indexB][0], y: uvCoords[indexB][1] };
      const uvC = { x: uvCoords[indexC][0], y: uvCoords[indexC][1] };
      // 设置顶点坐标及其对应的纹理 UV 坐标
      vertex(a.x, a.y, uvA.x, uvA.y);
      vertex(b.x, b.y, uvB.x, uvB.y);
      vertex(c.x, c.y, uvC.x, uvC.y);
    }
    endShape();
  }
}

// 人脸识别完成后的回调函数
function gotFaces(results) {
  faces = results; // 保存识别结果
}

// 点击鼠标切换纹理图（功能预留）
function mouseClicked() {
  mascheraIndex = (mascheraIndex + 1) % maschere.length;
}

// 当窗口大小变化时，自动调整画布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw(); // 强制重绘
}
