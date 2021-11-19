import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { RelatedItem } from '@guardian/apps-rendering-api-models/relatedItem';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import Img from '@guardian/common-rendering/src/components/img';
import { border } from '@guardian/common-rendering/src/editorialPalette';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import {
	background,
	labs,
	neutral,
	opinion,
	text,
} from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { SvgAudio, SvgCamera, SvgQuote, SvgVideo } from '@guardian/src-icons';
import {
	fromNullable,
	map,
	none,
	OptionKind,
	withDefault,
} from '@guardian/types';
import type { Option } from '@guardian/types';
import { stars } from 'components/starRating';
import { formatSeconds, makeRelativeDate } from 'date';
import type { Image } from 'image';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';
import { darkModeCss } from 'styles';
import { getThemeStyles, themeFromString } from 'themeStyles';

interface Props {
	relatedItem: RelatedItem;
	image: Option<Image>;
}

const borderColor = (
	type: RelatedItemType,
	format: ArticleFormat,
): SerializedStyles => {
	if (type === RelatedItemType.ADVERTISEMENT_FEATURE) {
		return css`1px solid ${labs[300]}`;
	} else {
		return css`1px solid ${getThemeStyles(format.theme).kicker}`;
	}
};

const listStyles = (
	type: RelatedItemType,
	format: ArticleFormat,
): SerializedStyles => {
	return css`
		background: white;
		margin-right: ${remSpace[2]};
		flex: 0 0 42vw;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-top: ${borderColor(type, format)};
		max-width: 10rem;

		&.fade {
			opacity: 0.7;
		}

		${darkModeCss`
            background: ${neutral[7]};
        `}

		${from.tablet} {
			margin-right: ${remSpace[5]};
		}

		${from.desktop} {
			max-width: 13.75rem;
		}

		&:last-of-type {
			margin-right: 0;
		}
	`;
};

const fullWidthImage = css`
	img {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;

		position: relative;
	}
`;

const timeStyles = (type: RelatedItemType): SerializedStyles => {
	switch (type) {
		case RelatedItemType.VIDEO:
		case RelatedItemType.AUDIO:
		case RelatedItemType.GALLERY: {
			return css`
				${textSans.small()};
				color: ${text.ctaPrimary};
				text-align: right;
				display: inline-block;
				vertical-align: top;
				font-weight: 700;
			`;
		}
		default:
			return css`
				${textSans.small()};
				color: ${text.supporting};
				text-align: right;
				display: inline-block;
				vertical-align: top;
				font-weight: 700;
			`;
	}
};

const durationStyles = css`
	margin-left: ${remSpace[3]};
`;

const dateStyles = css`
	float: right;
`;

const anchorStyles = css`
	color: ${neutral[7]};
	text-decoration: none;
	${darkModeCss`
        color: ${neutral[86]};
    `}
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const headingWrapperStyles = css`
	padding: 0.125rem ${remSpace[2]} ${remSpace[4]};
	flex-grow: 1;
`;

const headingStyles = (type: RelatedItemType): SerializedStyles => {
	if (type === RelatedItemType.ADVERTISEMENT_FEATURE) {
		return css`
			${textSans.medium({ lineHeight: 'regular' })}
			margin: 0;
		`;
	} else {
		return css`
			${headline.xxxsmall()}
			margin: 0;

			${from.desktop} {
				${headline.xxsmall()}
			}
		`;
	}
};

const imageWrapperStyles = css`
	position: relative;
`;

const imageBackground = css`
	background: ${neutral[86]};
`;

const relativeFirstPublished = (
	date: Option<Date>,
	type: RelatedItemType,
): JSX.Element | null =>
	pipe(
		date,
		map((date) => (
			<time css={[timeStyles(type), dateStyles]}>
				{makeRelativeDate(date)}
			</time>
		)),
		withDefault<JSX.Element | null>(null),
	);

const cardStyles = (
	type: RelatedItemType,
	format: ArticleFormat,
): SerializedStyles => {
	switch (type) {
		case RelatedItemType.FEATURE: {
			const { kicker } = getThemeStyles(format.theme);

			return css`
				h2 {
					${headline.xxxsmall({ fontWeight: 'bold' })}
					color: ${kicker};
				}
			`;
		}

		case RelatedItemType.ANALYSIS: {
			return css`
				${headline.xxxsmall({
					lineHeight: 'regular',
					fontWeight: 'light',
				})};
				h3 {
					box-shadow: inset 0 -0.025rem ${border.articleLink(format)};
					display: inline;

					${darkModeCss`
                        box-shadow: inset 0 -0.025rem ${neutral[46]};
                    `}
				}
			`;
		}

		case RelatedItemType.VIDEO:
		case RelatedItemType.AUDIO:
		case RelatedItemType.GALLERY: {
			return css`
				background: ${background.inverse};
				h3 {
					color: ${text.ctaPrimary};
				}
			`;
		}

		case RelatedItemType.SPECIAL: {
			return css``;
		}

		case RelatedItemType.LIVE: {
			const { liveblogBackground, liveblogDarkBackground } =
				getThemeStyles(format.theme);
			return css`
				background: ${liveblogBackground};
				h3,
				time {
					color: ${text.ctaPrimary};
				}
				${darkModeCss`
                    background: ${liveblogDarkBackground};
                `}
			`;
		}

		case RelatedItemType.ADVERTISEMENT_FEATURE: {
			return css`
				background-color: ${neutral[93]};
				${textSans.large()}
			`;
		}

		case RelatedItemType.COMMENT: {
			return css`
				background-color: ${opinion[800]};
				${headline.xxsmall()}
			`;
		}

		default: {
			return css``;
		}
	}
};

const parentIconStyles: SerializedStyles = css`
	display: inline-block;
	line-height: 1;
	svg {
		width: 1rem;
		height: auto;
		margin-left: auto;
		margin-right: auto;
		margin-top: 0.25rem;
		display: block;
	}
