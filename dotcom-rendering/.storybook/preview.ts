import { setCookie, storage } from '@guardian/libs';
import { AB } from '@guardian/ab-core';

import isChromatic from 'chromatic/isChromatic';
import MockDate from 'mockdate';

import { fontsCss } from '../src/lib/fonts-css';
import { resets } from '@guardian/source/foundations';

import { Lazy } from '../src/components/Lazy';
import { Picture } from '../src/components/Picture';
import { mockRESTCalls } from '../src/lib/mockRESTCalls';
import { setABTests } from '../src/lib/useAB';
import { ConfigContextDecorator } from './decorators/configContextDecorator';
import { Preview } from '@storybook/react';
import {
	globalColourScheme,
	globalColourSchemeDecorator,
} from './toolbar/globalColourScheme';

// Prevent components being lazy rendered when we're taking Chromatic snapshots
Lazy.disabled = isChromatic();
Picture.disableLazyLoading = isChromatic();

if (isChromatic()) {
	// Fix the date to prevent false negatives
	MockDate.set('Sat Jan 1 2022 12:00:00 GMT+0000 (Greenwich Mean Time)');
}

mockRESTCalls();

setABTests({
	api: new AB({
		mvtMaxValue: 1_000_000,
		mvtId: 1234,
		pageIsSensitive: false,
		abTestSwitches: {},
		arrayOfTestObjects: [],
		serverSideTests: {},
		ophanRecord: () => {},
		errorReporter: () => {},
	}),
	participations: {},
});

// Add base css for the site
let css = `${fontsCss}${resets.resetCSS}`;
let head = document.getElementsByTagName('head')[0];
let style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(css));

// Mock certain page properties to ensure client side hydration completes as expected
// in our page/layout stories. These properties were specifically added after we refactored
// how the CMP loads in App.tsx but they are also used in other areas and can be taken
// as an example for a quick way to mock cookies or the window object.
// Could this be better? Sure, we could investigate ways to really, truly server side
// render in Storybook but for now this (and some of the other steps we take around
// hydration) achieve what we need
window.guardian = {
	config: {
		ophan: {
			pageViewId: 'mockPageViewId',
		},
		page: {
			ajaxUrl: 'https://api.nextgen.guardianapps.co.uk',
		},
		tests: {},
		switches: {},
	},
	ophan: {
		record: ({}) => {},
		pageViewId: 'storybook-does-not-have-a-page-view-id',
	},
	modules: {
		sentry: {
			reportError: () => {
				/* a tree falls in the forest */
			},
		},
	},
};

setCookie({ name: 'bwid', value: 'mockBrowserId' });

const guardianViewports = {
	mobile: {
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

export default {
	args: {
		config: { renderingTarget: 'Web', darkModeAvailable: false },
	},
	globalTypes: {
		globalColourScheme,
	},
	decorators: [
		// @ts-expect-error -- this global decorator takes an option parameter
		ConfigContextDecorator,
		globalColourSchemeDecorator,
		(Story) => {
			storage.local.clear();
			return Story();
		},
	],
	parameters: {
		viewport: {
			viewports: guardianViewports,
			defaultViewport: 'wide',
		},
		layout: 'fullscreen',
	},
} satisfies Preview;
