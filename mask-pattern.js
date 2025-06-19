let numLines = 80;
let pointsCount = 200;
let noiseScale = 0.01;
let t = 0;

// ✅ Funzione per impostare il grafico (una sola volta)
function setupPattern(gfx) {
  gfx.colorMode(HSB, 360, 100, 100, 100);
  gfx.noFill();
  gfx.strokeWeight(3);
}

// ✅ Funzione per disegnare il pattern (chiamata ogni frame)
function drawPattern(gfx) {
  gfx.clear();
  gfx.push();
  gfx.translate(gfx.width / 2, gfx.height / 2);

  for (let i = 0; i < numLines; i++) {
    let hue = (frameCount + i * 5) % 360;
    gfx.stroke(hue, 80, 80, 60);

    gfx.beginShape();
    for (let j = 0; j < pointsCount; j++) {
      let angle = (j / pointsCount) * TWO_PI;
      let baseRadius = i * 5;

      let offset = noise(
        cos(angle) * noiseScale * baseRadius,
        sin(angle) * noiseScale * baseRadius,
        t + i * 0.1
      );
      let radius = baseRadius + offset * 80;

      let x = cos(angle) * radius;
      let y = sin(angle) * radius;

      gfx.curveVertex(x, y);
    }
    gfx.endShape(CLOSE);
  }

  gfx.pop();

  // Avanza il tempo per l’animazione
  t += 0.01;
}
