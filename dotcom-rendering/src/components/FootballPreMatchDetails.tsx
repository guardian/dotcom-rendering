import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	headlineBold20,
	space,
	textSans14,
	textSans15,
	textSansBold14,
	textSansBold15,
} from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import {
	type EditionId,
	getLocaleFromEdition,
	getTimeZoneFromEdition,
} from '../lib/edition';
import { palette } from '../palette';

const containerCss = css`
	padding: 6px 10px 10px;
	color: ${palette('--football-match-stat-text')};
	background-color: ${palette('--football-pre-match-background')};
	border: 1px solid ${palette('--football-match-stat-border')};
	border-radius: 6px;
`;

const headingCss = css`
	${textSansBold14}
	padding-bottom: ${space[1]}px;
	border-bottom: 1px solid ${palette('--football-match-stat-border')};
	${from.desktop} {
		${textSansBold15}
	}
`;

const detailsCss = css`
	${textSans14}
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
	margin: ${space[2]}px 0 ${space[3]}px;
	${from.desktop} {
		${textSans15}
	}
`;

const kickOffCss = css`
	${headlineBold17}
	color: ${palette('--football-pre-match-kickoff')};
	${from.desktop} {
		${headlineBold20}
	}
`;

type PreMatchProps = {
	homeTeam: string;
	awayTeam: string;
	league: string;
	venue: string;
	kickOff: Date;
	edition: EditionId;
};

export const FootballPreMatchDetails = ({
	homeTeam,
	awayTeam,
	league,
	venue,
	kickOff,
	edition,
}: PreMatchProps) => {
	const kickOffTime = new Intl.DateTimeFormat(getLocaleFromEdition(edition), {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		weekday: 'long',
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZoneName: 'short',
		timeZone: getTimeZoneFromEdition(edition),
	}).format(kickOff);

	console.log(new Date());

	return (
		<div css={containerCss}>
			<h3 css={headingCss}>
				{homeTeam} vs. {awayTeam}
			</h3>
			<div css={detailsCss}>
				<span>{league}</span>
				<span>{venue}</span>
				<time css={kickOffCss}>{kickOffTime}</time>
			</div>
			<LinkButton
				href="/football/fixtures"
				size="xsmall"
				priority="tertiary"
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				theme={{
					textTertiary: palette('--football-pre-match-button'),
					borderTertiary: palette('--football-pre-match-button'),
					backgroundTertiaryHover: palette(
						'--football-pre-match-button-hover',
					),
				}}
			>
				Today's fixtures
			</LinkButton>
		</div>
	);
};
