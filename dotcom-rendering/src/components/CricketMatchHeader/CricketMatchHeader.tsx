import { css } from '@emotion/react';
import { log } from '@guardian/libs';
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
	textSansItalic14Object,
	textSansItalic15Object,
	until,
} from '@guardian/source/foundations';
import { Fragment, type ReactNode, useEffect, useMemo, useState } from 'react';
import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import type {
	CricketMatch,
	CricketResult,
	CricketTeam,
} from '../../cricketMatchV2';
import { grid } from '../../grid';
import { ArticleDesign, type ArticleFormat } from '../../lib/articleFormat';
import { getCommercialClient } from '../../lib/bridgetApi';
import {
	type EditionId,
	getLocaleFromEdition,
	getTimeZoneFromEdition,
} from '../../lib/edition';
import { generateImageURL } from '../../lib/image';
import { useLocationHash } from '../../lib/useLocationHash';
import { palette } from '../../palette';
import type { ColourName } from '../../paletteDeclarations';
import type { ArticleDeprecated } from '../../types/article';
import type { RenderingTarget } from '../../types/renderingTarget';
import { BigNumber } from '../BigNumber';
import { CricketScorecardTabRemoteRender } from '../CricketScorecardTabRemoteRender';
import {
	background,
	border,
	primaryText,
	secondaryText,
} from '../FootballMatchHeader/colours';
import { Tabs } from '../FootballMatchHeader/Tabs';
import { MatchHeaderFallback } from '../MatchHeaderFallback';
import { Placeholder } from '../Placeholder';
import type { CricketHeaderData } from './headerData';
import { parse as parseHeaderData } from './headerData';

export type CricketMatchHeaderProps = {
	matchHeaderURL: string;
	edition: EditionId;
	selectedTab: 'info' | 'live' | 'report';
	tabContentId: string;
	format: ArticleFormat;
	article: ArticleDeprecated;
	renderingTarget: RenderingTarget;
};

type Props = CricketMatchHeaderProps & {
	getHeaderData: (url: string) => Promise<unknown>;
	refreshInterval: number;
};

export const getUrl = (
	baseUrl: URL | undefined,
	renderingTarget: RenderingTarget,
): URL | undefined => {
	if (!baseUrl) return undefined;

	const url = new URL(baseUrl);
	if (renderingTarget === 'Apps') {
		url.searchParams.set('dcr', 'apps');
	}
	return url;
};

