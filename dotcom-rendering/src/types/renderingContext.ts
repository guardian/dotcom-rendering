import type { RenderingTarget } from './renderingTarget';

/**
 * Context for global values (generic)
 *
 * Do not add properties which are likely to change between re-renders
 * @see /dotcom-rendering/docs/architecture/proposed-adrs/react-context-api.md
 */
export interface RenderingContextType {
	target: RenderingTarget;
}

/**
 * Enhanced context based on provided values, making assertions easier
 */
export interface EnhancedRenderingContextType extends RenderingContextType {
	isApps: boolean;
	isWeb: boolean;
}
