import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { MostViewedFooterPlaceholder as MostViewedFooterPlaceholderComponent } from './MostViewedFooterPlaceholder';

const meta = {
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
} satisfies Meta<typeof MostViewedFooterPlaceholderComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MostViewedFooterPlaceholder = {} satisfies Story;
