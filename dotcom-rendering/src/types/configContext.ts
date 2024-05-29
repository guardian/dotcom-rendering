import type { AssetOrigin } from '../lib/assets';
import type { RenderingTarget } from './renderingTarget';

/**
 * Context for global, static, immutable values i.e. application configuration
 *
 * This should not contain any properties which are likely to change between re-renders
 * @see /dotcom-rendering/docs/architecture/proposed-adrs/react-context-api.md
 */
export type Config =
	| {
			renderingTarget: Extract<RenderingTarget, 'Web'>;
			darkModeAvailable: boolean;
			inAdvertisingPartnerABTest: boolean;
			assetOrigin: AssetOrigin;
	  }
	| {
			renderingTarget: Extract<RenderingTarget, 'Apps'>;
			darkModeAvailable: boolean;
			inAdvertisingPartnerABTest: boolean;
			assetOrigin: AssetOrigin;
	  };
