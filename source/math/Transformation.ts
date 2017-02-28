import { Matrix }   from "./Matrix";
import { Vec2 }     from "./Vec2";
import { Size }     from "./Size";

/**
 * The transformation class.
 */
export class Transformation {
    public position: Vec2;
    public rotation: number;
    public size: Size;

    /**
     * Constructor.
     * @param position The position
     * @param rotation The rotation
     * @param size The size
     */
    public constructor(position: Vec2, rotation = 0.0, size: Size = { w: 1.0, h: 1.0 }) {
        this.position = position;
        this.rotation = rotation;
        this.size = size;
    }

    /**
     * Calculate the transformation matrix.
     */
    public calcTransformationMatrix(): Matrix {
        return Matrix.identity()
            .multiply(Matrix.translate(this.position.x, this.position.y))
            .multiply(Matrix.rotate(this.rotation))
            .multiply(Matrix.scale(this.size.w, this.size.h));
    }
}
