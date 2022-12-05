import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	background,
	border,
	fill,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
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
} from '@guardian/types';
import type { Option } from '@guardian/types';
import Img from 'components/ImgAlt';
import Kicker from 'components/Kicker';
import { stars } from 'components/StarRating';
import { formatSeconds, makeRelativeDate } from 'date';
import type { Image } from 'image';
import { maybeRender, pipe } from 'lib';
import type { FC, ReactElement } from 'react';
import type { OnwardsContentArticle } from 'relatedContent';
import { getFormat } from 'relatedContent';
import { darkModeCss } from 'styles';

interface Props {
	relatedItem: OnwardsContentArticle;
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

const listStyles = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
		case ArticleDesign.Gallery: {
			return css`
				${listBaseStyles}
				border-radius: ${remSpace[2]};
				padding-top: 0.125rem;
			`;
		}

		case ArticleDesign.LiveBlog: {
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

const headingWrapperStyles = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
		case ArticleDesign.Gallery:
		case ArticleDesign.LiveBlog: {
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

const headingStyles = (format: ArticleFormat): SerializedStyles => {
	if (format.theme === ArticleSpecial.Labs) {
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

const cardStyles = (format: ArticleFormat): SerializedStyles => {
	if (
		format.theme === ArticleSpecial.SpecialReport ||
		format.theme === ArticleSpecial.SpecialReportAlt
	) {
		return css();
	}

	if (format.theme === ArticleSpecial.Labs) {
		return css`
			background-color: ${background.relatedCard(format)};
			${textSans.large()}
		`;
	}

	switch (format.design) {
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
		case ArticleDesign.Gallery: {
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

		case ArticleDesign.LiveBlog: {
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

		case ArticleDesign.Comment: {
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

const icon = (format: ArticleFormat): ReactElement | null => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return (
				<span css={iconStyles(format)}>
					<SvgCamera />
				</span>
			);
		case ArticleDesign.Audio:
			return (
				<span css={iconStyles(format)}>
					<SvgAudio />
				</span>
			);
		case ArticleDesign.Video:
			return (
				<span css={iconStyles(format)}>
					<SvgVideo />
				</span>
			);
		default:
			return null;
	}
};

const quotationComment = (format: ArticleFormat): ReactElement | null => {
	if (format.design === ArticleDesign.Comment) {
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
	format: ArticleFormat,
	byline?: string,
): ReactElement | null => {
	if (format.design !== ArticleDesign.Comment) {
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

const cardImage = (relatedItem: OnwardsContentArticle): ReactElement | null => {
	const format = getFormat(relatedItem);

	return pipe(
		relatedItem.mainMedia,
		map((img) => {
			console.log(`in comp`, img);
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
						supportsDarkMode
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

const Card: FC<Props> = ({ relatedItem, kickerText }) => {
	const format = getFormat(relatedItem);

	const img = cardImage(relatedItem);
	const { /*type, */ headline, webUrl, contributor, publishDate } =
		relatedItem;

	const date =
		publishDate.kind === OptionKind.Some &&
		format.theme !== ArticleSpecial.Labs
			? relativeFirstPublished(publishDate, format)
			: null;

	const starRating =
		relatedItem.design === ArticleDesign.Review &&
		!Number.isNaN(parseInt(relatedItem.starRating))
			? stars(parseInt(relatedItem.starRating))
			: null;

	const isLive = format.design === ArticleDesign.LiveBlog;

	return (
		<li
			className="js-card"
			data-article-id={webUrl}
			css={[listStyles(format), cardStyles(format)]}
		>
			<a
				css={anchorStyles(format)}
				href={`https://theguardian.com/${webUrl}`}
			>
				<section css={headingWrapperStyles(format)}>
					<h3 css={headingStyles(format)}>
						{quotationComment(format)}
						{maybeRender(
							isLive ? some('Live') : kickerText,
							(t) => (
								<Kicker format={format} text={some(t)} />
							),
						)}
						{headline}
						{/* {cardByline(format, byline)} */}
					</h3>
					{starRating}
				</section>
				<section>
					<div css={metadataStyles}>
						<section css={parentIconStyles}>{icon(format)}</section>
						{/* {durationMedia(fromNullable(mediaDuration), format)} */}
						{date}
					</div>
					{img}
				</section>
			</a>
		</li>
	);
};

export default Card;
