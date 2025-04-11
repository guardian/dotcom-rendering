import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { initialDays, regions } from '../../fixtures/manual/footballData';
import { FootballMatchesPage } from './FootballMatchesPage';

const meta = {
	title: 'Components/Football Matches Page',
	component: FootballMatchesPage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Results = {
	args: {
		now: '2025-03-24T15:53:12.604Z',
		regions,
		guardianBaseUrl: 'https://www.theguardian.com',
		kind: 'FootballResults',
		initialDays,
		edition: 'UK',
		goToCompetitionSpecificPage: fn(),
		renderAds: true,
		pageId: 'football/results',
	},
} satisfies Story;

export const LiveScores = {
	args: {
		...Results.args,
		kind: 'FootballLiveScores',
	},
} satisfies Story;

export const Fixtures = {
	args: {
		...Results.args,
		kind: 'FootballFixtures',
	},
} satisfies Story;
