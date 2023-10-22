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

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawPixel(p: Point, color?: Color) {
    if (color) {
      this.ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    }
    this.ctx.fillRect(p.x, p.y, 1, 1);
  }

  drawLine(p0: Point, p1: Point, color?: Color) {
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
    for (let x = p0.x; x < p1.x; x++) {
      const y = p0.y + (x - p0.x) * slope;
      if (steep) {
        this.drawPixel(new Point(y, x), color);
      } else {
        this.drawPixel(new Point(x, y), color);
      }
    }
  }
}

function render() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas.getContext) {
    throw new Error("Canvas not supported");
  }

  const w = new CanvasWrapper(canvas);
  w.clear();

  const start = performance.now();

  //   w.drawLine(
  //     new Point(800, 0),
  //     new Point(0, canvas.height),
  //     new Color(255, 0, 0, 255)
  //   );
  for (let i = 0; i < canvas.width; i++) {
    w.drawLine(
      new Point(i, 0),
      new Point(canvas.width - i, canvas.height),
      new Color(255, 0, 0, 255)
    );
  }
  for (let i = 0; i < canvas.height; i++) {
    w.drawLine(
      new Point(0, i),
      new Point(canvas.width, canvas.height - i),
      new Color(0, 255, 0, 255)
    );
  }

  const end = performance.now();
  console.log(`Took ${end - start}ms`);
}

// Add hook to the render button.
const renderButton = document.getElementById("render")! as HTMLButtonElement;
renderButton.addEventListener("click", render);

// But.. let's render at start anyways.
render();
