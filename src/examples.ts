import { CanvasWrapper, Color, Point } from "./canvas_wrapper";

export function drawTestFill(w: CanvasWrapper) {
  for (let i = 0; i < w.canvas.width; i++) {
    w.drawLine(
      new Point(i, 0),
      new Point(w.canvas.width - i, w.canvas.height),
      new Color(255, 0, 0, 255)
    );
  }
  for (let i = 0; i < w.canvas.height; i++) {
    w.drawLine(
      new Point(0, i),
      new Point(w.canvas.width, w.canvas.height - i),
      new Color(0, 255, 0, 255)
    );
  }
}

export function drawTestTriangles(w: CanvasWrapper) {
  const t0 = [new Point(10, 70), new Point(50, 160), new Point(70, 80)];
  const t1 = [new Point(180, 50), new Point(150, 1), new Point(70, 180)];
  const t2 = [new Point(180, 150), new Point(120, 160), new Point(130, 180)];
  w.drawTriangle(t0[0], t0[1], t0[2], new Color(255, 0, 0, 255));
  w.drawTriangle(t1[0], t1[1], t1[2], new Color(0, 0, 255, 255));
  w.drawTriangle(t2[0], t2[1], t2[2], new Color(0, 255, 0, 255));
}

export function drawTestFilledTriangles(w: CanvasWrapper) {
  const t0 = [new Point(10, 70), new Point(50, 160), new Point(70, 80)];
  const t1 = [new Point(180, 50), new Point(150, 1), new Point(70, 180)];
  const t2 = [new Point(180, 150), new Point(120, 160), new Point(130, 180)];
  w.drawFilledTriangle(t0[0], t0[1], t0[2], new Color(255, 0, 0, 255));
  w.drawFilledTriangle(t1[0], t1[1], t1[2], new Color(0, 0, 255, 255));
  w.drawFilledTriangle(t2[0], t2[1], t2[2], new Color(0, 255, 0, 255));
}

export function drawTestRandomFilledTriangles(w: CanvasWrapper, n = 10) {
  for (let i = 0; i < n; i++) {
    const t0 = [
      new Point(
        Math.random() * w.canvas.width,
        Math.random() * w.canvas.height
      ),
      new Point(
        Math.random() * w.canvas.width,
        Math.random() * w.canvas.height
      ),
      new Point(
        Math.random() * w.canvas.width,
        Math.random() * w.canvas.height
      ),
    ];
    w.drawFilledTriangle(
      t0[0],
      t0[1],
      t0[2],
      new Color(
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        255
      )
    );
  }
}
