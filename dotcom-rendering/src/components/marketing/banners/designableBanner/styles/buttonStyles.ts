/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/styles/buttonStyles.ts
 */
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ThemeButton } from '@guardian/source/dist/react-components';
import { from, until } from '@guardian/source/foundations';
import type { CtaSettings } from '../settings';

export function buttonThemes(
	settings: CtaSettings,
	ctaSettingsType?: string,
): Partial<ThemeButton> {
	if (ctaSettingsType === 'secondary') {
		return {
			textSecondary: settings.default.textColour,
			backgroundSecondary: settings.default.backgroundColour,
		};
	}
	if (ctaSettingsType === 'tertiary') {
		return {
			textTertiary: settings.default.textColour,
			backgroundTertiary: settings.default.backgroundColour,
		};
	}

	return {
		textPrimary: settings.default.textColour,
		backgroundPrimary: settings.default.backgroundColour,
	};
}

export function buttonStyles(
	settings: CtaSettings,
	cssOverrides?: SerializedStyles,
): SerializedStyles {
	const { default: defaultSettings, mobile, desktop } = settings;

	return css`
		${toCssString(defaultSettings)};

		${until.tablet} {
			${mobile ? toCssString(mobile) : ''};
		}

		${from.tablet} {
			${desktop ? toCssString(desktop) : ''};
		}

		${cssOverrides};
	`;
}

// ---- Helpers ---- //

function toCssString(cssProps: Record<string, string>) {
	return Object.entries(cssProps).map(
		([prop, val]) => `${toCssProp(prop)}: ${val};`,
	);
}

function toCssProp(prop: string) {
	return CSS_PROPERTY_NAME_SUBSTITUTIONS.get(prop) ?? prop;
}

const CSS_PROPERTY_NAME_SUBSTITUTIONS = new Map<string, string>([
	['textColour', 'color'],
	['backgroundColour', 'background-color'],
]);
