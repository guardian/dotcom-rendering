import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { FootballMatchStat } from './FootballMatchStat';

const containerCss = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

type FootballTeam = {
	name: string;
	colour: string;
};

type MatchStatistic = {
	label: string;
	homeValue: number;
	awayValue: number;
	showPercentage?: boolean;
};

type Props = {
	homeTeam: FootballTeam;
	awayTeam: FootballTeam;
	stats: MatchStatistic[];
};

export const FootballMiniMatchStats = ({
	homeTeam,
	awayTeam,
	stats,
}: Props) => {
	console.log(homeTeam, awayTeam, stats);
	return (
		<div css={containerCss}>
			{stats.map((stat) => (
				<FootballMatchStat
					key={stat.label}
					label={stat.label}
					home={{
						teamName: homeTeam.name,
						teamColour: homeTeam.colour,
						value: stat.homeValue,
					}}
					away={{
						teamName: awayTeam.name,
						teamColour: awayTeam.colour,
						value: stat.awayValue,
					}}
					showPercentage={stat.showPercentage}
				/>
			))}
			<LinkButton
				href="#"
				size="small"
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				theme={{ backgroundPrimary: palette.sport[400] }}
			>
				More stats, line-ups and tables
			</LinkButton>
		</div>
	);
};
