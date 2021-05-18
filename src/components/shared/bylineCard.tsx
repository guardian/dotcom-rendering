import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { RelatedItem } from '@guardian/apps-rendering-api-models/relatedItem';
import { remSpace } from '@guardian/src-foundations';
import { neutral, opinion, text } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { SvgQuote } from '@guardian/src-icons';
import type { Format, Option } from '@guardian/types';
import {
	Design,
	Display,
	fromNullable,
	map,
	withDefault,
} from '@guardian/types';
import { makeRelativeDate } from 'date';
import { pipe2 } from 'lib';
import type { FC, ReactElement } from 'react';
import { darkModeCss } from 'styles';
import { getThemeStyles, themeFromString } from 'themeStyles';

interface Props {
	relatedItem: RelatedItem;
}

const borderColor = (format: Format): SerializedStyles => {
	return css`1px solid ${getThemeStyles(format.theme).kicker}`;
};

const listStyles = (format: Format): SerializedStyles => {
	return css`
		background: white;
		margin-right: ${remSpace[3]};
		flex: 0 0 15rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-top: ${borderColor(format)};

		&.fade {
			opacity: 0.7;
		}

		${darkModeCss`
            background: ${neutral[7]};
        `}
	`;
};

const bylineImage = css`
	border-radius: 50%;
	right: 0.625rem;
	top: 0.375rem;
	overflow: hidden;
	height: 8.25rem;
	width: 8.25rem;
	contain: paint;
	background-color: ${opinion[400]};
	float: right;
	margin: 0 ${remSpace[2]} 0 0;
	position: relative;

	img {
		margin: auto;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		height: 8.25rem;
		left: -0.625rem;
	}
`;

const anchorStyles = css`
	color: ${neutral[7]};
	text-decoration: none;
	${darkModeCss`
        color: ${neutral[86]};
    `}
`;

const headingWrapperStyles = css`
	padding: ${remSpace[2]};
	min-height: 10rem;
`;

const headingStyles: SerializedStyles = css`
	${headline.xxsmall()}
	margin: 0 0 ${remSpace[2]} 0;
`;

const cardStyles: SerializedStyles = css`
	background-color: ${opinion[800]};
	${headline.xxsmall()}
`;

const commentIconStyle = (): SerializedStyles => {
	return css`
		width: 2rem;
		height: 1.4375rem;
		display: inline-block;
		fill: ${opinion[400]};
		vertical-align: text-top;
		margin-top: -3px;
		margin-right: -2px;
	`;
};

const bylineStyles: SerializedStyles = css`
	color: ${opinion[400]};
`;

const byline = (relatedItem: RelatedItem): ReactElement | null => {
	return pipe2(
		fromNullable(relatedItem.byline),
		map((byline) => {
			return <div css={bylineStyles}>{byline}</div>;
		}),
		withDefault<ReactElement | null>(null),
	);
};

const cardImage = (relatedItem: RelatedItem): ReactElement | null => {
	if (!relatedItem.bylineImage) {
		return null;
	}

	return (
		<div css={bylineImage}>
			<img
				alt={relatedItem.byline ?? 'Byline image'}
				src={relatedItem.bylineImage}
			/>
		</div>
	);
};

const dateStyles = css`
	${textSans.small()};
	color: ${text.supporting};
	text-align: right;
	display: inline-block;
	vertical-align: top;
	float: right;
	margin-right: ${remSpace[2]};
	align-self: flex-end;
`;

const lineStyles = css`
	background-image: repeating-linear-gradient(
		${neutral[86]},
		${neutral[86]} 1px,
		transparent 1px,
		transparent 0.25rem
	);
	background-repeat: repeat-x;
	background-position: center top;
	background-size: 1px calc(0.75rem + 1px);
	height: calc(0.75rem + 1px);
	flex-grow: 1;
	margin-right: ${remSpace[2]};
	align-self: flex-end;
	${darkModeCss`
        background-image: repeating-linear-gradient(${neutral[20]}, ${neutral[20]} 1px, transparent 1px, transparent 0.25rem);
    `}
`;

const relativeFirstPublished = (date: Option<Date>): ReactElement | null =>
	pipe2(
		date,
		map((date) => <time css={dateStyles}>{makeRelativeDate(date)}</time>),
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
	const { link, pillar, lastModified } = relatedItem;
	const format = {
		theme: themeFromString(pillar.id),
		design: Design.Article,
		display: Display.Standard,
	};

	const img = cardImage(relatedItem);
	const date = lastModified
		? relativeFirstPublished(fromNullable(new Date(lastModified.iso8601)))
		: null;
	return (
		<li
			className="js-card"
			data-article-id={link}
			css={[listStyles(format), cardStyles]}
		>
			<a css={anchorStyles} href={`https://theguardian.com/${link}`}>
				<section css={headingWrapperStyles}>
					<h3 css={headingStyles}>
						<span css={commentIconStyle}>
							<SvgQuote />
						</span>
						{relatedItem.title}
						{byline(relatedItem)}
					</h3>
				</section>
				<section>
					{img}
					<footer css={footerStyles}>
						<div css={lineStyles}></div>
						{date}
					</footer>
				</section>
			</a>
		</li>
	);
};

export default BylineCard;
