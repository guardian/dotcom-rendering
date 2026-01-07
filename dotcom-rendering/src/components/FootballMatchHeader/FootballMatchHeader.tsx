import { css } from '@emotion/react';
import {
	from,
	headlineBold20Object,
	headlineBold24Object,
	space,
	textSans14Object,
	textSans15Object,
	textSansBold14Object,
	textSansBold17Object,
} from '@guardian/source/foundations';
import { type ComponentProps, type ReactNode, useMemo } from 'react';
import type { FootballMatch } from '../../footballMatchV2';
import { grid } from '../../grid';
import {
	type EditionId,
	getLocaleFromEdition,
	getTimeZoneFromEdition,
} from '../../lib/edition';
import { palette } from '../../palette';
import { BigNumber } from '../BigNumber';
import { FootballCrest } from '../FootballCrest';
import { Tabs } from './Tabs';

type Props = {
	leagueName: string;
	match: FootballMatch;
	tabs: ComponentProps<typeof Tabs>;
	edition: EditionId;
};

export const FootballMatchHeader = (props: Props) => (
	<section
		css={{
			backgroundColor: palette(
				'--football-match-header-fixture-result-background',
			),
			color: palette(
				'--football-match-header-fixture-result-primary-text',
			),
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
			<StatusLine
				leagueName={props.leagueName}
				match={props.match}
				edition={props.edition}
			/>
			<Hr borderStyle="dotted" />
			<Teams match={props.match} />
			<Hr borderStyle="solid" />
			<Tabs {...props.tabs} />
		</div>
	</section>
);

const StatusLine = (props: {
	leagueName: string;
	match: FootballMatch;
	edition: EditionId;
}) => (
	<p
		css={{
			...textSans14Object,
			'&': css(grid.column.centre),
			color: palette(
				'--football-match-header-fixture-result-secondary-text',
			),
			paddingTop: space[2],
			paddingBottom: space[1],
			[from.leftCol]: {
				'&': css(grid.column.left),
				padding: `${space[3]}px 0 0`,
			},
		}}
	>
		<LeagueName>{props.leagueName}</LeagueName>
		{props.match.venue} •{' '}
		<MatchStatus edition={props.edition} match={props.match} />
	</p>
);

const LeagueName = (props: { children: ReactNode }) => (
	<>
		<span
			css={{
				...textSansBold14Object,
				color: palette(
					'--football-match-header-fixture-result-primary-text',
				),
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

const MatchStatus = (props: { match: FootballMatch; edition: EditionId }) => {
	const kickOffFormatter = useMemo(
		() => kickOffFormatterForEdition(props.edition),
		[props.edition],
	);

	switch (props.match.kind) {
		case 'Fixture':
			return kickOffFormatter.format(props.match.kickOff);
		case 'Live':
			return props.match.status;
		case 'Result':
			return 'FT';
	}
};

const kickOffFormatterForEdition = (edition: EditionId): Intl.DateTimeFormat =>
	new Intl.DateTimeFormat(getLocaleFromEdition(edition), {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		day: 'numeric',
		month: 'short',
		timeZoneName: 'short',
		timeZone: getTimeZoneFromEdition(edition),
	});

const Hr = (props: { borderStyle: 'dotted' | 'solid' }) => (
	<hr
		css={{
			'&': css(grid.column.all),
			margin: 0,
			width: '100%',
			borderWidth: 0,
			borderBottomWidth: 1,
			borderBottomColor: palette(
				'--football-match-header-fixture-result-border',
			),
			[from.leftCol]: {
				display: 'none',
			},
		}}
		style={{ borderBottomStyle: props.borderStyle }}
	/>
);

const Teams = (props: { match: FootballMatch }) => (
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
		<Team team="homeTeam" match={props.match} />
		<Team team="awayTeam" match={props.match} />
	</div>
);

const Team = (props: {
	team: 'homeTeam' | 'awayTeam';
	match: FootballMatch;
}) => (
	<div
		css={{
			flex: '1 1 50%',
			wordBreak: 'break-word',
			borderLeftStyle: 'solid',
			borderLeftColor: palette(
				'--football-match-header-fixture-result-border',
			),
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
	>
		<TeamName name={props.match[props.team].name} />
		<span
			css={{
				display: 'flex',
				// Creates a new stacking context for z-index.
				isolation: 'isolate',
			}}
		>
			<Crest
				name={props.match[props.team].name}
				paID={props.match[props.team].paID}
			/>
			{props.match.kind !== 'Fixture' ? (
				<Score score={props.match[props.team].score} />
			) : null}
		</span>
		{props.match.kind !== 'Fixture' ? (
			<Scorers scorers={props.match[props.team].scorers} />
		) : null}
	</div>
);

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
const Score = (props: { score: number }) => (
	<span
		role="img"
		aria-label={`Score: ${props.score}`}
		css={{
			...circleStyles,
			borderWidth: 1,
			borderStyle: 'solid',
			borderColor: palette(
				'--football-match-header-fixture-result-border',
			),
			transform: 'translateX(-10px)',
			zIndex: 0,
			svg: {
				fill: palette(
					'--football-match-header-fixture-result-primary-text',
				),
				height: 30,
			},
			paddingLeft: 4,
			// For when there are two numbers.
			'& > :nth-of-type(2)': {
				marginLeft: -10,
			},
		}}
	>
		<ScoreNumber score={props.score} />
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
	}

	switch (props.score) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			return <BigNumber index={props.score} />;
		default:
			return (
				<>
					<ScoreNumber score={Math.trunc(props.score / 10)} />
					<ScoreNumber score={props.score % 10} />
				</>
			);
	}
};

const Scorers = (props: { scorers: string[] }) =>
	props.scorers.length === 0 ? null : (
		<ul
			css={{
				...textSans14Object,
				paddingTop: space[2],
				[from.leftCol]: textSans15Object,
			}}
		>
			{props.scorers.map((scorer) => (
				<li key={scorer}>{scorer}</li>
			))}
		</ul>
	);
