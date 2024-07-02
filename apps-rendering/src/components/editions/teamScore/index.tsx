import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { FootballTeam } from '@guardian/apps-rendering-api-models/footballTeam';
import type { Scorer } from '@guardian/apps-rendering-api-models/scorer';
import {
	from,
	headlineBold20,
	headlineBold42,
	neutral,
	remSpace,
	textSans15,
} from '@guardian/source/foundations';
import { fromNullable } from '../../../../vendor/@guardian/types/index';
import { TeamLocation } from 'football';
import { maybeRender } from 'lib';

interface Props {
	team: FootballTeam;
	location: TeamLocation;
}

const styles = (location: TeamLocation): SerializedStyles => css`
	display: flex;
	flex-direction: row;
	border-top: 1px dotted ${neutral[0]};
	padding-top: ${remSpace[1]};
	margin-top: ${remSpace[3]};
	box-sizing: border-box;
	flex: 1;

	${from.phablet} {
		display: flex;
		width: 50%;
		vertical-align: top;
		flex: 1;
		flex-direction: column-reverse;
		justify-content: space-between;

		${location === TeamLocation.Home
			? `border-right: 1px dotted ${neutral[0]};`
			: ''};
	}

	${from.tablet} {
		border-right: 1px dotted ${neutral[0]};
	}
`;

const teamNameStyles = css`
	${headlineBold20};
	margin: 0;
`;

const scoreStyles = (location: TeamLocation): SerializedStyles => css`
	${headlineBold42};
	margin-right: ${remSpace[3]};

	${from.phablet} {
		${location === TeamLocation.Away ? `margin-left: ${remSpace[3]};` : ''}
	}
`;

const scoreNumberStyles = css`
	border: 1px solid ${neutral[0]};
	border-radius: 100%;
	display: block;
	width: 1.5em;
	height: 1.5em;
	position: relative;
	text-align: center;
	margin-top: ${remSpace[1]};

	${from.phablet} {
		margin-top: ${remSpace[2]};
	}
`;

const scoreInlineStyles = css`
	position: relative;
	top: 7%;
`;

const infoStyles = (location: TeamLocation): SerializedStyles => css`
	${from.phablet} {
		${location === TeamLocation.Away ? `margin-left: ${remSpace[3]};` : ''}
	}
`;

const scorerStyles = (location: TeamLocation): SerializedStyles => css`
	${textSans15};
	list-style: none;
	margin: 0;
	padding: 0;

	${from.tablet} {
		${location === TeamLocation.Home ? 'grid-column: 1;' : ''}
	}
`;

const TeamScore = ({ team, location }: Props) => {
	const scorers = fromNullable(team.scorers);
	return (
		<section css={styles(location)}>
			<div css={scoreStyles(location)}>
				<div css={scoreNumberStyles}>
					<span css={scoreInlineStyles}>{team.score}</span>
				</div>
			</div>
			<div css={infoStyles(location)}>
				<h3 css={teamNameStyles}>{team.name}</h3>
				{maybeRender(scorers, (s: Scorer[]) => (
					<ul css={scorerStyles(location)} role="list">
						{s.map((scorer: Scorer) => (
							<li key={`${scorer.player}`}>
								{scorer.player} {scorer.timeInMinutes}&apos;{' '}
								{scorer.additionalInfo}
							</li>
						))}
					</ul>
				))}
			</div>
		</section>
	);
};

export { TeamScore };
