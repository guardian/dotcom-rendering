import type { StoryObj } from '@storybook/react';
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
			kind: 'FootballResult',
			guardianBaseURL: 'https://www.theguardian.com',
			editionId: 'UK',
			config: footballData.config,
			nav: extractNAV(footballData.nav),
			pageFooter: footballData.pageFooter,
			contributionsServiceUrl: 'https://contributions.guardianapis.com',
			isAdFreeUser: false,
		},
	},
} satisfies Story;

export const Live = {
	args: {
		sportData: {
			...Results.args.sportData,
			kind: 'FootballLive',
		},
	},
} satisfies Story;

export const Fixtures = {
	args: {
		sportData: {
			...Results.args.sportData,
			kind: 'FootballFixture',
		},
	},
} satisfies Story;

export const Tables = {
	args: {
		sportData: {
			...Results.args.sportData,
			kind: 'FootballTables',
			tables: TableListDefault.args.competitions,
		},
	},
} satisfies Story;

export const CricketMatch = {
	args: {
		sportData: {
			...Results.args.sportData,
			kind: 'CricketMatch',
			match: {
				...CricketScorecard.args,
				innings: CricketScorecard.args.allInnings,
				venueName: 'The Oval',
				competitionName: 'World Cup',
			},
		},
	},
} satisfies Story;
