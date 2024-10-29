import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/highlights-trails';
import { FrontSection } from './FrontSection';
import { ScrollableMedium } from './ScrollableMedium.importable';

export default {
	title: 'Components/ScrollableMedium',
	component: ScrollableMedium,
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
		showAge: true,
		absoluteServerTimes: true,
		imageLoading: 'eager',
		containerType: 'scrollable/medium',
	},
} as Meta;

type Story = StoryObj<typeof ScrollableMedium>;

export const WithFrontSection = {
	render: (args) => (
		<FrontSection
			title="Scrollable medium"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={false}
		>
			<ScrollableMedium {...args} />
		</FrontSection>
	),
} satisfies Story;
