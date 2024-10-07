import type { Meta } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/highlights-trails';
import { FrontSection } from './FrontSection';
import { ScrollableSmallContainer } from './ScrollableSmallContainer.importable';

export default {
	title: 'ScrollableSmallContainer',
	component: ScrollableSmallContainer,
	args: {
		trails,
	},
} as Meta;

// type Story = StoryObj<typeof ScrollableSmallContainer>;

export const Default = {};

export const WithFrontSection = {
	render: () => (
		<FrontSection
			title="Scrollable small"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={false}
		>
			<ScrollableSmallContainer trails={trails} />
		</FrontSection>
	),
};
