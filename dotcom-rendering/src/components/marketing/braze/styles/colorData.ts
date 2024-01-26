import { brandAlt, neutral } from '@guardian/source-foundations';

type ColorValueHex = `#${string}`;

const colorValueHexRegex = new RegExp(/^#([A-Fa-f0-9]{6})$/);

const stringIsColorValueHex = (x: string): x is ColorValueHex => {
	return colorValueHexRegex.test(x);
};

const buttonStyles = {
	textPrimary: neutral[7],
	backgroundPrimary: brandAlt[400],
	backgroundPrimaryHover: brandAlt[300],
	textSecondary: neutral[7],
	backgroundSecondary: neutral[93],
	backgroundSecondaryHover: neutral[86],
	borderSecondary: neutral[86],
};

export const contributionsTheme = {
	button: buttonStyles,
	link: buttonStyles,
};

export interface LoadingDotsColorStyles {
	styleReminderAnimation: ColorValueHex;
}

export interface PrimaryButtonColorStyles {
	styleButton: ColorValueHex;
	styleButtonBackground: ColorValueHex;
	styleButtonHover: ColorValueHex;
}

export interface ReminderButtonColorStyles extends LoadingDotsColorStyles {
	styleReminderButton: ColorValueHex;
	styleReminderButtonBackground: ColorValueHex;
	styleReminderButtonHover: ColorValueHex;
}

export interface BannerCopyColorStyles {
	styleBackground: ColorValueHex;
	styleHeader: ColorValueHex;
	styleBody: ColorValueHex;
	styleHighlight: ColorValueHex;
	styleHighlightBackground: ColorValueHex;
	styleClose: ColorValueHex;
	styleCloseBackground: ColorValueHex;
	styleCloseHover: ColorValueHex;
}

export interface BannerColorStyles
	extends BannerCopyColorStyles,
		PrimaryButtonColorStyles {}

export interface StyleableBannerColorStyles
	extends ReminderButtonColorStyles,
		PrimaryButtonColorStyles,
		BannerCopyColorStyles {}

// This will become an interface once we build a more generic newsletter epic with limited styling around the newsletter 1-click signup button
export type EpicColorStyles = ReminderButtonColorStyles;

interface AllAvailableColorStyles
	extends LoadingDotsColorStyles,
		ReminderButtonColorStyles,
		PrimaryButtonColorStyles,
		BannerColorStyles,
		EpicColorStyles {}

type ColorStylesType = keyof AllAvailableColorStyles;

export type Extras = Record<string, ColorValueHex | string>;

export function getColors<
	T extends Partial<Record<ColorStylesType, ColorValueHex>>,
>(userVals: Extras, defaults: T): T {
	const style: T = Object.assign({}, defaults);
	const defKeys = Object.keys(defaults) as ColorStylesType[];

	for (const key of defKeys) {
		const userVal = userVals[key];

		// If user val is undefined, or an empty string, use default val
		if (userVal == null || !userVal.length) {
			continue;
		}

		// Protect against CSS injection
		const item = userVal.split(';')[0]?.trim();

		// Protect against null or empty user strings
		if (!item) {
			continue;
		}

		// Check for legitimate CSS color string values
		// - we only support `#abcdef` color format
		if (stringIsColorValueHex(item)) {
			style[key] = item;
		}
	}

	return style;
}
