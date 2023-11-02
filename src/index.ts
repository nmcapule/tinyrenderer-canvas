import { CanvasWrapper } from "./canvas_wrapper";
import { Model, loadModel } from "./model_loader";
import { Vec2, Vec3, Color } from "./primitives";

async function render(
  w: CanvasWrapper,
  models: Array<Model>,
  lightDir: Vec3 = new Vec3(0, 0, -1)
) {
  const start = performance.now();
  for (const model of models) {
    for (const face of model.faces) {
      const vertices = model.getVerticesForFace(face);
      const points = vertices.map((v) =>
        Vec2.fromObject({
          x: (v.x * w.canvas.width) / 2,
          y: (v.y * w.canvas.height) / 2,
        })
      );

      const normal = vertices[2]
        .sub(vertices[0])
        .cross(vertices[1].sub(vertices[0]))
        .unit();
      const intensity = normal.dot(lightDir);
      if (intensity < 0) {
        continue;
      }
      const color = new Color(
        intensity * 255,
        intensity * 255,
        intensity * 255,
        255
      );

      w.drawBarycentricTriangle(points[0], points[1], points[2], color);
    }
  }
  const end = performance.now();
  console.log(`Took ${end - start}ms`);
}

async function init() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas.getContext) {
    throw new Error("Canvas not supported");
  }

  const w = new CanvasWrapper(canvas);
  w.useContextAPI = true;
  w.clear();

  const model = await loadModel(`${window.location.href}african_head.obj`);

  canvas.addEventListener("mousemove", (event) => {
    const lightDir = new Vec3(
      -event.x / canvas.height + 0.5,
      event.y / canvas.height - 0.5,
      -1
    );
    render(w, [model], lightDir);
  });

  function animate(t: number) {
    const lightDir = new Vec3(
      Math.cos(t / 1000) / 4,
      Math.sin(t / 1000) / 4,
      -1
    );
    render(w, [model], lightDir);
    window.requestAnimationFrame(animate);
  }
  window.requestAnimationFrame(animate);
}

init();