export const CricketMatchHeader = (props: Props) => {
	const scorecardHashbang = '#scorecard';
	const locationHash = useLocationHash();
	const currentUrl = new URL(
		`${props.article.guardianBaseURL}${props.article.pageId}`,
	);

	const { data, error } = useSWR<CricketHeaderData, Error>(
		props.matchHeaderURL,
		fetcher(props.getHeaderData, props.selectedTab, currentUrl),
		swrOptions(props.refreshInterval),
	);

	const [selectedTab, setSelectedTab] = useState<'info' | 'live' | 'report'>(
		props.selectedTab,
	);

	const [tabContentElement, setTabContentElement] =
		useState<HTMLElement | null>(null);

	useEffect(() => {
		if (locationHash === scorecardHashbang) {
			// eslint-disable-next-line react-hooks/set-state-in-effect -- we want to set the selected tab based on the hashbang in the URL
			setSelectedTab('info');
		}
	}, [locationHash]);

	useEffect(() => {
		const el = document.getElementById(props.tabContentId);
		if (el) {
			// eslint-disable-next-line react-hooks/set-state-in-effect -- We need to capture the element client side
			setTabContentElement(el);
		}
	}, [props.tabContentId]);

	if (error) {
		if (
			props.format.design === ArticleDesign.LiveBlog ||
			props.format.design === ArticleDesign.DeadBlog
		) {
			return (
				<MatchHeaderFallback
					format={props.format}
					article={props.article}
				/>
			);
		}
	}

	if (data === undefined) {
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

	const { match, tabs } = data;

	const onInfoTabClick = () => {
		setSelectedTab('info');
		window.location.hash = scorecardHashbang;

		if (props.renderingTarget == 'Apps') {
			// Remove ads by inserting a list of empty ad slots
			void getCommercialClient().insertAdverts([]);
		}
	};

	return (
		<section
			style={{
				backgroundColor: palette(background(match.kind)),
				color: palette(primaryText(match.kind)),
			}}
		>
			<div
				css={{
					'&': css(
						grid.paddedContainer,
						grid.outerRules(
							palette(
								'--football-match-header-fixture-result-border',
							),
						),
					),
					[from.tablet]: {
						borderColor: palette(
							'--football-match-header-fixture-result-border',
						),
					},
				}}
			>
				<StatusLine match={match} edition={props.edition} />
				<Hr borderStyle="dotted" borderColour={border(match.kind)} />
				<Teams match={match} />
				{match.result && <ResultLine result={match.result} />}
				<Hr borderStyle="solid" borderColour={border(match.kind)} />
				<Tabs
					sportKind="cricket"
					matchKind={match.kind}
					selected={selectedTab}
					reportTab={getUrl(tabs.reportURL, props.renderingTarget)}
					liveTab={getUrl(tabs.liveURL, props.renderingTarget)}
					infoTab={onInfoTabClick}
				/>
			</div>
			{selectedTab === 'info' && (
				<CricketScorecardTabRemoteRender
					tabContentElement={tabContentElement ?? undefined}
					innings={match.innings}
					officials={match.officials}
					homeTeam={match.homeTeam}
					awayTeam={match.awayTeam}
					result={match.result}
				/>
			)}
		</section>
	);
};

const swrOptions = (
	refreshInterval: number,
): SWRConfiguration<CricketHeaderData> => ({
	errorRetryCount: 1,
	refreshInterval: (latestData: CricketHeaderData | undefined) => {
		return latestData?.match.kind === 'Live' ||
			latestData?.match.kind === 'Fixture'
			? refreshInterval
			: 0;
	},
});

const fetcher =
	(
		getHeaderData: Props['getHeaderData'],
		selectedTab: 'info' | 'live' | 'report',
		currentUrl: URL,
	) =>
	(url: string): Promise<CricketHeaderData> =>
		getHeaderData(url)
			.then(parseHeaderData(selectedTab, currentUrl))
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
			{props.match.competition}, {props.match.venue}
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

	if (props.match.kind === 'Fixture') {
		return (
			<span> • {matchDateFormatter.format(props.match.matchDate)}</span>
		);
	}

	if (props.match.day !== undefined) {
		return (
			<>
				<span> • </span>
				<span css={textSansBold14Object}>Day {props.match.day}</span>
			</>
		);
	}

	return null;
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

	return (
		<div
			css={{
				flex: '1 1 50%',
				wordBreak: 'break-word',
				borderLeftStyle: 'solid',
				borderLeftColor: 'var(--border-left-colour)',
				'&:last-of-type': {
					paddingLeft: space[2],
					borderLeftWidth: 1,
				},
				[from.leftCol]: {
					paddingTop: space[3],
					position: 'relative',
					'&:first-of-type::before': {
						content: '""',
						top: 0,
						left: -10,
						width: 1,
						backgroundColor: 'var(--border-left-colour)',
						position: 'absolute',
						height: '100%',
					},
				},
			}}
			style={{
				'--border-left-colour': palette(border(props.match.kind)),
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
					innings
						.sort((a, b) => a.order - b.order)
						.map((inning, index) => (
							<Fragment key={index}>
								<Score
									runs={inning.inningsTotals.runs}
									fallOfWickets={inning.inningsTotals.wickets}
									matchKind={props.match.kind}
								/>
								{!!inning.inningsTotals.overs && (
									<>
										<EndOfInningReason
											inning={{
												wickets:
													inning.inningsTotals
														.wickets,
												declared: inning.declared,
												forfeited: inning.forfeited,
											}}
										/>
										<span
											css={{
												...textSans12Object,
												display: 'inline-block',
												marginTop: space[2],
												padding: `0 ${space[1]}px 1px ${space[1]}px`,
												border: '1px solid',
												borderRadius: 30,
												color: palette(
													secondaryText(
														props.match.kind,
													),
												),
											}}
										>
											{inning.inningsTotals.overs} overs
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
		</div>
	);
};

const EndOfInningReason = (props: {
	inning: {
		wickets: number;
		declared: boolean;
		forfeited: boolean;
	};
}) => {
	const styles = {
		...textSans14Object,
		marginRight: space[1],
	};

	if (props.inning.wickets === 10) {
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
	fallOfWickets: number;
	matchKind: CricketMatch['kind'];
}) => {
	const showFallenWickets =
		props.fallOfWickets >= 0 && props.fallOfWickets < 10;
	return (
		<span
			role="img"
			aria-label={`${props.runs} runs${
				showFallenWickets
					? `, ${props.fallOfWickets} wickets fallen`
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
					<ScoreNumber score={props.fallOfWickets} />
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

/**
 * In most cases, the result will come with a description that we can use directly.
 * But in some cases, we just get the data about the result and need to generate
 * a description from that.
 */
const resultDescription = (result: CricketResult): string => {
	if (result.description) {
		return result.description;
	}

	switch (result.type) {
		case 'home-win':
		case 'away-win':
			if (result.winner.type === 'forfeit') {
				return `${result.winner.team} win by forfeit`;
			}
			if (
				['runs', 'wickets', 'innings'].includes(result.winner.type) &&
				typeof result.winner.margin === 'number'
			) {
				return `${result.winner.team} win by ${result.winner.margin} ${result.winner.type}`;
			}
			if (result.winner.type === 'run-rate') {
				// Run-rate is an old method of deciding a winner in rain-affected matches before DLS
				return `${result.winner.team} win by run rate`;
			}
			return `${result.winner.team} win`;
		// none is usually accompanied by a description, but if it's not, "No result" seems like a reasonable default
		case 'none':
		case 'no-result':
			return 'No result';
		case 'draw':
		case 'level-scores-draw':
			return 'Match drawn';
		case 'abandoned':
			return 'Match abandoned';
		case 'tied':
			return 'Match tied';
	}
};

const ResultLine = (props: { result: CricketResult }) => {
	const description = resultDescription(props.result);
	return (
		<div
			css={{
				'&': css(grid.column.centre),
				paddingBottom: space[3],
				[from.leftCol]: {
					paddingLeft: 10,
					paddingBottom: space[5],
				},
			}}
		>
			<p
				css={{
					...textSansItalic14Object,
					[from.leftCol]: textSansItalic15Object,
				}}
			>
				{description}
			</p>
		</div>
	);
};
