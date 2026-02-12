import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, waitFor, within } from 'storybook/test';
import { SWRConfig } from 'swr';
import {
	matchDayLive,
	matchFixture,
	matchResult,
} from '../../../fixtures/manual/footballMatches';
import type { FEFootballMatchHeader } from '../../frontend/feFootballMatchHeader';
import { FootballMatchHeader as FootballMatchHeaderComponent } from './FootballMatchHeader';

const meta = {
	component: FootballMatchHeaderComponent,
	decorators: [
		(Story) => (
			// This resets the SWR cache on every story
			<SWRConfig value={{ provider: () => new Map() }}>
				<Story />
			</SWRConfig>
		),
	],
} satisfies Meta<typeof FootballMatchHeaderComponent>;

export default meta;

const feHeaderData: FEFootballMatchHeader = {
	footballMatch: matchFixture,
	competitionName: 'Premier League',
	liveURL:
		'https://www.theguardian.com/football/live/2025/nov/26/arsenal-v-bayern-munich-champions-league-live',
	reportURL:
		'https://www.theguardian.com/football/2025/nov/26/arsenal-bayern-munich-champions-league-match-report',
	infoURL:
		'https://www.theguardian.com/football/match/2025/nov/26/arsenal-v-bayernmunich',
};

type Story = StoryObj<typeof meta>;

export const Fixture = {
	args: {
		leagueName: feHeaderData.competitionName,
		match: {
			kind: 'Fixture',
			kickOff: new Date('2025-11-05T20:30:00Z'),
			venue: 'Old Trafford',
			homeTeam: {
				name: 'Wolverhampton Wanderers',
				paID: '44',
			},
			awayTeam: {
				name: 'Belgium',
				paID: '997',
			},
			paId: 'matchId',
		},
		tabs: {
			selected: 'info',
			matchKind: 'Fixture',
		},
		edition: 'UK',
		getHeaderData: () =>
			getMockData({
				...feHeaderData,
				liveURL: undefined,
				reportURL: undefined,
			}),
		refreshInterval: 3_000,
		matchHeaderURL: new URL(
			'https://api.nextgen.guardianapps.co.uk/football/api/match-header/2026/02/08/26247/48490.json',
		),
	},
	play: async ({ canvasElement }) => {
		const list = await getListElement(canvasElement);
		let items = within(list).getAllByRole('listitem');
		void expect(items.length).toBe(1);
		void expect(items[0]).toHaveTextContent('Match info');

		await waitFor(() => {
			items = within(list).getAllByRole('listitem');
			void expect(items.length).toBe(1);
			void expect(items[0]).toHaveTextContent('Match info');
		});
	},
} satisfies Story;

export const Live = {
	args: {
		leagueName: feHeaderData.competitionName,
		match: {
			...Fixture.args.match,
			kind: 'Live',
			status: '1st',
			homeTeam: {
				...Fixture.args.match.homeTeam,
				score: 0,
				scorers: [],
			},
			awayTeam: {
				...Fixture.args.match.awayTeam,
				score: 13,
				scorers: [
					'Carlos Casemiro 12 Pen',
					'Carlos Casemiro 4',
					'Mason Mount 82 O.g.',
				],
			},
			comment: undefined,
		},
		tabs: {
			selected: 'live',
			matchKind: 'Live',
			infoURL: new URL(
				'https://www.theguardian.com/football/match/2025/nov/26/arsenal-v-bayernmunich',
			),
		},
		edition: 'EUR',
		matchHeaderURL: new URL(
			'https://api.nextgen.guardianapps.co.uk/football/api/match-header/2026/02/08/26247/48490.json',
		),
		refreshInterval: Fixture.args.refreshInterval,
		getHeaderData: () =>
			getMockData({
				...feHeaderData,
				footballMatch: matchDayLive,
				reportURL: undefined,
			}),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		void expect(canvas.getByLabelText('Score: 0')).toBeInTheDocument();
		void expect(canvas.getByLabelText('Score: 13')).toBeInTheDocument();

		await waitFor(() => {
			void expect(canvas.getByLabelText('Score: 3')).toBeInTheDocument();
			void expect(canvas.getByLabelText('Score: 4')).toBeInTheDocument();
		});
	},
} satisfies Story;

export const Result = {
	args: {
		leagueName: Fixture.args.leagueName,
		match: {
			...Live.args.match,
			kind: 'Result',
		},
		tabs: {
			selected: 'info',
			matchKind: 'Result',
		},
		edition: 'AU',
		matchHeaderURL: new URL(
			'https://api.nextgen.guardianapps.co.uk/football/api/match-header/2026/02/08/26247/48490.json',
		),
		refreshInterval: Fixture.args.refreshInterval,
		getHeaderData: () =>
			getMockData({
				...feHeaderData,
				footballMatch: matchResult,
			}),
	},

	play: async ({ canvasElement }) => {
		const list = await getListElement(canvasElement);
		let items = within(list).getAllByRole('listitem');
		void expect(items.length).toBe(1);
		void expect(items[0]).toHaveTextContent('Match info');

		await waitFor(() => {
			items = within(list).getAllByRole('listitem');
			void expect(items.length).toBe(3);
			void expect(items[0]).toHaveTextContent('Match report');
			void expect(items[1]).toHaveTextContent('Live feed');
			void expect(items[2]).toHaveTextContent('Match info');
		});
	},
} satisfies Story;

const getListElement = async (canvasElement: HTMLElement) => {
	const canvas = within(canvasElement);
	const nav = await canvas.findByRole('navigation');
	const navQueries = within(nav);
	// Get the list element that is within a nav element
	return await navQueries.findByRole('list');
};

const getMockData = (data: FEFootballMatchHeader) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(data);
		}, 1000);
	});
