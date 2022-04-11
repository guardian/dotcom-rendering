// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	background,
	border,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	between,
	from,
	headline,
	neutral,
	remSpace,
	textSans,
	until,
} from '@guardian/source-foundations';
import StarRating from 'components/starRating';
import { headlineBackgroundColour, headlineTextColour } from 'editorialStyles';
import type { Item } from 'item';
import type { ReactElement } from 'react';
import { articleWidthStyles, darkModeCss, wideContentWidth } from 'styles';

// ----- Component ----- //

interface Props {
	item: Item;
}

const styles = (format: ArticleFormat): SerializedStyles => css`
	${headline.medium()}
	${headlineTextColour(format)}
    ${headlineBackgroundColour(format)}
    padding-bottom: ${remSpace[6]};
	margin: 0;

	${articleWidthStyles}
`;

const immersiveStyles = css`
	${headline.medium({ fontWeight: 'bold' })}
	font-weight: 700;
	padding: ${remSpace[1]} ${remSpace[3]} ${remSpace[6]} ${remSpace[3]};
	margin: calc(80vh - 5rem) 0 0;
	position: relative;
	display: inline-block;
	min-height: 112px;
	box-sizing: border-box;

	${between.phablet.and.wide} {
		width: ${wideContentWidth}px;
	}

	${from.desktop} {
		${headline.xlarge({ fontWeight: 'bold' })}
		margin-top: calc(80vh - 7rem);
	}

	${from.wide} {
		width: 100%;
		margin-left: calc(
			((100% - ${wideContentWidth}px) / 2) - ${remSpace[3]}
		);
		padding-left: ${remSpace[3]};

		span {
			display: block;
			width: ${wideContentWidth}px;
		}
	}
`;

const analysisStyles = (format: ArticleFormat): SerializedStyles => css`
	${headline.medium({ lineHeight: 'regular', fontWeight: 'light' })}

	span {
		box-shadow: inset 0 -0.025rem ${border.articleLink(format)};
		padding-bottom: 0.2rem;

		${darkModeCss`
            box-shadow: inset 0 -0.025rem ${neutral[46]};
        `}
	}
`;

const mediaStyles = css`
	${headline.medium({ fontWeight: 'medium' })}
`;

const featureStyles = css`
	${headline.medium({ fontWeight: 'bold' })}
`;

const interviewStyles = css`
	${headline.medium({ fontWeight: 'bold' })}
	line-height: 42px;
	${until.tablet} {
		${headline.small({ fontWeight: 'bold' })};
		line-height: 35px;
	}
`;

const commentStyles = css`
	${headline.medium({ fontWeight: 'light' })}
	padding-bottom: ${remSpace[1]};
`;

const labsStyles = css`
	${textSans.xxxlarge({ lineHeight: 'regular' })}
`;

const immersiveLabs = css`
	${textSans.xxxlarge({ lineHeight: 'regular', fontWeight: 'bold' })}
	${from.desktop} {
		${textSans.xxxlarge({ lineHeight: 'regular', fontWeight: 'bold' })}
	}
`;

// stop headlines from growing in size with font resizer
const fontSizeRestriction = css`
	font-size: 28px;
	${from.tablet} {
		font-size: 34px;
	}
`;

const liveblogStyles = css`
	padding: 0 0 ${remSpace[5]};
`;

const getStyles = (format: ArticleFormat): SerializedStyles => {
	if (format.display === ArticleDisplay.Immersive) {
		const labs =
			format.theme === ArticleSpecial.Labs ? immersiveLabs : null;
		return css(styles(format), immersiveStyles, labs);
	}

	if (format.theme === ArticleSpecial.Labs) {
		return css(styles(format), labsStyles, fontSizeRestriction);
	}

	switch (format.design) {
		case ArticleDesign.Analysis:
			return css(
				styles(format),
				analysisStyles(format),
				fontSizeRestriction,
			);
		case ArticleDesign.Feature:
			return css(styles(format), featureStyles, fontSizeRestriction);
		case ArticleDesign.Interview:
			return css(styles(format), interviewStyles, fontSizeRestriction);
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return css(styles(format), commentStyles, fontSizeRestriction);
		case ArticleDesign.Media:
			return css(styles(format), mediaStyles, fontSizeRestriction);

		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return css(styles(format), fontSizeRestriction, liveblogStyles);

		default:
			return css(styles(format), fontSizeRestriction);
	}
};

// const Headline = ({ item }: Props): ReactElement => (
// 	<h1 css={getStyles(item)}>
// 		<span>{item.headline}</span>
// 		<StarRating item={item} />
// 	</h1>
// );

const headlineTagWrapper = css`
	${articleWidthStyles}
`;

const headlineTagStyles = (format: ArticleFormat) => css`
	background-color: ${background.headlineTag(format)};
	color: ${neutral[100]};
	${headline.xxsmall({ fontWeight: 'bold', lineHeight: 'loose' })}
	display: inline-block;
	box-decoration-break: clone;
	padding: 0 ${remSpace[1]};
`;

const invertedStyles = (format: ArticleFormat) => css`
	position: relative;
	white-space: pre-wrap;
	padding: 0 ${remSpace[1]} ${remSpace[1]} ${remSpace[1]};
	box-shadow: -6px 0 0 ${background.headline(format)};
	/* Box decoration is required to push the box shadow out on Firefox */
	box-decoration-break: clone;
`;

const headlineStyles = (format: ArticleFormat): SerializedStyles => {
	return css`
		color: ${neutral[100]};
		background-color: ${neutral[0]};
		${invertedStyles(format)};
		display: inline;
	`;
};

export const HeadlineTag = ({
	tagText,
	format,
}: {
	tagText: string;
	format: ArticleFormat;
}) => (
	<div css={headlineTagWrapper}>
		<div css={headlineTagStyles(format)}>{tagText}</div>
	</div>
);

const HeadlineByline = ({
	format,
	byline,
}: {
	format: ArticleFormat;
	byline: String;
}) => {
	console.log({ byline });
	switch (format.design) {
		case ArticleDesign.Interview:
			return <div>{byline}</div>;
		default:
			return null;
	}
};

const Headline = ({ item }: Props): ReactElement => {
	const format = {
		design: item.design,
		theme: item.theme,
		display: item.display,
	};
	switch (item.design) {
		case ArticleDesign.Interview:
			return (
				<>
					<HeadlineTag tagText="Interview" format={format} />
					<h1 css={getStyles(item)}>
						<span css={headlineStyles(format)}>
							{item.headline}
						</span>
					</h1>
					<HeadlineByline format={format} byline={item.byline} />
				</>
			);
		default:
			console.log(item.design);
			return (
				<h1 css={getStyles(item)}>
					<span>{item.headline}</span>
					<StarRating item={item} />
				</h1>
			);
	}
};

// ----- Exports ----- //

export default Headline;
