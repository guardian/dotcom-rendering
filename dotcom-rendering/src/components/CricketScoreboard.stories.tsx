import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { match } from '../../fixtures/manual/cricket-scoreboard';
import { CricketScoreboard } from './CricketScoreboard';

const meta: Meta = {
	component: CricketScoreboard,
	title: 'Components/CricketScoreboard',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobileLandscape],
		},
	},
};

type Story = StoryObj<typeof CricketScoreboard>;

export const defaultStory: Story = {
	name: 'Cricket Scoreboard',
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
			theme: Pillar.Sport,
		},
		match,
		scorecardUrl: '/test',
		editionId: 'UK',
	},
};

export default meta;
