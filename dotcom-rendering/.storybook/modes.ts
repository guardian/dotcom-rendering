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
	'light mobile': {
		globalColourScheme: 'light',
		viewport: breakpoints.mobile,
	},
	'light mobileMedium': {
		globalColourScheme: 'light',
		viewport: breakpoints.mobileMedium,
	},
	'horizontal tablet': {
		globalColourScheme: 'horizontal',
		viewport: breakpoints.tablet,
	},
	'vertical mobile': {
		globalColourScheme: 'vertical',
		viewport: breakpoints.mobile,
	},
	'vertical mobileMedium': {
		globalColourScheme: 'vertical',
		viewport: breakpoints.mobileMedium,
	},
	'vertical mobileLandscape': {
		globalColourScheme: 'vertical',
		viewport: breakpoints.mobileLandscape,
	},
	'vertical phablet': {
		globalColourScheme: 'vertical',
		viewport: breakpoints.phablet,
	},
	'vertical tablet': {
		globalColourScheme: 'vertical',
		viewport: breakpoints.tablet,
	},
	'vertical desktop': {
		globalColourScheme: 'vertical',
		viewport: breakpoints.desktop,
	},
	'vertical leftCol': {
		globalColourScheme: 'vertical',
		viewport: breakpoints.leftCol,
	},
	'vertical wide': {
		globalColourScheme: 'vertical',
		viewport: breakpoints.wide,
	},
	'light desktop': {
		globalColourScheme: 'light',
		viewport: breakpoints.desktop,
	},
};
