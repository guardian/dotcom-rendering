import type { CrosswordProps } from '@guardian/react-crossword';
import { CrosswordComponent } from '../components/CrosswordComponent.island';

/**
 * Maps a `GameConfig.componentKey` (for `renderMode: 'component'` games) to
 * the React component responsible for rendering it.
 *
 * Only `"crossword"` is mapped in this phase, reusing the existing
 * `CrosswordComponent.island.tsx` as-is (it is not forked or modified).
 */
export const gameComponents = {
	crossword: CrosswordComponent,
} as const;

export type GameComponentKey = keyof typeof gameComponents;

export const isGameComponentKey = (
	componentKey: string | undefined,
): componentKey is GameComponentKey =>
	!!componentKey && componentKey in gameComponents;

export type { CrosswordProps };
