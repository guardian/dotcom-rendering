import { brandAlt, neutral } from '@guardian/source-foundations';

type ColorValueHex = `#${string}`;

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
