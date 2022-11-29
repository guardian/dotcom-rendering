import { setCookie } from '@guardian/libs';

import isChromatic from 'chromatic/isChromatic';
import MockDate from 'mockdate';

import { getFontsCss } from './fonts-css';
import { resets } from '@guardian/source-foundations';

if (isChromatic()) {
	// Fix the date to prevent false negatives
	MockDate.set('Sat Jan 1 2022 12:00:00 GMT+0000 (Greenwich Mean Time)');
}

setCookie({ name: 'bwid', value: 'mockBrowserId' });

// Add base css for the site
let css = `${getFontsCss()}${resets.resetCSS}`;
let head = document.getElementsByTagName('head')[0];
let style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(css));

const guardianViewports = {
	mobileMedium: {
		name: 'mobile',
		styles: {
			width: '320px',
			height: '800px',
		},
	},
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

export const viewports = [320, 375, 480, 660, 740, 980, 1140, 1300];

export const parameters = {
	viewport: {
		viewports: guardianViewports,
		defaultViewport: 'wide',
	},
	layout: 'fullscreen',
};
