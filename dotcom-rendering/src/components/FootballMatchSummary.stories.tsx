import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../.storybook/modes';
import { matchReport } from '../../fixtures/generated/match-report';
import { FootballMatchSummary as FootballMatchSummaryComponent } from './FootballMatchSummary';

const meta = {
	title: 'Components/Football Match Summary',
	component: FootballMatchSummaryComponent,
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
} satisfies Meta<typeof FootballMatchSummaryComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FootballMatchSummary = {
	args: {
		match: {
			homeTeam: matchReport.homeTeam,
			awayTeam: matchReport.awayTeam,
			comments: matchReport.comments,
		},
	},
} satisfies Story;