`;

const iconStyles = (format: ArticleFormat): SerializedStyles => {
	const { inverted } = getThemeStyles(format.theme);
	return css`
		width: 1.5rem;
		height: 1.5rem;
		display: inline-block;
		background-color: ${inverted};
		border-radius: 50%;
		margin-top: -${remSpace[1]};
	`;
};

const commentIconStyle: SerializedStyles = css`
	width: 2rem;
	height: 1.4375rem;
	display: inline-block;
	fill: ${opinion[400]};
	vertical-align: text-top;
	margin-top: -3px;
	margin-right: -2px;
`;

const icon = (
	type: RelatedItemType,
	format: ArticleFormat,
): ReactElement | null => {
	switch (type) {
		case RelatedItemType.GALLERY:
			return (
				<span css={iconStyles(format)}>
					<SvgCamera />
				</span>
			);
		case RelatedItemType.AUDIO:
			return (
				<span css={iconStyles(format)}>
					<SvgAudio />
				</span>
			);
		case RelatedItemType.VIDEO:
			return (
				<span css={iconStyles(format)}>
					<SvgVideo />
				</span>
			);
		default:
			return null;
	}
};

const quotationComment = (
	type: RelatedItemType,
	format: ArticleFormat,
): ReactElement | null => {
	if (type === RelatedItemType.COMMENT) {
		return (
			<span css={commentIconStyle}>
				<SvgQuote />
			</span>
		);
	} else {
		return null;
	}
};

const metadataStyles: SerializedStyles = css`
	padding: 0 ${remSpace[2]} ${remSpace[1]};
	height: ${remSpace[6]};
`;

const bylineStyles: SerializedStyles = css`
	color: ${opinion[400]};
`;

const durationMedia = (
	duration: Option<string>,
	type: RelatedItemType,
): ReactElement | null => {
	return pipe(
		duration,
		map((length) => {
			const seconds = formatSeconds(length);
			if (seconds.kind === OptionKind.Some) {
				return (
					<time css={[timeStyles(type), durationStyles]}>
						{seconds.value}
					</time>
				);
			} else {
				return null;
			}
		}),
		withDefault<ReactElement | null>(null),
	);
};

const cardByline = (
	type: RelatedItemType,
	byline?: string,
): ReactElement | null => {
	if (type !== RelatedItemType.COMMENT) {
		return null;
	}

	return pipe(
		fromNullable(byline),
		map((byline) => {
			return <div css={bylineStyles}>{byline}</div>;
		}),
		withDefault<ReactElement | null>(null),
	);
};

const cardImage = (
	image: Option<Image>,
	relatedItem: RelatedItem,
): ReactElement | null => {
	const format = {
		theme: themeFromString(relatedItem.pillar.id),
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
	};

	return pipe(
		image,
		map((img) => {
			return (
				<div css={[fullWidthImage, imageWrapperStyles]}>
					<Img
						image={img}
						sizes={{
							mediaQueries: [
								{ breakpoint: 'phablet', size: '620px' },
							],
							default: '100%',
						}}
						format={format}
						className={none}
						supportsDarkMode
						lightbox={none}
					/>
				</div>
			);
		}),
		withDefault<ReactElement | null>(
			<div css={[imageWrapperStyles, imageBackground]}></div>,
		),
	);
};

const Card: FC<Props> = ({ relatedItem, image }) => {
	const format = {
		theme: themeFromString(relatedItem.pillar.id),
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
	};

	const img = cardImage(image, relatedItem);
	const { type, title, mediaDuration, link, byline } = relatedItem;

	const lastModified = relatedItem.lastModified?.iso8601;
	const date =
		lastModified && type !== RelatedItemType.ADVERTISEMENT_FEATURE
			? relativeFirstPublished(fromNullable(new Date(lastModified)), type)
			: null;
	const starRating =
		relatedItem.starRating &&
		!Number.isNaN(parseInt(relatedItem.starRating))
			? stars(parseInt(relatedItem.starRating))
			: null;

	return (
		<li
			className="js-card"
			data-article-id={link}
			css={[listStyles(type, format), cardStyles(type, format)]}
		>
			<a css={anchorStyles} href={`https://theguardian.com/${link}`}>
				<section css={headingWrapperStyles}>
					<h3 css={headingStyles(type)}>
						{quotationComment(type, format)}
						{title}
						{cardByline(type, byline)}
					</h3>
					{starRating}
				</section>
				<section>
					<div css={metadataStyles}>
						<section css={parentIconStyles}>
							{icon(type, format)}
						</section>
						{durationMedia(fromNullable(mediaDuration), type)}
						{date}
					</div>
					{img}
				</section>
			</a>
		</li>
	);
};

export default Card;
