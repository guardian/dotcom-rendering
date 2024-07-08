import { boolean, literal, object, picklist, variant } from 'valibot';
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

export const defaultConfig: Config = {
	renderingTarget: 'Web',
	darkModeAvailable: false,
	updateLogoAdPartnerSwitch: false,
	assetOrigin: 'https://assets.guim.co.uk/',
	editionId: 'UK',
};

const assetOrigin = [
	'https://assets.guim.co.uk/',
	'https://assets-code.guim.co.uk/',
	'/',
] as const;

const editionId = ['UK', 'US', 'AU', 'INT', 'EUR'] as const;

const configWebSchema = object({
	renderingTarget: literal('Web'),
	darkModeAvailable: boolean(),
	updateLogoAdPartnerSwitch: boolean(),
	assetOrigin: picklist(assetOrigin),
	editionId: picklist(editionId),
});

const configAppSchema = object({
	renderingTarget: literal('Apps'),
	darkModeAvailable: boolean(),
	updateLogoAdPartnerSwitch: boolean(),
	assetOrigin: picklist(assetOrigin),
	editionId: picklist(editionId),
});

export const configSchema = variant('renderingTarget', [
	configWebSchema,
	configAppSchema,
]);
