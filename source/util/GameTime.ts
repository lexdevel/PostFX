/**
 * The game time class.
 */
export class GameTime {
    public static initial: number = Date.now();

    /**
     * Constructor.
     * @throws Always throws an exception because of static class.
     */
    constructor() {
        throw new Error("Allowed static usage of class only");
    }

    /**
     * Get the elapsed game time.
     */
    public static elapsed(): number {
        return Date.now() - GameTime.initial;
    }
}
