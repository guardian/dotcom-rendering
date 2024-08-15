/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/styles/buttonStyles.ts
 */
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import type { CtaSettings } from '../settings';

export function buttonStyles(
	settings: CtaSettings,
	cssOverrides?: SerializedStyles,
): SerializedStyles {
	const { default: defaultSettings, mobile, desktop, hover } = settings;

	return css`
		${toCssString(defaultSettings)};

		${until.tablet} {
			${mobile ? toCssString(mobile) : ''};
		}

		${from.tablet} {
			${desktop ? toCssString(desktop) : ''};
		}

		&:hover {
			${toCssString(hover)}
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
