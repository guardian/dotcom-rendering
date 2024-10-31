import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/highlights-trails';
import { FrontSection } from './FrontSection';
import { ScrollableFeature } from './ScrollableFeature.importable';

export default {
	title: 'Components/ScrollableFeature',
	component: ScrollableFeature,
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
	args: {
		trails,
		containerPalette: undefined,
		absoluteServerTimes: true,
		imageLoading: 'eager',
	},
} as Meta;

type Story = StoryObj<typeof ScrollableFeature>;

export const WithFrontSection = {
	render: (args) => (
		<FrontSection
			title="Scrollable feature"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={false}
		>
			<ScrollableFeature {...args} />
		</FrontSection>
	),
} satisfies Story;
