import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { matchReport } from '../../fixtures/generated/match-report';
import { FootballMatchSummary as FootballMatchSummaryComponent } from './FootballMatchSummary';

const meta = preview.meta({
	title: 'Components/Football Match Summary',
	component: FootballMatchSummaryComponent,
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
});

export const FootballMatchSummary = meta.story({
	args: {
		match: {
			homeTeam: matchReport.homeTeam,
			awayTeam: matchReport.awayTeam,
			comments: matchReport.comments,
			status: matchReport.status,
		},
	},
});
