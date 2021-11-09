// ----- Imports ----- //
import { breakpoints } from '@guardian/source-foundations';
import { withKnobs } from '@storybook/addon-knobs';
import Live from 'components/layout/live';
import { live } from 'fixtures/live';
import type { ReactElement } from 'react';

// ----- Stories ----- //

const Default = (): ReactElement => <Live item={{ ...live }} />;

// ----- Exports ----- //

export default {
	component: Live,
	title: 'AR/LiveBlog Prototype',
	decorators: [withKnobs],
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			diffThreshold: 0.4,
			viewports: [breakpoints.mobile, breakpoints.tablet],
		},
	},
};

export { Default };
