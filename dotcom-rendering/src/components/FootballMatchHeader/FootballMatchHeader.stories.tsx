import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, within } from 'storybook/test';
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
		matchHeaderURL:
			'https://api.nextgen.guardianapps.co.uk/football/api/match-header/2026/02/08/26247/48490.json',
	},
	play: async ({ canvas, canvasElement, step }) => {
		const nav = canvas.getByRole('navigation');

		await step(
			'Placeholder not shown as we have initial data and can render header',
			async () => {
				void expect(
					canvasElement.querySelector('[data-name="placeholder"]'),
				).toBeNull();

				const initialTabs = within(nav).getAllByRole('listitem');

				void expect(initialTabs.length).toBe(1);
				void expect(initialTabs[0]).toHaveTextContent('Match info');
			},
		);

		await step('Fetch updated match header data', async () => {
			// Wait for 'Premier League' to appear which indicates match header
			// data has been fetched and the UI updated on the client
			await canvas.findByText('Premier League');
			void canvas.findByText('Away Team');
			void canvas.findByText('Home Team');

			const updatedTabs = within(nav).getAllByRole('listitem');
			void expect(updatedTabs.length).toBe(1);
			void expect(updatedTabs[0]).toHaveTextContent('Match info');
		});
	},
} satisfies Story;

export const Live = {
	args: {
		initialTab: 'live',
		edition: 'EUR',
		matchHeaderURL:
			'https://api.nextgen.guardianapps.co.uk/football/api/match-header/2026/02/08/26247/48490.json',
		refreshInterval: Fixture.args.refreshInterval,
		getHeaderData: () =>
			getMockData({
				...feHeaderData,
				footballMatch: matchDayLive,
				reportURL: undefined,
			}),
	},
	play: async ({ canvas, canvasElement, step }) => {
		await step(
			'Placeholder shown whilst header data is being fetched',
			async () => {
				void expect(
					canvasElement.querySelector('[data-name="placeholder"]'),
				).toBeInTheDocument();
			},
		);

		await step('Fetch match header data and render UI', async () => {
			// Wait for 'Premier League' to appear which signals match header
			// data has been fetched and the UI rendered on the client
			await canvas.findByText('Premier League');
			void canvas.findByText('Away Team');
			void canvas.findByText('Home Team');

			void expect(canvas.getByLabelText('Score: 3')).toBeInTheDocument();
			void expect(canvas.getByLabelText('Score: 4')).toBeInTheDocument();

			const nav = canvas.getByRole('navigation');
			const tabs = within(nav).getAllByRole('listitem');

			void expect(tabs.length).toBe(2);
			void expect(tabs[0]).toHaveTextContent('Live feed');
			void expect(tabs[1]).toHaveTextContent('Match info');
		});
	},
} satisfies Story;

export const Result = {
	args: {
		initialTab: 'report',
		edition: 'AU',
		matchHeaderURL:
			'https://api.nextgen.guardianapps.co.uk/football/api/match-header/2026/02/08/26247/48490.json',
		refreshInterval: Fixture.args.refreshInterval,
		getHeaderData: () =>
			getMockData({
				...feHeaderData,
				footballMatch: matchResult,
			}),
	},

	play: async ({ canvas, canvasElement, step }) => {
		await step(
			'Placeholder shown whilst header data is being fetched',
			async () => {
				void expect(
					canvasElement.querySelector('[data-name="placeholder"]'),
				).toBeInTheDocument();
			},
		);

		await step('Fetch match header data and render UI', async () => {
			// Wait for 'Premier League' to appear which signals match header
			// data has been fetched and the UI rendered on the client
			await canvas.findByText('Premier League');
			void canvas.findByText('Away Team');
			void canvas.findByText('Home Team');

			const nav = canvas.getByRole('navigation');
			const tabs = within(nav).getAllByRole('listitem');

			void expect(tabs.length).toBe(3);
			void expect(tabs[0]).toHaveTextContent('Match report');
			void expect(tabs[1]).toHaveTextContent('Live feed');
			void expect(tabs[2]).toHaveTextContent('Match info');
		});
	},
} satisfies Story;

const getMockData = (data: FEFootballMatchHeader) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(data);
		}, 1000);
	});
