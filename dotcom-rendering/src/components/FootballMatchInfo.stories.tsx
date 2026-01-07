import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { table } from '../../fixtures/manual/footballTable';
import { matchStats } from '../../fixtures/manual/matchStats';
import { grid } from '../grid';
import { palette } from '../palette';
import { FootballMatchInfo as FootballMatchInfoComponent } from './FootballMatchInfo';

const meta = {
	title: 'Components/Football Match Info',
	component: FootballMatchInfoComponent,
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
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
						padding-top: 10px;
						padding-bottom: 10px;
					`}
				>
					<Story />
				</div>
			</div>
		),
	],
} satisfies Meta<typeof FootballMatchInfoComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FootballMatchInfo = {
	args: {
		match: matchStats,
		table,
	},
} satisfies Story;
