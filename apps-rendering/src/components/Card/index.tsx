import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { RelatedItem } from '@guardian/apps-rendering-api-models/relatedItem';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import type { ArticleFormat } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import {
	from,
	headline,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import {
	SvgAudio,
	SvgCamera,
	SvgQuote,
	SvgVideo,
} from '@guardian/source-react-components';
import {
	fromNullable,
	map,
	none,
	OptionKind,
	some,
	withDefault,
} from '../../../vendor/@guardian/types/index';
import type { Option } from '../../../vendor/@guardian/types/index';
import { getPillarOrElseNews } from 'articleFormat';
import Img from 'components/ImgAlt';
import Kicker from 'components/Kicker';
import { stars } from 'components/StarRating';
import { formatSeconds, makeRelativeDate } from 'date';
import type { Image } from 'image';
import { maybeRender, pipe } from 'lib';
import { background, border, fill, text } from 'palette';
import type { FC, ReactElement } from 'react';
import { darkModeCss } from 'styles';

interface Props {
	relatedItem: RelatedItem;
	image: Option<Image>;
	kickerText: Option<string>;
}

const listBaseStyles = css`
	margin-right: ${remSpace[2]};
	flex: 0 0 42vw;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-width: 10rem;

	&.fade {
		opacity: 0.7;
	}

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

const listStyles = (
	type: RelatedItemType,
	format: ArticleFormat,
): SerializedStyles => {
	switch (type) {
		case RelatedItemType.VIDEO:
		case RelatedItemType.AUDIO:
		case RelatedItemType.GALLERY: {
			return css`
				${listBaseStyles}
				border-radius: ${remSpace[2]};
				padding-top: 0.125rem;
			`;
		}

		case RelatedItemType.LIVE: {
			return css`
				${listBaseStyles}
				border-radius: ${remSpace[2]};
				padding-top: 0.125rem;
			`;
		}

		default: {
			return css`
				${listBaseStyles}
				border-top: 1px solid ${border.relatedCard(format)};
				border-radius: 0 0 ${remSpace[2]} ${remSpace[2]};

				${darkModeCss`
					border-top: 1px solid ${border.relatedCardDark(format)};
        		`}
			`;
		}
	}
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

const imgStyles = css`
	border-radius: ${remSpace[2]};
`;

const timeStyles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.small()};
	color: ${text.relatedCardTimeAgo(format)};
	text-align: right;
	display: inline-block;
	vertical-align: top;
	font-weight: 700;

	${darkModeCss`
		color: ${text.relatedCardTimeAgoDark(format)};
	`}
`;

const durationStyles = css`
	margin-left: ${remSpace[3]};
`;

const dateStyles = css`
	float: right;
`;

const anchorStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.relatedCardLink(format)};
	text-decoration: none;
	${darkModeCss`
		color: ${text.relatedCardLinkDark(format)};
    `}
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const headingWrapperStyles = (
	type: RelatedItemType,
	format: ArticleFormat,
): SerializedStyles => {
	switch (type) {
		case RelatedItemType.VIDEO:
		case RelatedItemType.AUDIO:
		case RelatedItemType.GALLERY:
		case RelatedItemType.LIVE: {
			return css`
				padding: 0.125rem ${remSpace[2]} ${remSpace[4]};
				flex-grow: 1;
			`;
		}
		default: {
			return css`
				padding: 0.125rem 0 ${remSpace[4]} 0;
				flex-grow: 1;
			`;
		}
	}
};

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

const imageBackground = (format: ArticleFormat): SerializedStyles => css`
	background: ${background.relatedCardImage(format)};
`;

