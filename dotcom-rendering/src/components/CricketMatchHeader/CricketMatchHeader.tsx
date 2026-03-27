import { css } from '@emotion/react';
import {
	from,
	headlineBold20Object,
	headlineBold24Object,
	space,
	textSans12Object,
	textSans14Object,
	textSans15Object,
	textSansBold14Object,
	textSansBold17Object,
	until,
} from '@guardian/source/foundations';
import { SvgNotificationsOn } from '@guardian/source/react-components';
import { ToggleSwitch } from '@guardian/source-development-kitchen/react-components';
import { type ReactNode, useMemo } from 'react';
import { grid } from '../../grid';
import {
	type EditionId,
	getLocaleFromEdition,
	getTimeZoneFromEdition,
} from '../../lib/edition';
import { palette } from '../../palette';
import type { ColourName } from '../../paletteDeclarations';
import { BigNumber } from '../BigNumber';
import { FootballCrest } from '../FootballCrest';
import {
	background,
	border,
	primaryText,
	secondaryText,
} from '../FootballMatchHeader/colours';

type Inning = {
	order: number;
	battingTeam: string;
	runsScored: number;
	overs: string;
	declared: boolean;
	forfeited: boolean;
	fallOfWicket: { order: number }[];
};

type CricketMatch = {
	kind: 'Fixture' | 'Live' | 'Result';
	series: string;
	competition: string;
	venue: string;
	day?: number;
	matchDate: Date;
	homeTeam: string;
	awayTeam: string;
	innings: Inning[];
};

type Props = {
	edition: EditionId;
	match: CricketMatch;
	isApp?: boolean;
};

export const CricketMatchHeader = (props: Props) => {
	const match = props.match;

	return (
		<section
			style={{
				backgroundColor: palette(background(match.kind)),
				color: palette(primaryText(match.kind)),
			}}
		>
			<div
				css={{
					'&': css(grid.paddedContainer),
					[from.tablet]: {
						borderColor: palette(
							'--football-match-header-fixture-result-border',
						),
						borderStyle: 'solid',
						borderLeftWidth: 1,
						borderRightWidth: 1,
					},
				}}
			>
				<StatusLine match={match} edition={props.edition} />
				<Hr borderStyle="dotted" borderColour={border(match.kind)} />
				<Teams match={match} />
				<Hr borderStyle="solid" borderColour={border(match.kind)} />
			</div>
			{props.isApp && match.kind !== 'Result' && (
				<div
					css={{
						paddingLeft: space[4],
						paddingRight: space[4],
						paddingTop: space[2],
						paddingBottom: space[2],
					}}
				>
					<div css={{ ...textSans14Object }}>
						Be notified about start times, wickets, run outs, alien
						invasions and final scores
					</div>
					<div
						css={{
							...textSans15Object,
							display: 'flex',
							alignItems: 'center',
							gap: space[1],
							paddingTop: space[2],
							paddingBottom: space[2],
						}}
					>
						<SvgNotificationsOn
							theme={{
								fill:
									match.kind === 'Fixture'
										? '#ffffff'
										: '#000000',
							}}
							size="small"
						/>{' '}
						Get match notifications
						<span css={{ marginLeft: 'auto' }}>
							{/* TODO: Wire toggle up for app notifications */}
							<ToggleSwitch />
						</span>
					</div>
				</div>
			)}
		</section>
	);
};

const StatusLine = (props: { match: CricketMatch; edition: EditionId }) => (
	<p
		css={{
			...textSans14Object,
			'&': css(grid.column.centre),
			paddingTop: space[2],
			paddingBottom: space[1],
			[from.leftCol]: {
				'&': css(grid.column.left),
				padding: `${space[3]}px 0 0`,
			},
		}}
		style={{
			color: palette(secondaryText(props.match.kind)),
		}}
	>
		<SeriesName matchKind={props.match.kind}>
			{props.match.series}
		</SeriesName>
		<span>
			{props.match.competition}, {props.match.venue} •{' '}
		</span>
		<MatchStatus edition={props.edition} match={props.match} />
	</p>
);

