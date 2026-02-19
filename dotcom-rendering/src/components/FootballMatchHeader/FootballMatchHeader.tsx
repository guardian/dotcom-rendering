import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import {
	from,
	headlineBold20Object,
	headlineBold24Object,
	space,
	textSans14Object,
	textSans15Object,
	textSansBold14Object,
	textSansBold17Object,
	until,
} from '@guardian/source/foundations';
import { type ComponentProps, type ReactNode, useMemo } from 'react';
import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import type { FootballMatch } from '../../footballMatchV2';
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
import { Placeholder } from '../Placeholder';
import { background, border, primaryText, secondaryText } from './colours';
import { type HeaderData, parse as parseHeaderData } from './headerData';
import { Tabs } from './Tabs';

export type FootballMatchHeaderData = HeaderData & {
	leagueName: string;
};

export type FootballMatchHeaderProps = {
	initialTab: ComponentProps<typeof Tabs>['selected'];
	matchData?: FootballMatchHeaderData;
	edition: EditionId;
	matchHeaderURL: URL;
};

type Props = FootballMatchHeaderProps & {
	getHeaderData: (url: string) => Promise<unknown>;
	refreshInterval: number;
};

export const FootballMatchHeader = (props: Props) => {
	const { data } = useSWR<HeaderData, string>(
		props.matchHeaderURL,
		fetcher(props.initialTab, props.getHeaderData),
		swrOptions(props.refreshInterval),
	);

	const leagueName = props.matchData?.leagueName ?? ''; // TODO: Get from fetched match header data
	const match = data?.match ?? props.matchData?.match;
	const tabs = data?.tabs ?? props.matchData?.tabs;

	if (match === undefined || tabs === undefined) {
		return (
			<Placeholder
				heights={
					new Map([
						['mobile', 182],
						['leftCol', 172],
					])
				}
			/>
		);
	}

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
				<StatusLine
					leagueName={leagueName}
					match={match}
					edition={props.edition}
				/>
				<Hr borderStyle="dotted" borderColour={border(match.kind)} />
				<Teams match={match} />
				<Hr borderStyle="solid" borderColour={border(match.kind)} />
				<Tabs {...tabs} />
			</div>
		</section>
	);
};

const swrOptions = (refreshInterval: number): SWRConfiguration<HeaderData> => ({
	errorRetryCount: 1,
	refreshInterval: (latestData: HeaderData | undefined) => {
		return latestData?.match.kind === 'Live' ||
			latestData?.match.kind === 'Fixture'
			? refreshInterval
			: 0;
	},
});

const fetcher =
	(selected: Props['initialTab'], getHeaderData: Props['getHeaderData']) =>
	(url: string): Promise<HeaderData> =>
		getHeaderData(url)
			.then(parseHeaderData(selected))
			.then((result) => {
				if (!result.ok) {
					log('dotcom', result.error);
					throw new Error();
				} else {
					return result.value;
				}
			})
			.catch(() => {
				log('dotcom', 'Failed to fetch match header json');
				throw new Error();
			});

const StatusLine = (props: {
	leagueName: string;
	match: FootballMatch;
	edition: EditionId;
}) => (
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
		<LeagueName matchKind={props.match.kind}>{props.leagueName}</LeagueName>
		{props.match.venue ? `${props.match.venue} • ` : null}
		<MatchStatus edition={props.edition} match={props.match} />
	</p>
);

const LeagueName = (props: {
	matchKind: FootballMatch['kind'];
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

const MatchStatus = (props: { match: FootballMatch; edition: EditionId }) => {
	const kickOffFormatter = useMemo(
		() => kickOffFormatterForEdition(props.edition),
		[props.edition],
	);

	switch (props.match.kind) {
		case 'Fixture':
			return kickOffFormatter.format(props.match.kickOff);
		case 'Live':
			return <span css={textSansBold14Object}>{props.match.status}</span>;
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
				<Score
					score={props.match[props.team].score}
					matchKind={props.match.kind}
				/>
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
const Score = (props: { score: number; matchKind: FootballMatch['kind'] }) => (
	<span
		role="img"
		aria-label={`Score: ${props.score}`}
		css={{
			...circleStyles,
			borderWidth: 1,
			borderStyle: 'solid',
			transform: 'translateX(-10px)',
			zIndex: 0,
			svg: {
				fill: 'var(--svg-fill)',
				height: 30,
			},
			paddingLeft: 4,
			// For when there are two numbers.
			'& > :nth-of-type(2)': {
				marginLeft: -10,
			},
		}}
		style={{
			borderColor: palette(border(props.matchKind)),
			'--svg-fill': palette(primaryText(props.matchKind)),
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
