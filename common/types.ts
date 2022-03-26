// This module defines simple helper types that don't really fit in any other
// module

/**
 * Approximates opaque types with a simple marker
 */
export type Opaque<Inner, Marker> = Inner & { __opaque__: Marker }
