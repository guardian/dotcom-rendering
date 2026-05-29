import { css } from '@emotion/react';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { table } from '../../fixtures/manual/footballTable';
import { matchStats } from '../../fixtures/manual/matchStats';
import { grid } from '../grid';
import { palette } from '../palette';
import { FootballMatchInfo as FootballMatchInfoComponent } from './FootballMatchInfo';

const meta = preview.meta({
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
});

export const FootballMatchInfo = meta.story({
	args: {
		matchStats,
		table,
	},
});
