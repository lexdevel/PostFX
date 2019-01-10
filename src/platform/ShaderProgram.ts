import { AbstractPlatformEntity }   from "./AbstractPlatformEntity";
import { GL }                       from "../core/GL";

/**
 * The shader program class.
 */
export class ShaderProgram extends AbstractPlatformEntity<WebGLProgram> {

    /**
     * Constructor.
     * @param vertSource The source code of the vert shader
     * @param fragSource The source code of the frag shader
     */
    public constructor(vertSource: string, fragSource: string) {
        super(GL.createProgram());

        let vert = GL.createShader(GL.VERTEX_SHADER);
        let frag = GL.createShader(GL.FRAGMENT_SHADER);

        GL.shaderSource(vert, vertSource);
        GL.shaderSource(frag, fragSource);

        GL.compileShader(vert);
        GL.compileShader(frag);

        GL.attachShader(this.instance, vert);
        GL.attachShader(this.instance, frag);

        GL.linkProgram(this.instance);

        GL.deleteShader(frag);
        GL.deleteShader(vert);
    }

    public attach(): void { GL.useProgram(this.instance); }
    public detach(): void { GL.useProgram(null); }
}
