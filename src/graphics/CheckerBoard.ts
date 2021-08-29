import { GL } from "../core/GL";
import { AbstractRenderer } from "./AbstractRenderer";
import { ShaderProgram } from "../platform/ShaderProgram";
import { VertexBuffer } from "../platform/VertexBuffer";
import { ElementArray } from "../platform/ElementArray";
import { Viewport } from "../util/Viewport";
import { Drawable } from "../core/Drawable";

/**
 * The checkerboard renderer shader params interface.
 */
interface CheckerBoardRendererShaderParams {
  a_position: number;
  u_resolution: WebGLUniformLocation;
}

/**
 * The checkerboard renderer.
 */
export class CheckerBoard extends AbstractRenderer implements Drawable {
  public viewport: Viewport;

  public vertexBuffer: VertexBuffer;
  public elementArray: ElementArray;

  public shaderParams: CheckerBoardRendererShaderParams;

  /**
   * Constructor.
   * @param viewport The viewport
   * @param parent The parent renderer
   */
  public constructor(viewport: Viewport, parent: AbstractRenderer = null) {
    super(new ShaderProgram(CheckerBoard.vertSource, CheckerBoard.fragSource), parent);
    this.viewport = viewport;

    this.vertexBuffer = new VertexBuffer(CheckerBoard.vertexBufferData);
    this.elementArray = new ElementArray(CheckerBoard.elementArrayData);

    this.shaderParams = {
      a_position: GL.getAttribLocation(this.shaderProgram.instance, "a_position"),
      u_resolution: GL.getUniformLocation(this.shaderProgram.instance, "u_resolution")
    };
  }

  public render(): void {
    this.shaderProgram.attach();

    GL.enableVertexAttribArray(this.shaderParams.a_position);

    GL.uniform2f(this.shaderParams.u_resolution, this.viewport.w, this.viewport.h);

    this.vertexBuffer.attach();
    GL.vertexAttribPointer(this.shaderParams.a_position, 2, GL.FLOAT, false, 0, 0);
    this.vertexBuffer.detach();

    this.elementArray.drawElements(6);

    GL.disableVertexAttribArray(this.shaderParams.a_position);

    this.shaderProgram.detach();
  }

  static vertSource: string = [
    "#ifdef GL_ES",
    "precision mediump float;",
    "#endif // GL_ES\n",

    "attribute   vec2        a_position;\n",

    "void main() {",
    "    gl_Position     = vec4(a_position, 0.0, 1.0);",
    "}\n"
  ].join("\n");
  static fragSource: string = [
    "#ifdef GL_ES",
    "precision mediump float;",
    "#endif // GL_ES\n",

    "uniform     vec2        u_resolution;\n",

    "float checkerboard(in vec2 position) {",
    "    return mod(floor(position.x) + floor(position.y), 2.0);",
    "}\n",

    "void main() {",
    "    vec2 position   = gl_FragCoord.xy / u_resolution.x;",
    "    vec2 uv         = position * 8.0;",
    "    float s         = checkerboard(uv) - 0.16;",
    "    gl_FragColor    = vec4(vec3(length(s)), 1.0);",
    "}\n"
  ].join("\n");
  static vertexBufferData: number[] = [
    -1.0, 1.0,
    1.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0
  ];
  static elementArrayData: number[] = [
    0, 1, 2,
    2, 3, 0
  ];
}
