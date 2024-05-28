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
	'dark mobile': {
		globalColourScheme: 'dark',
		viewport: breakpoints.mobile,
	},
};
