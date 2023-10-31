import { CanvasWrapper, Point, Color } from "./canvas_wrapper";
import { loadModel } from "./model_loader";

async function render() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas.getContext) {
    throw new Error("Canvas not supported");
  }

  const w = new CanvasWrapper(canvas);
  w.useContextAPI = true;
  w.clear();

  const model = await loadModel(`${window.location.href}african_head.obj`);

  const start = performance.now();
  for (let i = 0; i < model.faces.length; i++) {
    const vertices = model.getVerticesForFace(model.faces[i]);
    for (let j = 0; j < 3; j++) {
      const v0 = vertices[j];
      const v1 = vertices[(j + 1) % 3];
      try {
        const x0 = (v0.x * w.canvas.width) / 2;
        const y0 = (v0.y * w.canvas.height) / 2;
        const x1 = (v1.x * w.canvas.width) / 2;
        const y1 = (v1.y * w.canvas.height) / 2;
        w.drawLine(
          new Point(x0, y0),
          new Point(x1, y1),
          new Color(0, 0, 0, 255)
        );
      } catch (e) {
        console.log(v0, v1);
        console.error(e);
      }
    }
  }
  const end = performance.now();
  console.log(`Took ${end - start}ms`);
}

// Add hook to the render button.
const renderButton = document.getElementById("render")! as HTMLButtonElement;
renderButton.addEventListener("click", render);

// But.. let's render at start anyways.
render();
