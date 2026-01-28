import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { palette } from '../palette';
import { FootballMatchStat } from './FootballMatchStat';

const containerCss = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const buttonTextCss = css`
	${from.desktop} {
		display: none;
	}
`;

const buttonTextShortCss = css`
	display: none;
	${from.desktop} {
		display: inline;
	}
`;

type Team = {
	name: string;
	colour: string;
};

type MatchStatistic = {
	heading: string;
	homeValue: number;
	awayValue: number;
	isPercentage?: boolean;
};

type Props = {
	homeTeam: Team;
	awayTeam: Team;
	stats: MatchStatistic[];
};

export const FootballMiniMatchStats = ({
	homeTeam,
	awayTeam,
	stats,
}: Props) => {
	return (
		<div css={containerCss}>
			{stats.map((stat) => (
				<FootballMatchStat
					key={stat.heading}
					heading={stat.heading}
					homeTeam={{
						name: homeTeam.name,
						colour: homeTeam.colour,
					}}
					awayTeam={{
						name: awayTeam.name,
						colour: awayTeam.colour,
					}}
					homeValue={stat.homeValue}
					awayValue={stat.awayValue}
					isPercentage={stat.isPercentage}
					layout="compact"
				/>
			))}
			<LinkButton
				href="#"
				size="small"
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				theme={{
					backgroundPrimary: palette(
						'--football-match-stat-button-background',
					),
					backgroundPrimaryHover: palette(
						'--football-match-stat-button-background-hover',
					),
				}}
			>
				<span css={buttonTextCss}>More stats, line-ups and tables</span>
				<span css={buttonTextShortCss}>Stats and line ups</span>
			</LinkButton>
		</div>
	);
};
