// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { Lines } from '@guardian/src-ed-lines';
import { remSpace } from '@guardian/src-foundations';
import { breakpoints, from } from '@guardian/src-foundations/mq';
import { background, neutral } from '@guardian/src-foundations/palette';
import { Display, map, none, withDefault } from '@guardian/types';
import FootballScores from 'components/footballScores';
import Footer from 'components/footer';
import Headline from 'components/headline';
import ImmersiveCaption from 'components/immersiveCaption';
import Metadata from 'components/metadata';
import Series from 'components/series';
import Body from 'components/shared/articleBody';
import Epic from 'components/shared/epic';
import OptionalLogo from 'components/shared/logo';
import RelatedContent from 'components/shared/relatedContent';
import Tags from 'components/shared/tags';
import Standfirst from 'components/standfirst';
import HeaderMedia from 'headerMedia';
import type {
	Item,
	MatchReport as MatchReportItem,
	Review as ReviewItem,
	Standard as StandardItem,
} from 'item';
import { maybeRender, pipe2 } from 'lib';
import React from 'react';
import type { FC, ReactNode } from 'react';
import {
	articleWidthStyles,
	darkModeCss,
	lineStyles,
	onwardStyles,
} from 'styles';
import { getThemeStyles, themeToPillarString } from 'themeStyles';

// ----- Styles ----- //

const Styles = css`
	background: ${neutral[97]};
`;

const DarkStyles = darkModeCss`
    background: ${background.inverse};
`;

const BorderStyles = css`
	background: ${neutral[100]};
	${darkModeCss`background: ${background.inverse};`}

	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
`;

const itemStyles = (item: Item): SerializedStyles => {
	const { kicker, inverted } = getThemeStyles(item.theme);

	switch (item.display) {
		case Display.Immersive:
			return css`
				> p:first-of-type:first-letter,
				> hr + p:first-letter {
					color: ${kicker};
					display: inline-block;
					vertical-align: text-top;
					line-height: 5.625rem;
					font-size: 6.8125rem;
					display: inline-block;
					font-weight: 900;
					float: left;
					margin-right: ${remSpace[2]};

					${darkModeCss`
                        color: ${inverted};
                    `}
				}
			`;

		default:
			return css``;
	}
};

interface Props {
	item: StandardItem | ReviewItem | MatchReportItem;
	children: ReactNode[];
}

const Standard: FC<Props> = ({ item, children }) => {
	// client side code won't render an Epic if there's an element with this id
	const epicContainer = item.shouldHideReaderRevenue ? null : (
		<div css={articleWidthStyles} id="epic-placeholder">
			<Epic title="" body="" firstButton="" secondButton="" />
		</div>
	);

	const commentContainer = item.commentable
		? pipe2(
				item.internalShortId,
				map((id) => (
					<section
						css={onwardStyles}
						id="comments"
						data-closed={false}
						data-pillar={themeToPillarString(item.theme)}
						data-short-id={id}
					></section>
				)),
				withDefault(<></>),
		  )
		: null;

	const matchScores = 'football' in item ? item.football : none;

	return (
		<main css={[Styles, DarkStyles]}>
			<article className="js-article" css={BorderStyles}>
				{maybeRender(matchScores, (scores) => (
					<div id="js-football-scores">
						<FootballScores
							league={scores.league}
							stadium={scores.stadium}
							homeTeam={scores.homeTeam}
							awayTeam={scores.awayTeam}
							status={scores.status}
						/>
					</div>
				))}
				<header>
					<HeaderMedia item={item} />
					<Series item={item} />
					<Headline item={item} />
					<div css={articleWidthStyles}>
						<Standfirst item={item} />
						<ImmersiveCaption item={item} />
					</div>
					<div css={lineStyles}>
						<Lines count={4} />
					</div>
					<section css={articleWidthStyles}>
						<Metadata item={item} />
						{OptionalLogo(item)}
					</section>
				</header>
				<Body
					className={[articleWidthStyles, itemStyles(item)]}
					format={item}
				>
					{children}
				</Body>
				{epicContainer}
				<section className="js-tags" css={articleWidthStyles}>
					<Tags tags={item.tags} format={item} />
				</section>
			</article>
			<section css={onwardStyles}>
				<RelatedContent content={item.relatedContent} />
			</section>
			{commentContainer}
			<Footer isCcpa={false} />
		</main>
	);
};

// ----- Exports ----- //

export default Standard;
