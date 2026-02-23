import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { FootballMiniMatchStats } from './FootballMiniMatchStats';

const wrapperStyles = css`
	padding: 10px 10px 0;
	${from.mobileLandscape} {
		padding: 20px 20px 0;
	}
	${from.desktop} {
		padding: 24px 0 20px 20px;
	}
`;

export const FootballMiniMatchStatsWrapper = ({
	matchStatsUrl,
}: {
	matchStatsUrl: string;
}) => (
	<div css={wrapperStyles}>
		<FootballMiniMatchStats
			matchStatsUrl={matchStatsUrl}
			getMatchStatsData={getMatchStatsData}
			refreshInterval={16_000}
		/>
	</div>
);

const getMatchStatsData = (url: string): Promise<unknown> =>
	fetch(url).then((res) => res.json());
