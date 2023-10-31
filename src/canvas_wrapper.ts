export class Point {
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

export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }
}

export class Color {
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

export class CanvasWrapper {
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

  /**
   * The non-useContextAPI path is slow AF, but it also works :))
   *
   * Based on ssloy/tinyrenderer lesson #2: Triangle rasterization :D
   */
  drawFilledTriangle(p0: Point, p1: Point, p2: Point, color?: Color) {
    if (this.useContextAPI) {
      this.ctx.beginPath();
      this.ctx.moveTo(p0.x, p0.y);
      this.ctx.lineTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.closePath();
      this.ctx.fillStyle = this.colorize(color);
      this.ctx.fill();
      return;
    }

    const vertices = [p0, p1, p2];
    vertices.sort((a, b) => a.y - b.y);

    const max = Math.max(vertices[0].y, vertices[1].y, vertices[2].y);
    for (let y = vertices[0].y; y < max; y++) {
      let base = vertices[0];
      let second = vertices[1];
      let third = vertices[2];

      // Wth... i'm not sure what happened here, but if fucking works.
      if (y >= vertices[1].y) {
        base = vertices[2];
        second = vertices[1];
        third = vertices[0];
      }

      const deltaToBaseY = y - base.y;

      const percentageProgressLeft = deltaToBaseY / (second.y - base.y);
      const left = base.x - (base.x - second.x) * percentageProgressLeft;

      const percentageProgressRight = deltaToBaseY / (third.y - base.y);
      const right = base.x - (base.x - third.x) * percentageProgressRight;

      this.drawLine(new Point(left, y), new Point(right, y), color);
    }
  }
}