import { AbstractPlatformEntity } from "./AbstractPlatformEntity";
import { Texture2D } from "./Texture2D";
import { GL } from "../core/GL";

/**
 * The framebuffer class.
 */
export class FrameBuffer extends AbstractPlatformEntity<WebGLFramebuffer> {
  public teximage: Texture2D;

  /**
   * Constructor.
   * @param w The width
   * @param h The height
   */
  public constructor(w: number, h: number) {
    super(GL.createFramebuffer());

    this.teximage = new Texture2D();
    this.teximage.texImage2D(w, h, null);

    this.attach();
    GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, this.teximage.instance, 0);
    this.detach();
  }

  public attach(): void { GL.bindFramebuffer(GL.FRAMEBUFFER, this.instance); }
  public detach(): void { GL.bindFramebuffer(GL.FRAMEBUFFER, null); }
}
