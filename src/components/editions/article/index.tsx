// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { background, border, neutral } from '@guardian/src-foundations/palette';
import type { Format } from '@guardian/types';
import { Design, Display, partition } from '@guardian/types';
import { isPicture, Item } from 'item';
import type { FC } from 'react';
import { renderEditionsAll } from 'renderer';
import { getThemeStyles } from 'themeStyles';
import Header from '../header';
import {
	articleMarginStyles,
	articleWidthStyles,
	headerBackgroundColour,
	sidePadding,
	tabletContentWidth,
	wideContentWidth,
} from '../styles';

const wide = wideContentWidth + 12;
const tablet = tabletContentWidth + 12;

// ----- Component ----- //

interface Props {
	item: Item;
}

const mainStyles = css`
	height: 100%;
`;

const articleWrapperStyles = (item: Format): SerializedStyles => css`
	min-height: 100%;
	background-color: ${item.design === Design.Media ? neutral[7] : 'inherit'};
`;

const articleStyles = css`
	${articleMarginStyles}
`;

const headerStyles = css`
	${articleWidthStyles}
	border-bottom: 1px solid ${border.secondary};

	${from.tablet} {
		padding-right: ${remSpace[3]};
		border-right: 1px solid ${border.secondary};
	}
`;

const bodyStyles = css`
	padding-top: ${remSpace[3]};
	padding-bottom: ${remSpace[3]};
	iframe {
		width: 100%;
		border: none;
	}

	figcaption {
		background: ${background.primary};
		padding-bottom: ${remSpace[3]};
	}

	${from.tablet} {
		padding-top: 0;
		padding-bottom: 0;

		p {
			margin: 0;
			padding-top: ${remSpace[3]};
			padding-bottom: ${remSpace[3]};
		}
	}

	${sidePadding}
`;

const bodyWrapperStyles = css`
	${articleWidthStyles}

	${from.tablet} {
		padding-right: ${remSpace[3]};
		border-right: 1px solid ${border.secondary};
	}
`;

const extendedBodyStyles = css`
	height: 100vh;
	background-color: ${neutral[7]};
`;

export const galleryWrapperStyles = css`
	box-sizing: border-box;
	padding-top: ${remSpace[3]};
	padding-right: 0;
	padding-left: 0;
	border: none;
	${from.tablet} {
		width: ${tablet}px;
		padding-right: ${remSpace[4]};
		border-right: 1px solid ${neutral[100]};
	}

	${from.desktop} {
		width: ${wide}px;
	}
`;

const headerBackgroundStyles = (format: Format): SerializedStyles => css`
	background-color: ${headerBackgroundColour(format)};
`;

const itemStyles = (item: Item): SerializedStyles => {
	const { kicker } = getThemeStyles(item.theme);

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
					margin-right: ${remSpace[3]};
				}
			`;

		default:
			return css``;
	}
};

const getSectionStyles = (item: Format): SerializedStyles[] => {
	if (
		item.design === Design.Interview ||
		item.design === Design.Media ||
		item.display === Display.Immersive
	) {
		return [];
	}
	return [headerStyles, articleStyles];
};

const Article: FC<Props> = ({ item }) => {
	console.log(item);
	if (
		item.design === Design.Analysis ||
		item.design === Design.Article ||
		item.design === Design.Comment ||
		item.design === Design.Review ||
		item.design === Design.Interview ||
		item.design === Design.Feature ||
		item.design === Design.Media ||
		item.design === Design.Editorial ||
		item.design === Design.Letter ||
		item.design === Design.Quiz ||
		item.design === Design.Recipe ||
		item.design === Design.MatchReport ||
		item.design === Design.Obituary
	) {
		return (
			<main css={mainStyles}>
				<article css={articleWrapperStyles(item)}>
					<div css={headerBackgroundStyles(item)}>
						<section css={getSectionStyles(item)}>
							<Header item={item} />
						</section>
					</div>
					<div
						css={[
							bodyWrapperStyles,
							articleStyles,
							isPicture(item.tags) && extendedBodyStyles,
							item.design === Design.Media
								? galleryWrapperStyles
								: null,
						]}
					>
						<section css={[bodyStyles, itemStyles(item)]}>
							{renderEditionsAll(item, partition(item.body).oks)}
						</section>
					</div>
				</article>
			</main>
		);
	}

	return <p>Not implemented</p>;
};

// ----- Exports ----- //

export default Article;
