import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FootballMatchesPage as FootballMatchesPageComponent } from './FootballMatchesPage.importable';
import { Default as MatchListDefault } from './FootballMatchList.stories';

const meta = {
	title: 'Components/Football Matches Page',
	component: FootballMatchesPageComponent,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		title: 'Football results',
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
		kind: 'Fixture',
		initialDays: MatchListDefault.args.initialDays,
		edition: 'UK',
		goToCompetitionSpecificPage: fn(),
	},
} satisfies Story;

export const LiveScores = {
	args: {
		title: 'Live football scores',
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
		kind: 'Live',
		initialDays: MatchListDefault.args.initialDays,
		edition: 'UK',
		goToCompetitionSpecificPage: fn(),
	},
} satisfies Story;

export const Fixtures = {
	args: {
		title: 'Football fixtures',
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
		kind: 'Fixture',
		initialDays: MatchListDefault.args.initialDays,
		edition: 'UK',
		goToCompetitionSpecificPage: fn(),
	},
} satisfies Story;
