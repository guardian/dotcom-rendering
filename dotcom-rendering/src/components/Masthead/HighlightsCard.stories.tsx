import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta } from '@storybook/react';
import { HighlightsCard } from './HighlightsCard';

const meta = {
	component: HighlightsCard,
	title: 'Components/Masthead/HighlightsCard',
	render: (args) => <HighlightsCard {...args} />,
	args: {
		headlineText: 'This is the headline',
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		showPulsingDot: true,
		kickerText: 'This is the kicker',
	},
} satisfies Meta<typeof HighlightsCard>;
export default meta;

export const Default = {};
