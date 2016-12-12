import { AbstractPlatformEntity }   from "./AbstractPlatformEntity";
import { GL }                       from "../core/GL";

/**
 * The 2D texture class.
 */
export class Texture2D extends AbstractPlatformEntity<WebGLTexture> {

    /**
     * Constructor.
     * @param filter The filter
     * @param wrap The wrap
     */
    public constructor(filter: number = GL.LINEAR, wrap: number = GL.CLAMP_TO_EDGE) {
        super(GL.createTexture());

        this.attach();
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, filter);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, filter);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, wrap);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, wrap);
        this.detach();
    }

    /**
     * Specify a two-dimensional texture image.
     * @param w The width
     * @param h The height
     * @param pixels The pixels
     */
    public texImage2D(w: number, h: number, pixels: ArrayBufferView = null): void {
        this.attach();
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, w, h, 0, GL.RGBA, GL.UNSIGNED_BYTE, pixels);
        this.detach();
    }

    public attach(): void { GL.bindTexture(GL.TEXTURE_2D, this.instance); }
    public detach(): void { GL.bindTexture(GL.TEXTURE_2D, null); }
}