const SeriesName = (props: {
	matchKind: CricketMatch['kind'];
	children: ReactNode;
}) => (
	<>
		<span
			style={{
				color: palette(primaryText(props.matchKind)),
				'--live-circle-display':
					props.matchKind === 'Live' ? 'inline-block' : 'none',
			}}
			css={{
				...textSansBold14Object,
				display: 'inline-flex',
				alignItems: 'center',
				[until.leftCol]: {
					'&:before': {
						content: '""',
						display: 'var(--live-circle-display)',
						borderRadius: '100%',
						marginRight: space[1],
						width: 12,
						height: 12,
						backgroundColor: palette(
							'--football-match-header-live-primary-text',
						),
						opacity: 0.6,
					},
				},
				[from.leftCol]: {
					...textSansBold17Object,
					display: 'block',
				},
			}}
		>
			{props.children}
		</span>
		<span
			css={{
				[from.leftCol]: {
					display: 'none',
				},
			}}
		>
			{' '}
			•{' '}
		</span>
	</>
);

const MatchStatus = (props: { match: CricketMatch; edition: EditionId }) => {
	const matchDateFormatter = useMemo(
		() => MatchDateFormatterForEdition(props.edition),
		[props.edition],
	);

	switch (props.match.kind) {
		case 'Fixture':
			return matchDateFormatter.format(props.match.matchDate);
		default:
			return (
				<span css={textSansBold14Object}>Day {props.match.day}</span>
			);
	}
};

const MatchDateFormatterForEdition = (
	edition: EditionId,
): Intl.DateTimeFormat =>
	new Intl.DateTimeFormat(getLocaleFromEdition(edition), {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: getTimeZoneFromEdition(edition),
	});

const Hr = (props: {
	borderStyle: 'dotted' | 'solid';
	borderColour: ColourName;
}) => (
	<hr
		css={{
			'&': css(grid.column.all),
			margin: 0,
			width: '100%',
			borderWidth: 0,
			borderBottomWidth: 1,
			[from.leftCol]: {
				display: 'none',
			},
		}}
		style={{
			borderBottomColor: palette(props.borderColour),
			borderBottomStyle: props.borderStyle,
		}}
	/>
);

const Teams = (props: { match: CricketMatch }) => (
	<div
		css={{
			'&': css(grid.column.centre),
			display: 'flex',
			paddingTop: space[2],
			paddingBottom: space[3],
			[from.leftCol]: {
				'&': css(grid.column.centre),
				paddingTop: 0,
				paddingBottom: space[5],
			},
		}}
	>
		<Team team={props.match.homeTeam} match={props.match} />
		<Team team={props.match.awayTeam} match={props.match} />
	</div>
);

