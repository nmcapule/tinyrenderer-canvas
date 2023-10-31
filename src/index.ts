import { CanvasWrapper } from "./canvas_wrapper";
import { loadModel } from "./model_loader";
import { Vec2, Color } from "./primitives";

async function render(w: CanvasWrapper) {
  const model = await loadModel(`${window.location.href}african_head.obj`);

  const start = performance.now();
  for (let i = 0; i < model.faces.length; i++) {
    const vertices = model.getVerticesForFace(model.faces[i]);
    const points = vertices.map((v) =>
      Vec2.fromObject({
        x: (v.x * w.canvas.width) / 2,
        y: (v.y * w.canvas.height) / 2,
      })
    );

    const cross = vertices[2].cross(vertices[1]).unit();
    const color = new Color(cross.x * 255, cross.y * 255, cross.z * 255, 255);

    w.drawFilledTriangle(points[0], points[1], points[2], color);
  }
  const end = performance.now();
  console.log(`Took ${end - start}ms`);
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
if (!canvas.getContext) {
  throw new Error("Canvas not supported");
}

const w = new CanvasWrapper(canvas);
w.useContextAPI = true;
w.clear();

// Add hook to the render button.
const renderButton = document.getElementById("render")! as HTMLButtonElement;
renderButton.addEventListener("click", () => render(w));
// But.. let's render at start anyways.
render(w);
