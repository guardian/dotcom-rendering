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
import { Fragment, type ReactNode, useMemo } from 'react';
import { grid } from '../../grid';
import {
	type EditionId,
	getLocaleFromEdition,
	getTimeZoneFromEdition,
} from '../../lib/edition';
import { generateImageURL } from '../../lib/image';
import { palette } from '../../palette';
import type { ColourName } from '../../paletteDeclarations';
import { BigNumber } from '../BigNumber';
import {
	background,
	border,
	primaryText,
	secondaryText,
} from '../FootballMatchHeader/colours';

type CricketTeam = {
	name: string;
	paID: string;
};

type Inning = {
	battingTeam: string;
	runsScored: number;
	overs: string;
	declared: boolean;
	forfeited: boolean;
	fallOfWicket: number;
};

type CricketMatch = {
	kind: 'Fixture' | 'Live' | 'Result';
	series: string;
	competition: string;
	venue: string;
	day?: number;
	matchDate: Date;
	homeTeam: CricketTeam;
	awayTeam: CricketTeam;
	innings: Inning[];
};

type Props = {
	edition: EditionId;
	match: CricketMatch;
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

const Team = (props: { team: CricketTeam; match: CricketMatch }) => {
	const innings = props.match.innings.filter(
		(inning) => inning.battingTeam === props.team.name,
	);

	/**
	 * TODO: Determine if there is a match winner and the nature of the victory
	 * (eg. won by x runs or x wickets). A match may have no overall winner due
	 * to a draw or the match being abandoned.
	 */
	const isWinner = false;
	const marginOfVictory = '';

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
			<TeamName name={props.team.name} />
			<span
				css={{
					display: 'flex',
					// Creates a new stacking context for z-index.
					isolation: 'isolate',
				}}
			>
				<Crest name={props.team.name} paID={props.team.paID} />
			</span>
			{props.match.kind !== 'Fixture' &&
				(innings.length > 0 ? (
					innings.map((inning, index) => (
						<Fragment key={index}>
							<Score
								runs={inning.runsScored}
								fallOfWicket={inning.fallOfWicket}
								matchKind={props.match.kind}
							/>
							{!!inning.overs && (
								<>
									<EndOfInningReason inning={inning} />
									<span
										css={{
											...textSans12Object,
											display: 'inline-block',
											marginTop: space[2],
											padding: `0 ${space[1]}px 1px ${space[1]}px`,
											border: '1px solid',
											borderRadius: 30,
											color: palette(
												secondaryText(props.match.kind),
											),
										}}
									>
										{inning.overs} overs
									</span>
								</>
							)}
						</Fragment>
					))
				) : (
					<span
						css={{
							...textSans14Object,
							display: 'inline-block',
							paddingTop: space[2],
							[from.leftCol]: textSans15Object,
						}}
					>
						Yet to bat
					</span>
				))}
			{isWinner && (
				<div
					css={{
						...textSans14Object,
						paddingTop: space[2],
					}}
				>
					Won by{' '}
					<span css={{ ...textSansBold14Object }}>
						{marginOfVictory}
					</span>
				</div>
			)}
		</div>
	);
};

const EndOfInningReason = (props: { inning: Inning }) => {
	const styles = {
		...textSans14Object,
		marginRight: space[1],
	};

	if (props.inning.fallOfWicket === 10) {
		return <span css={styles}>All out</span>;
	}
	if (props.inning.declared) {
		return <span css={styles}>Declared</span>;
	}
	if (props.inning.forfeited) {
		return <span css={styles}>Forfeited</span>;
	}
	return null;
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
		<TeamCrest
			teamId={props.paID}
			altText={`${props.name} cricket crest`}
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
	fallOfWicket: number;
	matchKind: CricketMatch['kind'];
}) => {
	const showFallenWickets = props.fallOfWicket > 0 && props.fallOfWicket < 10;
	return (
		<span
			role="img"
			aria-label={`${props.runs} runs${
				showFallenWickets
					? `, ${props.fallOfWicket} wickets fallen`
					: ''
			}`}
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
			{showFallenWickets ? (
				<>
					{/* TODO: Convert dash to SVG? */}
					<span
						css={{
							width: 12,
							height: 2,
							marginLeft: -2,
							marginRight: 6,
							backgroundColor: palette(
								primaryText(props.matchKind),
							),
						}}
					></span>
					<ScoreNumber score={props.fallOfWicket} />
				</>
			) : null}
		</span>
	);
};

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

type TeamCrestProps = {
	teamId: string;
	altText: string;
	width: number;
	className?: string;
};

/**
 * This is a modified and inlined version of the `FootballCrest` component.
 *
 * TODO: as part of combining the cricket match header with the existing
 * football match header we should refactor this into a single crest component
 * that supports cricket and football, as well as other sports in the future.
 */
const TeamCrest = (props: TeamCrestProps) => {
	const mainImage = crestUrl(props.teamId)?.toString();

	if (mainImage === undefined) {
		return null;
	}

	const lowRes = generateImageURL({
		mainImage,
		imageWidth: props.width,
		resolution: 'low',
	});
	const highRes = generateImageURL({
		mainImage,
		imageWidth: props.width,
		resolution: 'high',
	});

	return (
		<img
			srcSet={`${lowRes}, ${highRes} 2x`}
			src={lowRes}
			alt={props.altText}
			className={props.className}
		/>
	);
};

const crestUrl = (teamId: string): URL | undefined => {
	try {
		return new URL(
			`${teamId}.png`,
			`https://sport.guim.co.uk/cricket/crests/`,
		);
	} catch (e) {
		return undefined;
	}
};
