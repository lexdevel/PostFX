/**
 * The math extending interface.
 */
export class MathHelper {

    /**
     * Convert degrees to radians.
     * @param degrees The value in degrees
     */
    public static toRadians(degrees: number): number {
        return degrees * Math.PI / 180.0;
    }

    /**
     * Convert radians to degrees.
     * @param radians The value in radians
     */
    public static toDegrees(radians: number): number {
        return radians * 180.0 / Math.PI;
    }
}
