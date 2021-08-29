import { VertexBuffer } from "../platform/VertexBuffer";
import { ElementArray } from "../platform/ElementArray";

/**
 * The drawable interface.
 */
export interface Drawable {

  /**
   * The vertex buffer.
   */
  vertexBuffer: VertexBuffer;

  /**
   * The element array.
   */
  elementArray: ElementArray;
}
