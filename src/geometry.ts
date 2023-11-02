import { Vec2, Vec3 } from "./primitives";

/** I know what barycentric is but this comp is still black magic to me. */
export function barycentric(triangle: Array<Vec2>, p: Vec2): Vec3 {
  const u = Vec3.fromArray([
    triangle[2].x - triangle[0].x,
    triangle[1].x - triangle[0].x,
    triangle[0].x - p.x,
  ]).cross(
    Vec3.fromArray([
      triangle[2].y - triangle[0].y,
      triangle[1].y - triangle[0].y,
      triangle[0].y - p.y,
    ])
  );

  if (Math.abs(u.z) < 1) {
    return Vec3.fromArray([-1, 1, 1]);
  }

  return Vec3.fromArray([1 - (u.x + u.y) / u.z, u.y / u.z, u.x / u.z]);
}
