import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { type FootballMatchStats } from '../footballMatchStats';
import { grid } from '../grid';
import { palette } from '../palette';
import { Lineups } from './Lineups';

const gridStyles = css`
	${grid.paddedContainer}
	position: relative;
	${from.tablet} {
		&::before,
		&::after {
			content: '';
			position: absolute;
			border-left: 1px solid ${palette('--article-border')};
			z-index: 1;
			top: 0;
			bottom: 0;
		}

		&::after {
			right: 0;
		}
	}
`;

type Props = {
	match: FootballMatchStats;
};

export const FootballMatchInfo = ({ match }: Props) => (
	<main id="maincontent" css={gridStyles}>
		<div
			css={css`
				${grid.column.centre}
			`}
		>
			<Lineups matchStats={match} />
		</div>
	</main>
);
