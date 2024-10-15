import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/highlights-trails';
import { FrontSection } from './FrontSection';
import { ScrollableSmall } from './ScrollableSmall.importable';

export default {
	title: 'Components/ScrollableSmall',
	component: ScrollableSmall,
	args: {
		trails,
		containerPalette: undefined,
		showAge: true,
		absoluteServerTimes: true,
		imageLoading: 'eager',
		containerType: 'scrollable/small',
	},
} as Meta;

type Story = StoryObj<typeof ScrollableSmall>;

export const Default = {};

export const WithFrontSection = {
	render: (args) => (
		<FrontSection
			title="Scrollable small"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={false}
		>
			<ScrollableSmall {...args} />
		</FrontSection>
	),
} satisfies Story;
