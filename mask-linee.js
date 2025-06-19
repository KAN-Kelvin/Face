const palette = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
let lines = [];
let linesNum = 100;

const DIST = 10;
let MAX;
const GEN = 10;

function setupLinee(pg) {
  // 🟡 初始化图形缓冲区与参数 / Inizializza la grafica pg e i parametri
  pg.angleMode(DEGREES);
  pg.noStroke();
  pg.background(255); // 背景白色 / Sfondo bianco

  MAX = dist(0, 0, pg.width / 2, pg.height / 2);

  lines = []; // 清空旧的 line / Reset array linee
  for (let i = 0; i < linesNum; i++) {
    lines.push(new MyLine(i * (360 / linesNum)));
  }
}

function drawLinee(pg) {
  // 🟢 每帧更新绘图 / Aggiorna la grafica in ogni frame
  pg.push();
  pg.translate(pg.width / 2, pg.height / 2);

  for (let i = 0; i < lines.length; i++) {
    lines[i].display(pg); // ➕ 在缓冲区上绘制 / Disegna su pg
  }

  pg.pop();
}

// 🔵 MyLine 类 - 一条射线 / Una linea radiale
class MyLine {
  constructor(angle) {
    this.angle = angle;
    this.objs = [];
    this.speed = random(1, 2);
    this.h = random(5, 20);
  }

  display(pg) {
    if (random(100) < GEN) {
      if (
        this.objs.length === 0 ||
        this.objs[this.objs.length - 1].hasDistance()
      ) {
        this.objs.push(new Obj(this.speed, this.h, this.angle));
      }
    }

    for (let i = 0; i < this.objs.length; i++) {
      this.objs[i].move();
      this.objs[i].display(pg);
    }

    for (let j = this.objs.length - 1; j >= 0; j--) {
      if (this.objs[j].isFinished()) {
        this.objs.splice(j, 1);
      }
    }
  }
}

// 🔴 Obj 类 - 一个矩形对象 / Un rettangolo animato
class Obj {
  constructor(speed, h, angle) {
    this.r = 0;
    this.angle = angle;
    this.speed = speed;
    this.w = random(10, 50);
    this.h = h;
    this.c = color(random(palette));
  }

  move() {
    this.r += this.speed;
  }

  isFinished() {
    return this.r > MAX;
  }

  hasDistance() {
    return this.r > this.w + DIST;
  }

  display(pg) {
    pg.fill(this.c);
    let x = this.r * cos(this.angle);
    let y = this.r * sin(this.angle);
    pg.push();
    pg.translate(x, y);
    pg.rotate(this.angle);
    pg.rect(0, 0, this.w, this.h, this.h / 2);
    pg.pop();
  }
}
