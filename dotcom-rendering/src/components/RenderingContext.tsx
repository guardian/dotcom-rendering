import { createContext, useContext } from 'react';
import type {
	EnhancedRenderingContextType,
	RenderingContextType,
} from '../types/renderingContext';

/**
 * Context for global, static values (generic)
 *
 * This should not contain anything which will change between re-renders.
 * It is deliberately set with a default context of `undefined` to better
 * surface errors relating to incorrect usage.
 *
 * It is deliberately not exported
 * @see https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
const RenderingContext = createContext<RenderingContextType | undefined>(
	undefined,
);

/**
 * useContext hook for safely fetching the rendering context value
 * Ensures that it is used within a relevant Context.Provider
 *
 * @example
 * const { isWeb } = useRenderingContext();
 *
 *	if (isWeb) {
 * 	...
 *  } else {
 *  ...
 *  }
 */
export const useRenderingContext = (): EnhancedRenderingContextType => {
	const context = useContext(RenderingContext);

	if (context === undefined) {
		throw Error(
			'useRenderingContext must be used within the RenderingContext provider',
		);
	}

	const { target } = context;

	return {
		target,
		isWeb: target === 'Web',
		isApps: target === 'Apps',
	};
};
