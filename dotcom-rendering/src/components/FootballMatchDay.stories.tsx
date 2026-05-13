import preview from '../../.storybook/preview';
import { initialDays } from '../../fixtures/manual/footballData';
import { FootballMatchDay as FootballMatchDayComponent } from './FootballMatchDay';

const meta = preview.meta({
	component: FootballMatchDayComponent,
	title: 'Components/Football Match Day',
});

export const FootballMatchDay = meta.story({
	args: {
		matches: initialDays,
		competitionId: 'world-cup-2026',
		guardianBaseUrl: 'https://www.theguardian.com',
		edition: 'UK',
	},
});
