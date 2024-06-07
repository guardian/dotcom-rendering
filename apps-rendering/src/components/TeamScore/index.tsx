import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { FootballTeam } from '@guardian/apps-rendering-api-models/footballTeam';
import {
	from,
	headlineBold20,
	headlineBold42,
	neutral,
	remSpace,
	textSans15,
} from '@guardian/source/foundations';
import { TeamLocation } from 'football';
import type { FC } from 'react';

interface Props {
	team: FootballTeam;
	location: TeamLocation;
}

const styles = (location: TeamLocation): SerializedStyles => css`
	display: grid;
	grid-template-columns: auto 1fr;
	border-top: 1px dotted ${neutral[0]};
	padding-top: ${remSpace[1]};
	margin-top: ${remSpace[3]};
	box-sizing: border-box;

	${from.phablet} {
		display: inline-grid;
		width: 50%;
		vertical-align: top;
		grid-template-columns: 1fr auto;

		${location === TeamLocation.Home
			? `border-right: 1px dotted ${neutral[0]};`
			: ''};
	}
`;

const teamNameStyles = (location: TeamLocation): SerializedStyles => css`
	${headlineBold20};
	margin: 0;
	grid-column: 2;
	grid-row: 1;

	${from.phablet} {
		${location === TeamLocation.Home ? 'grid-column: 1;' : ''}
	}
`;

const scoreStyles = (location: TeamLocation): SerializedStyles => css`
	${headlineBold42};
	grid-column: 1;
	grid-row: 1 / 3;
	margin-right: ${remSpace[4]};

	${from.phablet} {
		${location === TeamLocation.Home ? 'grid-column: 2;' : ''}
		${location === TeamLocation.Away ? `margin-left: ${remSpace[4]};` : ''}
	}
`;

const scoreNumberStyles = css`
	border: 1px solid ${neutral[0]};
	border-radius: 100%;
	display: block;
	width: 1.5em;
	height: 1.5em;
	position: relative;
`;

const scoreInlineStyles = css`
	position: absolute;
	top: 7%;
	left: 29%;
`;

const scorerStyles = (location: TeamLocation): SerializedStyles => css`
	${textSans15};
	list-style: none;
	margin: 0;
	padding: 0;
	grid-column: 2;
	grid-row: 2;

	${from.phablet} {
		${location === TeamLocation.Home ? 'grid-column: 1;' : ''}
	}
`;

const TeamScore: FC<Props> = ({ team, location }) => (
	<section css={styles(location)}>
		<h3 css={teamNameStyles(location)}>{team.name}</h3>
		<div css={scoreStyles(location)}>
			<div css={scoreNumberStyles}>
				<span css={scoreInlineStyles}>{team.score}</span>
			</div>
		</div>
		{team.scorers.length > 0 && (
			<ul css={scorerStyles(location)} role="list">
				{team.scorers.map((scorer) => (
					<li key={`${scorer.player}`}>
						{scorer.player} {scorer.timeInMinutes}&apos;{' '}
						{scorer.additionalInfo}
					</li>
				))}
			</ul>
		)}
	</section>
);

export { TeamScore };
