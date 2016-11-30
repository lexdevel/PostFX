/**
 * The attachable interface.
 */
export interface Attachable {
    
    /**
     * Attach the specified attachable.
     */
    attach(): void;
    
    /**
     * Detach the specified attachable.
     */
    detach(): void;
}
