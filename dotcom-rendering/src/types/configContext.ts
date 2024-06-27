import type { AssetOrigin } from '../lib/assets';
import type { EditionId } from '../lib/edition';
import type { RenderingTarget } from './renderingTarget';

/**
 * Context for global, static, immutable values i.e. application configuration
 *
 * This should not contain any properties which are likely to change between re-renders
 * @see /dotcom-rendering/docs/architecture/proposed-adrs/react-context-api.md
 */
export type Config =
	| Readonly<{
			renderingTarget: Extract<RenderingTarget, 'Web'>;
			darkModeAvailable: boolean;
			updateLogoAdPartnerSwitch: boolean;
			assetOrigin: AssetOrigin;
			editionId: EditionId;
	  }>
	| Readonly<{
			renderingTarget: Extract<RenderingTarget, 'Apps'>;
			darkModeAvailable: boolean;
			updateLogoAdPartnerSwitch: boolean;
			assetOrigin: AssetOrigin;
			editionId: EditionId;
	  }>;
