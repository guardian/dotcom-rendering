import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, headline } from '@guardian/source-foundations';
import { unescapeData } from '../lib/escapeData';
import { palette } from '../palette';
import type { Palette } from '../types/palette';
import { QuoteIcon } from './QuoteIcon';

const quoteColour = palette('--pullquote-text');
const pullQuoteCss = css`
	color: ${quoteColour};
`;

const fontCss = (role: string, format: ArticleFormat) => {
	switch (role) {
		case 'showcase':
			switch (format.design) {
				case ArticleDesign.Standard:
				case ArticleDesign.Profile:
				case ArticleDesign.Explainer:
				case ArticleDesign.Timeline:
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
				case ArticleDesign.Analysis:
				case ArticleDesign.Feature:
				case ArticleDesign.Interview:
				case ArticleDesign.Recipe:
				case ArticleDesign.Review:
					return css`
						${headline.xsmall({
							fontWeight: 'medium',
							lineHeight: 'tight',
						})};
						${from.tablet} {
							${headline.small({
								fontWeight: 'medium',
								lineHeight: 'tight',
							})};
						}
					`;
				case ArticleDesign.Obituary:
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				default:
					return css`
						${headline.xsmall({
							fontWeight: 'regular',
							lineHeight: 'tight',
						})};
						${from.tablet} {
							${headline.small({
								fontWeight: 'regular',
								lineHeight: 'tight',
							})};
						}
					`;
			}
		case 'supporting':
			switch (format.design) {
				case ArticleDesign.Standard:
				case ArticleDesign.Profile:
				case ArticleDesign.Explainer:
				case ArticleDesign.Timeline:
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
				case ArticleDesign.Analysis:
				case ArticleDesign.Feature:
				case ArticleDesign.Interview:
				case ArticleDesign.Recipe:
				case ArticleDesign.Review:
					return css`
						${headline.xxsmall({
							fontWeight: 'medium',
							lineHeight: 'tight',
						})};
					`;
				case ArticleDesign.Obituary:
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				default:
					return css`
						${headline.xxsmall({
							fontWeight: 'regular',
							lineHeight: 'tight',
						})};
					`;
			}
		// Inline
		default:
			switch (format.design) {
				case ArticleDesign.Standard:
				case ArticleDesign.Profile:
				case ArticleDesign.Explainer:
				case ArticleDesign.Timeline:
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
				case ArticleDesign.Analysis:
				case ArticleDesign.Feature:
				case ArticleDesign.Interview:
				case ArticleDesign.Recipe:
				case ArticleDesign.Review:
					return css`
						${headline.xxsmall({
							fontWeight: 'medium',
							lineHeight: 'tight',
						})};
						${from.tablet} {
							${headline.xsmall({
								fontWeight: 'medium',
								lineHeight: 'tight',
							})};
						}
					`;
				case ArticleDesign.Obituary:
				case ArticleDesign.Editorial:
				case ArticleDesign.Comment:
				default:
					return css`
						${headline.xxsmall({
							fontWeight: 'regular',
							lineHeight: 'tight',
						})};
						${from.tablet} {
							${headline.xsmall({
								fontWeight: 'regular',
								lineHeight: 'tight',
							})};
						}
					`;
			}
	}
};

const inlineQuoteCss = css`
	margin-top: 14px;
	margin-bottom: 14px;
	max-width: 90%;

	${from.tablet} {
		max-width: 80%;
	}
`;

const supportingQuoteCss = (decidedPalette: Palette) => css`
	position: relative;
	width: 40%;
	background-color: ${decidedPalette.background.pullQuote};
	margin: 10px;
	clear: left;
	float: left;

	${from.leftCol} {
		position: relative;
		border: 1px solid currentColor;
		padding: 10px;
		/* Partially left */
		width: 240px;
		margin-left: -100px;
	}
`;

const blockquoteCss = css`
	margin-left: 1px;
	display: inline;
`;

type Props = {
	html?: string;
	palette: Palette;
	format: ArticleFormat;
	role: string;
	attribution?: string;
};

export const PullQuoteBlockComponent = ({
	html,
	palette: decidedPalette,
	format,
	attribution,
	role,
}: Props) => {
	if (!html) return <></>;

	return (
		<aside
			css={[
				pullQuoteCss,
				fontCss(role, format),
				role === 'supporting'
					? supportingQuoteCss(decidedPalette)
					: inlineQuoteCss,
			]}
		>
			<QuoteIcon colour={quoteColour} />
			<blockquote
				css={blockquoteCss}
				dangerouslySetInnerHTML={{
					__html: unescapeData(html),
				}}
			/>
			{!!attribution && (
				<footer>
					<cite>{attribution}</cite>
				</footer>
			)}
		</aside>
	);
};
