import { breakpoints } from '@guardian/source/foundations';

export const allModes = {
	light: {
		globalColourScheme: 'light',
	},
	dark: {
		globalColourScheme: 'dark',
	},
	splitHorizontal: {
		globalColourScheme: 'horizontal',
	},
	splitVertical: {
		globalColourScheme: 'vertical',
	},
	'light mobileMedium': {
		globalColourScheme: 'light',
		viewport: breakpoints.mobileMedium,
	},
	'horizontal tablet': {
		globalColourScheme: 'horizontal',
		viewport: breakpoints.tablet,
	},
};
