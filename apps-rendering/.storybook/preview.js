import { setCookie } from '@guardian/libs';

import isChromatic from 'chromatic/isChromatic';
import MockDate from 'mockdate';

if (isChromatic()) {
	// Fix the date to prevent false negatives
	MockDate.set('Sat Jan 1 2022 12:00:00 GMT+0000 (Greenwich Mean Time)');
}

setCookie({ name: 'bwid', value: 'mockBrowserId' });

const guardianViewports = {
	mobileMedium: {
		name: 'mobileMedium',
		styles: {
			width: '375px',
			height: '800px',
		},
	},
	mobileLandscape: {
		name: 'mobileLandscape',
		styles: {
			width: '480px',
			height: '800px',
		},
	},
	phablet: {
		name: 'phablet',
		styles: {
			width: '660px',
			height: '800px',
		},
	},
	tablet: {
		name: 'tablet',
		styles: {
			width: '740px',
			height: '800px',
		},
	},
	desktop: {
		name: 'desktop',
		styles: {
			width: '980px',
			height: '800px',
		},
	},
	leftCol: {
		name: 'leftCol',
		styles: {
			width: '1140px',
			height: '800px',
		},
	},
	wide: {
		name: 'wide',
		styles: {
			width: '1300px',
			height: '800px',
		},
	},
};

export const viewports = [375, 480, 660, 740, 980, 1140, 1300];

export const parameters = {
	viewport: {
		viewports: guardianViewports,
		defaultViewport: 'wide',
	},
	layout: 'fullscreen',
};
