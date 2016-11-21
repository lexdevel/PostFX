/**
 * The vertex buffer class.
 */
class VertexBuffer extends Buffer {

    /**
     * Constructor.
     */
    public constructor(bufferData: number[] = null) {
        super(GL.ARRAY_BUFFER);
        if (bufferData != null) { this.bufferData(bufferData); }
    }

    /**
     * Write the specified buffer data to the buffer.
     * @param bufferData The buffer data
     */
    public bufferData(bufferData: number[]) {
        this.attach();
        GL.bufferData(this.target, new Float32Array(bufferData), GL.STATIC_DRAW);
        this.detach();
    }
}
