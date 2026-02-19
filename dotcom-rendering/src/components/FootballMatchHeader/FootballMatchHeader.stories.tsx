import type { Meta, StoryObj } from '@storybook/react-webpack5';
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
		initialTab: 'info',
		initialData: {
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
	// play: async ({ canvas, step }) => {
	// 	const nav = canvas.getByRole('navigation');
	// 	const initialTabs = within(nav).getAllByRole('listitem');

	// 	void expect(initialTabs.length).toBe(1);
	// 	void expect(initialTabs[0]).toHaveTextContent('Match info');

	// 	await step('Fetch updated match header data', async () => {
	// 		// Wait for 'Home Team' to appear which indicates match header data
	// 		// has been fetched and the UI updated
	// 		await canvas.findByText('Home Team');

	// 		const updatedTabs = within(nav).getAllByRole('listitem');
	// 		void expect(updatedTabs.length).toBe(1);
	// 		void expect(updatedTabs[0]).toHaveTextContent('Match info');
	// 	});
	// },
} satisfies Story;

export const Live = {
	args: {
		initialTab: 'live',
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
	// play: async ({ canvas, step }) => {
	// 	void expect(canvas.getByLabelText('Score: 0')).toBeInTheDocument();
	// 	void expect(canvas.getByLabelText('Score: 13')).toBeInTheDocument();

	// 	await step('Fetch updated match header data', async () => {
	// 		// Wait for 'Home Team' to appear which indicates match header data
	// 		// has been fetched and the UI updated
	// 		await canvas.findByText('Home Team');

	// 		void expect(canvas.getByLabelText('Score: 3')).toBeInTheDocument();
	// 		void expect(canvas.getByLabelText('Score: 4')).toBeInTheDocument();
	// 	});
	// },
} satisfies Story;

export const Result = {
	args: {
		initialTab: 'report',
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

	// play: async ({ canvas, step }) => {
	// 	const nav = canvas.getByRole('navigation');
	// 	const initialTabs = within(nav).getAllByRole('listitem');

	// 	void expect(initialTabs.length).toBe(1);
	// 	void expect(initialTabs[0]).toHaveTextContent('Match info');

	// 	await step('Fetch updated match header data', async () => {
	// 		// Wait for 'Home Team' to appear which indicates match header data
	// 		// has been fetched and the UI updated
	// 		await canvas.findByText('Home Team');

	// 		const updatedTabs = within(nav).getAllByRole('listitem');
	// 		void expect(updatedTabs.length).toBe(3);
	// 		void expect(updatedTabs[0]).toHaveTextContent('Match report');
	// 		void expect(updatedTabs[1]).toHaveTextContent('Live feed');
	// 		void expect(updatedTabs[2]).toHaveTextContent('Match info');
	// 	});
	// },
} satisfies Story;

const getMockData = (data: FEFootballMatchHeader) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(data);
		}, 1000);
	});
