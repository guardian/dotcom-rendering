import type { RenderingTarget } from './renderingTarget';

/**
 * Context for global values (generic)
 *
 * This should not contain any properties which are likely to change between re-renders
 */
export interface RenderingContextType {
	target: RenderingTarget;
}

/**
 * Context for rendering target, specifically
 */
export interface RenderingTargetContextType {
	target: RenderingTarget;
	isApps: boolean;
	isWeb: boolean;
}
