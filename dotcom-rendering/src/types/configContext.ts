import type { RenderingTarget } from './renderingTarget';

/**
 * Context for global, static, immutable values i.e. application configuration
 *
 * This should not contain any properties which are likely to change between re-renders
 * @see /dotcom-rendering/docs/architecture/proposed-adrs/react-context-api.md
 */
export interface Config {
	renderingTarget: RenderingTarget;
	darkModeAvailable?: true;
}
