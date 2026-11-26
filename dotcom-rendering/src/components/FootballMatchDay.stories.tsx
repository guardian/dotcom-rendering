import preview from '../../.storybook/preview';
import { matchDayWorldCup } from '../../fixtures/manual/footballData';
import { FootballMatchDay } from './FootballMatchDay';

const meta = preview.meta({
	component: FootballMatchDay,
	title: 'Components/Football Match Day',
});

export const WithMatches = meta.story({
	args: {
		competitionTag: 'world-cup-2026',
		matches: matchDayWorldCup,
		guardianBaseUrl: 'https://www.theguardian.com',
		edition: 'UK',
	},
});

export const NoMatches = meta.story({
	args: {
		competitionTag: 'world-cup-2026',
		matches: [],
		guardianBaseUrl: 'https://www.theguardian.com',
		edition: 'UK',
	},
});
