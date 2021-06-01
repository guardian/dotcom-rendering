import { css } from '@emotion/react';

import {
	brandAlt,
	background,
	border,
} from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { space, palette } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';

import { Score } from '@frontend/web/components/Score';

type Props = {
	homeTeam: TeamType;
	awayTeam: TeamType;
	comments?: string;
	minByMinUrl?: string;
};

const Row = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
		`}
	>
		{children}
	</div>
);

const CrestRow = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
			align-items: flex-end;
		`}
	>
		{children}
	</div>
);

const StretchBackground = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: relative;
			padding: ${space[2]}px;
			background-color: ${brandAlt[400]};
			margin-bottom: 10px;
			${until.tablet} {
				margin: 0 -10px 10px;
			}

			:before {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				width: 100vw;
				left: -100vw;
				background-color: ${brandAlt[400]};
				z-index: -1;
			}
		`}
	>
		{children}
	</div>
);

const Column = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		`}
	>
		{children}
	</div>
);

const TeamName = ({ name }: { name: string }) => (
	<h2
		css={css`
			${headline.xxsmall({ fontWeight: 'bold' })}
		`}
	>
		{name}
	</h2>
);

const Scorers = ({ scorers }: { scorers: string[] }) => (
	<ul
		css={css`
			margin-top: ${space[1]}px;
			margin-bottom: ${space[3]}px;
		`}
	>
		{scorers.map((player) => (
			<li
				css={css`
					${textSans.small()}
				`}
			>
				{player}
			</li>
		))}
	</ul>
);

const Crest = ({ crest }: { crest: string }) => (
	<div
		css={css`
			position: relative;
			width: 3.75rem;
			height: 3.75rem;
			border-radius: 1.875rem;
			background-color: ${background.primary};
			z-index: 1;
		`}
	>
		<img
			css={css`
				position: absolute;
				left: 0.5rem;
				right: 0.5rem;
				bottom: 0.5rem;
				top: 0.5rem;
				max-width: calc(100% - 1rem);
				max-height: calc(100% - 1rem);
				margin: auto;
				display: block;
			`}
			src={crest}
			alt=""
		/>
	</div>
);

const TeamNav = ({
	name,
	score,
	crest,
	scorers,
}: {
	name: string;
	score: number;
	crest: string;
	scorers: string[];
}) => (
	<div
		css={css`
			display: flex;
			flex-grow: 1;
			flex-basis: 50%;
		`}
	>
		<Column>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					flex-grow: 1;
				`}
			>
				<TeamName name={name} />
				<Scorers scorers={scorers} />
			</div>
			<CrestRow>
				<Crest crest={crest} />
				<div
					css={css`
						margin-left: -${space[2]}px;
					`}
				>
					<Score score={score} />
				</div>
			</CrestRow>
		</Column>
	</div>
);

const Comments = ({ comments }: { comments: string }) => (
	<div
		css={css`
			${textSans.small()}
			margin-top: ${space[2]}px;
			padding-top: ${space[1]}px;
			font-style: italic;
			/* stylelint-disable-next-line color-no-hex */
			border-top: 1px solid #d0bb04;
		`}
	>
		{comments}
	</div>
);

const YellowBorder = () => (
	<div
		css={css`
			/* stylelint-disable-next-line color-no-hex */
			border-left: 1px solid #d0bb04;
			margin-left: ${space[1]}px;
			width: ${space[2]}px;
		`}
	/>
);

const thinGreySolid = `1px solid ${border.secondary}`;

const GreyBorder = () => (
	<div
		css={css`
			/* stylelint-disable-next-line color-no-hex */
			border-left: ${thinGreySolid};
			margin-left: ${space[1]}px;
			width: ${space[2]}px;
		`}
	/>
);

const tabsContainer = css`
	display: flex;
	position: relative;
	border-bottom: ${thinGreySolid};
`;

const tab = css`
	flex-basis: 50%;
	height: 40px;
	border-top: 3px solid ${border.secondary};

	:nth-child(1) {
		border-top: 3px solid ${palette.sport[300]};
	}
`;

const tabLink = css`
	color: ${palette.sport[300]};
	display: block;
	text-decoration: none;
	&:hover {
		background-color: ${palette.neutral[93]};
	}
`;

const tabLabel = css`
	${headline.xxxsmall()};
	background: transparent;
	padding: 6px 8px 0;
	text-align: left;
	font-weight: 600;
	min-height: 36px;
	display: block;
	width: 100%;
`;

const MatchTabs = ({ minByMinUrl }: { minByMinUrl?: string }) => (
	<div>
		<ul css={tabsContainer}>
			<li css={tab}>
				<span css={tabLabel}>Report</span>
			</li>
			<GreyBorder />
			<li css={tab}>
				<a href={minByMinUrl} data-link-name="Min-by-min" css={tabLink}>
					<span css={tabLabel}>Min-by-min</span>
				</a>
			</li>
		</ul>
	</div>
);

export const MatchNav = ({
	homeTeam,
	awayTeam,
	comments,
	minByMinUrl,
}: Props) => (
	<div>
		<StretchBackground>
			<Row>
				<TeamNav
					name={homeTeam.name}
					score={homeTeam.score}
					crest={homeTeam.crest}
					scorers={homeTeam.scorers}
				/>
				<YellowBorder />
				<TeamNav
					name={awayTeam.name}
					score={awayTeam.score}
					crest={awayTeam.crest}
					scorers={awayTeam.scorers}
				/>
			</Row>
			{comments && <Comments comments={comments} />}
		</StretchBackground>
		{minByMinUrl && <MatchTabs minByMinUrl={minByMinUrl} />}
	</div>
);
