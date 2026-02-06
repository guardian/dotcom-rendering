import { isUndefined } from '@guardian/libs';
import { createContext, useContext } from 'react';
import type { Palette } from '../types/palette';

/**
 * Context to store current colour palette. This is used to 'diff' format
 * boundary palette updates so we don't output the entire palette each time when
 * only a few colours have changed.
 *
 * It is deliberately set with a default context of `undefined` to better
 * surface errors relating to incorrect usage.
 *
 * It is deliberately not exported
 * @see https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
const PaletteContext = createContext<Palette | undefined>(undefined);

export const PaletteProvider = ({
	value,
	children,
}: {
	value: Palette;
	children: React.ReactNode;
}) => (
	<PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
);

/**
 * `useContext` hook for safely fetching current palette, ensuring it is used
 * within the relevant content provider
 */
export const usePalette = (): Palette => {
	const context = useContext(PaletteContext);

	if (isUndefined(context)) {
		throw Error(
			'usePalette must be used within the PaletteContext provider',
		);
	}

	return context;
};
