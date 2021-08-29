import { AbstractPlatformEntity } from "./AbstractPlatformEntity";
import { GL } from "../core/GL";

/**
 * The buffer class.
 */
export abstract class Buffer extends AbstractPlatformEntity<WebGLBuffer> {
  protected target: number;

  /**
   * Constructor.
   * @param target The buffer target
   */
  public constructor(target: number) {
    super(GL.createBuffer());
    this.target = target;
  }

  /**
   * Write the specified buffer data to the buffer.
   * @param bufferData The buffer data
   */
  public abstract bufferData(bufferData: number[]);

  public attach(): void { GL.bindBuffer(this.target, this.instance); }
  public detach(): void { GL.bindBuffer(this.target, null); }
}
