let logoImg_source;
let logoImg;

let maschera_linee; // 主纹理图（p5.Graphics 对象）1.改
let maschera_pattern; // 动态纹理缓冲区
let maschera_puzzle;
let maschera_connections;
let maschera_geometricpattern;
let maschera_walker;
let maschera_grid;
let maschera_voronoi;

function preload() {
  logoImg_source = loadImage("./assets/logo.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  handleSetup();
  // 创建两个图形缓冲区作为纹理图
}

function draw() {
  background(200);
  translate(width / 2, height / 2);

  let m = maschera_voronoi; // 2.改 更换LOGO左脸的纹理图
  //drawPattern(m);
  //drawLinee(m);
  //drawPuzzle(m);
  //drawConnections(m);
  //drawGeometricPattern(m);
  //drawWalker(m);
  //drawGrid(m);
  drawVoronoi(m);

  const masked = createImage(logoImg.width, logoImg.height);
  masked.copy(m, 0, 0, m.width, m.height, m.width / 4, 0, m.width, m.height);
  masked.mask(logoImg);
  image(masked, 0, 0);

  push();
  beginClip();
  rect(0, -height / 2, width / 2, height);
  endClip();
  image(logoImg, 0, 0);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  handleSetup();
  redraw();
}

function handleSetup() {
  let image_height = height * 0.6;

  logoImg = logoImg_source.get();
  logoImg.resize(0, image_height);

  maschera_linee = createGraphics(image_height, image_height);
  maschera_pattern = createGraphics(image_height, image_height); //3.改  第二个图形缓冲区
  maschera_puzzle = createGraphics(image_height, image_height);
  maschera_connections = createGraphics(image_height, image_height);
  maschera_geometricpattern = createGraphics(image_height, image_height);
  maschera_walker = createGraphics(image_height, image_height);
  maschera_grid = createGraphics(image_height, image_height);
  maschera_voronoi = createGraphics(image_height, image_height);

  setupLinee(maschera_linee); // 4.改 初始化纹理图的绘制内容
  setupPattern(maschera_pattern);
  setupPuzzle(maschera_puzzle);
  setupConnections(maschera_connections);
  setupGeometricPattern(maschera_geometricpattern);
  setupWalker(maschera_walker);
  setupGrid(maschera_grid);
  setupVoronoi(maschera_voronoi);
}
