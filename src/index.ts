import { CanvasWrapper } from "./canvas_wrapper";
import { drawTestFilledTriangles } from "./examples";

function render() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas.getContext) {
    throw new Error("Canvas not supported");
  }

  const w = new CanvasWrapper(canvas);
  // w.useContextAPI = true;
  w.clear();

  const start = performance.now();
  drawTestFilledTriangles(w);
  const end = performance.now();
  console.log(`Took ${end - start}ms`);
}

// Add hook to the render button.
const renderButton = document.getElementById("render")! as HTMLButtonElement;
renderButton.addEventListener("click", render);

// But.. let's render at start anyways.
render();