const relativeFirstPublished = (
	date: Option<Date>,
	format: ArticleFormat,
): JSX.Element | null =>
	pipe(
		date,
		map((date) => (
			<time css={[timeStyles(format), dateStyles]}>
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
		case RelatedItemType.VIDEO:
		case RelatedItemType.AUDIO:
		case RelatedItemType.GALLERY: {
			return css`
				background: ${background.relatedCard(format)};
				h3 {
					color: ${text.relatedCard(format)};
				}
				${darkModeCss`
					background: ${background.relatedCardDark(format)};
				`}
			`;
		}

		case RelatedItemType.SPECIAL: {
			return css``;
		}

		case RelatedItemType.LIVE: {
			return css`
				background: ${background.relatedCard(format)};
				h3,
				time {
					color: ${text.relatedCard(format)};
				}
				${darkModeCss`
                    background: ${background.relatedCardDark(format)};
                `}
			`;
		}

		case RelatedItemType.ADVERTISEMENT_FEATURE: {
			return css`
				background-color: ${background.relatedCard(format)};
				${textSans.large()}
			`;
		}

		case RelatedItemType.COMMENT: {
			return css`
				background-color: ${background.relatedCard(format)};
				${headline.xxsmall()}
				${darkModeCss`
					background: ${background.relatedCardDark(format)};
        		`}
			`;
		}

		default: {
			return css`
				background: ${background.relatedCard(format)};
				${darkModeCss`
					background: ${background.relatedCardDark(format)};
        		`}
			`;
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
	return css`
		width: 1.5rem;
		height: 1.5rem;
		display: inline-block;
		background-color: ${background.relatedCardIcon(format)};
		border-radius: 50%;
		margin-top: -${remSpace[1]};
	`;
};

const commentIconStyle = (format: ArticleFormat): SerializedStyles => css`
	width: 1.5rem;
	height: 1.5rem;
	display: inline-block;
	vertical-align: text-bottom;
	margin-bottom: -3px;
	margin-left: -3px;

	svg {
		fill: ${fill.icon(format)};
		${darkModeCss`
			fill: ${fill.iconDark(format)};
		`}
	}

	${from.desktop} {
		width: 1.688rem;
		height: 1.688rem;
	}
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
			<span css={commentIconStyle(format)}>
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

const bylineStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.bylineAnchor(format)};
	font-style: italic;
	${darkModeCss`
		color: ${text.bylineAnchorDark(format)};
	`}
`;

const durationMedia = (
	duration: Option<string>,
	format: ArticleFormat,
): ReactElement | null => {
	return pipe(
		duration,
		map((length) => {
			const seconds = formatSeconds(length);
			if (seconds.kind === OptionKind.Some) {
				return (
					<time css={[timeStyles(format), durationStyles]}>
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
	format: ArticleFormat,
	byline?: string,
): ReactElement | null => {
	if (type !== RelatedItemType.COMMENT) {
		return null;
	}

	return pipe(
		fromNullable(byline),
		map((byline) => {
			return <div css={bylineStyles(format)}>{byline}</div>;
		}),
		withDefault<ReactElement | null>(null),
	);
};

const cardImage = (
	image: Option<Image>,
	relatedItem: RelatedItem,
): ReactElement | null => {
	const format = {
		theme: getPillarOrElseNews(relatedItem.pillar.id),
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
						className={some(imgStyles)}
						lightbox={none}
					/>
				</div>
			);
		}),
		withDefault<ReactElement | null>(
			<div css={[imageWrapperStyles, imageBackground(format)]}></div>,
		),
	);
};

/** This function is needed because RelatedItemType only exists in the Apps Rendering
 * API model, so we need a way to convert it to ArticleFormat */
const formatFromRelatedItem = (
	relatedItem: RelatedItemType,
	pillar: string,
): ArticleFormat => {
	switch (relatedItem) {
		case RelatedItemType.ARTICLE:
			return {
				design: ArticleDesign.Standard,
				theme: getPillarOrElseNews(pillar),
				display: ArticleDisplay.Standard,
			};

		case RelatedItemType.FEATURE:
			return {
				design: ArticleDesign.Feature,
				theme: getPillarOrElseNews(pillar),
				display: ArticleDisplay.Standard,
			};

		case RelatedItemType.ANALYSIS:
			return {
				design: ArticleDesign.Analysis,
				theme: getPillarOrElseNews(pillar),
				display: ArticleDisplay.Standard,
			};
		case RelatedItemType.SPECIAL:
			return {
				design: ArticleDesign.Standard,
				theme: ArticleSpecial.SpecialReport,
				display: ArticleDisplay.Standard,
			};
		case RelatedItemType.LIVE:
			return {
				design: ArticleDesign.LiveBlog,
				theme: getPillarOrElseNews(pillar),
				display: ArticleDisplay.Standard,
			};

		case RelatedItemType.GALLERY:
			return {
				design: ArticleDesign.Gallery,
				theme: getPillarOrElseNews(pillar),
				display: ArticleDisplay.Standard,
			};
		case RelatedItemType.AUDIO:
			return {
				design: ArticleDesign.Audio,
				theme: getPillarOrElseNews(pillar),
				display: ArticleDisplay.Standard,
			};
		case RelatedItemType.VIDEO:
			return {
				design: ArticleDesign.Video,
				theme: getPillarOrElseNews(pillar),
				display: ArticleDisplay.Standard,
			};
		case RelatedItemType.REVIEW:
			return {
				design: ArticleDesign.Review,
				theme: getPillarOrElseNews(pillar),
				display: ArticleDisplay.Standard,
			};
		case RelatedItemType.ADVERTISEMENT_FEATURE:
			return {
				design: ArticleDesign.Standard,
				theme: ArticleSpecial.Labs,
				display: ArticleDisplay.Standard,
			};
		case RelatedItemType.COMMENT:
			return {
				design: ArticleDesign.Comment,
				theme:
					pillar === 'pillar/news'
						? ArticlePillar.Opinion
						: getPillarOrElseNews(pillar),
				display: ArticleDisplay.Standard,
			};
	}
};

const Card: FC<Props> = ({ relatedItem, image, kickerText }) => {
	const format = formatFromRelatedItem(
		relatedItem.type,
		relatedItem.pillar.id,
	);

	const img = cardImage(image, relatedItem);
	const { type, title, mediaDuration, link, byline } = relatedItem;

	const webPublicationDate = relatedItem.webPublicationDate?.iso8601;
	const date =
		webPublicationDate && type !== RelatedItemType.ADVERTISEMENT_FEATURE
			? relativeFirstPublished(
					fromNullable(new Date(webPublicationDate)),
					format,
			  )
			: null;
	const starRating =
		relatedItem.starRating &&
		!Number.isNaN(parseInt(relatedItem.starRating))
			? stars(parseInt(relatedItem.starRating))
			: null;

	const isLive = relatedItem.type === RelatedItemType.LIVE;

	return (
		<li
			className="js-card"
			data-article-id={link}
			css={[listStyles(type, format), cardStyles(type, format)]}
		>
			<a
				css={anchorStyles(format)}
				href={`https://theguardian.com/${link}`}
			>
				<section css={headingWrapperStyles(type, format)}>
					<h3 css={headingStyles(type)}>
						{quotationComment(type, format)}
						{maybeRender(
							isLive ? some('Live') : kickerText,
							(t) => (
								<Kicker format={format} text={some(t)} />
							),
						)}
						{title}
						{cardByline(type, format, byline)}
					</h3>
					{starRating}
				</section>
				<section>
					<div css={metadataStyles}>
						<section css={parentIconStyles}>
							{icon(type, format)}
						</section>
						{durationMedia(fromNullable(mediaDuration), format)}
						{date}
					</div>
					{img}
				</section>
			</a>
		</li>
	);
};

export default Card;
export { formatFromRelatedItem };
