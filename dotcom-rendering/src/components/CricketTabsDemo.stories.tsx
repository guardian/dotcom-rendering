import type { ComponentProps } from 'react';
import { expect, userEvent, waitFor } from 'storybook/test';
import { SWRConfig } from 'swr';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { liveMatch, resultMatch } from '../../fixtures/manual/cricketMatch';
import type { FECricketMatchHeader } from '../frontend/feCricketMatchHeader';
import { CricketMatchHeader } from './CricketMatchHeader/CricketMatchHeader';

const meta = preview.meta({
	component: CricketMatchHeader,
	title: 'Components/CricketMatchHeaderTabsDemo',
	parameters: {
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
	decorators: [
		(Story) => (
			<SWRConfig
				value={{
					provider: () => new Map(),
					refreshInterval: 100,
					dedupingInterval: 100,
				}}
			>
				<main id="maincontent">
					<Story />
					<div id="cricket-tab-content">Initial Tab content</div>
				</main>
			</SWRConfig>
		),
	],
});

const baseArgs = {
	matchHeaderURL:
		'https://api.nextgen.guardianapps.co.uk/football/api/match-header/2026/02/08/26247/48490.json',
	selectedTab: 'live' as 'info' | 'live' | 'report',
	edition: 'UK',
	tabContentId: 'cricket-tab-content',
	refreshInterval: 60_000,
	getHeaderData: () =>
		getMockData({
			cricketMatch: liveMatch,
			liveURL:
				'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
		}),
} satisfies ComponentProps<typeof CricketMatchHeader>;

const liveArgs = {
	...baseArgs,
	selectedTab: 'info',
} satisfies ComponentProps<typeof CricketMatchHeader>;

export const CricketScorecardPageNewFixture = meta.story({
	name: 'Live',
	args: baseArgs,
});

export const CricketScorecardPageNewLive = meta.story({
	name: 'Scorecard',
	args: liveArgs,
});

export const ClickScorecardTab = meta.story({
	name: 'Live -> Scorecard',
	args: { ...liveArgs, selectedTab: 'live' },
	play: async ({ canvas, canvasElement }) => {
		await canvas.findByText('Initial Tab content');

		console.log(canvasElement);

		// Click the Scorecard tab button
		const scorecardTab = canvas.getByRole('button', { name: 'Scorecard' });
		await userEvent.click(scorecardTab);

		// Check that the scorecard renders in the main content element
		await expect(
			await canvas.findByRole('heading', {
				name: 'Lineups',
			}),
		).toBeInTheDocument();
	},
});

let matchType = 'live' as 'live' | 'result';

let headerDataGenerator: AsyncGenerator<unknown, void, unknown> | null = null;

export const UpdateScorecardTab = meta.story({
	name: 'Scorecard Update',
	// beforeAll: () => {
	// 	headerDataGenerator = getChangingHeaderData();
	// },
	args: {
		...liveArgs,
		getHeaderData: async () => {
			headerDataGenerator ??= getChangingHeaderData();
			console.log('Fetching header data...');
			const value = (await headerDataGenerator.next()).value;
			console.log('Fetched header data:', value);
			return value;
		},
		refreshInterval: 100,
	},
	play: async ({ canvas }) => {
		await canvas.findByRole('heading', {
			name: 'New Zealand first innings',
		});

		await expect(
			canvas.queryByText('England win by 115 runs'),
		).not.toBeInTheDocument();

		await expect(
			canvas.queryByRole('rowheader', { name: /Harry Brook/ })
				?.nextSibling!.textContent,
		).toBe('Yet to Bat');

		matchType = 'result';

		await waitFor(() => {
			void expect(
				canvas.getByText('England win by 115 runs'),
			).toBeInTheDocument();
		});

		await expect(
			canvas.queryByRole('rowheader', { name: /Harry Brook/ })
				?.nextSibling!.textContent,
		).toBe('lbw b Henry');
	},
});

const getMockData = (data: FECricketMatchHeader) => Promise.resolve(data);

const getChangingHeaderData = async function* () {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- This is a test generator function
	while (true) {
		if (matchType === 'live') {
			yield getMockData({
				cricketMatch: liveMatch,
				liveURL:
					'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
			});
		} else {
			yield getMockData({
				cricketMatch: resultMatch,
				liveURL:
					'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
			});
		}
	}
};
