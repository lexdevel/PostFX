import { GL }           from "./core/GL";
import { Viewport }     from "./util/Viewport";
import { CheckerBoard } from "./graphics/CheckerBoard";
import { Wave }         from "./graphics/Wave";

/**
 * Application entry point.
 */
window.addEventListener("load", (): void => {
    let viewport: Viewport = { w: GL.drawingBufferWidth, h: GL.drawingBufferHeight };
    let postfx             = false;

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
