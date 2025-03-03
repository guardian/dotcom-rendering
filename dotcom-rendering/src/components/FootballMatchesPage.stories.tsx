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
		regions,
		guardianBaseUrl: 'https://www.theguardian.com',
		kind: 'Result',
		initialDays,
		edition: 'UK',
		goToCompetitionSpecificPage: fn(),
		renderAds: true,
	},
} satisfies Story;

export const LiveScores = {
	args: {
		...Results.args,
		kind: 'Live',
	},
} satisfies Story;

export const Fixtures = {
	args: {
		...Results.args,
		kind: 'Fixture',
	},
} satisfies Story;
