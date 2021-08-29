import { ShaderProgram } from "../platform/ShaderProgram";

/**
 * The renderer class.
 */
export abstract class AbstractRenderer {
  protected shaderProgram: ShaderProgram;
  protected parent: AbstractRenderer;

  /**
   * Constructor.
   * @param shaderProgram The renderer's shader program
   * @param parent The parent renderer
   */
  public constructor(shaderProgram: ShaderProgram, parent: AbstractRenderer = null) {
    this.shaderProgram = shaderProgram;
    this.parent = parent;
  }

  /**
   * Render.
   */
  public abstract render(): void;
}
