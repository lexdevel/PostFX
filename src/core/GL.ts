/**
 * The WebGL rendering context global instance.
 */
export declare var GL: WebGLRenderingContext;

window.addEventListener("load", (): void => {
  let canvas = <HTMLCanvasElement>document.getElementById("canvas");
  GL = canvas.getContext("webgl");

  GL.disable(GL.DEPTH_TEST); // Disable the depth test (no need for 2D)
  GL.enable(GL.BLEND); // Enable the blend (alpha-channel for transparency support)
  GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA); // Setup the blend function
  GL.enable(GL.CULL_FACE); // Enable the face culling (to draw elements from one side only / both)
  GL.cullFace(GL.FRONT); // Setup the face culling (to draw elements from back side only)
});
