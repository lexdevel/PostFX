import { Attachable } from "../core/Attachable";

/**
 * The abstract platform entity class.
 */
export abstract class AbstractPlatformEntity<T> implements Attachable {
  public instance: T;

  /**
   * Constructor.
   * @param instance The native platform entity instance
   */
  protected constructor(instance: T) {
    this.instance = instance;
  }

  public abstract attach(): void;
  public abstract detach(): void;
}
