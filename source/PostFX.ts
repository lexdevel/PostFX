/**
 * Application entry point.
 */
window.addEventListener("load", (): void => {
    let canvas = <HTMLCanvasElement>document.getElementById("canvas");
    GL = canvas.getContext("experimental-webgl");

    let viewport: Viewport = { w: GL.drawingBufferWidth, h: GL.drawingBufferHeight };
    let postfx = false;

    // Initialize WebGL
    GL.disable(GL.DEPTH_TEST);                          // Disable the depth test (no need for 2D)
    GL.enable(GL.BLEND);                                // Enable the blend (alpha-channel for transparency support)
    GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA); // Setup the blend function
    GL.enable(GL.CULL_FACE);                            // Enable the face culling (to draw elements from one side only / both)
    GL.cullFace(GL.FRONT);                              // Setup the face culling (to draw elements from back side only)
    // GL.viewport(0, 0, viewport.w, viewport.h);          // Setup viewport (commented because of issue with clipping in browsers)

    // Initialize the renderers
    let checkerBoard  = new CheckerBoard(viewport, null);
    let wave          = new Wave(viewport, checkerBoard);

    /**
     * The main loop function. 
     */
    let loop = (): void => {
        // Request the next animation frame to continue the main loop.
        window.requestAnimationFrame(loop);

        GL.clearColor(0.4, 0.6, 0.8, 1.0);
        GL.clear(GL.COLOR_BUFFER_BIT);

        if (postfx) {
            wave.render();
        } else {
            checkerBoard.render();
        }

        // GL.flush();
    };

    document.getElementById("postfx_state").addEventListener("change", (): void => {
        postfx = !postfx;
        // console.log("PostFX state changed to " + (postfx ? "true" : "false"));
    });

    // Request the first animation frame to start the main loop.
    window.requestAnimationFrame(loop);
});
