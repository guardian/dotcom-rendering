import type { StoryObj } from '@storybook/react-webpack5';
import { footballData } from '../../fixtures/generated/football-live';
import { initialDays, regions } from '../../fixtures/manual/footballData';
import { CricketScorecard } from '../components/CricketScorecard.stories';
import { FootballTableList as TableListDefault } from '../components/FootballTableList.stories';
import { extractNAV } from '../model/extract-nav';
import { SportDataPageLayout } from './SportDataPageLayout';

const meta = {
	title: 'Components/Sport Data Page Layout',
	component: SportDataPageLayout,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Results = {
	args: {
		sportData: {
			now: '2025-03-24T15:53:12.604Z',
			matchesList: initialDays,
			regions,
			kind: 'FootballResults',
			guardianBaseURL: 'https://www.theguardian.com',
			editionId: 'UK',
			config: footballData.config,
			pageFooter: footballData.pageFooter,
			contributionsServiceUrl: 'https://contributions.guardianapis.com',
			isAdFreeUser: false,
		},
		renderingTarget: 'Web',
		nav: extractNAV(footballData.nav),
	},
} satisfies Story;

export const Live = {
	args: {
		...Results.args,
		sportData: {
			...Results.args.sportData,
			kind: 'FootballLiveScores',
		},
	},
} satisfies Story;

export const Fixtures = {
	args: {
		...Results.args,
		sportData: {
			...Results.args.sportData,
			kind: 'FootballFixtures',
		},
	},
} satisfies Story;

export const Tables = {
	args: {
		...Results.args,
		sportData: {
			...Results.args.sportData,
			kind: 'FootballTables',
			tables: TableListDefault.args.competitions,
		},
	},
} satisfies Story;

export const CricketMatch = {
	args: {
		...Results.args,
		sportData: {
			...Results.args.sportData,
			kind: 'CricketMatch',
			match: {
				...CricketScorecard.input.args,
				innings: CricketScorecard.input.args.allInnings,
				venueName: 'The Oval',
				competitionName: 'World Cup',
				result: 'result',
			},
		},
	},
} satisfies Story;
