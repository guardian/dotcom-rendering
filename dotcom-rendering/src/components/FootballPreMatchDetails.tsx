import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	headlineBold20,
	space,
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
	${textSansBold14}
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
	${from.desktop} {
		${textSansBold15}
	}
`;

const leagueCss = css`
	display: block;
`;

const venueCss = css`
	display: block;
	font-weight: 400;
`;

const kickOffCss = css`
	${headlineBold17}
	color: ${palette('--football-pre-match-kickoff')};
	${from.desktop} {
		${headlineBold20}
	}
`;

const formatMatchKickOffTime = (kickOff: Date, edition: EditionId): string => {
	const dateFormatter = new Intl.DateTimeFormat(
		getLocaleFromEdition(edition),
		{
			weekday: 'long',
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
			timeZoneName: 'short',
			timeZone: getTimeZoneFromEdition(edition),
		},
	);

	return dateFormatter.format(kickOff);
};

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
}: PreMatchProps) => (
	<section css={containerCss}>
		<h2 css={headingCss}>
			{homeTeam} vs. {awayTeam}
		</h2>
		<div css={detailsCss}>
			<div>
				<span css={leagueCss}>{league}</span>
				<span css={venueCss}>{venue}</span>
			</div>
			<time css={kickOffCss}>
				{formatMatchKickOffTime(kickOff, edition)}
			</time>
			<div>
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
		</div>
	</section>
);
