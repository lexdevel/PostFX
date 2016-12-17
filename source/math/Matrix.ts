/**
 * The matrix class for WebGL transformations.
 */
export class Matrix {
    public elements: number[];

    /**
     * Constructor.
     */
    public constructor() {
        this.elements = [
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0
        ];
    }

    /**
     * Create the identity matrix.
     */
    public static identity(): Matrix {
        let matrix = new Matrix();

        matrix.elements[0 + 0 * 4] = 1.0;
        matrix.elements[1 + 1 * 4] = 1.0;
        matrix.elements[2 + 2 * 4] = 1.0;
        matrix.elements[3 + 3 * 4] = 1.0;

        return matrix;
    }

    /**
     * Create the translation matrix.
     * @param x
     * @param y
     */
    public static move(x: number, y: number): Matrix {
        let matrix = Matrix.identity();

        matrix.elements[0 + 3 * 4] = x;
        matrix.elements[1 + 3 * 4] = y;

        return matrix;
    }

    /**
     * Create the rotation matrix.
     * @param rotation The rotation angle in degrees
     */
    public static rotate(rotation: number): Matrix {
        let matrix = Matrix.identity();

        let rad = Math.toRadians(rotation);
        let sin = Math.sin(rad);
        let cos = Math.cos(rad);

        matrix.elements[0 + 0 * 4] =  cos;
        matrix.elements[1 + 0 * 4] = -sin;
        matrix.elements[0 + 1 * 4] =  sin;
        matrix.elements[1 + 1 * 4] =  cos;

        return matrix;
    }

    /**
     * Create the scale matrix.
     * @param w
     * @param h
     */
    public static resize(w: number, h: number): Matrix {
        let matrix = Matrix.identity();

        matrix.elements[0 + 0 * 4] = w;
        matrix.elements[1 + 1 * 4] = h;

        return matrix;
    };

    /**
     * Create the orthographic projection matrix.
     * @param left
     * @param right
     * @param bottom
     * @param top
     */
    public static orthographic(left: number, right: number, bottom: number, top: number): Matrix {
        let matrix = Matrix.identity();

        matrix.elements[0 + 0 * 4] = 2.0 / (right - left);
        matrix.elements[1 + 1 * 4] = 2.0 / (top - bottom);

        matrix.elements[0 + 3 * 4] = (left + right) / (left - right);
        matrix.elements[1 + 3 * 4] = (top + bottom) / (bottom - top);

        return matrix;
    }

    public multiply(matrix: Matrix): Matrix {
        let result = new Matrix();

        for (let y = 0; y < 4; ++y) {
            for (let x = 0; x < 4; ++x) {
                for (let e = 0; e < 4; ++e) {
                    result.elements[x + y * 4] += this.elements[x + e * 4] * matrix.elements[e + y * 4];
                }
            }
        }

        return result;
    }
}
