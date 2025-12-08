import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { matchReport } from '../../fixtures/generated/match-report';
import { grid } from '../grid';
import { palette } from '../palette';
import { type TeamType } from '../types/sport';
import { Lineups as LineupsComponent } from './Lineups';

const homeTeam: TeamType = matchReport.homeTeam;

const awayTeam: TeamType = matchReport.awayTeam;

const meta = {
	title: 'Components/Lineups',
	component: LineupsComponent,
	parameters: {
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
	decorators: [
		(Story) => (
			<div
				css={css`
					background-color: ${palette(
						'--football-match-info-background',
					)};
					${grid.paddedContainer}
				`}
			>
				<div
					css={css`
						${grid.column.centre}
					`}
				>
					<Story />
				</div>
			</div>
		),
	],
} satisfies Meta<typeof LineupsComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LineupsStory = {
	args: {
		home: homeTeam,
		away: awayTeam,
	},
} satisfies Story;
