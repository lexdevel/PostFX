/**
 * The 2D texture class.
 */
class Texture2D extends AbstractPlatformEntity<WebGLTexture> {

    /**
     * Constructor.
     * @param w
     * @param h
     */
    public constructor(w: number, h: number) {
        super(GL.createTexture());

        this.attach();
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
        this.detach();
    }

    public attach(): void { GL.bindTexture(GL.TEXTURE_2D, this.instance); }
    public detach(): void { GL.bindTexture(GL.TEXTURE_2D, null); }
}
