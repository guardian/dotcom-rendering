import { css } from '@emotion/react';
import {
	background,
	headline,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { Score } from './Score';

type Props = {
	homeTeam: TeamType;
	awayTeam: TeamType;
	comments?: string;
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
			background-color: ${palette.brandAlt[400]};
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
				background-color: ${palette.brandAlt[400]};
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
				// This is reasonably unique,
				// unless a single player scores twice in the same minute
				key={player}
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

export const MatchNav = ({ homeTeam, awayTeam, comments }: Props) => (
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
			{!!comments && <Comments comments={comments} />}
		</StretchBackground>
	</div>
);
