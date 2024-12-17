import { FEFootballPageType } from 'src/types/sports';
import { css } from '@emotion/react';
import { MatchList } from './MatchList';

interface Props {
	liveScores: FEFootballPageType;
}

const sportsPageStyles = css`
	padding-top: 0;
	padding-bottom: 2.25rem;
`;

const titleStyles = css`
	font-size: 1.25rem;
	line-height: 1.4375rem;
	font-family: 'Guardian Egyptian Web', Georgia, serif;
	font-weight: 900;
	box-sizing: border-box;
	padding: 0.375rem 0 0.75rem;
	border-top: 0.0625rem dotted;
`;

const matchContainerStyles = css`
	clear: both;
`;

export const LiveScoresPage = ({ liveScores }: Props) => {
	return (
		<article id="article" css={[sportsPageStyles]} role="main">
			<div>
				<h2 css={[titleStyles]}>{liveScores.pageTitle}</h2>
				<div
					css={[matchContainerStyles]}
					data-show-more-contains="football-matches"
				>
					{liveScores.matchesList.map((item) => {
						return <MatchList dateCompetition={item}></MatchList>;
					})}
				</div>
			</div>
		</article>
	);
};
