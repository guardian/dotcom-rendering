import { createContext } from 'react';

/**
 * Context to track the depth of islands in the component tree. This is used to
 * prevent wrapping nested islands with `gu-island` and hydrating child islands
 * separately from their parent. When islands are nested the parent island is
 * responsible for hydrating the entire subtree.
 */
export const IslandDepthContext = createContext<number>(0);
