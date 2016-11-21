/**
 * The abstract platform entity class.
 */
abstract class AbstractPlatformEntity<T> implements Attachable {
    public instance: T;

    /**
     * Constructor.
     * @param instance The native platform entity instance
     */
    public constructor(instance: T) {
        this.instance = instance;
    }

    public abstract attach(): void;
    public abstract detach(): void;
}
