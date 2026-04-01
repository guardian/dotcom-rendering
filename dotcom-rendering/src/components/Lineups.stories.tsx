import { css } from '@emotion/react';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { matchStats } from '../../fixtures/manual/matchStats';
import { grid } from '../grid';
import { palette } from '../palette';
import { Lineups as LineupsComponent } from './Lineups';

const meta = preview.meta({
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
});

export const WithLineup = meta.story({
	args: {
		matchStats,
	},
});

export const ComingSoon = meta.story({
	args: {
		matchStats: {
			homeTeam: { ...matchStats.homeTeam, players: [] },
			awayTeam: { ...matchStats.awayTeam, players: [] },
		},
	},
});
