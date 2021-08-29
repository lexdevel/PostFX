import { GL } from "../core/GL";
import { AbstractRenderer } from "./AbstractRenderer";
import { ShaderProgram } from "../platform/ShaderProgram";
import { VertexBuffer } from "../platform/VertexBuffer";
import { ElementArray } from "../platform/ElementArray";
import { FrameBuffer } from "../platform/FrameBuffer";
import { Viewport } from "../util/Viewport";
import { GameTime } from "../util/GameTime";
import { Drawable } from "../core/Drawable";

/**
 * The wave renderer shader params interface.
 */
interface WaveRendererShaderParams {
  a_position: number;
  a_texcoord: number;
  u_teximage: WebGLUniformLocation;
  u_time: WebGLUniformLocation;
}

/**
 * The wave renderer (PostFX).
 */
export class Wave extends AbstractRenderer implements Drawable {
  public viewport: Viewport;
  public frameBuffer: FrameBuffer;

  public vertexBuffer: VertexBuffer;
  public elementArray: ElementArray;

  public shaderParams: WaveRendererShaderParams;

  /**
   * Constructor.
   * @param viewport The viewport
   * @param parent The parent renderer
   */
  public constructor(viewport: Viewport, parent: AbstractRenderer = null) {
    super(new ShaderProgram(Wave.vertSource, Wave.fragSource), parent);
    this.viewport = viewport;

    this.vertexBuffer = new VertexBuffer(Wave.vertexBufferData);
    this.elementArray = new ElementArray(Wave.elementArrayData);

    this.frameBuffer = new FrameBuffer(viewport.w, viewport.h);

    this.shaderParams = {
      a_position: GL.getAttribLocation(this.shaderProgram.instance, "a_position"),
      a_texcoord: GL.getAttribLocation(this.shaderProgram.instance, "a_texcoord"),
      u_teximage: GL.getUniformLocation(this.shaderProgram.instance, "u_teximage"),
      u_time: GL.getUniformLocation(this.shaderProgram.instance, "u_time")
    };
  }

  public render(): void {
    let time = GameTime.elapsed();

    this.frameBuffer.attach();
    this.parent.render();
    this.frameBuffer.detach();

    this.shaderProgram.attach();

    GL.enableVertexAttribArray(this.shaderParams.a_position);
    GL.enableVertexAttribArray(this.shaderParams.a_texcoord);

    GL.uniform1f(this.shaderParams.u_time, time / 1000.0);

    this.vertexBuffer.attach();
    GL.vertexAttribPointer(this.shaderParams.a_position, 2, GL.FLOAT, false, 16, 0);
    GL.vertexAttribPointer(this.shaderParams.a_texcoord, 2, GL.FLOAT, false, 16, 8);
    this.vertexBuffer.detach();

    GL.activeTexture(GL.TEXTURE0);
    this.frameBuffer.teximage.attach();
    GL.uniform1i(this.shaderParams.u_teximage, 0);

    this.elementArray.drawElements(6);

    this.frameBuffer.teximage.detach();

    GL.disableVertexAttribArray(this.shaderParams.a_texcoord);
    GL.disableVertexAttribArray(this.shaderParams.a_position);

    this.shaderProgram.detach();
  }

  static vertSource: string = [
    "#ifdef GL_ES",
    "precision mediump float;",
    "#endif // GL_ES\n",

    "attribute  vec2        a_position;",
    "attribute  vec2        a_texcoord;",
    "varying    vec2        v_texcoord;\n",

    "void main() {",
    "    v_texcoord     = a_texcoord;",
    "    gl_Position    = vec4(a_position, 0.0, 1.0);",
    "}\n"
  ].join("\n");
  static fragSource: string = [
    "#ifdef GL_ES",
    "precision mediump float;",
    "#endif // GL_ES\n",

    "#define    PI          3.1415926536\n",

    "varying    vec2        v_texcoord;",
    "uniform    sampler2D   u_teximage;",
    "uniform    float       u_time;\n",

    "void main() {",
    "    vec2 texcoord  = v_texcoord;",
    "    texcoord.x    += sin(texcoord.y * 8.0 * PI + u_time) / 100.0;",
    "    gl_FragColor   = texture2D(u_teximage, texcoord);",
    "}\n"
  ].join("\n");
  static vertexBufferData: number[] = [
    /*  a_position      a_texcoord     */
    -1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
    1.0, -1.0, 1.0, 0.0,
    -1.0, -1.0, 0.0, 0.0
  ];
  static elementArrayData: number[] = [
    0, 1, 2,
    2, 3, 0
  ];
}