const Team = (props: { team: string; match: CricketMatch }) => {
	const innings = props.match.innings.filter(
		(inning) => inning.battingTeam === props.team,
	);
	{
		/* TODO: Calculate if team won and margin/nature of victory */
	}
	const teamIsWinner = Math.random() < 0.5 && props.match.kind === 'Result';
	const marginOfVictory: {
		number: number;
		unit: 'runs' | 'wickets';
	} = {
		number: 4,
		unit: 'runs',
	};

	return (
		<div
			css={{
				flex: '1 1 50%',
				wordBreak: 'break-word',
				borderLeftStyle: 'solid',
				'&:last-of-type': {
					paddingLeft: space[2],
					borderLeftWidth: 1,
				},
				[from.leftCol]: {
					paddingLeft: space[2],
					borderLeftWidth: 1,
					paddingTop: space[3],
				},
			}}
			style={{
				borderLeftColor: palette(border(props.match.kind)),
			}}
		>
			<TeamName name={props.team} />
			<span
				css={{
					display: 'flex',
					// Creates a new stacking context for z-index.
					isolation: 'isolate',
				}}
			>
				<Crest name={props.team} paID={props.team} />
			</span>
			{props.match.kind !== 'Fixture' &&
				(innings.length > 0 ? (
					innings.map((inning) => (
						<>
							<Score
								runs={inning.runsScored}
								fallOfWicket={inning.fallOfWicket}
								matchKind={props.match.kind}
							/>
							{!!inning.overs &&
								props.match.kind !== 'Result' && (
									<>
										<span
											css={{
												...textSans14Object,
												marginRight: space[1],
											}}
										>
											{inning.fallOfWicket.length === 10
												? 'All out'
												: ''}
										</span>
										<span
											css={{
												...textSans12Object,
												display: 'inline-block',
												marginTop: space[2],
												padding: `0 ${space[1]}px 1px ${space[1]}px`,
												border: '1px solid',
												borderRadius: 30,
											}}
										>
											{inning.overs} overs
										</span>
									</>
								)}
						</>
					))
				) : (
					<span
						css={{
							...textSans14Object,
							paddingTop: space[2],
							[from.leftCol]: textSans15Object,
						}}
					>
						Yet to bat
					</span>
				))}
			{teamIsWinner && (
				<div
					css={{
						...textSans14Object,
						paddingTop: space[2],
					}}
				>
					Won by{' '}
					<span css={{ ...textSansBold14Object }}>
						{marginOfVictory.number} {marginOfVictory.unit}
					</span>
				</div>
			)}
		</div>
	);
};

const TeamName = (props: { name: string }) => (
	<p
		css={{
			...headlineBold20Object,
			paddingBottom: space[2],
			[from.leftCol]: headlineBold24Object,
		}}
	>
		{props.name}
	</p>
);

const Crest = (props: { name: string; paID: string }) => (
	<picture
		css={{
			...circleStyles,
			backgroundColor: 'white',
			padding: space[1],
			zIndex: 1,
		}}
	>
		{/* TODO: Do we have cricket team crests? */}
		<FootballCrest
			teamId={props.paID}
			altText={`${props.name} football crest`}
			width={40}
			css={{
				maxWidth: 40,
				maxHeight: 40,
			}}
		/>
	</picture>
);

/**
 * This uses `role="img"` because the score can be made up of multiple inline
 * SVGs used in combination. For example, a 1 and a 2 are combined to make 12.
 * We can't use the `img` tag because the SVGs are inline, and we can't use an
 * SVG `title` tag because that would only work for a single number, not a
 * combined one.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/img_role
 */
const Score = (props: {
	runs: number;
	fallOfWicket?: {
		order: number;
	}[];
	matchKind: CricketMatch['kind'];
}) => (
	<span
		role="img"
		// aria-label={`Score: ${props.score}`}
		css={{
			display: 'flex',
			alignItems: 'center',
			paddingTop: space[2],
			svg: {
				fill: 'var(--svg-fill)',
				height: 30,
			},
			// Adjust kerning between adjacent digits
			'& > * + *': {
				marginLeft: -6,
			},
		}}
		style={{
			borderColor: palette(border(props.matchKind)),
			'--svg-fill': palette(primaryText(props.matchKind)),
		}}
	>
		<ScoreNumber score={props.runs} />
		{props.fallOfWicket !== undefined ? (
			<>
				{/* TODO: Convert dash to SVG? */}
				<span
					css={{
						width: 12,
						height: 2,
						marginLeft: -2,
						marginRight: 6,
						backgroundColor: palette(primaryText(props.matchKind)),
					}}
				></span>
				<ScoreNumber score={props.fallOfWicket.length} />
			</>
		) : null}
	</span>
);

const circleStyles = {
	borderRadius: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: 60,
	height: 60,
};

const ScoreNumber = (props: { score: number }) => {
	if (!Number.isInteger(props.score) || props.score < 0) {
		return null;
	} else if (props.score < 10) {
		return <BigNumber index={props.score} />;
	} else {
		return (
			<>
				<ScoreNumber score={Math.trunc(props.score / 10)} />
				<ScoreNumber score={props.score % 10} />
			</>
		);
	}
};
