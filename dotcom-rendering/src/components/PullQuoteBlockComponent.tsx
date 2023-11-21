import { css } from '@emotion/react';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { from, headline, textSans, until } from '@guardian/source-foundations';
import { unescapeData } from '../lib/escapeData';
import { palette } from '../palette';
import { QuoteIcon } from './QuoteIcon';

const pullQuoteCss = css`
	color: ${palette('--pullquote-text')};
`;

const fontCss = (role: string, format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.Labs) {
		return css`
			${textSans.large({ fontWeight: 'medium' })}
		`;
	}

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

const supportingQuoteCss = css`
	position: relative;
	width: 40%;
	background-color: ${palette('--pullquote-background')};
	margin-top: 2px;
	margin-right: 10px;
	margin-bottom: 14px;
	clear: left;
	float: left;

	${from.leftCol} {
		position: relative;
		border: 1px solid ${palette('--pullquote-border')};
		padding: 2px 10px 16px 10px;
		/* Partially left */
		width: 240px;
		margin-left: -100px;
		margin-top: 5px;
	}
`;

const basePhotoEssayQuoteCss = css`
	line-height: 25px;
	position: relative;
	padding: 6px 10px 12px 10px;
	margin-bottom: 16px;
`;

const rolePhotoEssayQuoteCss = (role: string) => {
	switch (role) {
		case 'supporting': {
			return css`
				margin-left: -10px;
				margin-right: 10px;
				padding-left: 10px;
				padding-right: 10px;
				clear: left;
				float: left;
				${until.mobileLandscape} {
					width: 100%;
				}
				${from.mobileLandscape} {
					width: 220px;
				}
				${from.leftCol} {
					width: 140px;
					margin-left: -150px;
				}
				${from.wide} {
					width: 200px;
					margin-left: -215px;
				}
			`;
		}
		default: {
			return css`
				margin-left: -10px;
				display: block;
			`;
		}
	}
};

const alignmentCss = (role: string, format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.PhotoEssay:
			return css`
				${basePhotoEssayQuoteCss}
				${rolePhotoEssayQuoteCss(role)}
			`;
		default:
			return css`
				${role === 'supporting' ? supportingQuoteCss : inlineQuoteCss}
			`;
	}
};

const blockquoteCss = css`
	display: inline;
	font-style: italic;
`;

type Props = {
	html?: string;
	format: ArticleFormat;
	role: string;
	attribution?: string;
};

export const PullQuoteBlockComponent = ({
	html,
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
				alignmentCss(role, format),
			]}
		>
			<QuoteIcon colour={palette('--pullquote-icon')} />
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
