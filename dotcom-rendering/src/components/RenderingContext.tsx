import { createContext, useContext } from 'react';
import type {
	RenderingContextType,
	RenderingTargetContextType,
} from '../types/renderingContext';

/** Represents the initial or default value for the app context */
const defaultContext: RenderingContextType = {
	target: 'Web',
};

/**
 * Context for global, static values (generic)
 *
 * This should not contain anything which will change between re-renders
 */
export const RenderingContext =
	createContext<RenderingContextType>(defaultContext);

/**
 * useContext hook for rendering target details
 *
 * @example
 * const { isWeb } = useRenderingTarget();
 *
 *	if (isWeb) {
 * 	...
 *  } else {
 *  ...
 *  }
 *
 */
export const useRenderingTarget = (): RenderingTargetContextType => {
	const context = useContext(RenderingContext);

	if (context === undefined) {
		throw Error(
			'useRenderingTarget must be used within the RenderingContext provider',
		);
	}

	const { target } = context;

	const renderingTarget = {
		target,
		isWeb: target === 'Web',
		isApps: target === 'Apps',
	};

	return renderingTarget;
};
