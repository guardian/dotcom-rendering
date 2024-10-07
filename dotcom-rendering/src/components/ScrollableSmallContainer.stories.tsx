import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/highlights-trails';
import { FrontSection } from './FrontSection';
import { ScrollableSmallContainer } from './ScrollableSmallContainer.importable';

export default {
	title: 'ScrollableSmallContainer',
	component: ScrollableSmallContainer,
	args: {
		trails,
		containerPalette: undefined,
		showAge: true,
		absoluteServerTimes: true,
		imageLoading: 'eager',
		containerType: 'scrollable/small',
	},
} as Meta;

type Story = StoryObj<typeof ScrollableSmallContainer>;

export const Default = {};

export const WithFrontSection = {
	render: (args) => (
		<FrontSection
			title="Scrollable small"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={false}
		>
			<ScrollableSmallContainer {...args} />
		</FrontSection>
	),
} satisfies Story;
