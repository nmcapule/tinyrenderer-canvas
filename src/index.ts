import { CanvasWrapper, Point, Color } from "./canvas_wrapper";
import { drawTestRandomFilledTriangles } from "./examples";

async function loadModel(url: string) {
  const response = await fetch(new URL(url));
  const payload = await response.text();

  const object = {
    v: [],
    vt: [],
    vn: [],
    f: [],
  };

  for (const line of payload.split("\n")) {
    const parts = line.split(" ");
    if (!["v", "vt", "vn", "f"].includes(parts[0])) {
      continue;
    }
    const t = parts[0];
    const x = parseFloat(parts[1]);
    const y = parseFloat(parts[2]);
    const z = parseFloat(parts[3]);
    object[t].push([x, y, z]);
  }

  return object;
}

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
  for (let i = 0; i < model["f"].length; i++) {
    const face = model["f"][i];
    for (let j = 0; j < 3; j++) {
      const v0 = model["v"][face[j]];
      const v1 = model["v"][face[(j + 1) % 3]];
      try {
        const x0 = ((v0[0] + 1) * w.canvas.width) / 2;
        const y0 = ((v0[1] + 1) * w.canvas.height) / 2;
        const x1 = ((v1[0] + 1) * w.canvas.width) / 2;
        const y1 = ((v1[1] + 1) * w.canvas.height) / 2;
        w.drawLine(
          new Point(x0, canvas.height - y0),
          new Point(x1, canvas.height - y1),
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
