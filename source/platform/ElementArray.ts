/**
 * The element array class.
 */
class ElementArray extends Buffer {
    public length: number = 0;

    /**
     * Constructor.
     * @param bufferData The buffer data
     */
    public constructor(bufferData: number[] = null) {
        super(GL.ELEMENT_ARRAY_BUFFER);
        if (bufferData != null) { this.bufferData(bufferData); }
    }

    /**
     * Write the specified buffer data to the buffer.
     * @param bufferData The buffer data
     */
    public bufferData(bufferData: number[]) {
        this.length = bufferData.length;

        this.attach();
        GL.bufferData(this.target, new Uint16Array(bufferData), GL.STATIC_DRAW);
        this.detach();
    }

    /**
     * Draw elements.
     * @param length The length (count) of the elements
     * @param offset The offset
     */
    public drawElements(length: number = this.length, offset: number = 0): void {
        this.attach();
        GL.drawElements(GL.TRIANGLES, length, GL.UNSIGNED_SHORT, offset);
        this.detach();
    }
}
