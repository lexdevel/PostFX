class GameTime {
    public static initial: number = Date.now();

    public static elapsed(): number {
        return Date.now() - GameTime.initial;
    }
}
