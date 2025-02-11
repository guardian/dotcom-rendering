import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FootballMatchesPage } from './FootballMatchesPage.importable';
import { Default as MatchListDefault } from './FootballMatchList.stories';

const meta = {
	title: 'Components/Football Matches Page',
	component: FootballMatchesPage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Results = {
	args: {
		nations: [
			{
				name: 'England',
				competitions: [
					{ tag: 'football/premierleague', name: 'Premier League' },
					{ tag: 'football/championship', name: 'Championship' },
				],
			},
		],
		guardianBaseUrl: 'https://www.theguardian.com',
		kind: 'Result',
		initialDays: MatchListDefault.args.initialDays,
		edition: 'UK',
		goToCompetitionSpecificPage: fn(),
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
