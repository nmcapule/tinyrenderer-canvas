import { Vec3 } from "./primitives";

export async function loadModel(url: string): Promise<Model> {
  const response = await fetch(new URL(url));
  const payload = await response.text();
  const model = new Model([], [], [], []);

  for (const line of payload.split("\n")) {
    const parts = line.split(" ");
    if (!["v", "vt", "vn", "f"].includes(parts[0])) {
      continue;
    }

    const t = parts[0];
    if (t === "f") {
      const v0 = parts[1].split("/").map(parseFloat);
      const v1 = parts[2].split("/").map(parseFloat);
      const v2 = parts[3].split("/").map(parseFloat);
      model.faces.push([v0, v1, v2]);
      continue;
    }

    const x = parseFloat(parts[1]);
    const y = parseFloat(parts[2]);
    const z = parseFloat(parts[3]);
    if (t === "v") {
      model.vertices.push(new Vec3(x, y, z));
    } else if (t === "vt") {
      model.textures.push(new Vec3(x, y, z));
    } else if (t === "vn") {
      model.normals.push(new Vec3(x, y, z));
    }
  }

  return model;
}

export class Model {
  vertices: Array<Vec3>;
  textures: Array<Vec3>;
  normals: Array<Vec3>;
  faces: Array<Array<Array<number>>>;

  constructor(
    vertices: Array<Vec3>,
    textures: Array<Vec3>,
    normals: Array<Vec3>,
    faces: Array<Array<Array<number>>>
  ) {
    this.vertices = vertices;
    this.textures = textures;
    this.normals = normals;
    this.faces = faces;
  }

  getVerticesForFace(face: Array<Array<number>>): Array<Vec3> {
    // The reference doc says we are only interested in the first number for
    // each subarray entry in a face, and that it is one-indexed so we need to
    // subtract one.
    // https://github.com/ssloy/tinyrenderer/wiki/Lesson-1:-Bresenham%E2%80%99s-Line-Drawing-Algorithm#wireframe-rendering
    return face.map((v) => this.vertices[v[0] - 1]);
  }
}
