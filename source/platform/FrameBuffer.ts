/**
 * The framebuffer class.
 */
class FrameBuffer extends AbstractPlatformEntity<WebGLFramebuffer> {
    public teximage: Texture2D;

    public constructor(w: number, h: number) {
        super(GL.createFramebuffer());
        this.teximage = new Texture2D(w, h);

        this.teximage.attach();
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, w, h, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
        this.teximage.detach();

        this.attach();
        GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, this.teximage.instance, 0);
        this.detach();
    }

    public attach(): void { GL.bindFramebuffer(GL.FRAMEBUFFER, this.instance); }
    public detach(): void { GL.bindFramebuffer(GL.FRAMEBUFFER, null); }
}
