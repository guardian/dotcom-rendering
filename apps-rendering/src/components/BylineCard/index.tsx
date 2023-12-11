import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { RelatedItem } from '@guardian/apps-rendering-api-models/relatedItem';
import type { ArticleFormat } from '@guardian/libs';
import {
	from,
	headline,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { SvgQuote } from '@guardian/source-react-components';
import type { Option } from '../../../vendor/@guardian/types/index';
import {
	fromNullable,
	map,
	withDefault,
} from '../../../vendor/@guardian/types/index';
import { formatFromRelatedItem } from 'components/Card';
import { makeRelativeDate } from 'date';
import { pipe } from 'lib';
import { background, border, fill, text } from 'palette';
import type { FC, ReactElement } from 'react';
import { darkModeCss } from 'styles';

interface Props {
	relatedItem: RelatedItem;
}

const listStyles = (format: ArticleFormat): SerializedStyles => {
	return css`
		margin-right: ${remSpace[2]};
		flex: 0 0 42vw;
		justify-content: space-between;
		border-top: 1px solid ${border.relatedCard(format)};
		max-width: 10rem;

		&.fade {
			opacity: 0.7;
		}

		${darkModeCss`
			border-top: 1px solid ${border.relatedCardDark(format)};
            background: ${background.relatedCardDark(format)};
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

const bylineImage = (format: ArticleFormat): SerializedStyles => css`
	border-radius: 50%;
	right: 0.625rem;
	top: 0.375rem;
	overflow: hidden;
	height: 4.75rem;
	width: 4.75rem;
	contain: paint;
	background-color: ${background.relatedCardBylineImage(format)};
	float: right;
	position: relative;

	img {
		margin: auto;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		height: 4.75rem;
		left: -0.625rem;

		${from.desktop} {
			height: 8.25rem;
		}
	}

	${from.desktop} {
		width: 8.25rem;
		height: 8.25rem;
	}
`;

const anchorStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.relatedCardLink(format)};
	text-decoration: none;
	display: flex;
	flex-direction: column;
	height: 100%;
	${darkModeCss`
        color: ${text.relatedCardLinkDark(format)};
    `}
`;

const headingWrapperStyles = css`
	padding: 0.125rem ${remSpace[2]} ${remSpace[4]};
	flex-grow: 1;
`;

const headingStyles: SerializedStyles = css`
	${headline.xxxsmall()}
	margin: 0;

	${from.desktop} {
		${headline.xxsmall()}
	}
`;

const cardStyles: SerializedStyles = css`
	${headline.xxsmall()}
`;

const commentIconStyle = (format: ArticleFormat): SerializedStyles => {
	return css`
		width: 1.5rem;
		height: 1.5rem;
		display: inline-block;
		fill: ${fill.icon(format)};
		vertical-align: text-bottom;
		margin-bottom: -3px;
		margin-left: -3px;

		${darkModeCss`
			fill: ${fill.iconDark(format)};
		`}

		${from.desktop} {
			width: 1.688rem;
			height: 1.688rem;
		}
	`;
};

const bylineStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.bylineAnchor(format)};
	font-style: italic;
	${darkModeCss`
		color: ${text.bylineAnchorDark(format)};
	`}
`;

const byline = (
	relatedItem: RelatedItem,
	format: ArticleFormat,
): ReactElement | null => {
	return pipe(
		fromNullable(relatedItem.byline),
		map((byline) => {
			return <div css={bylineStyles(format)}>{byline}</div>;
		}),
		withDefault<ReactElement | null>(null),
	);
};

const cardImage = (
	relatedItem: RelatedItem,
	format: ArticleFormat,
): ReactElement | null => {
	if (!relatedItem.bylineImage) {
		return null;
	}

	return (
		<div css={bylineImage(format)}>
			<img
				alt={relatedItem.byline ?? 'Byline image'}
				src={relatedItem.bylineImage}
			/>
		</div>
	);
};

const dateStyles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.small()};
	color: ${text.relatedCardTimeAgo(format)};
	text-align: right;
	vertical-align: top;
	float: right;
	margin-right: ${remSpace[3]};
	align-self: flex-end;
	font-weight: 700;
`;

const relativeFirstPublished = (
	date: Option<Date>,
	format: ArticleFormat,
): ReactElement | null =>
	pipe(
		date,
		map((date) => (
			<time css={dateStyles(format)}>{makeRelativeDate(date)}</time>
		)),
		withDefault<ReactElement | null>(null),
	);

const footerStyles = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	clear: both;
	min-height: 2rem;
`;

const BylineCard: FC<Props> = ({ relatedItem }) => {
	const { title, link, pillar, webPublicationDate, type } = relatedItem;
	const format = formatFromRelatedItem(type, pillar.id);
	const img = cardImage(relatedItem, format);
	const date = webPublicationDate
		? relativeFirstPublished(
				fromNullable(new Date(webPublicationDate.iso8601)),
				format,
		  )
		: null;
	return (
		<li
			className="js-card"
			data-article-id={link}
			css={[listStyles(format), cardStyles]}
		>
			<a
				css={anchorStyles(format)}
				href={`https://theguardian.com/${link}`}
			>
				<section css={headingWrapperStyles}>
					<h3 css={headingStyles}>
						<span css={commentIconStyle(format)}>
							<SvgQuote />
						</span>
						{title}
						{byline(relatedItem, format)}
					</h3>
				</section>
				<section>
					{img}
					<footer css={footerStyles}>
						<div css={dateStyles(format)}></div>
						{date}
					</footer>
				</section>
			</a>
		</li>
	);
};

export default BylineCard;
