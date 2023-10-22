class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }

  sub(other: Point): Point {
    return new Point(this.x - other.x, this.y - other.y);
  }

  swap() {
    return new Point(this.y, this.x);
  }
}

class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }
}

class Color {
  r: number;
  g: number;
  b: number;
  a: number;
  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    Object.freeze(this);
  }
}

class CanvasWrapper {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  useContextAPI: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;

    this.useContextAPI = false;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private colorize(color?: Color) {
    if (!color) {
      return "rgba(0, 0, 0, 0)";
    }
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  }

  drawPixel(p: Point, color?: Color) {
    if (color) {
      this.ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    }
    this.ctx.fillRect(p.x, p.y, 1, 1);
  }

  /**
   * Bresenham's line drawing algorithm.
   *
   * Yes, it's easier to just call ctx.lineTo() but this is for learning
   * purposes. It took me more than 2 hours just to get this right :P It's
   * not even optimized :))
   */
  drawLine(p0: Point, p1: Point, color?: Color) {
    if (this.useContextAPI) {
      this.ctx.beginPath();
      this.ctx.moveTo(p0.x, p0.y);
      this.ctx.lineTo(p1.x, p1.y);
      this.ctx.strokeStyle = this.colorize(color);
      this.ctx.stroke();
      return;
    }

    let steep = false;
    if (Math.abs(p0.x - p1.x) < Math.abs(p0.y - p1.y)) {
      steep = true;
      p0 = p0.swap();
      p1 = p1.swap();
    }

    if (p0.x > p1.x) {
      const tmp = p0;
      p0 = p1;
      p1 = tmp;
    }

    const slope = (p1.y - p0.y) / (p1.x - p0.x);
    for (let x = p0.x; x <= p1.x; x++) {
      const y = p0.y + (x - p0.x) * slope;
      if (steep) {
        this.drawPixel(new Point(y, x), color);
      } else {
        this.drawPixel(new Point(x, y), color);
      }
    }
  }

  drawTriangle(p0: Point, p1: Point, p2: Point, color?: Color) {
    this.drawLine(p0, p1, color);
    this.drawLine(p1, p2, color);
    this.drawLine(p2, p0, color);
  }

  drawFilledTriangle(p0: Point, p1: Point, p2: Point, color?: Color) {
    const vertices = [p0, p1, p2];
    vertices.sort((a, b) => a.y - b.y);

    // this.drawLine(p0, p1, color);
    // this.drawLine(p1, p2, color);
    // this.drawLine(p2, p0, color);

    const max = Math.max(vertices[0].y, vertices[1].y, vertices[2].y);
    for (let y = vertices[0].y; y < max; y++) {
      const left =
        vertices[0].x +
        ((y - vertices[0].y) / (vertices[2].y - vertices[0].y)) *
          (vertices[2].x - vertices[0].x);
      const right =
        vertices[0].x +
        ((y - vertices[0].y) / (vertices[1].y - vertices[0].y)) *
          (vertices[1].x - vertices[0].x);

      this.drawLine(new Point(left, y), new Point(right, y), color);
    }

    console.log(vertices);
  }
}

function drawTestFill(w: CanvasWrapper) {
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

function drawTestTriangles(w: CanvasWrapper) {
  const t0 = [new Point(10, 70), new Point(50, 160), new Point(70, 80)];
  const t1 = [new Point(180, 50), new Point(150, 1), new Point(70, 180)];
  const t2 = [new Point(180, 150), new Point(120, 160), new Point(130, 180)];
  w.drawTriangle(t0[0], t0[1], t0[2], new Color(255, 0, 0, 255));
  w.drawTriangle(t1[0], t1[1], t1[2], new Color(0, 0, 255, 255));
  w.drawTriangle(t2[0], t2[1], t2[2], new Color(0, 255, 0, 255));
}

function drawTestFilledTriangles(w: CanvasWrapper) {
  const t0 = [new Point(10, 70), new Point(50, 160), new Point(70, 80)];
  const t1 = [new Point(180, 50), new Point(150, 1), new Point(70, 180)];
  const t2 = [new Point(180, 150), new Point(120, 160), new Point(130, 180)];
  w.drawFilledTriangle(t0[0], t0[1], t0[2], new Color(255, 0, 0, 255));
  w.drawFilledTriangle(t1[0], t1[1], t1[2], new Color(0, 0, 255, 255));
  w.drawFilledTriangle(t2[0], t2[1], t2[2], new Color(0, 255, 0, 255));
}

function render() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas.getContext) {
    throw new Error("Canvas not supported");
  }

  const w = new CanvasWrapper(canvas);
  // w.useContextAPI = true;
  w.clear();

  const start = performance.now();
  drawTestFilledTriangles(w);
  const end = performance.now();
  console.log(`Took ${end - start}ms`);
}

// Add hook to the render button.
const renderButton = document.getElementById("render")! as HTMLButtonElement;
renderButton.addEventListener("click", render);

// But.. let's render at start anyways.
render();
