import { Vec2, Vec3 } from "./primitives";

/** I know what barycentric is but this comp is still black magic to me. */
export function barycentric([p0, p1, p2]: Array<Vec3 | Vec2>, p: Vec2): Vec3 {
  const u = Vec3.fromArray([p2.x - p0.x, p1.x - p0.x, p0.x - p.x]).cross(
    Vec3.fromArray([p2.y - p0.y, p1.y - p0.y, p0.y - p.y])
  );

  if (Math.abs(u.z) < 1) {
    return Vec3.fromArray([-1, 1, 1]);
  }

  return Vec3.fromArray([1 - (u.x + u.y) / u.z, u.y / u.z, u.x / u.z]);
}
