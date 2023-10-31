export class Vec3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public static fromArray(arr: Array<number>): Vec3 {
    return new Vec3(arr[0], arr[1], arr[2]);
  }

  sub(other: Vec3): Vec3 {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  dot(other: Vec3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  cross(other: Vec3): Vec3 {
    return new Vec3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }

  unit(): Vec3 {
    const length = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z
    );
    return new Vec3(this.x / length, this.y / length, this.z / length);
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

  public static fromObject(obj: { x: number; y: number }) {
    return new Vec2(obj.x, obj.y);
  }

  sub(other: Vec2): Vec2 {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  swap() {
    return new Vec2(this.y, this.x);
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
