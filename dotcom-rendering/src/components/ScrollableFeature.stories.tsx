import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/highlights-trails';
import { FrontSection } from './FrontSection';
import { ScrollableFeature } from './ScrollableFeature.importable';

export default {
	title: 'Components/ScrollableFeature',
	component: ScrollableFeature,
	args: {
		trails,
		containerPalette: undefined,
		showAge: true,
		absoluteServerTimes: true,
		imageLoading: 'eager',
		containerType: 'scrollable/feature',
	},
} as Meta;

type Story = StoryObj<typeof ScrollableFeature>;

export const Default = {};

export const WithFrontSection = {
	render: (args) => (
		<FrontSection
			title="Scrollable small"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={false}
		>
			<ScrollableFeature {...args} />
		</FrontSection>
	),
} satisfies Story;
