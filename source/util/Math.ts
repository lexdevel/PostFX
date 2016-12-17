/**
 * The math extending interface.
 */
interface Math {

    /**
     * Convert degrees to radians.
     * @param degrees The value in degrees
     */
    toRadians(degrees: number): number;

    /**
     * Convert radians to degrees.
     * @param radians The value in radians
     */
    toDegrees(radians: number): number;
}

Math.toRadians = (degrees: number): number => { return degrees * Math.PI / 180.0; };
Math.toDegrees = (radians: number): number => { return radians * 180.0 / Math.PI; };
