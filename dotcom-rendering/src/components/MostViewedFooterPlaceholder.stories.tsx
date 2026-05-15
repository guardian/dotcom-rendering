import { breakpoints } from '@guardian/source/foundations';
import preview from '../../.storybook/preview';
import { MostViewedFooterPlaceholder as MostViewedFooterPlaceholderComponent } from './MostViewedFooterPlaceholder';

const meta = preview.meta({
	component: MostViewedFooterPlaceholderComponent,
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
});

export const MostViewedFooterPlaceholder = meta.story();
