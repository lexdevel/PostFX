/**
 * The renderer class.
 */
abstract class AbstractRenderer {
    public shaderProgram: ShaderProgram;
    public parent: AbstractRenderer;

    /**
     * Constructor.
     * @param shaderProgram The renderer's shader program
     */
    public constructor(shaderProgram: ShaderProgram, parent: AbstractRenderer = null) {
        this.shaderProgram = shaderProgram;
        this.parent = parent;
    }

    /**
     * Render.
     */
    public abstract render();
}
